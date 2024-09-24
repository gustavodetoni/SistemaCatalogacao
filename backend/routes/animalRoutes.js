const express = require('express');
const router = express.Router();
const {
    getAllAnimais,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
} = require('../controllers/animalController');

router.get('/', getAllAnimais);
router.get('/:id', getAnimalById);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;