const express = require('express');
const cors = require('cors');
const db = require('../db/connect');
const jobControllers = require('../db/controllers/jobs');
const reviewsControllers = require('../db/controllers/reviews');
const toolsControllers = require('../db/controllers/tools');
const usersControllers = require('../db/controllers/users');
const model = require('../db/models');
const {Users, Reviews, Jobs, Tools} = model;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/addjob', (req, res) => {
  jobControllers.newJob(req.body)
    .then(() => res.status(201).send('Job Added'))
    .catch((err) => res.status(400).send(err));
})
app.get('/getAllJobs', (req, res) => {
  jobControllers.getAllJobs()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(response));
})
app.put('/editjob', (req, res) => {
  const {condition, change} = req.body;
  jobControllers.editJob(condition, change)
    .then((response) => res.status(201).send(response))
    .catch((err) => res.status(400).send(err));
})

app.get('/getJobs/:email', (req, res) => {
  jobControllers.userJobs(req.params.email)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
})

app.get('/getJobs/employee/:name', (req, res) => {
  jobControllers.employeeJobs(req.params.name)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
})

app.post('/addreview', (req, res) => {
  reviewsControllers.addNewReview(req.body)
    .then(() => res.status(201).send('Review Added'))
    .catch((err) => res.status(400).send(err));
})

app.get('/reviews', (req, res) => {
  reviewsControllers.getAllReviews()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
})

app.get('/filterreviews/:category', (req, res) => {
  reviewsControllers.getFilteredReviews(req.params)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
})

app.get('/tools/:category', (req, res) => {
  toolsControllers.getTools(req.params.category)
})

const port = 8080;

app.listen(port, console.log(`listening on port ${port}`));
