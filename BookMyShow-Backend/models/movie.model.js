const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
    director: {
      type: String,
      required: true,
    },
    releasestatus: {
      type: String,
      enum: ["Released", "Unreleased", "Coming Soon"],
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
const movie = mongoose.model("Movie", movieSchema);
module.exports = movie;
