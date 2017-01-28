#!/bin/env node

/*require('./webservice/config/db-library-model.js')();

var app = require('./webservice/config/express.js')();

var serverPort = process.env.PORT || 8080;
process.env.TZ = 'America/Sao_Paulo';

var server = app.listen(serverPort, function () {
    console.log("***** Servidor rodando: " + new Date().toISOString() + " na porta: " + port + " *****");
});

require('./webservice/config/socket.js')(server, app);*/


var ipaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
process.env.TZ = 'America/Sao_Paulo';

require('./webservice/config/db-library-model.js')();

var app = require('./webservice/config/express.js')();

var server = app.listen(port, ipaddr);

require('./webservice/config/socket.js')(server, app);

console.log("***** " + new Date().toISOString() + " | porta: " + port + " *****");