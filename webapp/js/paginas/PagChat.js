function PagChat() {

    this.inChat = undefined;

    this.construtor = function () {
        pagina.setTitle("Chat");
        if (this.conectarInChat()) {
            this.montaPagHtml();
        } else {
            alerta.abrirErro("Você não possuí acesso a esse chat.");
            window.history.back();
        }
    }

    this.montaPagHtml = function () {
        if (!window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("login");
        } else {
            pagina.getPagina().empty();
            var container = document.createElement("div");
            container.className = "container";
            container.style.marginTop = "5em";
            var row = document.createElement("div");
            row.className = "row";
            var col = document.createElement("div");
            col.className = "col s12";
            col.style.marginTop = "0.4em";

            var a = document.createElement("a");
            a.id = "btnOrcamento";
            a.className = "btn-floating btn-large waves-effect waves-light teal right modal-trigger";
            a.href = "#modalOrcamento";

            var i = document.createElement("i");
            i.id = "iconeOrcamento";
            i.className = "mdi-editor-attach-money center";

            a.appendChild(i);
            col.appendChild(a);
            row.appendChild(col);
            container.appendChild(row);

            var row = document.createElement("div");
            row.className = "row";
            row.id = "mensagens";

            container.appendChild(row);
            pagina.getPagina().appendChild(container);


            var footer = document.createElement("footer");
            var row = document.createElement("div");
            row.className = "row";
            row.setAttribute("style", "display:flex");
            row.setAttribute("style", "margin:0em !important");
            var col = document.createElement("col");
            col.className = "input-field col s9";
            var inputMensagem = document.createElement("input");
            inputMensagem.id = "mensagem";
            inputMensagem.type = "text";
            inputMensagem.className = "validate";
            inputMensagem.addEventListener("keyup", function (event) {
                if (event.key == "Enter" || event.keyCode == 13) {
                    // FIXME
                    // se demorar muito para a mensagem aparecer na tela, então tem que aparecer a tela de carregando porque a conexão é que está ruim e a mensagem só vai aparecer depois que chegar no servidor
                    pag.inChat.enviar(document.getElementById("mensagem").value);
                    document.getElementById("mensagem").value = "";
                }
            });
            col.appendChild(inputMensagem);
            var label = document.createElement("label");
            label.htmlFor = "mensagem";
            label.appendChild(document.createTextNode("Escreva uma mensagem"));
            col.appendChild(label);


            row.appendChild(col);
            var col = document.createElement("div");
            col.className = "col s3";
            col.setAttribute("style", "align-self:center");

            var a = document.createElement("a");
            a.id = "btnOrcamento";
            a.className = "btn-floating btn-large waves-effect waves-light teal right";
            a.addEventListener("click", function () {
                // FIXME
                // se demorar muito para a mensagem aparecer na tela, então tem que aparecer a tela de carregando porque a conexão é que está ruim e a mensagem só vai aparecer depois que chegar no servidor
                pag.inChat.enviar(document.getElementById("mensagem").value);
                document.getElementById("mensagem").value = "";
            });
            var i = document.createElement("i");
            i.className = "mdi mdi-send";

            a.appendChild(i);
            col.appendChild(a);

            row.appendChild(col);
            footer.appendChild(row);
            pagina.getPagina().appendChild(footer);

            $('.modal-trigger').leanModal();

        }
    }
    this.mostraOrcamento = function () {
        $('#modalMostraOrcamento').openModal();
        document.getElementById("textoOrcamento").textContent = document.getElementById("orcamentoInput").value;
    }
    this.respostaOrcamento = function (resposta) {
        if (resposta == 0) {
            document.getElementById("iconeOrcamento").className = "mdi-navigation-close center";
            document.getElementById("btnOrcamento").className = "btn-floating btn-large waves-effect waves-light red right";
        } else if (resposta == 1) {
            document.getElementById("iconeOrcamento").className = "mdi-action-done center";
            document.getElementById("btnOrcamento").className = "btn-floating btn-large waves-effect waves-light green right";
            document.getElementById("btnOrcamento").href = "#";
        }
    }


    this.addNovaMensagemOutro = function (texto, data) {
        //Chat do outro
        var div_1 = document.createElement('div');
        div_1.className = "row mensagemRecebida";

        var div_3 = document.createElement('div');
        div_3.className = "col s11";

        var div_4 = document.createElement('div');
        div_4.className = "row";

        var div_5 = document.createElement('div');
        div_5.className = "col left  teal lighten-5 textoMensagem";

        var p_0 = document.createElement('p');
        p_0.className = "right";
        p_0.appendChild(document.createTextNode(texto));
        div_5.appendChild(p_0);

        div_4.appendChild(div_5);

        div_3.appendChild(div_4);


        var div_6 = document.createElement('div');
        div_6.className = "row";

        var div_7 = document.createElement('div');
        div_7.className = "col s12";

        var p_1 = document.createElement('p');
        p_1.className = "right horaMensagem";

        p_1.appendChild(document.createTextNode(data));
        div_7.appendChild(p_1);

        div_6.appendChild(div_7);

        div_3.appendChild(div_6);

        div_1.appendChild(div_3);
        document.getElementById("mensagens").appendChild(div_1);
    }

    this.addNovaMensagem = function (texto, data) {
        var div_1 = document.createElement('div');
        div_1.className = "row mensagemEnviada";


        var div_3 = document.createElement('div');
        div_3.className = "col s11 offset-s1";

        var div_4 = document.createElement('div');
        div_4.className = "row";

        var div_5 = document.createElement('div');
        div_5.className = "col right  teal lighten-3 textoMensagem";

        var p_0 = document.createElement('p');
        p_0.className = "left";
        p_0.appendChild(document.createTextNode(texto));
        div_5.appendChild(p_0);

        div_4.appendChild(div_5);

        div_3.appendChild(div_4);


        var div_6 = document.createElement('div');
        div_6.className = "row";

        var div_7 = document.createElement('div');
        div_7.className = "col s12";

        var p_1 = document.createElement('p');
        p_1.className = "left horaMensagem";

        p_1.appendChild(document.createTextNode(data));
        div_7.appendChild(p_1);

        div_6.appendChild(div_7);

        div_3.appendChild(div_6);

        div_1.appendChild(div_3);
        document.getElementById("mensagens").appendChild(div_1);
    }

    this.tratarHoraMsg = function (isoDate) {
        isoDate = new Date(isoDate);
        if (isoDate.toLocaleDateString() == "Invalid Date") {
            return undefined;
        } else {
            return isoDate.toLocaleDateString().substr(0, 5) + " " + isoDate.toLocaleTimeString().substr(0, 5);
        }
    }

    this.conectarInChat = function () {
        // Exemplo da estrutura da mensagem:
        //        var msgOut = {
        //            usuarioId: xxxxx,
        //            chatId: "57a2a71a95179a88deedb789",
        //            data: "2016-08-04T02:53:11.563Z",
        //            nick: "otaviorrossi",
        //            mensagem: "aaaaaaaaa"
        //        }

        carregando.abrir(17000);
        this.inChat = new InChat(pagina.socketUrl() + "InChat/obra", "57a2a71a95179a88deedb789", JSON.parse(window.localStorage.getItem("usuario")).nome, function (msg) {
            if (msg.mensagem == "#@!:401:Unauthorized") {
                alerta.abrirErro("Você não tem acesso a esse chat");
                pagina.abrirPaginas("main");
                carregando.fechar();
            } else if (msg.mensagem == "#@!:002:Entrou") {
                if (msg.usuarioId == JSON.parse(window.localStorage.getItem("token")).usuario_id) {
                    alerta.abrirSucesso("Você está <i>online</i>.");
                    var hr = new HttpReq("post", pagina.apiUrl() + "InChat/obra/mensagem/listar", function (res) {
                        if (typeof res == typeof "x") {
                            res = JSON.parse(res);
                        }
                        if (res.err) {
                            pagina.abrirPaginas("main");
                            alerta.abrirErro("Erro ao buscar as informações do chat. Tente novamente mais tarde.");
                        } else {
                            res.result.forEach(function (i) {
                                if (i.usuarioId == JSON.parse(window.localStorage.getItem("token")).usuario_id) {
                                    pag.addNovaMensagem(i.mensagem, pag.tratarHoraMsg(i.data));
                                } else {
                                    pag.addNovaMensagemOutro(i.mensagem, pag.tratarHoraMsg(i.data));
                                }
                            });
                        }
                        carregando.fechar();
                    });
                    hr.enviar();
                } else {
                    alerta.abrirAviso(msg.nick + " <i>online</i>");
                }
            } else if (msg.mensagem == "#@!:003:Saiu") {
                if (msg.usuarioId == JSON.parse(window.localStorage.getItem("token")).usuario_id) {
                    alerta.abrirErro("Você foi desconectado da conversa. Erro: 999.");
                    console.log("Você foi desconectado da conversa. Erro: 999.");
                    pagina.abrirPaginas("main");
                } else {
                    alerta.abrirAviso(msg.nick + " <i>offline</i>");
                }
            } else {
                if (msg.usuarioId == JSON.parse(window.localStorage.getItem("token")).usuario_id) {
                    pag.addNovaMensagem(msg.mensagem, pag.tratarHoraMsg(msg.data));
                } else {
                    pag.addNovaMensagemOutro(msg.mensagem, pag.tratarHoraMsg(msg.data));
                }
            }
        });

        if (this.inChat) {
            return true;
        } else {
            return false;
        }
    }

    this.construtor();
}