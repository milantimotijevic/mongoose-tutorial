const express = require('express');
const router = express.Router();

const catRepo = require('../repository/cat-repository');

router.get('/test-cat', function(req, res) {
    catRepo.saveCoolestCatInTheWorld(function(result) {
        res.send(result);
    });
});

module.exports = router;