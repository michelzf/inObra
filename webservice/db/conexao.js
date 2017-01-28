#!/bin/env node

dbCon = new Array();

module.exports = function () {
    console.log(process.env.OPENSHIFT_MONGODB_DB_URL);
    console.log(process.env.OPENSHIFT_APP_NAME);
    require('mongodb').MongoClient.connect("mongodb://admin:L1ekd6r9cy3K@5887c96289f5cf3c49000163-inopus2obra.rhcloud.com:63141/app", function (err, conn) {
        //    require('mongodb').MongoClient.connect("mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT", function (err, conn) {
        if (err) {
            console.log('Houve um erro na conexão com o BD. Erro: ' + err);
            dbCon[0] = undefined;
        } else {
            console.log('Conexão com o BD criada com sucesso!');
            dbCon[0] = conn;
        }
    });
    ObjectId = require('mongodb').ObjectID;
}