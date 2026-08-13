
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/expenses', require('./src/routes/expenseRoutes'));
app.use('/budget', require('./src/routes/budgetRoutes'));

app.get('/', (req, res) => {
    res.redirect('/expenses');
});

// ⭐ CONNECT TO MONGODB FIRST — THEN START SERVER
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});
