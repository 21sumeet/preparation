const { createMovie } = require("../controllers/movie.controller");

const routes = (app) => {
  app.post("/mba/api/v1/movies", createMovie);
};
module.exports = routes;
