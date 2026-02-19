"use client";

import React from 'react';
import { UserProvider } from '@/contexts/UserContext';
import Sidebar from '@/components/Dasboard/Sidebar';
import Navbar from '@/components/landing/navbar/Navbar';

const NeuralOps: React.FC = () => {
    return (
        <UserProvider>
            <div className="min-h-screen flex" style={{ background: "#0a0a10" }}>
                {/* ── Navbar ─────────────────────────────────────────────────────── */}
                <Navbar />
                
                {/* ── Fixed Sidebar ─────────────────────────────────────────────── */}
                <Sidebar />

                {/* ── Main content — offset by sidebar width ─────────────────────── */}
                <div className="flex-1 relative w-full">
                    {/* Ambient glow top-right of content area */}
                    <div
                        className="fixed top-0 left-0 md:left-[185px] right-0 h-[50vh] pointer-events-none z-0"
                        style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
                    />

                    {/* Scrollable content */}
                    <div className="relative z-10 px-4 md:px-8 md:ml-[210px] pt-24 md:pt-20 pb-7 flex flex-col gap-5 mx-auto pl-40">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Neural Ops</h1>
                            <p className="text-gray-400">Advanced neural network operations and automation</p>
                        </div>

                        {/* Neural Operations Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Model Training */}
                            <div className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8m-8-8l4-4m0 0L5 9m9-4v4m0 0L5 5m9 4h-4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Model Training</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-purple-600/10 border border-purple-500/20 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-purple-300 text-sm">Current Model</span>
                                            <span className="text-white font-medium">GPT-4</span>
                                        </div>
                                        <div className="w-full bg-purple-600/20 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                                        </div>
                                        <p className="text-purple-300 text-xs mt-1">78% Trained</p>
                                    </div>
                                    <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
                                        Start Training Session
                                    </button>
                                </div>
                            </div>

                            {/* Data Processing */}
                            <div className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Data Processing</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Datasets</span>
                                        <span className="text-white font-medium">1,247</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Processing Speed</span>
                                        <span className="text-green-400 font-medium">2.3k/sec</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Accuracy</span>
                                        <span className="text-blue-400 font-medium">94.7%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Queue Size</span>
                                        <span className="text-yellow-400 font-medium">23</span>
                                    </div>
                                </div>
                            </div>

                            {/* Neural Network Status */}
                            <div className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-6 lg:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7m0 0v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Neural Network Status</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { name: "Input Layer", status: "Active", neurons: 512, utilization: 87 },
                                        { name: "Hidden Layer 1", status: "Active", neurons: 256, utilization: 92 },
                                        { name: "Hidden Layer 2", status: "Active", neurons: 128, utilization: 78 },
                                        { name: "Output Layer", status: "Active", neurons: 64, utilization: 65 }
                                    ].map((layer, index) => (
                                        <div key={index} className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-white font-medium">{layer.name}</h4>
                                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                                    layer.status === 'Active' ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                                                    'bg-gray-600/20 text-gray-400 border border-gray-500/30'
                                                }`}>
                                                    {layer.status}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 text-xs">Neurons</span>
                                                    <span className="text-white text-sm">{layer.neurons}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 text-xs">Utilization</span>
                                                    <span className="text-blue-400 text-sm">{layer.utilization}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-600/20 rounded-full h-1.5 mt-2">
                                                <div 
                                                    className="bg-blue-500 h-1.5 rounded-full" 
                                                    style={{ width: `${layer.utilization}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Automation Controls */}
                            <div className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-6 lg:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-orange-600/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-.826 2.37a1.724 1.724 0 00-2.572 1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31.826-2.37 2.37a1.724 1.724 0 00-1.065-2.572C18.375 12.817 16.75 12.817 15.325 14.343c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543-.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572C4.625 11.183 6.25 11.183 7.675 9.657c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572C15.375 19.817 13.75 19.817 12.325 21.343c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543-.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572C4.625 18.183 6.25 18.183 7.675 16.657c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Automation Controls</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197 2.132a1 1 0 001.555-.832V12a1 1 0 00-1.555-.832zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-green-400 font-medium">Auto-Deploy</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Enable automatic deployment on successful training</p>
                                    </button>
                                    <button className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-blue-400 font-medium">Auto-Scale</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Scale resources based on demand</p>
                                    </button>
                                    <button className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span className="text-purple-400 font-medium">Auto-Backup</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Automatic model backups every 6 hours</p>
                                    </button>
                                    <button className="p-4 bg-orange-600/20 border border-orange-500/30 rounded-lg hover:bg-orange-600/30 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-orange-400 font-medium">Auto-Optimize</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Optimize hyperparameters automatically</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserProvider>
    );
};

export default NeuralOps;
