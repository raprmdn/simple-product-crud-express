const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
require('dotenv').config();
const models = require('./models');
require('./config/database.config.js').sync();
const routes = require('./routes');
const helmet = require("helmet");
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./helpers/documentation.swagger');

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use('/api', routes);

app.listen((process.env.PORT || 5000), () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`);
});