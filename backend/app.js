const express = require("express");
require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(5000, () => {
  console.log("App is started");
});
