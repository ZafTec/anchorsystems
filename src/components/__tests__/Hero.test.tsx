import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Intelligent AI/i)).toBeInTheDocument();
    // Use getAllByText and check that at least one matches, or be more specific
    const solutionsElements = screen.getAllByText(/Solutions/i);
    expect(solutionsElements.length).toBeGreaterThan(0);
  });

  it('renders the description text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/We build custom LLM chatbots and enterprise-grade RAG systems/i)
    ).toBeInTheDocument();
  });

  it('renders the call-to-action buttons', () => {
    render(<Hero />);
    const chatbotLink = screen.getByRole('link', { name: /Explore Chatbots/i });
    const ragLink = screen.getByRole('link', { name: /Discover RAG/i });

    expect(chatbotLink).toBeInTheDocument();
    expect(chatbotLink).toHaveAttribute('href', '/services/llm-chatbot');

    expect(ragLink).toBeInTheDocument();
    expect(ragLink).toHaveAttribute('href', '/services/rag-systems');
  });

  it('has proper styling classes', () => {
    const { container } = render(<Hero />);
    const heroDiv = container.querySelector('.relative.overflow-hidden');
    expect(heroDiv).toBeInTheDocument();
  });
});
