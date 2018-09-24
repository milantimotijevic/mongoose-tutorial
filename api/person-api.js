const express = require('express');
const router = express.Router();

const personRepo = require('../repository/person-repository');

// generic endpoint used for testing on-the-fly changes
router.get('/person-test', function(req, res) {
    personRepo.personTest(function(result) {
        res.send(result);
    });
});

router.get('/person', function(req, res) {
    try {
        personRepo.fetchAllPersons(function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/person/:id', function(req, res) {
    try {
        personRepo.fetchPerson(req.params.id, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.post('/person', function(req, res) {
    try {
        personRepo.savePerson(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.put('/person', function(req, res) {
    try {
        personRepo.updatePerson(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/address', function(req, res) {
    try {
        personRepo.fetchAddresses(function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.post('/address', function(req, res) {
    try {
        personRepo.saveAddress(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

module.exports = router;