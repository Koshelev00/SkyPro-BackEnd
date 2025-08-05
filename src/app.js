const http = require('http');
const url= require('url');
const getUsers = require('./modules/users');

const server = http.createServer((request, response ) => {
    const parsedUrl = url.parse(request.url, true);
    const pathName = parsedUrl.pathname;
    
    if (pathName === '/users') {
    response.status =200;
    response.statusMessage = "OK";
    response.header = "Content-Type : application/json"
    response.write(getUsers());
    response.end();
    return;
    }

   

if (pathName === '/hello') {
 const name = parsedUrl.query.name;
   if(name){
      response.status =200;
      response.statusMessage = "OK";
      response.header = "Content-Type : text/plain"
      response.write(`Hello, ${name}!`);
      response.end();
   }else {
      response.status =400;
      response.statusMessage = "Bad Request";
      response.header = "Content-Type : text/plain"
      response.write(`Enter a name `);
      response.end();
      
   }
   return;
}

  if (pathName === '/') {
    response.status =200;
    response.statusMessage = "OK";
    response.header = "Content-Type : text/plain"
    response.write("Hello, world!");
    response.end();
 }else{

   response.statusCode = 500;
   response.statusMessage = "OK";
   response.header = "Content-Type : text/plain"
   response.write(" ");
   response.end();
 }
  
});

server.listen(3003, () =>{
    console.log("Сервер запущен по адрессу http://127.0.0.1:3003")
})



// // http://127.0.0.1:3003/  response:'Hello world'
// http://127.0.0.1:3003/users  response:users.json
// http://127.0.0.1:3003/hello   response: 'Enter a name' 
// http://127.0.0.1:3003/hello?mame="Name"  response: 'Hello, 'Name'!'
