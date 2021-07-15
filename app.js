// dependices
const express = require("Express");
const cors = require("cors");
var app = express();

// local dependices
const mail = require("./routes/mail.router");

const allowedOrigins = ["http://localhost:3000"];

const options = {
  origin: allowedOrigins,
};

const useMiddlewares = (server) => {
  server.use(cors(options));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};

const createServer = () => {
  const server = express();
  useMiddlewares(server);
  server.use("/mail", mail);
  return server;
};

module.exports = app = createServer();
