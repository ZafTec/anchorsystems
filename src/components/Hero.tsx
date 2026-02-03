'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid pattern - behind everything with low opacity */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(203,213,225)_1px,transparent_1px),linear-gradient(to_bottom,rgb(203,213,225)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] dark:bg-[linear-gradient(to_right,rgb(30,41,59)_1px,transparent_1px),linear-gradient(to_bottom,rgb(30,41,59)_1px,transparent_1px)] dark:opacity-[0.08]" />
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-300/40 dark:bg-orange-600/30 rounded-full blur-[128px] animate-blob" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-200/40 dark:bg-orange-700/30 rounded-full blur-[128px] animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-300/30 dark:bg-slate-700/20 rounded-full blur-[150px] animate-blob animation-delay-4000" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="text-center">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/50 border border-orange-300 dark:border-orange-700 shadow-lg mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ backdropFilter: 'blur(12px)' }}>
                        <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            AI Solutions for Modern Enterprises
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                        <span className="block text-slate-900 dark:text-slate-100 mb-2">
                            Intelligent AI
                        </span>
                        <span className="block bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                            Solutions
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`mt-8 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                        We build custom LLM chatbots and enterprise-grade RAG systems that transform your data into actionable intelligence with <span className="text-orange-600 dark:text-orange-400 font-semibold">95% accuracy</span>.
                    </p>

                    {/* Stats Row */}
                    <div className={`mt-12 flex flex-wrap justify-center gap-8 lg:gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                        {[
                            { value: '60-80%', label: 'Support Automation' },
                            { value: '2,000+', label: 'Users Scaled' },
                            { value: '<300ms', label: 'Response Time' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                        <Link
                            href="/services/llm-chatbot"
                            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore Chatbots
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                        
                        <Link
                            href="/services/rag-systems"
                            className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Discover RAG
                                <svg className="w-5 h-5 text-orange-500 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
        </div>
    );
};

export default Hero;
