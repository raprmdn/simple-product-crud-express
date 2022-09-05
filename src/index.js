const express = require('express');
const cors = require('cors');
require('dotenv').config();
const models = require('./models');
require('./config/database.config.js').sync();
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen((process.env.PORT || 5000), () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`);
});