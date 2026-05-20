const express = require('express');
const Todo = require('./../models/Todo');
const { validateObjectId, validateTask } = require('./../middleware/validation');

const router = express.Router();

// Home page route
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.render("todos", {
            tasks: (Object.keys(todos).length > 0 ? todos : {})
        });
    } catch (error) {
        res.status(500).send('Unable to load tasks.');
    }
});

// POST - Submit Task
router.post('/', async (req, res) => {
    try {
        const task = validateTask(req.body.task);
        await Todo.create({ task });
        res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error.message);
        }
        return res.status(500).send('Unable to add task.');
    }
});

// POST - Destroy todo item
router.post('/todo/destroy', async (req, res) => {
    try {
        const taskKey = validateObjectId(req.body._key);
        await Todo.findByIdAndDelete(taskKey);
        res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error.message);
        }
        return res.status(500).send('Unable to delete task.');
    }
});


module.exports = router;
