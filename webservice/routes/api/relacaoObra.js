#!/bin/env node

module.exports = function (app) {
    app.post('/api/relacaoObra/cadastrar', new Token().acessoRestrito, function (req, res) {
        var dao = new DaoRelacaoObra();
        var daoObra = new DaoObra();
        var daoUsuario = new DaoUsuario();
        var relacaoObra = new RelacaoObra();

        if (relacaoObra.json(JSON.parse(req.body.relacaoObra))) {

            relacaoObra.setData("DayISO");
            relacaoObra.setIdUsuarioSolicitante(req.token.getUsuarioId());
            relacaoObra.setEstado("pendente");
            relacaoObra.setAtivo(1);

            daoUsuario.prestadorExiste(relacaoObra.getIdUsuarioPrestador(),function(error,result){
                if(error){
                    res.status(200).json({
                        err: 'Prestador de serviço não existe ou usuário não é prestador de serviço'
                    })
                }
                else{
                    daoObra.recuperarObra(relacaoObra.getIdObra(), function (error2, result2) {
                        if (error2) {
                            res.status(200).json({
                                err: error
                            })
                        } else {
                            if (result2.idUsuario == req.token.getUsuarioId()) {
                                dao.buscarRelacaoObraComArgumentos(relacaoObra.getIdObra(), req.token.getUsuarioId(), relacaoObra.getIdUsuarioPrestador(), function (error4, result4) {
                                    if (error4) {
                                        res.status(200).json({
                                            err: error4
                                        })
                                    } else {
                                        if (result4) {
                                            res.status(200).json({
                                                err: "Ja possui uma relacao de obra com estes parametros."
                                            })
                                        } else {
                                            dao.add(relacaoObra, function (error3, result3) {
                                                if (error3) {
                                                    res.status(500).json({
                                                        err: error3
                                                    })
                                                } else {
                                                    res.status(200).json({
                                                        result: result3
                                                    })
                                            //lançar notificacao para o prestador de serviço
                                        }
                                    });
                                        }
                                    }
                                });
                            } else {
                                res.status(200).json({
                                    result: "Este usuário não é dono desta obra."
                                })
                            }
                        }
                    });
                }
            });

        } else {
            res.status(422).json({
                err: "Estrutura da relacao obra errada."
            })
        }
    });

    app.post('/api/relacaoObra/buscarRelacoesObraDoPrestador', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();
        var util = require('util');

        var idPrestador = req.body.idUsuarioPrestador;

        if(idPrestador && typeof idPrestador === 'string'){
            dao.buscarRelacoesObrasDoPrestadorComId(idPrestador,function(error,result){
                if(error){
                    res.status(200).json({
                        err: error
                    })
                }
                else{
                    res.status(200).json({
                        result: result
                    })
                }
            });
        }else{
            res.status(422).json({
                err: "id do prestador faltante ou no formato errado."
            })
        }
    });

    app.post('/api/relacaoObra/removerRelacaoObra', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();

        var idRelacaoObra = req.body.idRelacaoObra;

        var idUsuario = req.token.getUsuarioId();

        if(idRelacaoObra && typeof idRelacaoObra === 'string'){
            dao.removerRelacaoObra(idRelacaoObra,idUsuario,function(error,result){
                if(error){
                    res.status(200).json({
                        err: error
                    })
                }
                else{
                    //notificacao para o prestador
                    res.status(200).json({
                        result: result
                    })
                }
            });
        }else{
            res.status(422).json({
                err: "id da idRelacaoObra faltante ou no formato errado."
            })
        }
    });

    app.post('/api/relacaoObra/avaliarRelacaoObra', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();
        var util = require('util');

        var idRelacaoObra = req.body.idRelacaoObra;
        var avaliacao = req.body.avaliacao;

        if(typeof avaliacao === 'string'){
            avaliacao = parseInt(avaliacao, 10);
        }

        var idUsuario = req.token.getUsuarioId();

        if(idRelacaoObra && typeof idRelacaoObra === 'string'){
            if(avaliacao && typeof avaliacao === 'number'){
                dao.avaliarRelacaoObra(idRelacaoObra,idUsuario,avaliacao,function(error,result){
                    if(error){
                        res.status(200).json({
                            err: error
                        })
                    }
                    else{
                    //notificacao para o prestador
                    res.status(200).json({
                        result: result
                    })
                }
            });
            }
            else{
                console.log('Avaliacao da RelacaoObra faltante ou no formato errado.');
                res.status(422).json({
                    err: "Avaliacao da RelacaoObra faltante ou no formato errado."
                })
            }
        }else{
            console.log('id da idRelacaoObra faltante ou no formato errado.');
            res.status(422).json({
                err: "id da idRelacaoObra faltante ou no formato errado."
            })
        }
    });

    app.post('/api/relacaoObra/comentarRelacaoObra', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();
        var util = require('util');

        var idRelacaoObra = req.body.idRelacaoObra;
        var comentario = req.body.comentario;

        var idUsuario = req.token.getUsuarioId();

        if(idRelacaoObra && typeof idRelacaoObra === 'string'){
            if(comentario && typeof comentario === 'string'){
                dao.comentarRelacaoObra(idRelacaoObra,idUsuario,comentario,function(error,result){
                    if(error){
                        res.status(200).json({
                            err: error
                        })
                    }
                    else{
                    //notificacao para o prestador
                    res.status(200).json({
                        result: result
                    })
                }
            });
            }
            else{
                res.status(422).json({
                    err: "Comentario da RelacaoObra faltante ou no formato errado."
                })
            }
        }else{
            res.status(422).json({
                err: "id da idRelacaoObra faltante ou no formato errado."
            })
        }
    });

    app.post('/api/relacaoObra/responder', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();
        var util = require('util');

        var idRelacaoObra = req.body.idRelacaoObra;
        var resposta = req.body.resposta;

        var idUsuario = req.token.getUsuarioId();

        if(idRelacaoObra && typeof idRelacaoObra === 'string'){
            if(resposta && typeof resposta === 'string'){
                if(resposta == 'aceita' || resposta == 'rejeitada' || resposta == 'abandonada'){
                    dao.responderProposta(idRelacaoObra,idUsuario,resposta,function(error,result){
                        if(error){
                            res.status(200).json({
                                err: error
                            })
                        }
                        else{
                    //notificacao para o solicitante
                    res.status(200).json({
                        result: result
                    })
                }
            });
                }
                else{
                    res.status(422).json({
                        err: "Tipo de resposta inválido, escolher (aceita) ou (rejeitada) ou (abandonada)."
                    })
                }
            }
            else{
                res.status(422).json({
                    err: "Resposta da RelacaoObra faltante ou no formato errado."
                })
            }
        }else{
            res.status(422).json({
                err: "id da idRelacaoObra faltante ou no formato errado."
            })
        }
    });

    app.post('/api/relacaoObra/buscarRelacoesDaObra', new Token().acessoRestrito, function(req, res){
        var dao = new DaoRelacaoObra();
        var util = require('util');

        var idObra = JSON.parse(req.body.idObra);

        if(idObra && typeof idObra === 'string'){
            dao.buscarRelacoesObrasDaObra(idObra,function(error,result){
                if(error){
                    res.status(200).json({
                        err: error
                    })
                }
                else{
                    res.status(200).json({
                        result: result
                    })
                }
            });
        }else{
            res.status(422).json({
                err: "id da obra faltante ou no formato errado."
            })
        }
    });

}