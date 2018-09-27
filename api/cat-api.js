const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const catRepo = require('../repository/cat-repository');

router.get('/test-cat', function(req, res) {

});

router.get('/cat', auth.required, function(req, res) {
    catRepo.fetchAllCats(function(result) {
        res.send(result);
    });
});

router.get('/cat/:id', function(req, res) {
    catRepo.fetchCat(req.params.id, function(result) {
        res.send(result);
    });
});

router.post('/cat', function(req, res) {
    catRepo.saveCat(req.body, function(result) {
        res.send(result);
    });
});

module.exports = router;