const express = require("express");
const server = express();
const cors = require("cors");
const router = require("./router/router");
const mongoose = require("mongoose");
require("dotenv").config();
server.use(cors());
server.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("connect success"))
  .catch((e) => console.log(e));

server.use("/", router);
server.listen(4000);
