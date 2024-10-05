import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../app';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

// Increase the timeout for the test to 30 seconds
jest.setTimeout(30000);

// Mock user data
const mockUser = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test.user2@metropolia.fi',
    // random phone number
    phone: '0987654321',
    balance: 1000,
    password: bcrypt.hashSync('12345678', parseInt(process.env.SALT_ROUNDS)),
    role: 'user',
    photo_url: '',
    is_verified: true,
    status: 'active',
};

let appServer;
let refreshToken;

beforeAll(async () => {
    appServer = app.listen(process.env.APP_TEST_PORT);

    // Insert the mock user into the database
    await User.create(mockUser);

    // Simulate login to get access token
    const res = await request(appServer).post('/api/auth/login').send({
        email: mockUser.email,
        password: '12345678',
    });

    // Get the access token
    // 0: Is the refreshToken, 1: Is the accessToken
    refreshToken = res.headers['set-cookie'][0];
});

afterAll(async () => {
    // Clean up the database by removing the mock user
    await User.deleteMany({ email: mockUser.email });

    // Close the mongoose connection
    await mongoose.connection.close();

    // Close the server
    appServer.close();
});

describe('Token API Tests', () => {

    it('should return a new access token with user info', async () => {

        const res = await request(appServer)
            .post('/api/token/get-access-token')
            .set('Cookie', [refreshToken]);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toEqual(mockUser.email);
        expect(res.body.user.first_name).toEqual(mockUser.first_name);
        expect(res.body.user.last_name).toEqual(mockUser.last_name);
    });


});
