"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OAuthContent() {
  const searchParams = useSearchParams();
  const [githubStatus, setGithubStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");
  const [notionStatus, setNotionStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  useEffect(() => {
    const githubParam = searchParams.get("github");
    if (githubParam === "success") setGithubStatus("success");
    else if (githubParam === "failed") setGithubStatus("failed");

    const notionParam = searchParams.get("notion");
    if (notionParam === "success") setNotionStatus("success");
    else if (notionParam === "failed") setNotionStatus("failed");

    // ─── Popup Bridge Logic ───
    // If this page was opened as a popup (window.opener exists),
    // send a postMessage to the parent window and close this popup.
    if (window.opener) {
      console.log("[OAuth Popup] Detected window.opener — sending postMessage");

      if (githubParam === "success") {
        window.opener.postMessage(
          { type: "GITHUB_VERIFIED", success: true },
          "*",
        );
        console.log("[OAuth Popup] Sent GITHUB_VERIFIED");
      } else if (githubParam === "failed") {
        window.opener.postMessage(
          { type: "GITHUB_VERIFICATION_FAILED", success: false },
          "*",
        );
        console.log("[OAuth Popup] Sent GITHUB_VERIFICATION_FAILED");
      }

      if (notionParam === "success") {
        window.opener.postMessage(
          { type: "NOTION_VERIFIED", success: true },
          "*",
        );
      } else if (notionParam === "failed") {
        window.opener.postMessage(
          { type: "NOTION_VERIFICATION_FAILED", success: false },
          "*",
        );
      }

      // Close popup after a brief delay to ensure message delivery
      setTimeout(() => {
        window.close();
      }, 600);
    }
  }, [searchParams]);

  // Read the login accessToken from cookies (non-httpOnly) or fall back to nothing.
  const getToken = (): string => {
    if (typeof document === "undefined") return "";
    const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
    return match ? match[1] : "";
  };

  const handleGithubLogin = () => {
    const token = getToken();
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://skillscape-ai.onrender.com"}/github/oauth`,
    );
    if (token) url.searchParams.set("token", token);
    window.location.href = url.toString();
  };

  const handleNotionLogin = () => {
    const token = getToken();
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/notion/oauth`,
    );
    if (token) url.searchParams.set("token", token);
    window.location.href = url.toString();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-10 bg-[#050505]">
      {/* Status Messages */}
      {githubStatus === "success" && (
        <div className="text-green-400 border border-green-500/30 bg-green-500/10 px-6 py-3 rounded-lg text-sm font-medium">
          ✓ GitHub connected successfully!
        </div>
      )}
      {githubStatus === "failed" && (
        <div className="text-red-400 border border-red-500/30 bg-red-500/10 px-6 py-3 rounded-lg text-sm font-medium">
          ✗ GitHub connection failed. Please try again.
        </div>
      )}
      {notionStatus === "success" && (
        <div className="text-green-400 border border-green-500/30 bg-green-500/10 px-6 py-3 rounded-lg text-sm font-medium">
          ✓ Notion connected successfully!
        </div>
      )}
      {notionStatus === "failed" && (
        <div className="text-red-400 border border-red-500/30 bg-red-500/10 px-6 py-3 rounded-lg text-sm font-medium">
          ✗ Notion connection failed. Please try again.
        </div>
      )}

      {/* If opened as popup, show auto-close message */}
      {typeof window !== "undefined" && window.opener && (
        <p className="text-slate-500 text-xs font-mono">
          Closing this window automatically...
        </p>
      )}

      {/* Manual OAuth buttons (for non-popup navigation) */}
      {typeof window !== "undefined" && !window.opener && (
        <div className="flex gap-4">
          <button
            onClick={handleGithubLogin}
            className="cursor-pointer text-white no-underline border-2 border-white/20 hover:border-white/50 px-6 py-3 rounded-xl transition-all"
          >
            Connect to Github
          </button>
          <button
            onClick={handleNotionLogin}
            className="cursor-pointer text-white no-underline border-2 border-white/20 hover:border-white/50 px-6 py-3 rounded-xl transition-all"
          >
            Connect to Notion
          </button>
        </div>
      )}
    </div>
  );
}

export default function OAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-10 text-white">
          Loading...
        </div>
      }
    >
      <OAuthContent />
    </Suspense>
  );
}
