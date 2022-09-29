require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const swaggerOptions = require('./helpers/documentation.swagger');
const { response } = require('./utils/response.utils');

const app = express();
const port = process.env.PORT || 5000;
const appUrl = `${process.env.APP_URL}${port}` || `http://localhost:${port}`;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use('/public', express.static('public'));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/api', routes);

app.use((req, res) => {
    return response(res, 404, false, 'The requested resource was not found.');
});

app.listen((port), () => {
    console.log(`Server is running on port ${port} at ${appUrl}`);
});
