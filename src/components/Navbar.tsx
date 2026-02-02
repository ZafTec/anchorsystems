'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services/llm-chatbot', label: 'LLM Chatbots' },
        { href: '/services/rag-systems', label: 'RAG Systems' },
    ];

    return (
        <nav 
            className={`fixed w-full z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'glass dark:glass-dark shadow-lg border-b border-twilight-200 dark:border-twilight-800' 
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="group relative flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-lg gradient-accent flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-twilight-900 dark:text-stone-50">
                                Anchor Systems
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-twilight-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 gradient-accent group-hover:w-1/2 transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link 
                            href="#contact" 
                            className="relative overflow-hidden px-6 py-2.5 gradient-accent hover:gradient-warm text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="relative p-2 rounded-xl text-twilight-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-twilight-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="relative w-6 h-6">
                                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'top-3 rotate-45' : 'top-1'}`} />
                                <span className={`absolute left-0 top-3 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                <div className="mx-4 mt-2 glass dark:glass-dark rounded-2xl border border-twilight-200 dark:border-twilight-800 shadow-2xl overflow-hidden">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-4 py-3 text-base font-medium text-twilight-700 dark:text-stone-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-twilight-200 dark:border-twilight-800">
                            <Link 
                                href="#contact" 
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-full px-4 py-3 gradient-accent text-white font-semibold rounded-xl hover:gradient-warm transition-all duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
