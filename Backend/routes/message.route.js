const express = require('express');
const { sendMessage, getMessage, deleteMessage } = require('../controller/message.controller');
const { secureRoute } = require('../middleware/secureRoute');

const router = express.Router();
router.post('/send/:id', secureRoute, sendMessage);
router.get('/get/:id', secureRoute, getMessage);
router.delete('/delete/:id', secureRoute, deleteMessage);

module.exports = router;