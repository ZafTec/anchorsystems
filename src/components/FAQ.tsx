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
        <div className="bg-white dark:bg-slate-900 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left focus:outline-none flex justify-between items-center"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-medium text-slate-900 dark:text-white">{item.question}</span>
                                <span className="ml-6 flex-shrink-0">
                                    {openIndex === index ? (
                                        <svg className="h-6 w-6 text-teal-600 dark:text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 text-slate-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-slate-600 dark:text-gray-400">
                                    <p>{item.answer}</p>
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
