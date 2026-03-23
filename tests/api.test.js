const request = require('supertest');
const app = require('../index');

describe('Electricity API Endpoints', () => {

    // ---------------------------------------------------------
    // 1. API: Total electricity usage for each year
    // ---------------------------------------------------------
    describe('GET /api/usage/total-by-year', () => {
        it('Valid: should return total electricity usage as an object', async () => {
            const res = await request(app).get('/api/usage/total-by-year');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(Array.isArray(res.body)).toBe(false); 
        });

        it('Invalid: should return 404 for unsupported HTTP method (POST)', async () => {
            const res = await request(app).post('/api/usage/total-by-year');
            expect(res.statusCode).toBe(404);
        });
    });

    // ---------------------------------------------------------
    // 2. API: Total electricity users for each year
    // ---------------------------------------------------------
    describe('GET /api/users/total-by-year', () => {
        it('Valid: should return total electricity users as an object', async () => {
            const res = await request(app).get('/api/users/total-by-year');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(Array.isArray(res.body)).toBe(false);
        });

        it('Invalid: should return 404 for unsupported HTTP method (POST)', async () => {
            const res = await request(app).post('/api/users/total-by-year');
            expect(res.statusCode).toBe(404);
        });
    });

    // ---------------------------------------------------------
    // 3. API: Usage by province and year
    // ---------------------------------------------------------
    describe('GET /api/usage/:province/:year', () => {
        it('Valid: should return a 200 status for a potentially valid request', async () => {
            // Note: Replace 'Bangkok' and '2566' with known data if you want to test exact object properties
            const res = await request(app).get('/api/usage/Bangkok/2566');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('Invalid: should return a "Data not found" message for non-existent data', async () => {
            const res = await request(app).get('/api/usage/FakeProvince/9999');
            expect(res.statusCode).toBe(200); // Your API returns 200 even if data is missing
            expect(res.body.message).toBe('Data not found');
        });
    });

    // ---------------------------------------------------------
    // 4. API: Users by province and year
    // ---------------------------------------------------------
    describe('GET /api/users/:province/:year', () => {
        it('Valid: should return a 200 status for a potentially valid request', async () => {
            const res = await request(app).get('/api/users/Bangkok/2566');
            expect(res.statusCode).toBe(200);
            expect(typeof res.body).toBe('object');
        });

        it('Invalid: should return a "Data not found" message for non-existent data', async () => {
            const res = await request(app).get('/api/users/FakeProvince/9999');
            expect(res.statusCode).toBe(200); // Your API returns 200 even if data is missing
            expect(res.body.message).toBe('Data not found');
        });
    });

    // ---------------------------------------------------------
    // 5. API: Usage history for a specific province
    // ---------------------------------------------------------
    describe('GET /api/usage_history/:province', () => {
        it('Valid: should return an array of usage history', async () => {
            const res = await request(app).get('/api/usage_history/Bangkok');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('Invalid: should return an empty array for a non-existent province', async () => {
            const res = await request(app).get('/api/usage_history/FakeProvince');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]); // .filter() returns an empty array if no match
        });
    });

    // ---------------------------------------------------------
    // 6. API: User history for a specific province
    // ---------------------------------------------------------
    describe('GET /api/users_history/:province', () => {
        it('Valid: should return an array of user history', async () => {
            const res = await request(app).get('/api/users_history/Bangkok');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('Invalid: should return an empty array for a non-existent province', async () => {
            const res = await request(app).get('/api/users_history/FakeProvince');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]); 
        });
    });
});