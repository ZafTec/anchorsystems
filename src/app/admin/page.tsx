'use client';

import { useState, useEffect } from 'react';

interface Conversation {
    id: string;
    title: string;
    session_id: string;
    created_at: string;
    updated_at: string;
    message_count: number;
    user_message_count: number;
    assistant_message_count: number;
    total_tokens_used: number;
}

interface Message {
    id: string;
    conversation_id: string;
    role: string;
    content: string;
    created_at: string;
    conversation_title: string;
}

interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    message: string;
    service_interest: string | null;
    created_at: string;
}

interface TokenAnalytics {
    overall: {
        total_conversations: number;
        total_requests: number;
        total_prompt_tokens: number;
        total_completion_tokens: number;
        total_tokens: number;
        avg_tokens_per_request: number;
        model: string;
        estimated_cost: number;
        currency: string;
    }[];
    timeSeries: {
        period: string;
        model: string;
        conversation_count: number;
        request_count: number;
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    }[];
    topConversations: {
        id: string;
        title: string;
        created_at: string;
        total_tokens: number;
        prompt_tokens: number;
        completion_tokens: number;
        request_count: number;
    }[];
}

interface ConversationDetails {
    conversation: {
        id: string;
        session_id: string;
        user_id: string | null;
        title: string;
        created_at: string;
        updated_at: string;
        metadata: Record<string, unknown>;
    };
    messages: {
        id: string;
        role: string;
        content: string;
        created_at: string;
        metadata: Record<string, unknown>;
    }[];
    tokenStats: {
        request_count: number;
        total_prompt_tokens: number;
        total_completion_tokens: number;
        total_tokens: number;
    };
}

type TabId = 'overview' | 'conversations' | 'contacts' | 'analytics';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [recentMessages, setRecentMessages] = useState<Message[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [analytics, setAnalytics] = useState<TokenAnalytics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [conversationDetails, setConversationDetails] = useState<ConversationDetails | null>(null);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                loadConversations(),
                loadRecentMessages(),
                loadContacts(),
                loadAnalytics(),
            ]);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadConversations = async () => {
        try {
            const response = await fetch('/api/conversations?limit=50');
            const data = await response.json();
            setConversations(data.conversations || []);
        } catch (error) {
            console.error('Error loading conversations:', error);
        }
    };

    const loadRecentMessages = async () => {
        try {
            const response = await fetch('/api/messages?role=user&limit=50');
            const data = await response.json();
            setRecentMessages(data.messages || []);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const loadContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            setContacts(data.submissions || []);
        } catch (error) {
            console.error('Error loading contacts:', error);
        }
    };

    const loadAnalytics = async () => {
        try {
            const response = await fetch('/api/analytics/token-usage?groupBy=day');
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    };

    const loadConversationDetails = async (conversationId: string) => {
        try {
            const response = await fetch(`/api/conversations/${conversationId}`);
            const data = await response.json();
            setConversationDetails(data);
            setSelectedConversation(conversationId);
        } catch (error) {
            console.error('Error loading conversation details:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 4,
        }).format(amount);
    };

    const filteredMessages = recentMessages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Monitor chatbot conversations, contact submissions, and token usage
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-slate-200 dark:border-slate-800">
                    <nav className="flex gap-4">
                        {([
                            { id: 'overview' as const, label: 'Overview' },
                            { id: 'conversations' as const, label: 'Conversations' },
                            { id: 'contacts' as const, label: 'Contact Submissions' },
                            { id: 'analytics' as const, label: 'Token Analytics' },
                        ] as const).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                                    activeTab === tab.id
                                        ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Conversations</div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {conversations.length}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">User Questions</div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {recentMessages.length}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Contact Submissions</div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {contacts.length}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Tokens Used</div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {analytics?.overall[0]?.total_tokens?.toLocaleString() || '0'}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Est. Cost: {formatCurrency(analytics?.overall[0]?.estimated_cost || 0)}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Questions */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Recent User Questions
                                </h3>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {recentMessages.slice(0, 10).map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="border-l-4 border-teal-500 pl-4 py-2 bg-slate-50 dark:bg-slate-800 rounded"
                                        >
                                            <p className="text-sm text-slate-900 dark:text-white line-clamp-2">
                                                {msg.content}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {formatDate(msg.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Contacts */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Recent Contact Submissions
                                </h3>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {contacts.slice(0, 10).map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 dark:bg-slate-800 rounded"
                                        >
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                {contact.name} ({contact.email})
                                            </p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                                                {contact.message}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {formatDate(contact.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conversations Tab */}
                {activeTab === 'conversations' && (
                    <div className="space-y-6">
                        {/* Search */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4">
                            <input
                                type="text"
                                placeholder="Search user questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Conversations List */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    All Conversations ({conversations.length})
                                </h3>
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {conversations.map((conv) => (
                                        <div
                                            key={conv.id}
                                            onClick={() => loadConversationDetails(conv.id)}
                                            className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                                selectedConversation === conv.id
                                                    ? 'bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500'
                                                    : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">
                                                {conv.title}
                                            </p>
                                            <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                <span>{conv.message_count} messages</span>
                                                <span>{conv.total_tokens_used} tokens</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {formatDate(conv.created_at)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Conversation Details */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Conversation Details
                                </h3>
                                {conversationDetails ? (
                                    <div className="space-y-4">
                                        {/* Stats */}
                                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-slate-600 dark:text-slate-400">Messages:</span>
                                                    <span className="ml-2 font-medium text-slate-900 dark:text-white">
                                                        {conversationDetails.messages.length}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-600 dark:text-slate-400">Total Tokens:</span>
                                                    <span className="ml-2 font-medium text-slate-900 dark:text-white">
                                                        {conversationDetails.tokenStats.total_tokens}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                            {conversationDetails.messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`p-3 rounded-lg ${
                                                        msg.role === 'user'
                                                            ? 'bg-teal-50 dark:bg-teal-900/20'
                                                            : 'bg-slate-100 dark:bg-slate-800'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                                            {msg.role === 'user' ? 'User' : 'Assistant'}
                                                        </span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                                            {formatDate(msg.created_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-900 dark:text-white">
                                                        {msg.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-slate-500 dark:text-slate-400 py-12">
                                        Select a conversation to view details
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* User Questions List */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                All User Questions ({filteredMessages.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800">
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Question</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Conversation</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMessages.map((msg) => (
                                            <tr
                                                key={msg.id}
                                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <td className="py-3 px-4 text-slate-900 dark:text-white">{msg.content}</td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                                    {msg.conversation_title.substring(0, 30)}...
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                                    {formatDate(msg.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                    <div className="space-y-6">
                        {/* Search */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4">
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-800">
                                        <tr>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Name</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Email</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Company</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Service Interest</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Message</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContacts.map((contact) => (
                                            <tr
                                                key={contact.id}
                                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                                                    {contact.name}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {contact.email}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {contact.company || '-'}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {contact.service_interest || '-'}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-md truncate">
                                                    {contact.message}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs whitespace-nowrap">
                                                    {formatDate(contact.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && analytics && (
                    <div className="space-y-6">
                        {/* Overall Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {analytics.overall.map((stat) => (
                                <div key={stat.model} className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Model: {stat.model}
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Total Requests</div>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {stat.total_requests.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Total Tokens</div>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                {stat.total_tokens.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Estimated Cost</div>
                                            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                                {formatCurrency(stat.estimated_cost)}
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                                            <div className="text-xs text-slate-500 dark:text-slate-400">Avg. Tokens/Request</div>
                                            <div className="text-lg font-medium text-slate-900 dark:text-white">
                                                {Math.round(stat.avg_tokens_per_request)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Top Conversations */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                Top Conversations by Token Usage
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800">
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Title</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Requests</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Prompt Tokens</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Completion Tokens</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Total Tokens</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analytics.topConversations.map((conv) => (
                                            <tr
                                                key={conv.id}
                                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <td className="py-3 px-4 text-slate-900 dark:text-white max-w-xs truncate">
                                                    {conv.title}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {conv.request_count}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {conv.prompt_tokens.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {conv.completion_tokens.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                                                    {conv.total_tokens.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                                    {formatDate(conv.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Daily Usage */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                Daily Token Usage (Last 10 Days)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800">
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Date</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Conversations</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Requests</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Prompt Tokens</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Completion Tokens</th>
                                            <th className="text-left py-3 px-4 text-slate-600 dark:text-slate-400">Total Tokens</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analytics.timeSeries.slice(0, 10).map((day, index) => (
                                            <tr
                                                key={`${day.period}-${index}`}
                                                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            >
                                                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                                                    {day.period}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {day.conversation_count}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {day.request_count}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {parseInt(day.prompt_tokens).toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                                                    {parseInt(day.completion_tokens).toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                                                    {parseInt(day.total_tokens).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
