const app = require('express')();
app.use(require('body-parser').json());
require('./db-connection-handler');

const catApi = require('./api/cat-api');
app.use(catApi);

app.listen(3000, function() {
    console.log("Server is listening");
});