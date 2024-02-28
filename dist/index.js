// const http = require('http');
var appSever = require('./server');
// const server = http.createServer(async (request, response) => {
//     if(request.method === 'GET' && request.url === '/') {
//         response.statusCode = 200;
//         response.end()
//     }
// });
// server.listen(3001, () => {
//     console.log(`Server started at port: 3001`)
// })
appSever.listen('3001', function () {
    console.log('server at 3001');
});
//# sourceMappingURL=index.js.map