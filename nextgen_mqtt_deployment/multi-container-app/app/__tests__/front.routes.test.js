const express = require('express');
const request = require('supertest');
const FrontRouter = require('../routes/front');
const Todo = require('../models/Todo');

jest.mock('../models/Todo', () => ({
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

const createTestApp = () => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use((req, res, next) => {
        res.render = (view, data) => res.status(200).json({ view, data });
        next();
    });
    app.use(FrontRouter);
    return app;
};

describe('front routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET / renders todo list', async () => {
        Todo.find.mockResolvedValue([{ _id: '507f1f77bcf86cd799439011', task: 'Test task' }]);
        const app = createTestApp();

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.view).toBe('todos');
        expect(Todo.find).toHaveBeenCalledTimes(1);
    });

    test('POST / rejects blank tasks', async () => {
        const app = createTestApp();

        const response = await request(app).post('/').send('task=   ');

        expect(response.status).toBe(400);
        expect(Todo.create).not.toHaveBeenCalled();
    });

    test('POST / creates normalized task', async () => {
        Todo.create.mockResolvedValue({ _id: '507f1f77bcf86cd799439011' });
        const app = createTestApp();

        const response = await request(app).post('/').send('task=  Buy milk  ');

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(Todo.create).toHaveBeenCalledWith({ task: 'Buy milk' });
    });

    test('POST /todo/destroy rejects invalid object id', async () => {
        const app = createTestApp();

        const response = await request(app).post('/todo/destroy').send('_key=not-an-id');

        expect(response.status).toBe(400);
        expect(Todo.findByIdAndDelete).not.toHaveBeenCalled();
    });

    test('POST /todo/destroy deletes valid object id', async () => {
        Todo.findByIdAndDelete.mockResolvedValue({});
        const app = createTestApp();

        const response = await request(app)
            .post('/todo/destroy')
            .send('_key=507f1f77bcf86cd799439011');

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
        expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });
});
