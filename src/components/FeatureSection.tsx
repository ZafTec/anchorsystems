'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const features = [
    {
        name: 'LLM-Powered Chatbots',
        description: 'Custom AI assistants trained on your unique business context. Handle complex customer interactions, from FAQs to fraud detection, with 60-80% automation rates.',
        href: '/services/llm-chatbot',
        icon: (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        gradient: 'from-twilight-400 to-twilight-500',
        bgGradient: 'from-twilight-500/10 to-twilight-500/10',
        stats: { value: '60-80%', label: 'Ticket Reduction' }
    },
    {
        name: 'Enterprise RAG Systems',
        description: 'Intelligent search and knowledge retrieval pipelines. Ground AI responses in your proprietary data to eliminate hallucinations with 95% accuracy.',
        href: '/services/rag-systems',
        icon: (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        gradient: 'from-orange-400 to-apricot-500',
        bgGradient: 'from-orange-500/10 to-apricot-500/10',
        stats: { value: '95%', label: 'Answer Accuracy' }
    },
];

const FeatureSection = () => {
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
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="relative py-24 lg:py-32 bg-white dark:bg-twilight-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent" />
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-twilight-400/5 dark:bg-twilight-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-400/5 dark:bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div 
                    className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                    }`}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-twilight-50 dark:bg-twilight-900/50 border border-twilight-200 dark:border-twilight-700 mb-6">
                        <span className="text-sm font-semibold text-twilight-600 dark:text-twilight-300">
                            Our Expertise
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 mb-6">
                        Transforming Business{' '}
                        <span className="text-twilight-600 dark:text-twilight-400">
                            with AI
                        </span>
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
                        We deliver cutting-edge AI solutions tailored to your specific needs, 
                        ensuring scalability, security, and measurable business impact.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <Link
                            key={feature.name}
                            href={feature.href}
                            className={`group relative block transition-all duration-1000 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-16 rotate-1'
                            }`}
                            style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                        >
                            <div className="relative h-full p-8 lg:p-10 bg-white dark:bg-twilight-900/50 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-twilight-500/10 hover:-translate-y-2 hover:border-twilight-500/30">
                                {/* Card Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                {/* Animated Gradient Border */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-twilight-500 via-orange-500 to-twilight-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-twilight-500/25 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 mb-4 group-hover:text-twilight-600 dark:group-hover:text-twilight-400 transition-colors">
                                        {feature.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-8">
                                        {feature.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mb-8 p-4 bg-stone-50 dark:bg-twilight-950/50 rounded-2xl border border-stone-200 dark:border-stone-800">
                                        <div className={`text-3xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                            {feature.stats.value}
                                        </div>
                                        <div className="text-sm text-stone-500 dark:text-stone-400">
                                            {feature.stats.label}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-2 text-twilight-600 dark:text-twilight-400 font-semibold group-hover:gap-4 transition-all duration-300">
                                        <span>Learn more</span>
                                        <svg 
                                            className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div 
                    className={`mt-16 text-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                >
                    <p className="text-stone-600 dark:text-stone-400 mb-6">
                        Not sure which solution fits your needs?
                    </p>
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 dark:bg-twilight-900 text-stone-900 dark:text-stone-50 font-semibold rounded-xl hover:bg-apricot-100 dark:hover:bg-apricot-900/30 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Let's discuss your project
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
