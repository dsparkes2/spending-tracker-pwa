
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
router.get('/login', controller.loginPage);
router.get('/register', controller.registerPage);
router.post('/register', controller.register);
module.exports = router;
