'use client';
import { useState, useEffect, useRef } from 'react';

interface ContactFormProps {
    serviceInterest?: string;
}

interface FormField {
    id: string;
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    rows?: number;
}

const ContactForm = ({ serviceInterest }: ContactFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        serviceInterest: serviceInterest || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit form');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: '',
                serviceInterest: serviceInterest || '',
            });
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (fieldName: string) => `
        w-full px-4 py-4 bg-white dark:bg-slate-900/50 
        border-2 rounded-xl text-slate-900 dark:text-slate-100
        placeholder:text-slate-400 dark:placeholder:text-slate-600
        transition-all duration-300 ease-out
        ${focusedField === fieldName 
            ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }
        focus:outline-none focus:ring-0
    `;

    const labelClasses = (fieldName: string) => `
        absolute left-4 transition-all duration-300 pointer-events-none
        ${focusedField === fieldName || formData[fieldName as keyof typeof formData]
            ? '-top-2.5 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-950 px-2'
            : 'top-4 text-slate-500 dark:text-slate-400'
        }
    `;

    return (
        <div ref={sectionRef} className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden" id="contact">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 mb-6">
                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Get In Touch</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Let's Start Your{' '}
                        <span className="text-orange-500 dark:text-orange-400">AI Journey</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Fill out the form below and we'll get back to you within 24 hours with a custom proposal.
                    </p>
                </div>

                {/* Form Card */}
                <div className={`relative bg-white dark:bg-slate-900/50 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Success State */}
                    {submitStatus === 'success' ? (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-scale-in">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Message Sent!</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                                Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setSubmitStatus('idle')}
                                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <div className="p-8 lg:p-12">
                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-fade-in-up">
                                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-red-800 dark:text-red-200">Something went wrong</p>
                                        <p className="text-sm text-red-600 dark:text-red-300">{errorMessage || 'Please try again later.'}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div className="relative">
                                        <label htmlFor="name" className={labelClasses('name')}>Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses('name')}
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative">
                                        <label htmlFor="email" className={labelClasses('email')}>Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses('email')}
                                        />
                                    </div>
                                </div>

                                {/* Company & Phone Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Company Field */}
                                    <div className="relative">
                                        <label htmlFor="company" className={labelClasses('company')}>Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('company')}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses('company')}
                                        />
                                    </div>

                                    {/* Phone Field */}
                                    <div className="relative">
                                        <label htmlFor="phone" className={labelClasses('phone')}>Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses('phone')}
                                        />
                                    </div>
                                </div>

                                {/* Service Interest */}
                                <div className="relative">
                                    <label htmlFor="serviceInterest" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Service Interest
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="serviceInterest"
                                            name="serviceInterest"
                                            value={formData.serviceInterest}
                                            onChange={handleChange}
                                            className={`${inputClasses('serviceInterest')} appearance-none cursor-pointer`}
                                            onFocus={() => setFocusedField('serviceInterest')}
                                            onBlur={() => setFocusedField(null)}
                                        >
                                            <option value="">Select a service...</option>
                                            <option value="LLM Chatbot">LLM Chatbot Development</option>
                                            <option value="RAG Systems">RAG Systems</option>
                                            <option value="Both">Both Services</option>
                                            <option value="Other">Other / Not Sure</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`${inputClasses('message')} resize-none`}
                                        placeholder="Tell us about your project, goals, and timeline..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full py-4 px-8 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </button>
                                </div>

                                {/* Privacy Note */}
                                <p className="text-center text-sm text-slate-500 dark:text-slate-500">
                                    By submitting this form, you agree to our{' '}
                                    <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
