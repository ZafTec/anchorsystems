import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/conversations - Get all conversations with stats
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        let queryText = `
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
                COALESCE(SUM(tu.total_tokens), 0) as total_tokens_used
            FROM conversations c
            LEFT JOIN messages m ON c.id = m.conversation_id
            LEFT JOIN token_usage tu ON c.id = tu.conversation_id
        `;

        const params: (string | number)[] = [];
        if (sessionId) {
            queryText += ` WHERE c.session_id = $1`;
            params.push(sessionId);
        }

        queryText += `
            GROUP BY c.id, c.session_id, c.user_id, c.title, c.created_at, c.updated_at
            ORDER BY c.updated_at DESC
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}
        `;
        params.push(limit, offset);

        const result = await query(queryText, params);

        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM conversations`;
        const countParams: (string | number)[] = [];
        if (sessionId) {
            countQuery += ` WHERE session_id = $1`;
            countParams.push(sessionId);
        }

        const countResult = await query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].total);

        return NextResponse.json({
            conversations: result.rows,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total,
            },
        });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch conversations' },
            { status: 500 }
        );
    }
}
