const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config/config.json");

const app = express();
const port = process.env.PORT || 3000;
const url = config.db.url;

mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});