const app = require('express')();
app.use(require('body-parser').json());

app.get('/test', function(req, res) {
    res.send('Test successful');
});

app.listen(3000, function() {
    console.log("Prismatic Core: Online");
});