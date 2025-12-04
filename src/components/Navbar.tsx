'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                            Anchor Systems
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/services/llm-chatbot" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                LLM Chatbots
                            </Link>
                            <Link href="/services/rag-systems" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                RAG Systems
                            </Link>
                            <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-slate-200 dark:bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-blue-500 dark:focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                        <Link href="/" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link href="/services/llm-chatbot" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            LLM Chatbots
                        </Link>
                        <Link href="/services/rag-systems" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            RAG Systems
                        </Link>
                        <Link href="#contact" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
