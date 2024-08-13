const express = require('express');
const app = express();
const PORT = 2002;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const MongoURI = process.env.Mongo_URI;

// Connect to MongoDB
mongoose.connect(MongoURI)


.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const logger = require('./middleware');
const routes = require('./routes');
const Watch = require('./Watches');
const Dress = require('./mensDresses');
const mobiles = require('./Mobiles');
const headphones = require('./Headphones');

app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use(logger);

// Routes
app.use('/', routes);
app.use('/', mobiles);
app.use('/', Watch);
app.use('/', Dress);  
app.use('/', headphones);  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
