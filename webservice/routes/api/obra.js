#!/bin/env node

module.exports = function (app) {
    app.post('/api/obra/cadastrar', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();
        var obra = new Obra();
        var imageFileName = uuid.v1();
        if (req.files.obraImage) {
            if (req.files.obraImage.type == "image/png") {
                imageFileName = imageFileName + ".png";
            } else if (req.files.obraImage.type == "image/jpeg") {
                imageFileName = imageFileName + ".jpg";
            } else {
                imageFileName = undefined;
            }
        }
        if (obra.json(JSON.parse(req.body.obra))) {
            obra.setFoto(imageFileName);
            obra.setIdUsuario(ObjectId(req.token.getUsuarioId()));

            dao.add(obra, function (error, result) {
                if (error) {
                    res.status(200).json({
                        err: error
                    })
                } else {
                    if (req.files.obraImage) {
                        require("fs-extra").move(req.files.obraImage.path, process.env.OPENSHIFT_DATA_DIR + "uploadedFiles/obraImages/" + imageFileName, function (err) {
                            if (err) {
                                res.status(200).json({
                                    err: "Erro ao mover imagem no servidor."
                                });
                            } else {
                                res.send(obra);
                            }
                        });
                    }else{
                        res.send(obra);
                    }
                }
            });
        } else {
            res.status(422).json({
                err: "Estrutura da obra errada."
            })
        }
    });

    app.post('/api/obra/atualizarAndamento', new Token().acessoRestrito, function(req,res){
        var dao = new DaoObra();
        var util = require('util');

        var idObra = req.body.idObra;
        var andamento = req.body.andamento;

        var idUsuario = req.token.getUsuarioId();

        if(idObra && typeof idObra === 'string'){
            if(andamento && typeof andamento === 'string'){
                if(andamento == 'concluida' || andamento == 'cancelada' || andamento == 'iniciada' || andamento == 'pausada'){
                    dao.modificarAndamento(idObra,idUsuario,andamento,function(error,result){
                        if(error){
                            res.status(200).json({
                                err: error
                            })
                        }
                        else{
                    //notificacao para os prestadores
                    res.status(200).json({
                        result: result
                    })
                }
            });
                }
                else{
                 res.status(422).json({
                    err: "Andamento da obra com valor errado, escolher entre (concluida), (cancelada), (iniciada) ou (pausada)."
                }) 
             }
         }
         else{
            res.status(422).json({
                err: "Andamento da Obra faltante ou no formato errado."
            })
        }
    }else{
        res.status(422).json({
            err: "id da obra faltante ou no formato errado."
        })
    }
});

    app.post('/api/obra/buscar', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();

        dao.listarObras(req.token.getUsuarioId(), function (err, items) {
            if (err) {
                res.send(err);
            } else {
                res.send(items);
            }
        });
    });

    app.post('/api/obra/buscarObrasComIds', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();

        var listaObraIds = JSON.parse(req.body.obraIds);

        if(listaObraIds){
            if(Object.prototype.toString.call( listaObraIds ) === '[object Array]'){
                dao.listarObrasComIds(listaObraIds, function (err, items) {
                    if (err) {
                        res.status(200).json({
                            err: err
                        })
                    } else {
                        res.status(200).json({
                            result: items
                        })
                    }
                });
            }
            else{
                res.status(200).json({
                    err: 'Lista de ids de obras no formato errado.'
                })
            }
        }
        else{
            res.status(200).json({
                err: 'Lista de ids de obras faltante.'
            })
        }
    });

    app.post('/api/obra/buscarUnica', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();

        var idObra = req.body.idObra;

        if (idObra && idObra.length == 24) {
            dao.recuperarObra(idObra, function (err, result) {
                if (err) {
                    res.status(200).json({
                        err: err
                    })
                } else {
                    res.status(200).json({
                        result: result
                    })
                }
            });
        } else {
            res.status(422).json({
                err: "idObra inválido."
            })
        }
    });

    app.post('/api/obra/atualizar', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();
        var obra = new Obra();
        var imageFileName = uuid.v1();
        if (req.files.obraImage) {
            if (req.files.obraImage.type == "image/png") {
                imageFileName = imageFileName + ".png";
            } else if (req.files.obraImage.type == "image/jpeg") {
                imageFileName = imageFileName + ".jpg";
            } else {
                imageFileName = undefined;
            }
        }

        if (obra.json(req.body.obra)) {
            if(req.files.obraImage){
                // TO DO
                // Excluir foto antiga
                obra.setFoto(imageFileName);
            }
            dao.verificarDono(obra.getId(),req.token.getUsuarioId(),function(error2,result2){
                if(error2){
                    res.status(200).json({
                        err: error2
                    })
                }
                else{
                    if (req.files.obraImage) {
                        require("fs-extra").move(req.files.obraImage.path, process.env.OPENSHIFT_DATA_DIR + "uploadedFiles/obraImages/" + imageFileName, function (err) {
                            if (err) {
                                res.status(200).json({
                                    err: "Erro ao mover imagem no servidor."
                                });
                            } else {
                                dao.atualizarObra(obra, function (error, result) {
                                    if (error) {
                                        res.status(200).json({
                                            err: error
                                        })
                                    } else {
                                        res.status(200).json({
                                            result: result,
                                            obra: obra
                                        })
                                    }
                                });
                            }
                        });
                    }else{
                        dao.atualizarObra(obra, function (error, result) {
                            if (error) {
                                res.status(200).json({
                                    err: error
                                })
                            } else {
                                res.status(200).json({
                                    result: result,
                                    obra: obra
                                })
                            }
                        });
                    }
                }
            });

        } else {
            res.status(422).json({
                err: "Estrutura da obra errada."
            })
        }
    });

    app.post('/api/obra/remove', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoObra();

        var idObra = req.body.idObra;

        if (idObra && idObra.length > 0) {
            dao.inative(req.token.getUsuarioId(), idObra, function (err, items) {
                if (err) {
                    res.status(200).json({
                        err: err
                    })
                } else {
                    res.status(200).json({
                        result: items
                    })
                }
            });
        } else {
            res.status(422).json({
                err: "Erro no id da obra."
            })
        }
    });

}