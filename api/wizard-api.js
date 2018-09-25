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

router.put('/wizard', function(req, res) {
    try {
        wizardRepo.updateWizard(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/spell', function(req, res) {
    try {
        wizardRepo.fetchAllSpells(function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.get('/spell/:id', function(req, res) {
    try {
        wizardRepo.fetchSpell(req.params.id, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.post('/spell', function(req, res) {
    try {
        wizardRepo.saveSpell(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

router.put('/spell', function(req, res) {
    try {
        wizardRepo.updateSpell(req.body, function(result) {
            res.send(result);
        });
    } catch(err) {
        res.status(400).json({msg: 'Something bad happened...'});
    }
});

module.exports = router;