import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/messages - Get recent messages across all conversations
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = parseInt(searchParams.get('offset') || '0');
        const conversationId = searchParams.get('conversationId');
        const role = searchParams.get('role'); // 'user' or 'assistant'
        const search = searchParams.get('search'); // Search in message content

        let queryText = `
            SELECT
                m.id,
                m.conversation_id,
                m.role,
                m.content,
                m.created_at,
                m.metadata,
                c.title as conversation_title,
                c.session_id
            FROM messages m
            JOIN conversations c ON m.conversation_id = c.id
            WHERE 1=1
        `;

        const params: (string | number)[] = [];
        let paramIndex = 1;

        if (conversationId) {
            queryText += ` AND m.conversation_id = $${paramIndex++}`;
            params.push(conversationId);
        }

        if (role) {
            queryText += ` AND m.role = $${paramIndex++}`;
            params.push(role);
        }

        if (search) {
            queryText += ` AND m.content ILIKE $${paramIndex++}`;
            params.push(`%${search}%`);
        }

        queryText += `
            ORDER BY m.created_at DESC
            LIMIT $${paramIndex++} OFFSET $${paramIndex++}
        `;
        params.push(limit, offset);

        const result = await query(queryText, params);

        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM messages m WHERE 1=1`;
        const countParams: (string | number)[] = [];
        let countIndex = 1;

        if (conversationId) {
            countQuery += ` AND m.conversation_id = $${countIndex++}`;
            countParams.push(conversationId);
        }

        if (role) {
            countQuery += ` AND m.role = $${countIndex++}`;
            countParams.push(role);
        }

        if (search) {
            countQuery += ` AND m.content ILIKE $${countIndex++}`;
            countParams.push(`%${search}%`);
        }

        const countResult = await query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].total);

        return NextResponse.json({
            messages: result.rows,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total,
            },
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
