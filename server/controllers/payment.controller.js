import Razorpay from "razorpay";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        if (!amount) {
            return res.status(400).json(new ApiError(400, "Amount is required"));
        }

        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await getRazorpayInstance().orders.create(options);

        if (!order) {
            return res.status(500).json(new ApiError(500, "Error creating order"));
        }

        return res.status(200).json(
            new ApiResponse(200, order, "Order created successfully")
        );
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        return res.status(500).json(new ApiError(500, error.message || "Something went wrong while creating order"));
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json(new ApiError(400, "All payment details are required"));
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (isSignatureValid) {
            // Here you would typically update your database to mark the payment as successful
            // For now, we'll just return a success response
            return res.status(200).json(
                new ApiResponse(200, { verified: true }, "Payment verified successfully")
            );
        } else {
            return res.status(400).json(new ApiError(400, "Invalid signature, payment verification failed"));
        }
    } catch (error) {
        console.error("Razorpay Payment Verification Error:", error);
        return res.status(500).json(new ApiError(500, error.message || "Something went wrong while verifying payment"));
    }
};

export {
    createOrder,
    verifyPayment
};
