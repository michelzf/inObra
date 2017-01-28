#!/bin/env node

module.exports = function (server, app, nome) {
    var websocketserver = new WebSocketServer({
        server: server,
        autoAcceptConnections: false,
        path: "/socket/InChat/" + nome
    });

    InChat = new Array(); // InChat na veradde é o participantes dentro do InChat onde a posição é o id (e.g.: InChat["id_da_clt_no_db"]); essa variavel só deve ser utilizada pela classe DaoInChat.

    websocketserver.on("connection", function (wss) {
        wss.on("message", function (msgIn) {
            msgIn = JSON.parse(msgIn);
            msgIn.token = new Token(msgIn.token);
            new Token().valido(msgIn.token, function (result) {
                if (result) {
                    var daoInChat = new DaoInChat();
                    daoInChat.participantesBusca(msgIn.token.getUsuarioId(), msgIn.chatId, function (participantes) {
                        if (participantes == "-1") {
                            wss.send(JSON.stringify({
                                mensagem: "#@!:401:Unauthorized"
                            }));
                        } else {
                            if (msgIn.mensagem == "#@!:001:Open") {
                                daoInChat.participantesNovo(msgIn.chatId, {
                                        usuario_id: msgIn.token.getUsuarioId(),
                                        wss: wss,
                                        nick: msgIn.nick
                                    },
                                    function (result) {
                                        if (!result) {
                                            wss.send(JSON.stringify({
                                                mensagem: "#@!:401:Unauthorized"
                                            }));
                                        } else {
                                            var msgOut = {
                                                usuarioId: msgIn.token.getUsuarioId(),
                                                chatId: msgIn.chatId,
                                                data: new Date(),
                                                nick: msgIn.nick,
                                                mensagem: "#@!:002:Entrou"
                                            }
                                            participantes.forEach(function (participante) {
                                                if (participante.usuario_id == msgIn.token.getUsuarioId()) {
                                                    participante.nick = msgIn.nick;
                                                }
                                                if (participante.wss) {
                                                    if (participante.wss.readyState == 1) {
                                                        participante.wss.send(JSON.stringify(msgOut));
                                                    }
                                                }
                                            });
                                        }
                                    });
                            } else {
                                var msgOut = {
                                    chatId: msgIn.chatId,
                                    usuarioId: msgIn.token.getUsuarioId(),
                                    data: new Date(),
                                    nick: msgIn.nick,
                                    mensagem: msgIn.mensagem
                                }
                                if (daoInChat.historicoMsg()) {
                                    daoInChat.historicoMsgGravar(msgOut, function (err, msg) {
                                        if (err) {
                                            console.log("******* Erro ao gravar a mensagem no banco de dados *******: " + err);
                                            console.log(msg); // em msg eu tenho a mensagem que deu erro
                                        }
                                    });
                                }
                                participantes.forEach(function (participante) {
                                    if (participante.wss) {
                                        if (participante.wss.readyState == 1) {
                                            participante.wss.send(JSON.stringify(msgOut));
                                        } else {
                                            var msgOut_saiu = {
                                                usuarioId: participante.usuario_id,
                                                chatId: msgIn.chatId,
                                                data: new Date(),
                                                nick: participante.nick,
                                                mensagem: "#@!:003:Saiu"
                                            }
                                            participantes.forEach(function (p) {
                                                if (p.wss.readyState == 1) {
                                                    p.wss.send(JSON.stringify(msgOut_saiu));
                                                }
                                            });
                                            participante.wss = undefined;
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    wss.send(JSON.stringify({
                        mensagem: "#@!:401:Unauthorized"
                    }));
                }
            });
        });

        wss.on("close", function (event) {
            if (event != "1000") {
                console.log("******* Close Event *******");
                console.log(envent);
            }
        });
    });

    app.post("/api/InChat/" + nome + "/criar", new Token().acessoRestrito, function (req, res) {
        // precisa criar um limite aqui, porque se não pode ficar criando infinitos chats
        var daoInChat = new DaoInChat();
        daoInChat.chatNovo(req.token.getUsuarioId(), function (result) {
            if (result == "-1" || !result) {
                res.status(200).json({
                    err: 1,
                    res: undefined
                });
            } else {
                res.status(200).send({
                    err: undefined,
                    result: result._id
                });
            }
        });
    });

    app.post("/api/InChat/" + nome + "/participantes/adicionar", new Token().acessoRestrito, function (req, res) {
        if (req.body.chatId) {
            if (req.body.usuarioId) {
                var daoInChat = new DaoInChat();
                daoInChat.participantesAdicionar(req.body.chatId, req.token.getUsuarioId(), req.body.usuarioId, function (result) {
                    if (result) {
                        res.status(200).json({
                            err: undefined,
                            res: 1
                        });
                    } else {
                        res.status(200).json({
                            err: 3,
                            res: undefined
                        });
                    }
                });
            } else {
                res.status(200).json({
                    err: 2,
                    res: undefined
                });
            }
        } else {
            res.status(200).json({
                err: 1,
                res: undefined
            });
        }
    });

    app.post("/api/InChat/" + nome + "/participantes/remover", new Token().acessoRestrito, function (req, res) {
        if (req.body.chatId) {
            if (req.body.usuarioId) {
                var daoInChat = new DaoInChat();
                daoInChat.participantesRemover(req.body.chatId, req.token.getUsuarioId(), req.body.usuarioId, function (result) {
                    if (result) {
                        res.status(200).json({
                            err: undefined,
                            res: 1
                        });
                    } else {
                        res.status(200).json({
                            err: 3,
                            res: undefined
                        });
                    }
                });
            } else {
                res.status(200).json({
                    err: 2,
                    res: undefined
                });
            }
        } else {
            res.status(200).json({
                err: 1,
                res: undefined
            });
        }
    });

    app.post("/api/InChat/" + nome + "/participantes/listar", new Token().acessoRestrito, function (req, res) {
        if (req.body.chatId) {
            var daoInChat = new DaoInChat();
            daoInChat.participantesListar(req.body.chatId, req.token.getUsuarioId(), function (result) {
                if (!result) {
                    res.status(200).json({
                        err: 2,
                        result: undefined
                    });
                } else {
                    res.status(200).json({
                        err: undefined,
                        result: result
                    });
                }
            });
        } else {
            res.status(200).json({
                err: 1,
                res: undefined
            });
        }
    });

    app.post("/api/InChat/" + nome + "/mensagem/listar", new Token().acessoRestrito, function (req, res) {

        var chatId = req.body.chatId;

        if(chatId){
            var daoInChat = new DaoInChat();
            daoInChat.buscarHistorico(chatId,function(err,result){
                if(err){
                    res.status(200).json({
                        err: err
                    });
                }
                else{
                    res.status(200).json({
                        result: result
                    });
                }
            });
        }
        else{
            res.status(200).json({
                err: 'ChatId faltante.'
            });
        }

        // var arr = new Array();
        // arr.push({
        //     usuarioId: "57997b944f92c600000ee42c",
        //     chatId: "57a2a71a95179a88deedb789",
        //     data: "2016-08-04T02:01:11.563Z",
        //     nick: "",
        //     mensagem: "aaaaaaaaa"
        // });
        // arr.push({
        //     usuarioId: "574253aa3045f9000031d30d",
        //     chatId: "57a2a71a95179a88deedb789",
        //     data: "2016-08-04T02:02:11.563Z",
        //     nick: "Otávio 1",
        //     mensagem: "bbbbbbbbbbb"
        // });
        // res.status(200).json({
        //     result: arr
        // });
    });

    DaoInChat = function () {
        this.historicoMsg = function () {
            return true; // InChat irá gravar as mensagens enviadas no banco de dados (InChat_msg)
            // return false; // InChat não irá gravar as mensagens enviadas. Se o usuário não estiver conectado, ele não receberá as mensagens.
        }

        this.buscarHistorico = function (idChat, fcb){
            var clt = dbCon[0].collection("InChat_msg");
            clt.find({chatId:ObjectId(idChat)}).toArray(function(err, items){
                fcb(err,items);
            });
        }

        this.historicoMsgGravar = function (msg, fcb) {
            var clt = dbCon[0].collection("InChat_msg");
            msg = {
                chatId: ObjectId(msg.chatId),
                usuarioId: ObjectId(msg.usuarioId),
                data: msg.data,
                nick: msg.nick,
                mensagem: msg.mensagem
            }
            clt.insert(msg, {
                w: 1
            }, function (err, result) {
                if (err) {
                    fcb(1, msg);
                } else {
                    fcb(undefined, result);
                }
            });
        }

        this.participantesListar = function (chatId, usuarioId, fcb) {
            var clt = dbCon[0].collection("InChat");
            clt.findOne({
                "_id": ObjectId(chatId),
                "participantes.usuario_id": ObjectId(usuarioId)
            }, function (err, result) {
                if (err) {
                    fcb(undefined);
                } else {
                    var arr = new Array();
                    result.participantes.forEach(function (i) {
                        arr.push({
                            usuario_id: i.usuario_id,
                            nick: i.nick
                        });
                    });
                    fcb(arr);
                }
            });
        }

        this.participantesRemover = function (chatId, usuarioId, usuarioId_remover, fcb) {
            var clt = dbCon[0].collection("InChat");
            clt.findOne({
                "_id": ObjectId(chatId),
                "participantes.usuario_id": ObjectId(usuarioId)
            }, function (err, result) {
                if (err) {
                    fcb(false);
                } else {
                    if (result) {
                        var jaExiste = false;
                        result.participantes.forEach(function (i) {
                            if (i.usuario_id == usuarioId_remover) {
                                jaExiste = true;
                            }
                        });
                        if (!jaExiste) {
                            fcb(true);
                        } else {
                            result.participantes = result.participantes.filter(function (i) {
                                return i.usuario_id != usuarioId_remover;
                            });
                            clt.update({
                                "_id": ObjectId(chatId)
                            }, {
                                $set: {
                                    "participantes": result.participantes
                                }
                            }, {
                                w: 1
                            }, function (err, result) {
                                if (err) {
                                    fcb(false);
                                } else {
                                    if (result) {
                                        if (InChat[chatId]) {
                                            InChat[chatId] = InChat[chatId].filter(function (i) {
                                                return i.usuario_id != usuarioId_remover;
                                            });
                                        }
                                        fcb(true);
                                    } else {
                                        fcb(false);
                                    }
                                }
                            });
                        }
                    } else {
                        fcb(false);
                    }
                }
            });
        }

        this.participantesAdicionar = function (chatId, usuarioId, usuarioId_adicionar, fcb) {
            var clt = dbCon[0].collection("InChat");
            clt.findOne({
                "_id": ObjectId(chatId),
                "participantes.usuario_id": ObjectId(usuarioId)
            }, function (err, result) {
                if (err) {
                    fcb(false);
                } else {
                    if (result) {
                        var jaExiste = false;
                        result.participantes.forEach(function (i) {
                            if (i.usuario_id == usuarioId_adicionar) {
                                jaExiste = true;
                            }
                        });
                        if (jaExiste) {
                            fcb(true);
                        } else {
                            result.participantes.push({
                                usuario_id: ObjectId(usuarioId_adicionar),
                                wss: undefined
                            });
                            clt.update({
                                "_id": ObjectId(chatId)
                            }, {
                                $set: {
                                    "participantes": result.participantes
                                }
                            }, {
                                w: 1
                            }, function (err, result) {
                                if (err) {
                                    fcb(false);
                                } else {
                                    if (result) {
                                        if (InChat[chatId]) {
                                            InChat[chatId].push({
                                                usuario_id: ObjectId(usuarioId_adicionar),
                                                wss: undefined
                                            });
                                        }
                                        fcb(true);
                                    } else {
                                        fcb(false);
                                    }
                                }
                            });
                        }
                    } else {
                        fcb(false);
                    }
                }
            });
        }

        this.participantesBusca = function (usuarioId, chatId, fcb) {
            var clt = dbCon[0].collection("InChat");
            clt.findOne({
                _id: ObjectId(chatId)
            }, function (err, result) {
                if (err) {
                    fcb("-1");
                } else {
                    if (result) {
                        var usuarioId_nesseChat = false;
                        var p = undefined;
                        result.participantes.forEach(function (participante) {
                            if (participante.usuario_id == usuarioId) {
                                usuarioId_nesseChat = true;
                                p = participante;
                            }
                        });
                        if (usuarioId_nesseChat) {
                            if (!InChat[chatId]) {
                                InChat[chatId] = result.participantes;
                            } else {
                                usuarioId_nesseChat = false;
                                InChat[chatId].forEach(function (i) {
                                    if (i.usuario_id == usuarioId) {
                                        usuarioId_nesseChat = true;
                                        // break; // não sei se isso funciona e agora não é hora de testar
                                    }
                                });
                                if (!usuarioId_nesseChat) {
                                    InChat[chatId].push(p);
                                }
                            }
                            fcb(InChat[chatId]);
                        } else {
                            fcb("-1");
                        }
                    } else {
                        fcb("-1");
                    }
                }
            });
        }

        this.participantesNovo = function (chatId, participante, fcb) {
            // NOTE
            // esse método é para uma nova conexão, ou seja, participantesNovoWss
            var clt = dbCon[0].collection("InChat");
            clt.findOne({
                _id: ObjectId(chatId)
            }, function (err, result) {
                if (err) {
                    fcb(false);
                } else {
                    if (result) {
                        var usuarioId_nesseChat = false;
                        InChat[chatId].forEach(function (i) {
                            if (i.usuario_id == participante.usuario_id) {
                                usuarioId_nesseChat = true;
                                i.wss = participante.wss;
                                i.nick = participante.nick;
                            }
                        });
                        if (usuarioId_nesseChat) {
                            usuarioId_nesseChat = false;
                            result.participantes.forEach(function (i) {
                                if (i.usuario_id == participante.usuario_id) {
                                    usuarioId_nesseChat = true;
                                    // i.wss = participante.wss; // não da para colocar wss no banco
                                    i.nick = participante.nick;
                                }
                            });
                            if (usuarioId_nesseChat) {
                                clt.update({
                                    "_id": ObjectId(chatId)
                                }, {
                                    $set: {
                                        "participantes": result.participantes
                                    }
                                }, {
                                    w: 1
                                }, function (err, resuslt) {
                                    if (err) {
                                        fcb(false);
                                    } else {
                                        fcb(true);
                                    }
                                });
                            } else {
                                fcb(false);
                            }
                        } else {
                            fcb(false);
                        }
                    } else {
                        fcb(false);
                    }
                }
            });
        }

        this.chatNovo = function (usuarioId, fcb) {
            var clt = dbCon[0].collection("InChat");
            var lParticipantes = new Array();
            lParticipantes.push({
                usuario_id: ObjectId(usuarioId),
                wss: undefined
            });
            clt.insert({
                participantes: lParticipantes
            }, {
                w: 1
            }, function (err, result) {
                if (err) {
                    fcb("-1");
                } else {
                    fcb(result[0]);
                }
            });
        }
    }
}