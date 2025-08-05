const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathName === "/users") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  }
  if ("hello" in query) {
    const nameValue = query.hello;

    if (nameValue && nameValue.trim() !== "") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${nameValue}!`);
      response.end();
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
      response.end();
    }
    return;
  }
  if (pathName === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
  } else {
    response.statusCode = 500;
    response.end();
  }
});

const port = process.env.PORT || 3003;
server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
});

// http://127.0.0.1:3003/  response:'Hello world'
// http://127.0.0.1:3003/users  response:users.json
// http://127.0.0.1:3003/?hello   response: 'Enter a name'
// http://127.0.0.1:3003/?hello="Name"  response: 'Hello, 'Name'!'
