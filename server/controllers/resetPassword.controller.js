import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { resend } from "../lib/resend.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// ─── Generate 6-digit OTP ──────────────────────────────────────
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ─── 1. Send Reset OTP ─────────────────────────────────────────
export const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(new ApiError(400, "Email is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, "No account found with this email"));
    }

    // Generate and hash OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Save hashed OTP and expiry (10 minutes)
    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateModifiedOnly: true });

    // Send email via Resend
    await resend.emails.send({
      from: "VelionAI <onboarding@resend.dev>",
      to: email,
      subject: "VelionAI Password Reset OTP",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0a0a0f; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
          <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 8px;">Password Reset</h2>
          <p style="color: #94a3b8; font-size: 14px; margin-bottom: 32px;">Use the OTP below to reset your VelionAI password.</p>
          <div style="background: #13131a; border: 1px solid rgba(147,51,234,0.3); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #a78bfa; font-family: monospace;">${otp}</span>
          </div>
          <p style="color: #64748b; font-size: 12px; text-align: center;">This OTP expires in <strong style="color: #e2e8f0;">10 minutes</strong>.</p>
          <p style="color: #475569; font-size: 11px; text-align: center; margin-top: 32px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "OTP sent to your email"));
  } catch (error) {
    console.error("Send OTP error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Failed to send OTP. Please try again."));
  }
};

// ─── 2. Verify Reset OTP ───────────────────────────────────────
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json(new ApiError(400, "Email and OTP are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
      return res
        .status(400)
        .json(
          new ApiError(400, "No OTP request found. Please request a new one."),
        );
    }

    // Check expiry
    if (new Date() > user.resetPasswordOTPExpires) {
      // Clear expired OTP
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpires = undefined;
      await user.save({ validateModifiedOnly: true });
      return res
        .status(400)
        .json(new ApiError(400, "OTP has expired. Please request a new one."));
    }

    // Verify OTP
    const isValid = await bcrypt.compare(otp, user.resetPasswordOTP);
    if (!isValid) {
      return res.status(400).json(new ApiError(400, "Invalid OTP"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "OTP verified successfully"));
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json(new ApiError(500, "Verification failed"));
  }
};

// ─── 3. Reset Password ─────────────────────────────────────────
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json(new ApiError(400, "Password must be at least 6 characters"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
      return res.status(400).json(new ApiError(400, "No OTP request found"));
    }

    // Check expiry
    if (new Date() > user.resetPasswordOTPExpires) {
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpires = undefined;
      await user.save({ validateModifiedOnly: true });
      return res.status(400).json(new ApiError(400, "OTP has expired"));
    }

    // Verify OTP one more time
    const isValid = await bcrypt.compare(otp, user.resetPasswordOTP);
    if (!isValid) {
      return res.status(400).json(new ApiError(400, "Invalid OTP"));
    }

    // Update password (pre-findOneAndUpdate hook will hash it)
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: newPassword,
        $unset: { resetPasswordOTP: 1, resetPasswordOTPExpires: 1 },
      },
    );

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json(new ApiError(500, "Password reset failed"));
  }
};
