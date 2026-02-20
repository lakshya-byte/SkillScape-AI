"use client";

import React, { useRef, useState, useCallback } from "react";
import {
    Upload,
    FileText,
    FileIcon,
    X,
    Loader2,
    Sparkles,
} from "lucide-react";

interface ResumeUploadProps {
    onAnalyze: (file: File) => void;
    isAnalyzing: boolean;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
    onAnalyze,
    isAnalyzing,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ACCEPTED = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

    const validateFile = useCallback(
        (f: File): boolean => {
            setError(null);
            if (!ACCEPTED.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
                setError("Only PDF and DOCX files are supported.");
                return false;
            }
            if (f.size > MAX_SIZE) {
                setError("File size must be under 10 MB.");
                return false;
            }
            return true;
        },
        [],
    );

    const handleFileChange = (f: File) => {
        if (validateFile(f)) {
            setFile(f);
            setError(null);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            const droppedFile = e.dataTransfer.files?.[0];
            if (droppedFile) handleFileChange(droppedFile);
        },
        [validateFile],
    );

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        if (e.type === "dragleave") setDragActive(false);
    }, []);

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIcon = (name: string) => {
        if (name.endsWith(".pdf"))
            return <FileText className="w-8 h-8 text-red-400" />;
        return <FileIcon className="w-8 h-8 text-blue-400" />;
    };

    return (
        <div className="space-y-5">
            {/* ── Drop Zone ──────────────────────────────────────────────── */}
            <div
                onDrop={handleDrop}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onClick={() => !isAnalyzing && inputRef.current?.click()}
                className={`relative group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${dragActive
                        ? "border-purple-500 bg-purple-500/10 scale-[1.01]"
                        : file
                            ? "border-emerald-500/40 bg-emerald-500/5"
                            : "border-white/10 bg-white/[0.02] hover:border-purple-500/40 hover:bg-purple-500/5"
                    } ${isAnalyzing ? "pointer-events-none opacity-60" : ""}`}
            >
                {/* Background glow */}
                <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${dragActive ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 70%)",
                    }}
                />

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileChange(f);
                    }}
                />

                {!file ? (
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${dragActive
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "bg-white/5 text-gray-500 group-hover:text-purple-400 group-hover:bg-purple-500/10"
                                }`}
                        >
                            <Upload className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white mb-1">
                                {dragActive ? "Drop your resume here" : "Upload Your Resume"}
                            </p>
                            <p className="text-xs text-gray-500">
                                Drag and drop or{" "}
                                <span className="text-purple-400 font-medium">browse</span> •
                                PDF or DOCX • Max 10 MB
                            </p>
                        </div>
                    </div>
                ) : (
                    /* ── Selected File Preview ─────────────────────────────── */
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            {getFileIcon(file.name)}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {formatSize(file.size)} •{" "}
                                {file.name.endsWith(".pdf") ? "PDF" : "DOCX"}
                            </p>
                        </div>
                        {!isAnalyzing && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFile(null);
                                    setError(null);
                                }}
                                className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── Error ──────────────────────────────────────────────────── */}
            {error && (
                <p className="text-xs text-red-400 font-medium px-1">{error}</p>
            )}

            {/* ── Analyze Button ───────────────────────────────────────── */}
            <button
                disabled={!file || isAnalyzing}
                onClick={() => file && onAnalyze(file)}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-3 transition-all duration-300 ${file && !isAnalyzing
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.5)] cursor-pointer"
                        : "bg-white/5 text-gray-600 cursor-not-allowed"
                    }`}
            >
                {isAnalyzing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="animate-pulse">Analyzing Resume Intelligence...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        <span>Analyze Resume</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default ResumeUpload;
