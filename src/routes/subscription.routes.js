const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/subscription.controllers');

router.post('/', auth, controller.create);
router.get('/', auth, controller.getAll);
router.put('/:id', auth, controller.update);
router.put('/cancel/:id', auth, controller.cancel);
router.put('/pause/:id', auth, controller.pause);
router.put('/resume/:id', auth, controller.resume);
router.delete('/:id', auth, controller.drop);

module.exports = router;