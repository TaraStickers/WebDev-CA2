const http = require("http");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const { response } = require("express");
//reference - lab on Node.js by Hamilton
//Please note we did our best not copy
const server = http.createServer((request, response) => {
  console.log(`${request.url}${request.method}`);

  response.setHeader("Content-type", "text/html");

  let sitePath = "./WAD CA2/";
  switch (request.url) {
    case "/":
      sitePath += "index.html";
      response.statusCode = 200;
      break;
    case "/bookings.html":
      sitePath += "index.html";
      response.statusCode = 200;
      break;
    case "Error.html":
      sitePath += "index.html";
      response.statusCode = 404;
      break;
  }
  fs.readFile(sitePath, (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      response.end(data);
    }
  });
});
server.listen(5500, "localhost", () => {
  console.log("Server running...");
});

//mongoose
mongoose.connection.once("open", () => {
    console.log("Connected to:", mongoose.connection.name);
});
