const express = require('express');
const router = express.Router();

const animalRepo = require('../repository/animal-repository');

// generic endpoint used for testing on-the-fly changes
router.get('/animal-test', function(req, res) {
    animalRepo.animalTest(function(result) {
        res.send(result);
    });
});

router.get('/animal', function(req, res) {
    try {
        animalRepo.fetchAllAnimals(function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/animal/:id', function(req, res) {
    try {
        animalRepo.fetchAnimal(req.params.id, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/get-by-specie/:specie', function(req, res) {
    try {
        animalRepo.fetchAnimalsBySpecie(req.params.specie, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.post('/animal', function(req, res) {
    try {
        animalRepo.saveAnimal(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

module.exports = router;