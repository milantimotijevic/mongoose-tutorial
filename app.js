const app = require('express')();
const auth = require('./config/auth');
require('./model/User');
require('./config/passport-config');

// common error handler
app.use(function(err, req, res, next) {
    res.status(400).send('Something terrible has happened...');
});

app.use(require('body-parser').json());
app.use(require('./api/user-api'));
app.use(auth.required, require('./api/cat-api'));
app.use(require('./api/animal-api'));
app.use(require('./api/person-api'));
app.use(require('./api/wizard-api'));
//
// routes('/users', middleware, require('user_routes'))
//
// routes.get('/') -> /users/
// routes.delete(`/${key}`) -> /users/1
// routes.put(`/${key}`) -> /users/2

require('./db-connection-handler');

app.listen(3000, function() {
    console.log("Server is listening");
});