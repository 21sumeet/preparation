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

const deleteMovie = async (req, res) => {
  try {
    const response = await MovieModel.deleteOne({ _id: req.params.movieId });
    if (response.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        data: "",
        message: "Movie not found",
        error: "No movie found with the given ID",
      });
    }
    return res.status(200).json({
      success: true,
      data: response,
      message: "Movie deleted successfully",
      error: null,
    });
  } catch (err) {
    console.error("Error deleting movie", err);
    return res.status(500).json({
      success: false,
      data: "",
      message: "Error deleting movie",
      error: err.message,
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        data: "",
        message: "Movie not found",
        error: "No movie found with the given ID",
      });
    }
    return res.status(200).json({
      success: true,
      data: movie,
      message: "Movie fetched successfully",
      error: null,
    });
  } catch (err) {
    console.error("Error getting movie", err);
    return res.status(500).json({
      success: false,
      data: "",
      message: "Error getting movie",
      error: err.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(
      req.params.movieId,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: movie,
      message: "Movie created successfully",
      error: null,
    });
  } catch (error) {
    console.log("error at updating movie", error);
    return res.status(500).json({
      success: false,
      data: "",
      message: "Error updating movie",
      error: error.message,
    });
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
};
