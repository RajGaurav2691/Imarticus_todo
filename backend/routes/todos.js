const todoRouter = require('express').Router();
const todosController = require('../controllers/todosController');

todoRouter.get('/', todosController.getAllTodos);

todoRouter.get('/:id', todosController.getTodoById);

todoRouter.post('/', todosController.createTodo);

todoRouter.patch('/:id', todosController.updateTodo);

todoRouter.delete('/:id', todosController.deleteTodo);


module.exports = todoRouter;