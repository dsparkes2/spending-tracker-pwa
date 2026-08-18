const Household = require("../models/Household");
const User = require("../models/User");
exports.setupPage = (req, res) => {
    res.render("household-setup");
};
exports.newHouseholdPage = (req, res) => {
    res.render("household-new");
};
exports.createHousehold = async (req, res) => {
    const user = await User.findById(req.session.userId);

    const household = new Household({
        name: req.body.name,
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdBy: user._id,
        members: [user._id]
    });

    await household.save();

    user.household = household._id;
    await user.save();

    res.render("household-created", { household });
};
exports.joinHouseholdPage = (req, res) => {
    res.render("household-join");
};
exports.joinHousehold = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect("/auth/login");
        }

        const household = await Household.findOne({
            code: req.body.householdId
        });

        if (!household) {
            return res.send("Household not found. Please check the code and try again.");
        }

        if (!household.members.includes(user._id)) {
            household.members.push(user._id);
            await household.save();
        }

        user.household = household._id;
        await user.save();

        res.redirect("/expenses");
    } catch (error) {
        console.error("Error joining household:", error);
        res.status(500).send("Unable to join household.");
    }
};
