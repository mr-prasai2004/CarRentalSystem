const jwt = require('jsonwebtoken'); // Import the JWT package
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Signup Function
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,  // Store the hashed password
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token (you can set the expiration time and include user role or ID)
    const token = jwt.sign(
      { id: user.id, role: user.role },  // Customize the payload as needed
      process.env.JWT_SECRET || 'your_jwt_secret_key', // Make sure to use an environment variable for the secret key
      { expiresIn: '1h' }  // Optional: Set the expiration time for the token
    );

    // Return a successful login response with the token
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, login };