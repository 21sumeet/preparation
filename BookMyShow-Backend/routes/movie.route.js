const {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} = require("../controllers/movie.controller");

const routes = (app) => {
  app.post("/mba/api/v1/movies", createMovie);
  app.delete("/mba/api/v1/movies/:movieId", deleteMovie);
  app.get("/mba/api/v1/movies/:movieId", getMovie);
  app.put("/mba/api/v1/movies/:movieId", updateMovie);
};
module.exports = routes;
