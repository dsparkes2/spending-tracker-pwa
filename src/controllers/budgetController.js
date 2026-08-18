const Budget = require('../models/Budget');
const User = require('../models/User');

exports.getBudget = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/auth/login');
        }

        if (!user.household) {
            return res.send('Your account is not connected to a household yet.');
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const budget = await Budget.findOne({
            household: user.household,
            year,
            month
        });

        res.render('budget', { budget });
    } catch (error) {
        console.error('Error loading budget:', error);
        res.status(500).send('Unable to load budget.');
    }
};
