const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.registerPage = (req, res) => {
    res.render('register');
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.send('Username already exists. Please choose another username.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        res.redirect('/auth/login');

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Something went wrong while creating your account.');
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.send('Invalid username or password.');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.send('Invalid username or password.');
        }

        res.send('Login successful!');

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Something went wrong while logging in.');
    }
};
