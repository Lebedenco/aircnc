const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");
const config = require("./config/config.json");

const app = express();
const port = process.env.PORT || 3333;
const url = config.db.url;

mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});