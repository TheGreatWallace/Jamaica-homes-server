const express = require('express');
const router = express.Router();
const controller = require('../controllers/houses.controller');
// const uploads = require('../uploads');

//Creates a new home
router.post('/',controller.create);

//Retrieves ALL houses
router.get('/',controller.findAllHouses);

//Deletes All the houses
router.delete('/',controller.deleteAllHouses);

//Retrieves a specific home
router.get('/:id', controller.findHouseById);

//Updates the data of a specific house
router.put('/:id', controller.updateHouse);

//Deletes a specific house
router.delete('/:id', controller.deleteHouse);

//Stores uploaded images
// router.post('/:id', uploads.single('image'), controller)


module.exports = router;