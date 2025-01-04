const express = require('express');
const groupRouter = express.Router();
const groupStudyController = require('../controller/groupController');

groupRouter.post('/', groupStudyController.createGroupStudy);
groupRouter.get('/', groupStudyController.getAllGroupStudies);

module.exports = groupRouter;
