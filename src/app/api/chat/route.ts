import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const SYSTEM_PROMPT = `You are a friendly and helpful AI sales assistant for Anchor Systems, a company that specializes in building custom AI solutions for businesses. Your role is to help potential customers understand our services, answer their questions, and guide them toward contacting us.

## About Anchor Systems
We are based in Addis Ababa, Ethiopia, serving clients globally. We specialize in two main services:

### 1. LLM-Powered Chatbots
Custom AI assistants trained on client-specific business data (documents, FAQs, support tickets) that can:
- Handle 60-80% of support tickets autonomously
- Provide 24/7 customer support
- Reduce response times from hours to seconds
- Maintain brand voice and company policies
- Seamlessly hand off complex issues to human agents

**Features:**
- Context-aware conversations with memory
- Multi-channel deployment (web, Slack, WhatsApp, etc.)
- Smart routing to human agents when needed
- Real-time analytics dashboard
- Custom training on your business data
- Continuous learning and improvement

**Pricing:**
- Starter ($2,000 - $4,000): Simple FAQ bot, 1 integration, basic analytics
- Professional ($5,000 - $12,000): Custom training, 3+ integrations, advanced analytics, human handoff - MOST POPULAR
- Enterprise ($15,000+): Unlimited integrations, dedicated support, SLA guarantees, on-premise option

### 2. Enterprise RAG Systems (Retrieval-Augmented Generation)
RAG systems ground AI responses in your proprietary data, eliminating hallucinations and unlocking organizational knowledge:
- Connect AI to your internal documents, databases, and knowledge bases
- Get accurate, cited answers based on your actual data
- Enable employees to query vast document repositories naturally
- Maintain data security and access controls

**How RAG Works:**
1. Ingest: We process your documents, databases, and knowledge sources
2. Index: Content is chunked and embedded in a vector database
3. Retrieve: When queried, relevant context is retrieved in milliseconds
4. Generate: AI generates accurate responses grounded in your data

**Use Cases:**
- Legal: Search case law and contracts instantly
- Healthcare: Query medical literature and protocols
- Internal Knowledge: Make company wikis actually useful
- E-commerce: Power product recommendations with real data

**Pricing:**
- Proof of Concept ($3,000 - $5,000): Up to 1000 documents, basic retrieval, cloud-hosted
- Production MVP ($8,000 - $15,000): Unlimited documents, advanced retrieval, custom UI, API access - MOST POPULAR
- Enterprise ($20,000+): On-premise deployment, SSO integration, compliance features, dedicated support

## Your Guidelines
1. Be helpful, friendly, and professional
2. Focus on understanding the customer's needs before recommending solutions
3. Highlight relevant benefits and use cases
4. When discussing pricing, mention that exact costs depend on specific requirements and encourage them to get a custom quote
5. Always encourage them to fill out the contact form or scroll down to reach us for a personalized consultation
6. If asked about competitors, focus on our strengths rather than criticizing others
7. If asked technical questions you're unsure about, suggest they speak with our team for detailed answers
8. Keep responses concise but informative (2-4 sentences typically, unless more detail is needed)
9. If the user seems ready to buy or wants more information, encourage them to:
   - Fill out the contact form on the page
   - Scroll down to the "Get In Touch" section
   - Mention we respond within 24 hours

## Common Questions & Answers
Q: How long does implementation take?
A: Typically 2-6 weeks for chatbots and 4-8 weeks for RAG systems, depending on complexity and data volume.

Q: Do you offer ongoing support?
A: Yes! All our plans include initial support, and we offer ongoing maintenance and improvement packages.

Q: Can you integrate with our existing tools?
A: Absolutely. We integrate with popular platforms like Slack, Microsoft Teams, Zendesk, Intercom, Salesforce, and custom APIs.

Q: Is our data secure?
A: Security is our top priority. We use AES-256 encryption, TLS 1.3, and can deploy on-premise for maximum security. We're GDPR and CCPA compliant.

Q: What if AI gives wrong answers?
A: Our RAG systems cite sources so you can verify, and chatbots can be configured to escalate uncertain queries. We also provide monitoring dashboards.

Remember: Your goal is to be helpful, build trust, and guide interested prospects toward contacting us. Be conversational and approachable!`;

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, conversationId, sessionId } = body as {
            messages: ChatMessage[];
            conversationId?: string;
            sessionId?: string;
        };

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        if (messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array cannot be empty' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        let currentConversationId = conversationId;

        // Create or get conversation
        if (!currentConversationId) {
            const userMessage = messages[messages.length - 1];
            const title = userMessage?.content.substring(0, 100) || 'New Conversation';

            const result = await query(
                `INSERT INTO conversations (session_id, title, metadata)
                 VALUES ($1, $2, $3)
                 RETURNING id`,
                [sessionId || null, title, JSON.stringify({ user_agent: request.headers.get('user-agent') })]
            );
            currentConversationId = result.rows[0].id;
        }

        // Save user message to database
        const userMessage = messages[messages.length - 1];
        await query(
            `INSERT INTO messages (conversation_id, role, content, metadata)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [currentConversationId, userMessage.role, userMessage.content, JSON.stringify({})]
        );

        if (!apiKey) {
            // Return a helpful fallback response when no API key is configured
            const fallbackMessage = getFallbackResponse(messages[messages.length - 1]?.content || '');

            // Save fallback assistant message
            await query(
                `INSERT INTO messages (conversation_id, role, content, metadata)
                 VALUES ($1, $2, $3, $4)`,
                [currentConversationId, 'assistant', fallbackMessage, JSON.stringify({ fallback: true })]
            );

            return NextResponse.json({
                message: fallbackMessage,
                conversationId: currentConversationId,
            });
        }

        // Convert messages to Gemini format
        const geminiContents = messages.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    contents: geminiContents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    },
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('Gemini API error:', error);
            throw new Error('Failed to get response from Gemini');
        }

        const data = await response.json();
        const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!assistantMessage) {
            throw new Error('No response from Gemini');
        }

        // Save assistant message to database
        const assistantMessageResult = await query(
            `INSERT INTO messages (conversation_id, role, content, metadata)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [currentConversationId, 'assistant', assistantMessage, JSON.stringify({ model: 'gemini-2.5-flash-lite' })]
        );
        const assistantMessageId = assistantMessageResult.rows[0].id;

        // Extract and save token usage
        const usageMetadata = data.usageMetadata;
        if (usageMetadata) {
            await query(
                `INSERT INTO token_usage (conversation_id, message_id, model, prompt_tokens, completion_tokens, total_tokens, metadata)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    currentConversationId,
                    assistantMessageId,
                    'gemini-2.5-flash-lite',
                    usageMetadata.promptTokenCount || 0,
                    usageMetadata.candidatesTokenCount || 0,
                    usageMetadata.totalTokenCount || 0,
                    JSON.stringify(usageMetadata)
                ]
            );
        }

        return NextResponse.json({
            message: assistantMessage,
            conversationId: currentConversationId,
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process chat request' },
            { status: 500 }
        );
    }
}

// Fallback responses when OpenAI API key is not configured
function getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
        return "Our LLM Chatbot solutions start at $2,000-$4,000 for basic implementations, with our most popular Professional tier at $5,000-$12,000. RAG Systems start at $3,000-$5,000 for a proof of concept. For an accurate quote tailored to your needs, please fill out our contact form below and we'll get back to you within 24 hours!";
    }

    if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot')) {
        return "Our LLM-powered chatbots are trained on your specific business data to handle 60-80% of support tickets autonomously. They provide 24/7 support, reduce response times, and seamlessly hand off complex issues to human agents. Would you like to learn more about our pricing or get a custom quote?";
    }

    if (lowerMessage.includes('rag') || lowerMessage.includes('retrieval')) {
        return "Our RAG (Retrieval-Augmented Generation) systems connect AI to your internal documents and databases, providing accurate, cited answers without hallucinations. They're perfect for legal research, healthcare protocols, and internal knowledge bases. Scroll down to our contact form to discuss your specific use case!";
    }

    if (lowerMessage.includes('quote') || lowerMessage.includes('contact') || lowerMessage.includes('talk') || lowerMessage.includes('speak')) {
        return "I'd love to connect you with our team! Please scroll down to the 'Get In Touch' section and fill out the contact form. Include details about your project, and we'll get back to you within 24 hours with a personalized consultation.";
    }

    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('implementation')) {
        return "Implementation typically takes 2-6 weeks for chatbots and 4-8 weeks for RAG systems, depending on complexity and data volume. We'll provide a detailed timeline during our consultation. Ready to get started? Fill out the contact form below!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! Welcome to Anchor Systems. I'm here to help you learn about our AI solutions. We specialize in LLM-powered chatbots and enterprise RAG systems. What would you like to know more about?";
    }

    // Default response
    return "Thanks for your interest in Anchor Systems! We specialize in custom LLM chatbots and enterprise RAG systems. I'd recommend filling out our contact form below so our team can provide personalized information for your specific needs. We respond within 24 hours!";
}
