require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http'); // ✅ Added for Vercel

const mongoConnection = require('./config/mongodb');
const todoRouter = require('./routes/todos');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const { authenticate } = require('./middlewares/authMiddleware');
const { requiredRole } = require('./middlewares/verifyRoleMiddleware');

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoConnection();

// ✅ Routes
app.use('/auth', authRouter);
app.use('/todos', todoRouter);
app.use('/users', authenticate, requiredRole(['admin']), userRouter);

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Server is successfully running' });
});

// ✅ Only for local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
