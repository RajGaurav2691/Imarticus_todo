const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  console.log("Signup payload:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, username });

    await user.save();
    console.log("User registered successfully");

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(400).json({
      error: "Error registering user",
      reason: err.message
    });
  }
};



exports.login = async (req, res) => {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
        return res.status(401).send({ error: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).send({ error: 'Invalid email or password' });
    }

    const payload = {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role 
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60 }, // in seconds
        (error, token) => {
            if (error) {
                console.error('Error generating jwt:', error.message);
                return res.status(400).send({ error: 'Invalid credentials' });
            }
            return res.status(200).send({ message: 'Successfully logged in', accessToken: token });
        }
    );
};
