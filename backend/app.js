const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

const postRoutes = require('./routes/posts');
const classRoutes = require('./routes/classes');
const planRoutes = require('./routes/plans');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user.routes');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', postRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);

// Root
app.get('/', (req, res) => res.send('API is running...'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
