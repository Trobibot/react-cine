require('dotenv').config()

const { rootController, getMoviesController, getMovieByIdController, createMovieController, updateMovieByIdController, deleteMovieByIdController } = require('./controllers');
const { dbMiddleware } = require('./dbMiddleware');

const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(dbMiddleware);

app.use(express.static('public'));

app
  .get("/",              rootController)
  .get("/movies",        getMoviesController)
  .get("/movies/:id",    getMovieByIdController)
  .post("/movies",       createMovieController)
  .put("/movies/:id",    updateMovieByIdController)
  .delete("/movies/:id", deleteMovieByIdController)
  .listen(4000);

