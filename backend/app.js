const express = require("express");
const morgan = require("morgan");

require("express-async-errors");
require("dotenv").config();
require("./db");

const { errorHandler, handleNotFound } = require("./middleware/errorHandler");
const cors = require("cors");

const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);

// Catch all errors
app.use("/*", handleNotFound);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("App is started");
});
