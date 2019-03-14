const express = require('express');
const router = express.Router();

const msgAPIController = require('../controllers/msg-api');

router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(msgAPIController.addNewMessage);

module.exports = router;