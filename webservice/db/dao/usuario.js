#!/bin/env node

function DaoUsuario() {
    this.add = function (usuario, fcb) {
        this.emailUso(usuario, function (uso) {
            if (uso) {
                fcb("-2");
            } else {
                var clt = dbCon[0].collection("Usuario");
                usuario.setAtivo(1);
                clt.insert(usuario, {
                    w: 1
                }, function (err, result) {
                    if (err) {
                        fcb("-1");
                    } else {
                        var email = "<br>Olá!<br><br>Seja bem-vindo ao ReformandoApp, o melhor lugar para você você cuidar da sua reforma!<br><br>Qualquer dúvida ou sugestão, nós estamos à disposição através do e-mail <a href='mailto:contato@reformandoapp.com'>contato@reformandoapp.com</a>.<br><br>Atenciosamente,<br><strong>Equipe ReformandoApp</strong><br><a href='http://reformandoapp.com' target='_blank'>http://reformandoapp.com</a><br>";
                        var e = new Email(usuario.getEmail(), "Bem-vindo ao ReformandoApp!", email);
                        e.enviar(function (result) {});
                        fcb(result);
                    }
                });
            }
        });
    }

    this.getUsuario = function (idUsuario, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.findOne({
            _id: ObjectId(idUsuario),
            ativo: 1
        },{senha:0}, function (err, result) {
            if (err) {
                fcb(err, 'Usuário não encontrado.');
            } else {
                fcb(null, result);
            }
        });
    }

    this.atualizarTags = function (idUsuario, tags, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.update({
            "_id": ObjectId(idUsuario)
        }, {
            $set: {
                "tags": tags
            }
        }, {
            w: 1
        }, function (err, result) {
            fcb(err, result);
        });
    }

    this.setPrestadorServico = function (idUsuario, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.update({
            "_id": ObjectId(idUsuario)
        }, {
            $set: {
                "prestadorServico": true,
                ativo: 1
            }
        }, {
            w: 1
        }, function (err, result) {

            fcb(err, result);
        });
    }

    this.getUsuariosComTags = function (tags, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.find({
            tags: {
                $in: tags
            },
            prestadorServico: true,
            ativo: 1
        },{senha:0}).toArray(function (err, items) {
            fcb(err, items);
        });
    }

    this.getUsuariosComNomeETags = function (nome,tags, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.find({
            nome: {
                $regex: "^.*"+nome+".*$"
            },
            tags: {
                $in: tags
            },
            prestadorServico: true,
            ativo: 1
        },{senha:0}).toArray(function (err, items) {
            fcb(err, items);
        });
    }

    this.entrar = function (usuario, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.findOne({
            senha: usuario.getSenha(),
            email: usuario.getEmail()
        }, function (err, result) {
            fcb(err,result);
        });
    }

    this.prestadorExiste = function (idPrestador, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.findOne({
            _id: ObjectId(idPrestador),
            prestadorServico: true,
            ativo: 1
        }, function (err, result) {
            if (err) {
                fcb(err, 'Erro ao achar prestador');
            } else {
                if (result == null) {
                    fcb('nao existe este ', null);
                } else {
                    fcb(null, result);
                }
            }
        });
    }

    this.atualizarUsuario = function (usuario,fcb){
        var clt = dbCon[0].collection("Usuario");

        clt.update({"_id":ObjectId(usuario.id)}, { $set:{
            "nome":usuario.nome,
            "telefone":usuario.telefone,
            "cep":usuario.cep,
            "rua":usuario.rua,
            "cidade":usuario.cidade,
            "numero":usuario.numero,
            "complemento":usuario.complemento,
            "tags":usuario.tags,
            "descricao":usuario.descricao,
            "foto":usuario.foto}}, {w:1}, function(err, result) {

            fcb(err,result);
        });

        //fcb(obra,obra);
    }

    this.emailUso = function (usuario, fcb) {
        var clt = dbCon[0].collection("Usuario");
        clt.findOne({
            email: usuario.getEmail()
        }, {
            w: 1
        }, function (err, result) {
            if (err) {
                fcb(false);
            } else {
                if (result) {
                    fcb(true);
                } else {
                    fcb(false);
                }
            }
        });
    }
}

module.exports = DaoUsuario;