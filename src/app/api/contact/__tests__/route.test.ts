/**
 * @jest-environment node
 */
import { POST } from '../route';
import { query } from '@/lib/db';

// Mock the database query function
jest.mock('@/lib/db', () => ({
  query: jest.fn(),
}));

const mockQuery = query as jest.MockedFunction<typeof query>;

describe('Contact API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (body: Record<string, unknown>) => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    // NextRequest is compatible with Request
    return request as unknown as Request;
  };

  it('successfully submits a valid contact form', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, created_at: new Date() }],
      command: 'INSERT',
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: '+1234567890',
      message: 'I need help with AI',
      serviceInterest: 'LLM Chatbot',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Contact form submitted successfully');
    expect(data.id).toBe(1);
  });

  it('validates required fields', async () => {
    const request = createMockRequest({
      email: 'john@example.com',
      message: 'I need help',
      // missing name
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name, email, and message are required');
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const request = createMockRequest({
      name: 'John Doe',
      email: 'invalid-email',
      message: 'I need help',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid email format');
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it('handles database errors gracefully', async () => {
    mockQuery.mockRejectedValueOnce(new Error('Database connection failed'));

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I need help',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to submit contact form');
    expect(data.details).toBe('Database connection failed');
  });

  it('accepts form with only required fields', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 2, created_at: new Date() }],
      command: 'INSERT',
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const request = createMockRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      ['Jane Doe', 'jane@example.com', null, null, 'Hello', null]
    );
  });

  it('passes all fields to database query', async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 3, created_at: new Date() }],
      command: 'INSERT',
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Tech Corp',
      phone: '+1234567890',
      message: 'Looking for AI solutions',
      serviceInterest: 'RAG Systems',
    };

    const request = createMockRequest(formData);
    await POST(request);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      [
        formData.name,
        formData.email,
        formData.company,
        formData.phone,
        formData.message,
        formData.serviceInterest,
      ]
    );
  });

  it('validates various email formats', async () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
    ];

    const invalidEmails = [
      'invalid',
      '@example.com',
      'user@',
      'user@.com',
      'user @example.com',
    ];

    // Test valid emails
    for (const email of validEmails) {
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 1, created_at: new Date() }],
        command: 'INSERT',
        rowCount: 1,
        oid: 0,
        fields: [],
      });

      const request = createMockRequest({
        name: 'Test User',
        email,
        message: 'Test message',
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
    }

    // Test invalid emails
    for (const email of invalidEmails) {
      const request = createMockRequest({
        name: 'Test User',
        email,
        message: 'Test message',
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    }
  });
});
