const express = require('express');
const { sendMessage } = require('../controller/message.controller');
const { getMessage } = require('../controller/message.controller');
const { secureRoute } = require('../middleware/secureRoute');

const router = express.Router();
router.post('/send/:id',secureRoute,sendMessage);
router.get('/get/:id',secureRoute,getMessage);



module.exports = router;