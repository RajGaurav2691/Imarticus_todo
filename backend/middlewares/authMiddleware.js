const jwt = require('jsonwebtoken');
const JWT_SECRET = "raj_bhai_super_secure_key_123"; 

exports.authenticate = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Not Logged in! Login or Signup to access this resource!' });
        }

        jwt.verify(token, JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ error: 'Failed to authenticate' });
            }

            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next();
        });
    } catch (error) {
        return res.status(401).send({ error: 'Please login or signup to access this resource' });
    }
};
