require('dotenv/config');
import { Router } from 'express';
import {
  getalladmin,
  getbybatch,
  getbycourse,
  getbydept,
  getbyregno,
} from '../controllers/submission_controller';

import { s3_service_function } from '../services/s3_file_service';

import { uploadbuff } from '../utils/multer';

const Submisson_Router = Router();

Submisson_Router.post('/submit', uploadbuff, (req, res) => {
  try {
    return res.status(200).send(s3_service_function(req, res));
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/admin/submissions/getall', async (req, res) => {
  try {
    return res.status(200).send(await getalladmin(req, res));
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbyregno:', async (req, res) => {
  try {
    return res.status(200).send(await getbyregno(req, res));
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbydept:', async (req, res) => {
  try {
    return res.status(200).send(await getbydept(req, res));
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbybatch:', async (req, res) => {
  try {
    return res.status(200).send(await getbybatch(req, res));
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbycourse:', async (req, res) => {
  try {
    return res.status(200).send(await getbycourse(req, res));
  } catch (error) {
    res.send(error);
  }
});

export default Submisson_Router;
