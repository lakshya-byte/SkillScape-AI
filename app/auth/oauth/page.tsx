'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function OAuthContent() {
    const searchParams = useSearchParams();
    const [githubStatus, setGithubStatus] = useState<'idle' | 'success' | 'failed'>('idle');
    const [notionStatus, setNotionStatus] = useState<'idle' | 'success' | 'failed'>('idle');

    useEffect(() => {
        const githubParam = searchParams.get('github');
        if (githubParam === 'success') setGithubStatus('success');
        else if (githubParam === 'failed') setGithubStatus('failed');

        const notionParam = searchParams.get('notion');
        if (notionParam === 'success') setNotionStatus('success');
        else if (notionParam === 'failed') setNotionStatus('failed');
    }, [searchParams]);

    // Read the login accessToken from cookies (non-httpOnly) or fall back to nothing.
    // The backend will also try req.cookies.accessToken as a fallback.
    const getToken = (): string => {
        if (typeof document === 'undefined') return '';
        const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
        return match ? match[1] : '';
    };

    const handleGithubLogin = () => {
        const token = getToken();
        const url = new URL("http://localhost:8000/github/oauth");
        if (token) url.searchParams.set("token", token);
        window.location.href = url.toString();
    };

    const handleNotionLogin = () => {
        const token = getToken();
        const url = new URL("http://localhost:8000/notion/oauth");
        if (token) url.searchParams.set("token", token);
        window.location.href = url.toString();
    };

    return (
        <div className="flex flex-col items-center gap-6 p-10">
            {/* Status Messages */}
            {githubStatus === 'success' && (
                <div className="text-green-400 border border-green-500/30 bg-green-500/10 px-6 py-3 rounded-lg text-sm font-medium">
                    ✓ GitHub connected successfully!
                </div>
            )}
            {githubStatus === 'failed' && (
                <div className="text-red-400 border border-red-500/30 bg-red-500/10 px-6 py-3 rounded-lg text-sm font-medium">
                    ✗ GitHub connection failed. Please try again.
                </div>
            )}
            {notionStatus === 'success' && (
                <div className="text-green-400 border border-green-500/30 bg-green-500/10 px-6 py-3 rounded-lg text-sm font-medium">
                    ✓ Notion connected successfully!
                </div>
            )}
            {notionStatus === 'failed' && (
                <div className="text-red-400 border border-red-500/30 bg-red-500/10 px-6 py-3 rounded-lg text-sm font-medium">
                    ✗ Notion connection failed. Please try again.
                </div>
            )}

            {/* GitHub Button */}
            <button
                onClick={handleGithubLogin}
                className='cursor-pointer text-white no-underline border-2 border-white px-4 py-2'>
                Connect to Github
            </button>

            {/* Notion Button */}
            <button
                onClick={handleNotionLogin}
                className='cursor-pointer text-white no-underline border-2 border-white px-4 py-2'>
                Connect to Notion
            </button>
        </div>
    )
}

export default function OAuthPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-10 text-white">Loading...</div>}>
            <OAuthContent />
        </Suspense>
    )
}
