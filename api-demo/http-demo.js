let http = require('http');

function onRequest(request, response) {
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write('Hello This is HTTP module');
    response.end()   
}

http.createServer(onRequest).listen(8000);

