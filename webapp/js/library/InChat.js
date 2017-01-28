function InChat(url, id, nick, fWsMessage) {
    // versão 1
    this.websocket = undefined;
    this.url = undefined;
    this.id = undefined; // se o cara entrar pela segunda vez ele vai ter no localstorage esse id que é o id do chat. Se não tiver talvez tenho que fazer um httpreq para conseguir um que já exista para essa obra (nesse caso) ou crie um novo.
    this.nick = undefined;
    this.fWsMessage = function (msg) {
        console.log(msg);
    }

    this.construtor = function (url, id, nick, fWsMessage) {
        if (this.setNick(nick)) {
            if (this.setUrl(url)) {
                if (this.setId(id)) {
                    if (this.setWebSocket(new WebSocket(this.getUrl()))) {
                        if (typeof fWsMessage == typeof Function) {
                            this.fWsMessage = fWsMessage;
                        }
                        (function (_this) {
                            _this.getWebSocket().addEventListener("open", function (event) {
                                console.log("ws open");
                                _this.enviar("#@!:001:Open");
                            });
                            _this.getWebSocket().addEventListener("close", function (event) {
                                console.log("ws close");
                            });
                            _this.getWebSocket().addEventListener("error", function (event) {
                                console.log("ws error");
                                alerta.abrirErro("Erro na conexão.");
                                console.log(event);
                            });
                            _this.getWebSocket().addEventListener("message", function (event) {
                                console.log("ws message");
                                var msg = JSON.parse(event.data);
                                if (msg.mensagem == "#@!:401:Unauthorized") {
                                    _this.fechar();
                                }
                                _this.fWsMessage(msg);
                            });
                        })(this);
                    } else {
                        alerta.abrirErro("Não foi possível estabelecer a conexão.");
                    }
                } else {
                    alerta.abrirErro("Você precisa estar logado para se conectar ao servidor.");
                }
            } else {
                alerta.abrirErro("Endereço de conexão inválido.");
            }
        } else {
            alerta.abrirErro("O nick escolhido não é valido.");
        }
    }

    this.enviar = function (s) {
        if (window.localStorage.getItem("token")) {
            if (this.getWebSocket()) {
                if (this.getWebSocket().readyState == 1) {
                    this.getWebSocket().send(JSON.stringify({
                        token: window.localStorage.getItem("token"),
                        chatId: this.getId(),
                        nick: this.getNick(),
                        mensagem: s
                    }));
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            alerta.abrirErro("Você precisa estar logado para se conectar ao servidor.");
            return false;
        }
    }

    this.getId = function () {
        return this.id;
    }

    this.setId = function (s) {
        // FIXME
        // verificar se é um id válido
        this.id = s;
        return true;
    }

    this.getWebSocket = function () {
        return this.websocket;
    }

    this.setWebSocket = function (s) {
        // FIXME
        // verificar se é um objeto valido ou undefined
        this.websocket = s;
        return true;
    }

    this.getUrl = function () {
        return this.url;
    }

    this.setUrl = function (s) {
        // verificar se é uma URL válida
        this.url = s;
        return true;
    }

    this.getNick = function () {
        return this.nick;
    }

    this.setNick = function (s) {
        // verificar se é um nick válido
        this.nick = s;
        return true;
    }

    this.fechar = function () {
        if (this.getWebSocket()) {
            // enviar uma mensagem para retirar esse usuário do banco
            this.getWebSocket().close();
        }
        this.setWebSocket(undefined);
        return true;
    }

    this.construtor(url, id, nick, fWsMessage);
}