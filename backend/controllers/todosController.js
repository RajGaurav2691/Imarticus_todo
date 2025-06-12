const Todos = require('../models/todosModel');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todos.find({ createdBy: req.user.id }); // req.user should have `id`
        return res.status(200).send({ todos });
    } catch (error) {
        console.error(`Error fetching all todos:`, error.message);
        return res.status(500).send({ error: `Error fetching all todos` });
    }
};

const Todo = require('../models/todosModel'); // Make sure this is singular!

// exports.getTodoById = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const todo = await Todo.findById(id); // ✅ Corrected model name
//         if (!todo) {
//             return res.status(404).send({ error: 'Todo not found' });
//         }
//         return res.status(200).send({ todo });
//     } catch (error) {
//         console.error('Error fetching todo:', error.message);
//         return res.status(500).send({ error: 'Error fetching todo' });
//     }
// };

exports.getTodoById = async (req, res) => {
    const id = req.params.id;
      // 🔒 Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid Todo ID format' });
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        return res.status(200).send({ todo });
    } catch (error) {
        console.error('Error fetching todo:', error);
        return res.status(500).send({ error: 'Error fetching todo', reason: error.message });
    }
};


exports.createTodo = async (req, res) => {
    const title = req.body.title;
    try {
        const newTodo = new Todos({ title, createdBy: req.user.id });
        const savedTodo = await newTodo.save();
        return res.status(201).send({ newTodo: savedTodo });
    } catch (error) {
        console.error('Error creating todo:', error.message);
        return res.status(400).send({ error: 'Error creating todo' });
    }
};

exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        return res.status(200).send({ updatedTodo });
    } catch (error) {
        console.error('Error updating todo:', error.message);
        return res.status(400).send({ error: 'Error updating todo' });
    }
};

exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTodo = await Todos.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        return res.status(200).send({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        return res.status(500).send({ error: 'Error deleting todo' });
    }
};
