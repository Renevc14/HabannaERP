import request from 'supertest';
import server from '../index';
import path from 'path';
import fs from 'fs';

afterAll(async () => {
  await server.close();
});

describe('POST /api/files', () => {
  it('should upload a CSV file', async () => {
    const filePath = path.join(__dirname, '..', '..', 'data', 'data.csv');
    expect(fs.existsSync(filePath)).toBe(true);

    const res = await request(server)
      .post('/api/files')
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The file was uploaded successfully');
  });
});

describe('GET /api/users', () => {
  it('should search through CSV data', async () => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const res = await request(server)
      .get('/api/users?q=John');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

