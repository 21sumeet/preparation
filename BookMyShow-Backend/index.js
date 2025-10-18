const bodyParser = require("body-parser");
const e = require("express");
const express = require("express");
const app = express();
cont = dotenv = require("dotenv");
dotenv.config();
const rateLimit = require("express-rate-limit");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
//const movie = require("./models/movie.model");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", (req, res) => {
  res.send("Home Page");
});

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    // await movie.create({
    //   name: "Inception",
    //   description: "A mind-bending thriller",
    //   cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //   trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    //   releaseDate: new Date("2010-07-16"),
    //   language: "English",
    //   director: "Christopher Nolan",
    //   releasestatus: "Released",
    //   genres: ["Sci-Fi", "Thriller"],
    // });

    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
});
