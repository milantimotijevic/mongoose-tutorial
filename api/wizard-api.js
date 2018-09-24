const express = require('express');
const router = express.Router();

const wizardRepo = require('../repository/wizard-repository');

// generic endpoint used for testing on-the-fly changes
router.get('/wizard-test', function(req, res) {
    wizardRepo.wizardTest(function(result) {
        res.send(result);
    });
});

router.get('/wizard', function(req, res) {
    try {
        wizardRepo.fetchAllWizards(function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/wizard/:id', function(req, res) {
    try {
        wizardRepo.fetchWizard(req.params.id, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.post('/wizard', function(req, res) {
    try {
        wizardRepo.saveWizard(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

module.exports = router;