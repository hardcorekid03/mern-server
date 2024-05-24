require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const CoffeeMenu = require("./routes/CoffeeMenu");

// express app
const app = express();

// Enable CORS for all origins
app.use(cors());

// middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/coffee", CoffeeMenu);

//connect to db
const dbPort = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(dbPort, () => {
      console.log("connected to database and listening on port", dbPort);
    });
  })
  .catch((error) => {
    console.log(error);
  });
