#!/bin/env node

module.exports = function (app) {
    app.all('/404', new Token().acessoLivre, function (req, res) {
        res.status(404);
        res.send("Not Found");
    });

    app.post("/api/teste/restrito", new Token().acessoRestrito, function (req, res) {
        res.send("Acesso Restrito: " + req.body.teste + "; " + req.token.getSeq());
    });

    app.post("/api/teste/livre", new Token().acessoLivre, function (req, res) {
        res.send("Acesso Livre: " + req.body.teste + "; " + req.token.getSeq());
    });
}