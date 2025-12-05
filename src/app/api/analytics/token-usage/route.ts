import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/analytics/token-usage - Get token usage analytics
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const groupBy = searchParams.get('groupBy') || 'day'; // day, week, month
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const model = searchParams.get('model');

        // Overall statistics
        let overallQuery = `
            SELECT
                COUNT(DISTINCT conversation_id) as total_conversations,
                COUNT(*) as total_requests,
                SUM(prompt_tokens) as total_prompt_tokens,
                SUM(completion_tokens) as total_completion_tokens,
                SUM(total_tokens) as total_tokens,
                AVG(total_tokens) as avg_tokens_per_request,
                model
            FROM token_usage
            WHERE 1=1
        `;

        const overallParams: (string | number)[] = [];
        let paramIndex = 1;

        if (startDate) {
            overallQuery += ` AND created_at >= $${paramIndex++}`;
            overallParams.push(startDate);
        }

        if (endDate) {
            overallQuery += ` AND created_at <= $${paramIndex++}`;
            overallParams.push(endDate);
        }

        if (model) {
            overallQuery += ` AND model = $${paramIndex++}`;
            overallParams.push(model);
        }

        overallQuery += ` GROUP BY model`;

        const overallResult = await query(overallQuery, overallParams);

        // Time-series data
        let dateFormat;
        switch (groupBy) {
            case 'week':
                dateFormat = 'YYYY-IW'; // ISO week
                break;
            case 'month':
                dateFormat = 'YYYY-MM';
                break;
            case 'day':
            default:
                dateFormat = 'YYYY-MM-DD';
                break;
        }

        let timeSeriesQuery = `
            SELECT
                TO_CHAR(created_at, $1) as period,
                model,
                COUNT(DISTINCT conversation_id) as conversation_count,
                COUNT(*) as request_count,
                SUM(prompt_tokens) as prompt_tokens,
                SUM(completion_tokens) as completion_tokens,
                SUM(total_tokens) as total_tokens
            FROM token_usage
            WHERE 1=1
        `;

        const timeSeriesParams: (string | number)[] = [dateFormat];
        paramIndex = 2;

        if (startDate) {
            timeSeriesQuery += ` AND created_at >= $${paramIndex++}`;
            timeSeriesParams.push(startDate);
        }

        if (endDate) {
            timeSeriesQuery += ` AND created_at <= $${paramIndex++}`;
            timeSeriesParams.push(endDate);
        }

        if (model) {
            timeSeriesQuery += ` AND model = $${paramIndex++}`;
            timeSeriesParams.push(model);
        }

        timeSeriesQuery += `
            GROUP BY period, model
            ORDER BY period DESC, model
        `;

        const timeSeriesResult = await query(timeSeriesQuery, timeSeriesParams);

        // Top conversations by token usage
        const topConversationsQuery = `
            SELECT
                c.id,
                c.title,
                c.created_at,
                SUM(tu.total_tokens) as total_tokens,
                SUM(tu.prompt_tokens) as prompt_tokens,
                SUM(tu.completion_tokens) as completion_tokens,
                COUNT(tu.id) as request_count
            FROM token_usage tu
            JOIN conversations c ON tu.conversation_id = c.id
            ${startDate ? 'WHERE tu.created_at >= $1' : ''}
            ${startDate && endDate ? 'AND tu.created_at <= $2' : endDate ? 'WHERE tu.created_at <= $1' : ''}
            GROUP BY c.id, c.title, c.created_at
            ORDER BY total_tokens DESC
            LIMIT 10
        `;

        const topConvParams: string[] = [];
        if (startDate) topConvParams.push(startDate);
        if (endDate) topConvParams.push(endDate);

        const topConversationsResult = await query(topConversationsQuery, topConvParams);

        // Calculate estimated costs (example pricing - adjust based on actual model pricing)
        const modelPricing: Record<string, { input: number; output: number }> = {
            'gemini-2.5-flash-lite': { input: 0.0000005, output: 0.0000015 }, // $0.50 per 1M input, $1.50 per 1M output tokens
        };

        const overallWithCosts = overallResult.rows.map((row) => {
            const pricing = modelPricing[row.model] || { input: 0, output: 0 };
            const estimatedCost =
                (parseInt(row.total_prompt_tokens) || 0) * pricing.input +
                (parseInt(row.total_completion_tokens) || 0) * pricing.output;

            return {
                ...row,
                estimated_cost: estimatedCost,
                currency: 'USD',
            };
        });

        return NextResponse.json({
            overall: overallWithCosts,
            timeSeries: timeSeriesResult.rows,
            topConversations: topConversationsResult.rows,
            modelPricing,
        });
    } catch (error) {
        console.error('Error fetching token usage analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
