const mongoose = require('mongoose');

const createValidationError = (message) => {
    const error = new Error(message);
    error.name = 'ValidationError';
    return error;
};

const validateTask = (task) => {
    if (typeof task !== 'string') {
        throw createValidationError('Task must be a text value.');
    }

    const normalizedTask = task.trim();
    if (!normalizedTask) {
        throw createValidationError('Task is required.');
    }

    if (normalizedTask.length > 200) {
        throw createValidationError('Task cannot exceed 200 characters.');
    }

    return normalizedTask;
};

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createValidationError('Invalid task identifier.');
    }

    return id;
};

module.exports = {
    validateTask,
    validateObjectId
};
