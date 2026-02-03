'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
}

interface PricingTableProps {
    tiers: PricingTier[];
}

const PricingTable = ({ tiers }: PricingTableProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 mb-6">
                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Pricing</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Simple, Transparent{' '}
                        <span className="text-amber-500 dark:text-amber-400">Pricing</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Choose the plan that fits your business needs. All plans include dedicated support.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <div
                            key={tier.name}
                            className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                        >
                            {/* Popular Badge */}
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg shadow-amber-500/30">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className={`relative h-full p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl ${
                                tier.highlighted
                                    ? 'bg-white dark:bg-slate-900/50 border-2 border-amber-500 shadow-xl shadow-amber-500/10 scale-105'
                                    : 'bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-amber-500/30 hover:shadow-xl hover:-translate-y-2'
                            }`}>
                                {/* Background Glow */}
                                {tier.highlighted && (
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                                )}

                                <div className="relative">
                                    {/* Plan Name */}
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                        {tier.name}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                                        {tier.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-8">
                                        <span className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
                                            {tier.price}
                                        </span>
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href="#contact"
                                        className={`group/btn relative block w-full py-3.5 px-6 rounded-xl font-semibold text-center transition-all duration-300 overflow-hidden mb-8 ${
                                            tier.highlighted
                                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300'
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {tier.cta}
                                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                        {tier.highlighted && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                        )}
                                    </Link>

                                    {/* Features */}
                                    <div className="space-y-4">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                            What's included
                                        </p>
                                        <ul className="space-y-3">
                                            {tier.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3">
                                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                                                        tier.highlighted
                                                            ? 'bg-amber-100 dark:bg-amber-500/20'
                                                            : 'bg-slate-100 dark:bg-slate-800'
                                                    }`}>
                                                        <svg className={`w-3.5 h-3.5 ${tier.highlighted ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Need a custom solution? Contact us for enterprise pricing.
                    </p>
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:gap-3 transition-all duration-300"
                    >
                        Contact Sales
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PricingTable;
