"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://skillscape-ai.onrender.com";

interface UseGithubVerifyReturn {
    isVerified: boolean;
    isVerifying: boolean;
    error: string | null;
    openVerifyPopup: () => void;
}

/**
 * Custom hook to manage the GitHub OAuth verification popup flow.
 *
 * Opens a popup to BACKEND_URL/github/oauth, listens for postMessage
 * from the OAuth redirect page (/auth/oauth?github=success), and
 * calls onVerified callback when complete.
 */
export function useGithubVerify(
    initialVerified: boolean = false,
    onVerified?: () => void
): UseGithubVerifyReturn {
    const [isVerified, setIsVerified] = useState(initialVerified);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const popupRef = useRef<Window | null>(null);
    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Sync external state changes
    useEffect(() => {
        setIsVerified(initialVerified);
    }, [initialVerified]);

    // Message listener for popup communication
    const handleMessage = useCallback(
        (event: MessageEvent) => {
            console.log("[useGithubVerify] postMessage received:", event.data, "from:", event.origin);

            if (event.data?.type === "GITHUB_VERIFIED") {
                console.log("✅ GitHub verification confirmed via postMessage");
                setIsVerified(true);
                setIsVerifying(false);
                setError(null);
                onVerified?.();
            }

            if (event.data?.type === "GITHUB_VERIFICATION_FAILED") {
                console.error("❌ GitHub verification failed via postMessage");
                setIsVerifying(false);
                setError("GitHub verification failed. Please try again.");
            }
        },
        [onVerified]
    );

    // Register and clean up message listener
    useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [handleMessage]);

    // Open the verification popup
    const openVerifyPopup = useCallback(() => {
        if (isVerified) return;

        setIsVerifying(true);
        setError(null);

        const popup = window.open(
            `${BACKEND_URL}/github/oauth`,
            "githubVerify",
            "width=600,height=700,scrollbars=yes"
        );

        if (!popup) {
            setError("Popup blocked. Please allow popups for this site.");
            setIsVerifying(false);
            return;
        }

        popupRef.current = popup;

        // Poll to detect if popup was closed manually (without completing OAuth)
        pollIntervalRef.current = setInterval(() => {
            if (popupRef.current?.closed) {
                if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                // Give a grace period for postMessage to arrive
                setTimeout(() => {
                    setIsVerifying((prev) => {
                        if (prev) {
                            // Popup was closed but no message received — user cancelled
                            console.log("[useGithubVerify] Popup closed without verification");
                            return false;
                        }
                        return prev;
                    });
                }, 1000);
            }
        }, 500);
    }, [isVerified]);

    return { isVerified, isVerifying, error, openVerifyPopup };
}
