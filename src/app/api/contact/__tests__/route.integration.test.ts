/**
 * @jest-environment node
 */

/**
 * Integration tests with real PostgreSQL database
 * These tests require DATABASE_URL to be set
 */
import { POST } from '../route';
import { query } from '@/lib/db';

// Only run these tests if DATABASE_URL is set
const runIntegrationTests = process.env.DATABASE_URL !== undefined;

describe('Contact API Route - Integration Tests', () => {
  if (!runIntegrationTests) {
    it.skip('Skipping integration tests - DATABASE_URL not set', () => {});
    return;
  }

  beforeAll(async () => {
    // Ensure test table exists
    try {
      await query(`
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
      `);
    } catch (error) {
      console.error('Failed to create test table:', error);
      throw error;
    }
  });

  afterEach(async () => {
    // Clean up test data after each test
    try {
      await query('DELETE FROM contact_submissions WHERE email LIKE \'%@test-integration.com\'');
    } catch (error) {
      console.error('Failed to clean up test data:', error);
    }
  });

  afterAll(async () => {
    // Final cleanup
    try {
      await query('DELETE FROM contact_submissions WHERE email LIKE \'%@test-integration.com\'');
    } catch (error) {
      console.error('Failed final cleanup:', error);
    }
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

  it('should insert a contact submission into the real database', async () => {
    const formData = {
      name: 'Integration Test User',
      email: 'integration@test-integration.com',
      company: 'Test Corp',
      phone: '+1234567890',
      message: 'This is an integration test',
      serviceInterest: 'LLM Chatbot',
    };

    const request = createMockRequest(formData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.id).toBeDefined();
    expect(data.timestamp).toBeDefined();

    // Verify the data was actually inserted
    const result = await query(
      'SELECT * FROM contact_submissions WHERE email = $1',
      [formData.email]
    );

    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].name).toBe(formData.name);
    expect(result.rows[0].email).toBe(formData.email);
    expect(result.rows[0].company).toBe(formData.company);
    expect(result.rows[0].message).toBe(formData.message);
  });

  it('should handle database constraints correctly', async () => {
    const invalidData = {
      name: 'Test User',
      email: 'invalid@test-integration.com',
      // missing required 'message' field - but API validates before DB
      message: '',
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);

    // Should fail validation before hitting the database
    expect(response.status).toBe(400);
  });

  it('should store multiple submissions correctly', async () => {
    const submissions = [
      {
        name: 'User One',
        email: 'user1@test-integration.com',
        message: 'First message',
      },
      {
        name: 'User Two',
        email: 'user2@test-integration.com',
        message: 'Second message',
      },
    ];

    for (const formData of submissions) {
      const request = createMockRequest(formData);
      const response = await POST(request);
      expect(response.status).toBe(201);
    }

    // Verify both were inserted
    const result = await query(
      'SELECT * FROM contact_submissions WHERE email IN ($1, $2) ORDER BY email',
      ['user1@test-integration.com', 'user2@test-integration.com']
    );

    expect(result.rows).toHaveLength(2);
    expect(result.rows[0].name).toBe('User One');
    expect(result.rows[1].name).toBe('User Two');
  });

  it('should handle optional fields correctly in database', async () => {
    const minimalData = {
      name: 'Minimal User',
      email: 'minimal@test-integration.com',
      message: 'Just the required fields',
    };

    const request = createMockRequest(minimalData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);

    // Verify null values were stored correctly
    const result = await query(
      'SELECT * FROM contact_submissions WHERE id = $1',
      [data.id]
    );

    expect(result.rows[0].company).toBeNull();
    expect(result.rows[0].phone).toBeNull();
    expect(result.rows[0].service_interest).toBeNull();
  });

  it('should generate sequential IDs', async () => {
    const formData1 = {
      name: 'Test User 1',
      email: 'seq1@test-integration.com',
      message: 'First',
    };

    const formData2 = {
      name: 'Test User 2',
      email: 'seq2@test-integration.com',
      message: 'Second',
    };

    const request1 = createMockRequest(formData1);
    const response1 = await POST(request1);
    const data1 = await response1.json();

    const request2 = createMockRequest(formData2);
    const response2 = await POST(request2);
    const data2 = await response2.json();

    expect(data2.id).toBeGreaterThan(data1.id);
  });
});
