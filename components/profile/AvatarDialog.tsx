"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { updateAvatar } from "@/lib/authApi";

const AVATARS = [
  "crystal-cluster",
  "cyber-bust",
  "flux-matrix",
  "glass-orb",
  "golden-spiral",
  "liquid-metal",
  "neon-cube",
  "obsidian-poly",
  "torus-ring",
  "fallback",
];

interface AvatarDialogProps {
  isOpen: boolean;
  currentAvatar: string;
  onClose: () => void;
  onAvatarUpdated: (newAvatar: string) => void;
}

export default function AvatarDialog({
  isOpen,
  currentAvatar,
  onClose,
  onAvatarUpdated,
}: AvatarDialogProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const avatarPath = `/avatars/${selected}.png`;
      await updateAvatar(avatarPath);
      onAvatarUpdated(avatarPath);
      onClose();
    } catch (err) {
      console.error("Failed to update avatar:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-[#0A0A0F]/95 border border-white/10 rounded-[28px] p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Choose Your Avatar
                </h2>
                <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                  IDENTITY_VISUAL_PROTOCOL
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {AVATARS.map((name) => {
                const path = `/avatars/${name}.png`;
                const isSelected = selected === name;
                const isCurrent = currentAvatar === path;

                return (
                  <motion.button
                    key={name}
                    onClick={() => setSelected(name)}
                    className={`
                      relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300
                      ${
                        isSelected
                          ? "border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                          : isCurrent
                            ? "border-indigo-500/40"
                            : "border-white/5 hover:border-white/20"
                      }
                    `}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={path}
                      alt={name}
                      className="w-full h-full object-cover"
                    />

                    {/* Selected checkmark */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 bg-purple-500/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                          <Check size={14} className="text-white" />
                        </div>
                      </motion.div>
                    )}

                    {/* Current indicator */}
                    {isCurrent && !isSelected && (
                      <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-indigo-500 border border-[#0A0A0F]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                disabled={!selected || saving}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  selected
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                    : "bg-white/5 text-slate-600 cursor-not-allowed"
                }`}
                whileTap={selected ? { scale: 0.95 } : {}}
              >
                {saving ? "Saving..." : "Apply Avatar"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
