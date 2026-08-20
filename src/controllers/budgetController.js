const Budget = require('../models/Budget');
const User = require('../models/User');
const BudgetCategory = require('../models/BudgetCategory');

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

        res.render('budget', { budget, year, month });
    } catch (error) {
        console.error('Error loading budget:', error);
        res.status(500).send('Unable to load budget.');
    }
};

exports.newBudgetPage = (req, res) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    res.render('budget-new', { year, month });
};

exports.budgetCategoriesPage = (req, res) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    res.render('budget-categories', { year, month });
};

exports.saveBudgetCategories = async (req, res) => {
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

        let budget = await Budget.findOne({
            household: user.household,
            year,
            month
        });

        if (!budget) {
            budget = new Budget({
                household: user.household,
                year,
                month,
                monthlyLimit: Number(req.body.monthlyLimit),
                status: 'Active'
            });

            await budget.save();
        }

        const categories = [
            { name: 'Groceries', value: req.body.groceries },
            { name: 'Gas', value: req.body.gas },
            { name: 'Utilities', value: req.body.utilities },
            { name: 'Dining Out', value: req.body.diningOut },
            { name: 'Entertainment', value: req.body.entertainment }
        ];

        for (const category of categories) {
            const amount = Number(category.value);

            if (!category.value || amount <= 0) {
                continue;
            }

            await BudgetCategory.create({
                budget: budget._id,
                name: category.name,
                monthlyLimit: amount,
                isCustom: false,
                isActive: true
            });
        }

        res.redirect('/budget');
    } catch (error) {
        console.error('Error saving budget categories:', error);
        res.status(500).send('Unable to save budget categories.');
    }
};

exports.editBudgetPage = async (req, res) => {
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

        if (!budget) {
            return res.redirect('/budget');
        }

        res.render('budget-edit', { budget, year, month });

    } catch (error) {
        console.error('Error loading budget edit page:', error);
        res.status(500).send('Unable to load budget edit page.');
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/auth/login');
        }

        if (!user.household) {
            return res.send('Your account is not connected to a household yet.');
        }

        const monthlyLimit = Number(req.body.monthlyLimit);

        if (!Number.isFinite(monthlyLimit) || monthlyLimit < 0) {
            return res.send('Please enter a valid monthly spending limit.');
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const budget = await Budget.findOne({
            household: user.household,
            year,
            month
        });

        if (!budget) {
            return res.redirect('/budget');
        }

        budget.monthlyLimit = monthlyLimit;

        await budget.save();

        res.redirect('/budget');

    } catch (error) {
        console.error('Error updating monthly budget:', error);
        res.status(500).send('Unable to update monthly budget.');
    }
};

exports.manageCategoriesPage = async (req, res) => {
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

        if (!budget) {
            return res.redirect('/budget');
        }

        const categories = await BudgetCategory.find({
            budget: budget._id,
            isActive: true
        }).sort({ name: 1 });

        res.render('budget-manage-categories', {
            budget,
            categories,
            year,
            month
        });

    } catch (error) {
        console.error('Error loading budget categories:', error);
        res.status(500).send('Unable to load budget categories.');
    }
};
