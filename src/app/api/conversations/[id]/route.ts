import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/conversations/[id] - Get a specific conversation with all messages
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const conversationId = params.id;

        // Get conversation details
        const conversationResult = await query(
            `SELECT id, session_id, user_id, title, created_at, updated_at, metadata
             FROM conversations
             WHERE id = $1`,
            [conversationId]
        );

        if (conversationResult.rows.length === 0) {
            return NextResponse.json(
                { error: 'Conversation not found' },
                { status: 404 }
            );
        }

        // Get all messages for this conversation
        const messagesResult = await query(
            `SELECT id, role, content, created_at, metadata
             FROM messages
             WHERE conversation_id = $1
             ORDER BY created_at ASC`,
            [conversationId]
        );

        // Get token usage stats for this conversation
        const tokenStatsResult = await query(
            `SELECT
                COUNT(*) as request_count,
                SUM(prompt_tokens) as total_prompt_tokens,
                SUM(completion_tokens) as total_completion_tokens,
                SUM(total_tokens) as total_tokens
             FROM token_usage
             WHERE conversation_id = $1`,
            [conversationId]
        );

        return NextResponse.json({
            conversation: conversationResult.rows[0],
            messages: messagesResult.rows,
            tokenStats: tokenStatsResult.rows[0],
        });
    } catch (error) {
        console.error('Error fetching conversation:', error);
        return NextResponse.json(
            { error: 'Failed to fetch conversation' },
            { status: 500 }
        );
    }
}

// DELETE /api/conversations/[id] - Delete a conversation
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const conversationId = params.id;

        // Delete conversation (messages and token_usage will cascade)
        const result = await query(
            `DELETE FROM conversations WHERE id = $1 RETURNING id`,
            [conversationId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Conversation not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        return NextResponse.json(
            { error: 'Failed to delete conversation' },
            { status: 500 }
        );
    }
}
