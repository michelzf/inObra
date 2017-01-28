#!/bin/env node

function RelacaoObra() {
    this.id = undefined;
    this.idObra = undefined;
    this.idUsuarioPrestador = undefined;
    this.idUsuarioSolicitante = undefined;
    this.ativo = undefined;
    this.data = undefined;
    this.estado = undefined;
    this.avaliacao = undefined;
    this.comentario = undefined;
    this.chatId = undefined;
    this.preco = undefined;

    this.jsonString = function (senha) {

        var j = JSON.stringify(this);


        return j;
    }

    this.json = function (j) {
        var ok = false;
        if (typeof j == typeof "x") {
            j = JSON.parse(j);
            ok = true;
        } else if (typeof j == typeof new Object) {
            ok = true;
        } else {
            ok = false;
        }
        if (ok && j) {
            // aqui dentro tem que ter todos os sets
            if (j.id == undefined || j.id == "undefined" || j.id == "" || j.id == 0 || j.id == "0") {
                this.setId(j._id); // id do mongo
            } else {
                this.setId(j.id);
            }

            return this.setIdObra(j.idObra) && this.setIdUsuarioSolicitante(j.idUsuarioSolicitante) && this.setIdUsuarioPrestador(j.idUsuarioPrestador)
             && this.setAtivo(j.ativo) && this.setData(j.data) && this.setEstado(j.estado) && this.setChatId(j.chatId) && this.setPreco(j.preco) 
             && this.setAvaliacao(j.avaliacao) && this.setComentario(j.comentario);

        } else {
            return false;
        }
    }

    this.setId = function (id) {
        // verificar se eh um id valido (o id do mongo)
        this.id = id;
        return true;
    }

    this.getChatId = function () {
        return this.chatId;
    }

    this.setChatId = function (chatId) {
        this.chatId = chatId;
        return true;
    }

    this.getId = function () {
        return this.id;
    }

    this.setPreco = function (preco) {
        this.preco = preco;
        return true;
    }

    this.getPreco = function () {
        return this.preco;
    }

    this.setIdObra = function (idObra) {
        this.idObra = idObra;
        return true;
    }

    this.getIdObra = function () {
        return this.idObra;
    }

    this.setAvaliacao = function (avaliacao) {
        this.avaliacao = avaliacao;
        return true;
    }

    this.getAvaliacao = function () {
        return this.avaliacao;
    }

    this.setComentario = function (comentario) {
        this.comentario = comentario;
        return true;
    }

    this.getComentario = function () {
        return this.comentario;
    }

    this.setIdUsuarioSolicitante = function (idUsuarioSolicitante) {
        this.idUsuarioSolicitante = idUsuarioSolicitante;
        return true;
    }

    this.getIdUsuarioSolicitante = function () {
        return this.idUsuarioSolicitante;
    }

    this.setIdUsuarioPrestador = function (idUsuarioPrestador) {
        this.idUsuarioPrestador = idUsuarioPrestador;
        return true;
    }

    this.getIdUsuarioPrestador = function () {
        return this.idUsuarioPrestador;
    }

    this.setAtivo = function (ativo) {
        this.ativo = ativo;
        return true;
    }

    this.getAtivo = function () {
        return this.ativo;
    }

    this.setData = function (data) {
        this.data = data;
        return true;
    }

    this.getData = function () {
        return this.data;
    }

    this.setEstado = function (estado) {
        this.estado = estado;
        return true;
    }

    this.getEstado = function () {
        return this.estado;
    }

}

module.exports = RelacaoObra;