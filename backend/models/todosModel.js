const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     createdBy: {
//         type: String,
//         // required: true
//     }
// })

// const Todos = mongoose.model('todos', todoSchema)
// module.exports = Todos;

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema); 