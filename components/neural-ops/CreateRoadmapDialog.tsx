"use client";

import React, { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface CreateRoadmapDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: (roadmapId: string) => void;
}

export default function CreateRoadmapDialog({
  open,
  onClose,
  onCreated,
}: CreateRoadmapDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/roadmaps/create", {
        prompt: prompt.trim(),
      });
      const roadmapId = res.data?.data?.roadmapId;

      if (!roadmapId) throw new Error("No roadmap ID returned");

      setPrompt("");
      onCreated(roadmapId);
    } catch (err: any) {
      setError(err.message || "Failed to create roadmap");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="fixed z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-4 rounded-2xl border border-white/10 bg-[#0f0a1a] shadow-2xl shadow-violet-500/5">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Create Roadmap
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Describe what you want to learn or build
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Frontend developer roadmap for 2026"
              rows={3}
              disabled={loading}
              className="w-full bg-[#080515] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all disabled:opacity-50"
              autoFocus
            />
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Full-stack engineer roadmap",
              "Machine Learning path",
              "DevOps pipeline guide",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="text-[10px] font-mono text-gray-500 px-2.5 py-1 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:text-gray-300 transition-all"
              >
                {example}
              </button>
            ))}
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/30"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
