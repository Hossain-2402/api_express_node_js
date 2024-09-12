const http = require("http"); // import http
const app = require("./app");

// const port = process.env.PORT || 3000  // make a port/URL 

const server = http.createServer(app); // make a server using HTTP

server.listen(port); // make a listner using server 




// import http 
// make a port 
// make a sarver using the HTTP
// make a listner using the SERVER