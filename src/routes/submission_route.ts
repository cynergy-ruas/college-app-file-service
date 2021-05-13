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
    s3_service_function(req, res);
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/admin/getall', async (req, res) => {
  try {
    getalladmin(req, res);
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbyregno:', async (req, res) => {
  try {
    getbyregno(req, res);
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbydept:', async (req, res) => {
  try {
    getbydept(req, res);
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbybatch:', async (req, res) => {
  try {
    getbybatch(req, res);
  } catch (error) {
    res.send(error);
  }
});

Submisson_Router.get('/getbycourse:', async (req, res) => {
  try {
    getbycourse(req, res);
  } catch (error) {
    res.send(error);
  }
});

export default Submisson_Router;
