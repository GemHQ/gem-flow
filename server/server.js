const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  userRoutes = require('./routes/userRoutes'),
  profileRoutes = require('./routes/profileRoutes'),
  intitutionRoutes = require('./routes/institutionRoutes'),
  connectionRoutes = require('./routes/connectionRoutes'),
  accountRoutes = require('./routes/accountRoutes'),
  transactionRoutes = require('./routes/transactionRoutes'),
  { GemAPIError } = require('@gem.co/api'),
  morgan = require('morgan'),
  app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: false }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(cors());
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/institution', intitutionRoutes);
app.use('/connections', connectionRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', transactionRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err instanceof GemAPIError) {
    return res
      .status(err.status)
      .json({ description: err.description, error: err.error });
  }

  return res.status(500).json({
    description: 'An internal server error occurred. Please try again.',
    error: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Express server is running on ${process.env.PORT || 3001}`)
);
