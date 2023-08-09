const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/movie_review")
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB connection is failed", err);
  });
