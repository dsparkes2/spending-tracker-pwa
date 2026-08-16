const Household = require("../models/Household");
const User = require("../models/User");
exports.setupPage = (req, res) => {
    res.render("household-setup");
};
exports.newHouseholdPage = (req, res) => {
    res.render("household-new");
};
