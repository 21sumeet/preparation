const MovieModel = require("../models/movie.model");

const createMovie = async (req, res) => {
  try {
    const Movie = await MovieModel.create(req.body);
    return res.status(201).json({
      success: true,
      data: Movie,
      message: "Movie created successfully",
      error: null,
    });
  } catch (err) {
    console.error("Error creating movie", err);
    return res.status(500).json({
      success: false,
      data: "",
      message: "Error creating movie",
      error: err.message,
    });
  }
};
module.exports = {
  createMovie,
};
