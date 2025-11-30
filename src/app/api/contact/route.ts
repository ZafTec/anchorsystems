import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
    console.debug('=== Contact Form API Called ===');

    try {
        const body = await request.json();
        console.debug('Request body:', body);

        const { name, email, company, phone, message, serviceInterest } = body;

        // Validate required fields
        if (!name || !email || !message) {
            console.debug('Validation failed: Missing required fields');
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.debug('Validation failed: Invalid email format');
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        console.debug('Attempting database insert...');

        // Insert into database
        const result = await query(
            `INSERT INTO contact_submissions (name, email, company, phone, message, service_interest)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
            [name, email, company || null, phone || null, message, serviceInterest || null]
        );

        console.debug('Database insert successful!', result.rows[0]);

        return NextResponse.json(
            {
                success: true,
                message: 'Contact form submitted successfully',
                id: result.rows[0].id,
                timestamp: result.rows[0].created_at,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('=== Contact Form Error ===');
        console.error('Error type:', error?.constructor?.name);
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        console.error('Full error object:', error);

        return NextResponse.json(
            {
                error: 'Failed to submit contact form',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
