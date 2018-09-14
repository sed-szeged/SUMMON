const http = require("http");
const app = require("./src/app");

const server = http.createServer(app);

const port = 6200;

process.on("uncaughtException", e => {
  console.log(e);
});

process.on("unhandledRejection", e => {
  console.log(e);
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
