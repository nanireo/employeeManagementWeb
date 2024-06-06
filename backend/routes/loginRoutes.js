const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

router.post('/', loginControllers.login);
//router.post('/logout', loginControllers.logout);


module.exports = router;
