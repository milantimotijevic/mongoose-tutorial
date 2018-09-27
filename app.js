const app = require('express')();
require('./model/User');
require('./config/passport-config');

app.use(require('body-parser').json());
app.use(require('./api/user-api'));
app.use(require('./api/cat-api'));
app.use(require('./api/animal-api'));
app.use(require('./api/person-api'));
app.use(require('./api/wizard-api'));

require('./db-connection-handler');

app.listen(3000, function() {
    console.log("Server is listening");
});