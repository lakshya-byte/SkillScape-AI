"use client";

import React, { useEffect, useState } from "react";
import { History, Loader2 } from "lucide-react";
import TestCard from "./TestCard";

interface Props {
    onSelectAttempt: (attemptId: string) => void;
}

const TestHistory: React.FC<Props> = ({ onSelectAttempt }) => {
    const [attempts, setAttempts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { getUserAttempts } = await import("@/lib/authApi");
                const res = await getUserAttempts();
                setAttempts(res.data || []);
            } catch (err) {
                console.error("Failed to fetch attempts:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6 flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-mono">Loading history...</span>
            </div>
        );
    }

    if (attempts.length === 0) {
        return (
            <div className="bg-[#110d1b] border border-gray-800/80 rounded-2xl p-6 text-center">
                <History className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                <p className="text-xs text-gray-600">No test attempts yet.</p>
                <p className="text-[10px] text-gray-700 mt-1">
                    Generate and take a test to see your history here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-bold text-white">Test History</h3>
                <span className="text-[10px] text-gray-600 font-mono ml-auto">
                    {attempts.length} attempts
                </span>
            </div>
            {attempts.map((attempt) => (
                <TestCard
                    key={attempt._id}
                    attempt={attempt}
                    onClick={() => onSelectAttempt(attempt._id)}
                />
            ))}
        </div>
    );
};

export default TestHistory;
