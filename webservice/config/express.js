#!/bin/env node

module.exports = function () {
    var express = require("express");

    var app = express();

    app.use(express.static('./webapp'));

    if (process) {
        if (process.env) {
            if (process.env.OPENSHIFT_DATA_DIR) {
                app.use(express.static(process.env.OPENSHIFT_DATA_DIR));
            }
        }
    }

    app.use('/api/*', function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        new require('formidable').IncomingForm().parse(req, function (err, fields, files) {
            if (err) {
                console.log("*** Erro IncomingForm().parse ***");
                console.log(err);
                res.sendStatus(500);
                res.send("incomingForm.parse");
            } else {
                req.body = fields;
                if (!req.body) {
                    req.body = new Object();
                }
                req.files = files;
                if (!req.files) {
                    req.files = new Object();
                }
                next();
            }
        });
    });

    // Rotas do app (express)
    require('../routes/api/obra.js')(app);
    require('../routes/default.js')(app);
    require('../routes/api/usuario.js')(app);
    require('../routes/api/relacaoObra.js')(app);
    require('../routes/api/tags.js')(app);

    return app;
};