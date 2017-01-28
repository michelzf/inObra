#!/bin/env node
 // versão 4
function Email(para, assunto, corpoHtml, corpoTxt) {
    var config = {};
    var op = {};
    var transporter = undefined;

    this.construtor = function (para, assunto, corpoHtml, corpoTxt) {
        config = {
            host: '200.147.36.31',
            port: 587,
            //        secure: true, // use SSL
            auth: {
                user: 'info@inopus.com.br',
                pass: 'Info12@23'
            }
        };
        if (corpoTxt == undefined && corpoHtml == undefined) {
            corpoHtml = "(Mensagem em branco)";
            corpoTxt = "(Mensagem em branco)";
        } else if (corpoTxt == undefined && corpoHtml != undefined) {
            corpoTxt = "Essa mensagem só pode ser lida em HTML";
        } else if (corpoHtml == undefined && corpoTxt != undefined) {
            corpoHtml = "Essa mensagem só pode ser lida em texto puro";
        }
        op = {
            from: '"Info" <info@inopus.com.br>',
            to: para, // list of receivers separados por virgula
            replyTo: '"Inopus" <contato@inopus.com.br>',
            subject: assunto,
            text: corpoTxt,
            html: corpoHtml
        };
        transporter = require('nodemailer').createTransport(config);
    }

    this.enviar = function (f) {
        transporter.sendMail(op, function (error, info) {
            if (error) {
                console.log("***** Erro ao enviar o e-mail: " + error + " *****");
                f(false, error);
            } else {
                //                re = new RegExp("250 2.0.0 Ok");
                //                if (re.exec(info.response)) {
                f(true, info.response);
                //                } else {
                //                    console.log("***** Nao deu erro mas : " + info.response + " *****");
                //                }
            }
        });
    }

    this.construtor(para, assunto, corpoHtml, corpoTxt);
}

module.exports = Email;