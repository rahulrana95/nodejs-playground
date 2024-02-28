var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.status(200);
    res.json({
        message: 'hello'
    });
});
module.exports = app;
//# sourceMappingURL=server.js.map