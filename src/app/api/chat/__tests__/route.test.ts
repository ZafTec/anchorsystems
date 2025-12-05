/**
 * @jest-environment node
 */
import { POST } from '../route';
import { query } from '@/lib/db';

// Mock fetch for Gemini API calls
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('Chat API Route', () => {
    const originalEnv = process.env;

    beforeEach(async () => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };

        // Clean up test data from database before each test
        try {
            await query('DELETE FROM conversations WHERE session_id LIKE $1', ['test-session-%']);
        } catch {
            // Ignore errors if tables don't exist yet
        }
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    afterAll(async () => {
        // Clean up all test data
        try {
            await query('DELETE FROM conversations WHERE session_id LIKE $1', ['test-session-%']);
        } catch {
            // Ignore cleanup errors
        }
    });

    const createMockRequest = (body: Record<string, unknown>) => {
        const request = new Request('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return request as unknown as Request;
    };

    describe('With Gemini API Key', () => {
        beforeEach(() => {
            process.env.GEMINI_API_KEY = 'test-api-key-123';
        });

        it('successfully processes a chat message', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [
                        {
                            content: {
                                parts: [
                                    {
                                        text: 'Hello! How can I help you today?',
                                    },
                                ],
                            },
                        },
                    ],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [
                    { role: 'user', content: 'Tell me about your services' },
                ],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toBe('Hello! How can I help you today?');
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('generativelanguage.googleapis.com'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            );
        });

        it('validates messages array is required', async () => {
            const request = createMockRequest({});

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Messages array is required');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('validates messages is an array', async () => {
            const request = createMockRequest({
                messages: 'not an array',
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Messages array is required');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('converts messages to Gemini format correctly', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [
                        {
                            content: {
                                parts: [{ text: 'Response' }],
                            },
                        },
                    ],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [
                    { role: 'user', content: 'Hello' },
                    { role: 'assistant', content: 'Hi there!' },
                    { role: 'user', content: 'Tell me more' },
                ],
            });

            await POST(request);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: expect.stringContaining('"role":"user"'),
                })
            );

            const callBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
            expect(callBody.contents).toEqual([
                { role: 'user', parts: [{ text: 'Hello' }] },
                { role: 'model', parts: [{ text: 'Hi there!' }] },
                { role: 'user', parts: [{ text: 'Tell me more' }] },
            ]);
        });

        it('includes system instruction in API call', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [
                        {
                            content: {
                                parts: [{ text: 'Response' }],
                            },
                        },
                    ],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello' }],
            });

            await POST(request);

            const callBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
            expect(callBody.systemInstruction).toBeDefined();
            expect(callBody.systemInstruction.parts[0].text).toContain('Anchor Systems');
        });

        it('handles Gemini API errors gracefully', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({
                    error: {
                        code: 400,
                        message: 'Invalid API key',
                    },
                }),
            } as Response);

            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to process chat request');
        });

        it('handles network errors gracefully', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to process chat request');
        });

        it('handles missing response from Gemini', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to process chat request');
        });

        it('sets correct generation config', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [
                        {
                            content: {
                                parts: [{ text: 'Response' }],
                            },
                        },
                    ],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello' }],
            });

            await POST(request);

            const callBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
            expect(callBody.generationConfig).toEqual({
                temperature: 0.7,
                maxOutputTokens: 500,
            });
        });
    });

    describe('Without Gemini API Key (Fallback Mode)', () => {
        beforeEach(() => {
            delete process.env.GEMINI_API_KEY;
        });

        it('returns fallback response for pricing questions', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'What are your pricing options?' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('$2,000-$4,000');
            expect(data.message).toContain('$5,000-$12,000');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns fallback response for chatbot questions', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Tell me about your chatbot solutions' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('LLM-powered chatbots');
            expect(data.message).toContain('60-80%');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns fallback response for RAG questions', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'What is RAG?' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('RAG');
            expect(data.message).toContain('Retrieval-Augmented Generation');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns fallback response for contact requests', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'I want to get a quote' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('contact form');
            expect(data.message).toContain('24 hours');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns fallback response for timeline questions', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'How long does implementation take?' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('2-6 weeks');
            expect(data.message).toContain('4-8 weeks');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns fallback response for greetings', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Hello!' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('Welcome to Anchor Systems');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('returns default fallback for other questions', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'Random question' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('Anchor Systems');
            expect(data.message).toContain('contact form');
            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('handles case-insensitive keyword matching', async () => {
            const request = createMockRequest({
                messages: [{ role: 'user', content: 'PRICING INFO PLEASE' }],
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.message).toContain('$2,000-$4,000');
            expect(mockFetch).not.toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty messages array', async () => {
            process.env.GEMINI_API_KEY = 'test-key';
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    candidates: [
                        {
                            content: {
                                parts: [{ text: 'Response' }],
                            },
                        },
                    ],
                }),
            } as Response);

            const request = createMockRequest({
                messages: [],
            });

            const response = await POST(request);
            expect(response.status).toBeLessThan(500);
        });

        it('handles malformed JSON', async () => {
            const request = new Request('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: 'invalid json',
            }) as unknown as Request;

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Failed to process chat request');
        });
    });
});
