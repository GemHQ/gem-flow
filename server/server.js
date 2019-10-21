const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const intitutionRoutes = require('./routes/institutionRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/institution', intitutionRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', transactionRoutes);

app.listen(process.env.PORT || 3001, () =>
  console.log(`Express server is running on ${process.env.PORT || 3001}`)
);

