require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const swaggerOptions = require('./helpers/documentation.swagger');
const morgan = require('morgan');
const { response } = require('./utils/response.utils');
const { StatusCodes: status } = require('http-status-codes');

const app = express();
const port = process.env.PORT || 5000;
const appUrl = `${process.env.APP_URL}${port}` || `http://localhost:${port}`;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use('/public', express.static('public'));

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
    return res.status(status.OK).json(
        response(status.OK, 'OK', 'Simple Product CRUD Express', {
            app: {
                name: 'Simple Product CRUD Express',
                env: process.env.NODE_ENV
            },
            docs: {
                url: `${appUrl}/api-docs`
            }
        })
    );
});

app.use((req, res) => {
    return res.status(status.NOT_FOUND).json(response(status.NOT_FOUND, 'NOT_FOUND', 'The requested resource was not found.'));
});

app.use((err, req, res, next) => {
    return res.status(status.INTERNAL_SERVER_ERROR).json(
        response(status.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', err.message)
    );
});

app.listen((port), () => {
    console.log(`Server is running on port ${port} at ${appUrl}`);
});
