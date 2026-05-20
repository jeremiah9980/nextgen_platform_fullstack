const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
