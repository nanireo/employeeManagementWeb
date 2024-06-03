const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

router.post('/login', loginControllers.login);
//router.post('/logout', loginControllers.logout);


module.exports = router;
