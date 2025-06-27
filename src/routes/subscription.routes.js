const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/subscription.controllers');

router.post('/', auth, controller.create);
router.get('/', auth, controller.getAll);
router.patch('/:id', auth, controller.update);
router.delete('/:id', auth, controller.cancel);

module.exports = router;