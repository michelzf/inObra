#!/bin/env node

exports.senha = function (senha) {
    // senha de acesso a conta
    if (/^((.){6,})$/.test(senha)) {
        return true;
    } else {
        return false;
    }
}

exports.email = function (email) {
    // email
    if (/^([a-z0-9\._-]{1,30})@([a-z0-9_\.-]{2,30})\.([a-z0-9_\.-]{2,30})$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

exports.data = function (data) {
    // data no formato aaaa-mm-dd hh:mm:ss
    if (/^(([0-9]{4})-((0[0-9])|(1[0-2]))-(([0-3][0-9])|((30)|(31))) ((0|1|2)([0-9])):((0|1|2|3|4|5|6)([0-9])):((0|1|2|3|4|5|6)([0-9])))$/.test(data)) {
        return true;
    } else {
        return false;
    }
}

exports.hash = function (hash) {
    // hash (128 caracteres com numero e letras de A até F)
    if (/^([0-9a-fA-F]{128})$/.test(hash)) {
        return true;
    } else {
        return false;
    }
}