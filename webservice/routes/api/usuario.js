#!/bin/env node

module.exports = function (app) {
    // app.post('/api/usuario/me', new Token().acessoRestrito, function (req, res) {
    //     res.status(200).json({
    //         teste: "1"
    //     });
    // });

    app.post('/api/usuario/entrar', new Token().acessoLivre, function (req, res) {
        var daoUsuario = new DaoUsuario();
        var usuario = new Usuario();

        if (usuario.json(req.body.usuario)) {
            if (usuario.getEmail() != undefined &&
                usuario.getEmail() != "" &&
                usuario.getSenha() != undefined &&
                usuario.getSenha() != ""
            ) {
                console.log('1');
                daoUsuario.entrar(usuario, function (err,result) {
                    if (typeof new Object == typeof result && result != null && result != undefined) {

                        console.log('2');

                        usuario = new Usuario();
                        usuario.json(result);
                        var tkn = new Token({
                            usuario_id: usuario.getId()
                        });
                        daoToken = new DaoToken();
                        daoToken.renovar(tkn, function (result) {

                            console.log('3');

                            if (result) {

                                console.log('4');

                                var arr = new Array();
                                arr.push(JSON.parse(usuario.jsonString()));
                                arr.push(JSON.parse(tkn.jsonString()));
                                res.status(200).json({
                                    result: arr
                                });
                            } else {
                                res.status(200).json({
                                    err: "Erre Desconhecido."
                                });
                            }
                        });
                    } else {
                        res.status(200).json({
                            err: "E-mail ou senha incorreto."
                        });
                    }
                });
            } else {
                res.status(200).json({
                    err: "E-mail ou senha incorreto."
                });
            }
        } else {
            res.status(200).json({
                err: "Erro de formato do usuário."
            });
        }
    });

    app.post('/api/usuario/cadastrar/1', new Token().acessoLivre, function (req, res) {
        var daoUsuario = new DaoUsuario();
        var usuario = new Usuario();
        var imageFileName = uuid.v1();
        if (req.files.userImage) {
            if (req.files.userImage.type == "image/png") {
                imageFileName = imageFileName + ".png";
            } else if (req.files.userImage.type == "image/jpeg") {
                imageFileName = imageFileName + ".jpg";
            } else {
                imageFileName = undefined;
            }
        }
        console.log('O que veio no body');
        console.log(req.body);
        if (usuario.json(req.body.usuario)) {
            usuario.setFoto(imageFileName);
            daoUsuario.add(usuario, function (result) {
                if (result == "-1") {
                    // erro generico
                    res.status(200).json({
                        err: "Não foi possível cadastrar o usuário. Verifique as informações inseridas e tente novamente mais tarde."
                    });
                } else if (result == "-2") {
                    res.status(200).json({
                        err: 1111
                    });
                } else {
                    var tkn = new Token({
                        usuario_id: result[0]._id.toString()
                    });
                    daoToken = new DaoToken();
                    daoToken.renovar(tkn, function (result) {
                        if (result) {
                            if (imageFileName) {
                                require("fs-extra").move(req.files.userImage.path, process.env.OPENSHIFT_DATA_DIR + "uploadedFiles/userImages/" + imageFileName, function (err) {
                                    if (err) {
                                        res.status(200).json({
                                            err: "Erro ao mover imagem no servidor."
                                        });
                                    } else {
                                        res.status(200).json({
                                            result: tkn.jsonString(),
                                            usuario: usuario
                                        });
                                    }
                                });
                            } else {
                                res.status(200).json({
                                    result: tkn.jsonString()
                                });
                            }
                        } else {
                            res.status(200).json({
                                err: "Não foi possível armazenar as informações do cadastro. Tente novamente mais tarde."
                            });
                        }
                    });
                }
            });
        } else {
            res.status(200).json({
                err: "Informações inválidas."
            });
        }
    });

    app.post('/api/usuario/me', new Token().acessoRestrito, function (req, res) {

        var usuarioId = req.token.getUsuarioId();

        var daoUsuario = new DaoUsuario();

        daoUsuario.getUsuario(usuarioId, function (err, result) {
            if (err) {
                res.status(200).json({
                    err: err
                });
            } else {
                res.status(200).json({
                    result: result
                });
            }
        });

    });

    app.post('/api/usuario/getUsuario', new Token().acessoRestrito, function (req, res) {

        var usuarioId = JSON.parse(req.body.usuarioId);

        var daoUsuario = new DaoUsuario();

        daoUsuario.getUsuario(usuarioId, function (err, result) {
            if (err) {
                res.status(200).json({
                    err: err
                });
            } else {
                res.status(200).json({
                    result: result
                });
            }
        });

    });

    app.post('/api/usuario/setPrestadorServico', new Token().acessoRestrito, function (req, res) {
        var usuarioId = req.token.getUsuarioId();
        var daoUsuario = new DaoUsuario();
        daoUsuario.setPrestadorServico(usuarioId, function (err, result) {
            if (err) {
                res.status(200).json({
                    err: err
                });
            } else {
                res.status(200).json({
                    result: result
                });
            }
        });
    });

    app.post('/api/usuario/atualizar', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoUsuario();
        var usuario = new Usuario();
        var imageFileName = uuid.v1();
        if (req.files.userImage) {
            if (req.files.userImage.type == "image/png") {
                imageFileName = imageFileName + ".png";
            } else if (req.files.userImage.type == "image/jpeg") {
                imageFileName = imageFileName + ".jpg";
            } else {
                imageFileName = undefined;
            }
        }

        if (usuario.json(req.body.usuario)) {
            if(req.files.userImage){
                usuario.setFoto(imageFileName);
            } else{
                imageFileName = undefined;
            }

            if(usuario.getId() == req.token.getUsuarioId()){
                dao.atualizarUsuario(usuario, function (error, result) {
                    if (error) {
                        res.status(200).json({
                            err: error
                        })
                    } else {
                        if (imageFileName) {
                            require("fs-extra").move(req.files.userImage.path, process.env.OPENSHIFT_DATA_DIR + "uploadedFiles/userImages/" + imageFileName, function (err) {
                                if (err) {
                                    res.status(200).json({
                                        err: "Erro ao mover imagem no servidor."
                                    });
                                } else {
                                    res.status(200).json({
                                        result: result,
                                        imageFileName: imageFileName
                                    })
                                }
                            });
                        } else {
                            res.status(200).json({
                                result: result
                            })
                        }
                    }
                });
            } else{
                res.status(422).json({
                    err: "Apenas o próprio usuário pode atualiza-lo."
                })
                console.log("Apenas o próprio usuário pode atualiza-lo.");
            }

        } else {
            res.status(422).json({
                err: "Estrutura do usuário errada."
            })
            console.log("Estrutura do usuário errada.");
        }
    });

    app.post('/api/usuario/atualizarTags', new Token().acessoRestrito, function (req, res) {

        var usuarioId = req.token.getUsuarioId();
        var daoUsuario = new DaoUsuario();
        var util = require('util');
        var tags = req.body.tags;
        //var tags = JSON.parse(req.body.tags);

        if (tags && util.isArray(tags)) {
            daoUsuario.atualizarTags(usuarioId, tags, function (err, result) {
                if (err) {
                    res.status(200).json({
                        err: err
                    });
                } else {
                    res.status(200).json({
                        result: result
                    });
                }
            });
        } else {
            res.status(200).json({
                err: 'Lista de tags vazia ou com formato errado.'
            });
        }

    });
}