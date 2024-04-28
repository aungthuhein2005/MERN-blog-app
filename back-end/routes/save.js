const express = require('express');
const router= express.Router();
const saveController = require("../controllers/saveController");

router.post('/',saveController.save);
router.get('/:id',saveController.getSavedById);
router.patch('/',saveController.delete);

module.exports = router;