const app = require('express')();

app.use(require('body-parser').json());
app.use(require('./api/cat-api'));
app.use(require('./api/animal-api'));
app.use(require('./api/person-api'));

require('./db-connection-handler');

app.listen(3000, function() {
    console.log("Server is listening");
});