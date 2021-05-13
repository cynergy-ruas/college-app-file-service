import express from 'express';
import Submisson_Router from './routes/submission_route';
import Faculty_Router from './routes/faculty_route';
import mongoose from 'mongoose';
import { MONGODB_URI } from './utils/secret';
import logger from './utils/logger';

const app = express();

const mongoUrl = MONGODB_URI!;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to Database');
  })
  .catch((err) => {
    logger.debug(`Mongo connection error: ${err}`);
  });

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/submissions', Submisson_Router);

app.use('/faculty', Faculty_Router);

export default app;
