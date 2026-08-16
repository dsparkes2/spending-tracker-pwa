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
        createdBy: user._id,
        members: [user._id]
    });

    await household.save();

    user.household = household._id;
    await user.save();

    res.redirect("/expenses");
};
exports.joinHouseholdPage = (req, res) => {
    res.render("household-join");
};
