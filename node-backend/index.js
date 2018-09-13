const http = require("http");
const app = require("./src/app");

const server = http.createServer(app);

const port = 6200;

process.on('uncaughtException', (err) => {
  console.log(err)
})

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
