import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ChatBot from '../ChatBot';

// Mock the fetch API
global.fetch = jest.fn();

// Mock scrollIntoView (not implemented in jsdom)
Element.prototype.scrollIntoView = jest.fn();

describe('ChatBot Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the floating chat button', () => {
        render(<ChatBot />);
        const chatButton = screen.getByLabelText(/open chat/i);
        expect(chatButton).toBeInTheDocument();
    });

    it('opens chat window when button is clicked', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        const chatButton = screen.getByLabelText(/open chat/i);
        await user.click(chatButton);

        expect(screen.getByRole('heading', { name: /Anchor Systems AI/i })).toBeInTheDocument();
        expect(screen.getByText(/Ask me about our AI solutions/i)).toBeInTheDocument();
    });

    it('displays welcome message on open', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        expect(screen.getByText(/I'm the Anchor Systems AI assistant/i)).toBeInTheDocument();
    });

    it('displays quick action buttons initially', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        expect(screen.getByText(/Learn about LLM Chatbots/i)).toBeInTheDocument();
        expect(screen.getByText(/Learn about RAG Systems/i)).toBeInTheDocument();
        expect(screen.getByText(/Pricing info/i)).toBeInTheDocument();
        expect(screen.getByText(/Get a quote/i)).toBeInTheDocument();
    });

    it('fills input when quick action is clicked', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const pricingButton = screen.getByText(/Pricing info/i);
        await user.click(pricingButton);

        const input = screen.getByPlaceholderText(/Type your message/i) as HTMLInputElement;
        expect(input.value).toBe('What are your pricing options?');
    });

    it('allows user to type a message', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'Hello, I need help');

        expect(input).toHaveValue('Hello, I need help');
    });

    it('sends message and displays response', async () => {
        const user = userEvent.setup();
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Hello! How can I help you today?' }),
        });

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'Hello');

        const sendButton = screen.getByLabelText(/send message/i);
        await user.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Hello')).toBeInTheDocument();
            expect(screen.getByText(/How can I help you today/i)).toBeInTheDocument();
        });
    });

    it('displays loading indicator while waiting for response', async () => {
        const user = userEvent.setup();
        (global.fetch as jest.Mock).mockImplementation(() =>
            new Promise(resolve =>
                setTimeout(() => resolve({ ok: true, json: async () => ({ message: 'Response' }) }), 100)
            )
        );

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'Test message');

        const sendButton = screen.getByLabelText(/send message/i);
        await user.click(sendButton);

        // Check for loading dots (animated bounce elements)
        const loadingDots = screen.getAllByRole('generic').filter(el =>
            el.className.includes('animate-bounce')
        );
        expect(loadingDots.length).toBeGreaterThan(0);

        await waitFor(() => {
            expect(screen.getByText('Response')).toBeInTheDocument();
        });
    });

    it('handles API error gracefully', async () => {
        const user = userEvent.setup();
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'Test message');

        const sendButton = screen.getByLabelText(/send message/i);
        await user.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/having trouble connecting/i)).toBeInTheDocument();
        });
    });

    it('disables send button when input is empty', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const sendButton = screen.getByLabelText(/send message/i);
        expect(sendButton).toBeDisabled();
    });

    it('clears input after sending message', async () => {
        const user = userEvent.setup();
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Response' }),
        });

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        const input = screen.getByPlaceholderText(/Type your message/i) as HTMLInputElement;
        await user.type(input, 'Test message');

        const sendButton = screen.getByLabelText(/send message/i);
        await user.click(sendButton);

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });

    it('closes chat window when close button is clicked', async () => {
        const user = userEvent.setup();
        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        expect(screen.getByRole('heading', { name: /Anchor Systems AI/i })).toBeInTheDocument();

        const closeButtons = screen.getAllByLabelText(/close chat/i);
        await user.click(closeButtons[0]);

        expect(screen.queryByRole('heading', { name: /Anchor Systems AI/i })).not.toBeInTheDocument();
    });

    it('maintains conversation history', async () => {
        const user = userEvent.setup();
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'First response' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Second response' }),
            });

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        // Send first message
        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'First message');
        await user.click(screen.getByLabelText(/send message/i));

        await waitFor(() => {
            expect(screen.getAllByText('First message').length).toBeGreaterThan(0);
            expect(screen.getAllByText('First response').length).toBeGreaterThan(0);
        });

        // Send second message
        await user.type(input, 'Second message');
        await user.click(screen.getByLabelText(/send message/i));

        await waitFor(() => {
            expect(screen.getAllByText('Second message').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Second response').length).toBeGreaterThan(0);
            expect(screen.getAllByText('First message').length).toBeGreaterThan(0);
        });
    });

    it('sends full conversation history to API', async () => {
        const user = userEvent.setup();
        const mockFetch = global.fetch as jest.Mock;
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'Response' }),
        });

        render(<ChatBot />);

        await user.click(screen.getByLabelText(/open chat/i));

        // Send first message
        const input = screen.getByPlaceholderText(/Type your message/i);
        await user.type(input, 'First message');
        await user.click(screen.getByLabelText(/send message/i));

        await waitFor(() => {
            expect(screen.getByText('Response')).toBeInTheDocument();
        });

        // Send second message
        await user.type(input, 'Second message');
        await user.click(screen.getByLabelText(/send message/i));

        await waitFor(() => {
            const lastCall = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
            const requestBody = JSON.parse(lastCall[1].body);
            expect(requestBody.messages.length).toBeGreaterThan(2);
        });
    });
});
