const express = require('express');
const { signup } = require('../controller/user.controller');
const { login } = require('../controller/user.controller');
const { logout} = require('../controller/user.controller');
const { allUsers} = require('../controller/user.controller');
const { secureRoute } = require('../middleware/secureRoute');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers',secureRoute, allUsers);





module.exports = router;