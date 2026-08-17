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
