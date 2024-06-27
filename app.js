const cors = require('cors');
const express = require('express');
const TaskRoutes = require('./routes/TaskRoutes');
const connectDB = require('./DataBase/connect');
const NotFound = require('./middleware/notfound');
const ErrorHandler = require('./middleware/ErrorHandler');
const UserRoutes = require('./routes/users.routes');
const auth = require('./middleware/auth')
require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:5500','http://localhost:3000'], // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specified headers
};
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('./frontend'));
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/v1/tasks',auth, TaskRoutes);
app.use('/api/v1/auth', UserRoutes); 

// Error handling middleware
app.use('*', NotFound);
app.use(ErrorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Unable to connect to the server:', error.message);
    process.exit(1); // Exit process if unable to start server
  }
};

startServer();
