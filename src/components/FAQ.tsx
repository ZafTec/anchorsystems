'use client';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-white dark:bg-twilight-950 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-50 text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="border border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50 dark:bg-twilight-900/50 overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                            <button
                                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-orange-500/20 rounded-2xl flex justify-between items-center"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-semibold text-stone-900 dark:text-stone-50 pr-4">{item.question}</span>
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 dark:bg-twilight-800 flex items-center justify-center transition-all duration-300">
                                    {openIndex === index ? (
                                        <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-stone-500 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-5 text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800">
                                    <p className="pt-4">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
