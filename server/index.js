const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT || 3001, () =>
  console.log(`Express server is running on ${process.env.PORT || 3001}`)
);

