import { Router } from 'express';
import { Error } from 'mongoose';
import {
  assign_submission,
  grade_submission,
} from '../controllers/faculty_controller';

const Faculty_Router = Router();

var Submission_Schema = require('../model /submissionschema');

Faculty_Router.put('/icmembers/assign', async (req, res) => {
  try {
    return res.status(200).send(await assign_submission(req, res));
  } catch (err) {
    res.send(err);
  }
});

Faculty_Router.put('/submissions/grade', async (req, res) => {
  try {
    return res.status(200).send(await grade_submission(req, res));
  } catch (err) {
    res.send(err);
  }
});

export default Faculty_Router;
