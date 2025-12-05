-- Complete Database Schema
-- This schema includes both contact submissions and chatbot functionality

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    service_interest VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for contact_submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Conversations table to track chat sessions
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255),
    user_id VARCHAR(255),
    title TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Messages table to store all chat messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Token usage table to track API usage and costs
CREATE TABLE IF NOT EXISTS token_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);

-- Indexes for token_usage
CREATE INDEX IF NOT EXISTS idx_token_usage_conversation_id ON token_usage(conversation_id);
CREATE INDEX IF NOT EXISTS idx_token_usage_message_id ON token_usage(message_id);
CREATE INDEX IF NOT EXISTS idx_token_usage_created_at ON token_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_token_usage_model ON token_usage(model);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at on conversations
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Views for analytics

-- View for conversation statistics
CREATE OR REPLACE VIEW conversation_stats AS
SELECT
    c.id,
    c.session_id,
    c.user_id,
    c.title,
    c.created_at,
    c.updated_at,
    COUNT(m.id) as message_count,
    SUM(CASE WHEN m.role = 'user' THEN 1 ELSE 0 END) as user_message_count,
    SUM(CASE WHEN m.role = 'assistant' THEN 1 ELSE 0 END) as assistant_message_count,
    COALESCE(SUM(tu.total_tokens), 0) as total_tokens_used,
    COALESCE(SUM(tu.prompt_tokens), 0) as total_prompt_tokens,
    COALESCE(SUM(tu.completion_tokens), 0) as total_completion_tokens
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id
LEFT JOIN token_usage tu ON c.id = tu.conversation_id
GROUP BY c.id, c.session_id, c.user_id, c.title, c.created_at, c.updated_at;

-- View for daily token usage statistics
CREATE OR REPLACE VIEW daily_token_usage AS
SELECT
    DATE(tu.created_at) as usage_date,
    tu.model,
    COUNT(DISTINCT tu.conversation_id) as conversation_count,
    COUNT(tu.id) as request_count,
    SUM(tu.prompt_tokens) as total_prompt_tokens,
    SUM(tu.completion_tokens) as total_completion_tokens,
    SUM(tu.total_tokens) as total_tokens
FROM token_usage tu
GROUP BY DATE(tu.created_at), tu.model
ORDER BY usage_date DESC, tu.model;

-- Comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';
COMMENT ON TABLE conversations IS 'Stores chat conversation sessions with user or session identification';
COMMENT ON TABLE messages IS 'Stores individual messages within conversations';
COMMENT ON TABLE token_usage IS 'Tracks token usage and API costs for each conversation';
COMMENT ON VIEW conversation_stats IS 'Provides aggregated statistics for each conversation';
COMMENT ON VIEW daily_token_usage IS 'Provides daily token usage statistics by model';
