#!/bin/env node

module.exports = function () {
    // Banco de dados
    require('../db/conexao.js')();

    // Instanciação dos models
    Usuario = require("../model/Usuario.js");
    Obra = require("../model/Obra.js");
    PerfilPrestadorServico = require("../model/PerfilPrestadorServico.js");
    PerfilSolicitante = require("../model/PerfilSolicitante.js");
    RelacaoObra = require("../model/RelacaoObra.js");

    // Ativação ou instanciação das bibliotecas
    //    mhash = require("mhash");
    crypto = require('crypto');
    uuid = require('node-uuid');
    //    uuid = require('node-uuid');"node-uuid": "*",uuid.v1()
    valida = require("../library/Valida.js");
    Email = require("../library/Email.js");
    require("../library/Token.js");
    WebSocketServer = require('ws').Server;

    // Instanciação dos DAOs
    DaoUsuario = require("../db/dao/usuario.js");
    DaoObra = require("../db/dao/obra.js");
    DaoRelacaoObra = require("../db/dao/relacaoObra.js");
};