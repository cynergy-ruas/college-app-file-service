require('dotenv/config');
import { Router } from 'express';
import {
  deletebyName,
  getbycoursecode,
  getbycoursename,
  getbyName,
  getbysection,
  getbysem,
  updatebyName,
} from '../controllers/files_controller';

import { s3_service_function } from '../services/s3_file_service';

import { uploadbuff } from '../utils/multer';

const File_Router = Router();

File_Router.post('/cr/submitdoc', uploadbuff, (req, res) => {
  try {
    s3_service_function(req, res);
  } catch (error) {
    res.send(error);
  }
});

File_Router.put('/cr/updatedoc', (req, res) => {
  try {
    updatebyName(req, res);
  } catch (error) {
    res.send(error);
  }
});

File_Router.delete('/cr/deletedoc', (req, res) => {
  try {
    deletebyName(req, res);
  } catch (error) {
    res.send(error);
  }
});

File_Router.get('/home', async (req, res) => {
  try {
    getbysection(req, res);
  } catch (error) {
    res.send(error);
  }
});

File_Router.get('/home/name', async (req, res) => {
  try {
    getbyName(req, res);
  } catch (error) {
    res.send(error);
  }
});
File_Router.get('/home/coursecode', async (req, res) => {
  try {
    getbycoursecode(req, res);
  } catch (error) {
    res.send(error);
  }
});
File_Router.get('/home/coursename', async (req, res) => {
  try {
    getbycoursename(req, res);
  } catch (error) {
    res.send(error);
  }
});

File_Router.get('/home/semester', async (req, res) => {
  try {
    getbysem(req, res);
  } catch (error) {
    res.send(error);
  }
});

export default File_Router;
