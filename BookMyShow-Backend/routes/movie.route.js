const {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} = require("../controllers/movie.controller");

const movieMiddlewares = require("../middlewares/movie.middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    movieMiddlewares.validateMovieCreateRequest,
    createMovie
  );
  app.delete("/mba/api/v1/movies/:movieId", deleteMovie);
  app.get("/mba/api/v1/movies/:movieId", getMovie);
  app.put(
    "/mba/api/v1/movies/:movieId",
    movieMiddlewares.validateMovieCreateRequest,
    updateMovie
  );
};
module.exports = routes;
