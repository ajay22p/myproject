const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const mongooose = require('./src/data/mongo.js');
const logger  = require('./src/lib/logger.js');
const register = require('./src/api/user/register.js');
const login = require('./src/api/user/login.js');
const getDetails = require('./src/api/user/getDetails.js');
const PORT = process.env.PORT ;


var db = mongooose.connection;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname +'/public'));
const router = express.Router();
router.use('/api/user', register);
router.use('/api/user', login);
router.use('/api/user', getDetails);
app.listen(PORT, () => {logger.info(`server listening at port : ${PORT}`);
});
app.use(router);


