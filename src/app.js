import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import User, { USER_TYPES } from './models/User';
import taskController from './controllers/task';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jwtCheck = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://mutualaidnz.au.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://actionline.mutualaid.org.nz',
  issuer: 'https://mutualaidnz.au.auth0.com/',
  algorithms: ['RS256'],
});

app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000'] }));
app.use(jwtCheck);
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  let user = await User.findOne({
    identity: { sub: req.user.sub },
  });
  if (!user) {
    // TODO: Get info from Auth0
    user = await User.create({
      identity: {
        sub: req.user.sub,
      },
      type: USER_TYPES.COORDINATOR,
    });
  }

  req._user = req.user;
  req.user = user;

  next();
});

app.use('/tasks', taskController);

app.listen(port, () => console.log('listening'));
