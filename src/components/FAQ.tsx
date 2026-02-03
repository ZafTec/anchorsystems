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
        <div className="bg-white dark:bg-slate-950 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                            <button
                                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-orange-500/20 rounded-2xl flex justify-between items-center"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-semibold text-slate-900 dark:text-slate-50 pr-4">{item.question}</span>
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-all duration-300">
                                    {openIndex === index ? (
                                        <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                                    <p className="pt-4">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
