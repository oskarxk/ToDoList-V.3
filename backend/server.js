const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 4444;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todolist', require('./routes/todoRoutes'));

app.use(errorHandler);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server is running on port ${port}`));
