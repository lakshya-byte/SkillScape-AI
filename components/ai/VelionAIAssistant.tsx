"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import VelionAvatar, { type AvatarState } from "./VelionAvatar";
import { streamAgentChat } from "@/lib/authApi";

// ─── Types ──────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Simple Markdown-ish renderer ──────────────────────────────
function renderContent(text: string) {
  // Convert **bold** and `code` and newlines
  const html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-white/10 px-1.5 py-0.5 rounded text-purple-300 text-[11px] font-mono">$1</code>',
    )
    .replace(/\n/g, "<br/>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Component ──────────────────────────────────────────────────
export default function VelionAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Avatar state logic
  useEffect(() => {
    if (isStreaming) return; // controlled by sendMessage
    if (input.length > 0) {
      setAvatarState("listening");
    } else {
      setAvatarState("idle");
    }
  }, [input, isStreaming]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    setAvatarState("thinking");

    // Create placeholder for assistant
    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      let firstToken = true;
      const stream = streamAgentChat(text, conversationId);

      for await (const event of stream) {
        if (event.type === "token") {
          if (firstToken) {
            setAvatarState("speaking");
            firstToken = false;
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + event.content }
                : m,
            ),
          );
        } else if (event.type === "done" && event.conversationId) {
          setConversationId(event.conversationId);
        } else if (event.type === "error") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: event.content || "Something went wrong." }
                : m,
            ),
          );
        }
      }
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Failed to connect. Please check your login status and try again.",
              }
            : m,
        ),
      );
    } finally {
      setIsStreaming(false);
      setAvatarState("idle");
    }
  }, [input, isStreaming, conversationId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationId(undefined);
    setAvatarState("idle");
  };

  return (
    <>
      {/* ─── Floating Action Button ──────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#0A0A0F] border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:border-purple-500/50 transition-all duration-300 group"
          >
            <VelionAvatar state="idle" size={44} />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] flex flex-col bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Top Glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <VelionAvatar state={avatarState} size={36} />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    VelionAI
                    <Sparkles size={12} className="text-purple-400" />
                  </h3>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                    {avatarState === "thinking"
                      ? "Processing..."
                      : avatarState === "speaking"
                        ? "Responding"
                        : "Intelligence Assistant"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                  title="New conversation"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Messages ───────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <VelionAvatar state="idle" size={64} />
                  <h4 className="text-sm font-bold text-white mt-5 mb-2">
                    VelionAI Assistant
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Ask me about your skills, projects, GitHub insights, or
                    anything about the platform.
                  </p>
                  {/* Quick prompts */}
                  <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    {[
                      "Analyze my skills",
                      "What are my top repos?",
                      "Help me improve",
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setInput(prompt);
                          setTimeout(() => sendMessage(), 50);
                        }}
                        className="text-[10px] px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600/30 border border-purple-500/20 rounded-[18px] rounded-br-md text-white"
                        : "bg-white/[0.04] border border-white/5 rounded-[18px] rounded-bl-md text-slate-300"
                    }`}
                  >
                    {msg.content ? (
                      renderContent(msg.content)
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <span
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ──────────────────────────────────────────── */}
            <div className="px-4 py-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 focus-within:border-purple-500/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask VelionAI..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isStreaming ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              <p className="text-[8px] text-slate-600 text-center mt-2 font-mono">
                VELIONAI INTELLIGENCE v2.0 — SECURED NEURAL LINK
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
