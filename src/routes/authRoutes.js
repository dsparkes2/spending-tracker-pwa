
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
router.get('/login', controller.loginPage);
router.post('/login', controller.login);
router.get('/register', controller.registerPage);
router.post('/register', controller.register);
router.get('/session-test', (req, res) => {
    res.json({
        loggedIn: !!req.session.userId,
        userId: req.session.userId || null
    });
});
module.exports = router;
