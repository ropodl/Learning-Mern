const express = require("express");
const morgan = require("morgan");

require("express-async-errors");
require("dotenv").config();
require("./db");

const { errorHandler } = require("./middleware/errorHandler");
const userRouter = require("./routes/user");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);

// Catch all errors
app.use(errorHandler);

app.listen(5000, () => {
  console.log("App is started");
});
