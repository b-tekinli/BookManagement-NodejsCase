const express = require('express');
const connectDB = require('./config/db');

const app = express();


// db bağlantısı
connectDB();


// middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API çalışıyor');
});


// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

module.exports = app;
