require("dotenv").config();

const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

const friendRouter = require("./routes/friend");
app.use("/friend", friendRouter);

app.listen(3000, () => {
  console.log("Started ~ check port 3k");
});
