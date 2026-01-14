const request = require('supertest');
const app = require('../app');

describe('Entries API', () => {
  test('POST /entries creates entry', async () => {
    const res = await request(app)
      .post('/entries')
      .send({
        mood_value: 'happy',
        mood_score: 2,
        entry_text: 'Feeling good'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.mood_value).toBe('happy');
  });

  test('GET /entries returns entries', async () => {
    const res = await request(app).get('/entries');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
