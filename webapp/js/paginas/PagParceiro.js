function PagParceiro() {

    this.construtor = function () {
        pagina.setTitle("Parceiro");
        this.montaPagHtml();
    }

    this.inChat = undefined;

    var usuarioParceiro;
    var relacaoObra;

    var div_test3;

    var scroll;

    this.montaPagHtml = function () {
        pagina.getPagina().empty();
        if (!window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("login");
        } else {
            if (window.localStorage.getItem('usuarioParceiroVerPerfil') != 'undefined') {
                scroll = document.createElement("div");
                scroll.className = "col s12";
                scroll.style = "overflow-y: scroll; height:50px;";

                usuarioParceiro = new Usuario();
                if (!usuarioParceiro.json(JSON.parse(window.localStorage.getItem('usuarioParceiroVerPerfil')))) {
                    pagina.abrirPaginas("main");
                    alerta.abrirErro('Erro ao ver perfil de usuario');
                    return;
                }
                window.localStorage.setItem('usuarioParceiroVerPerfil', undefined);

                var parceiro = new Usuario();

                if (parceiroAux) {
                    parceiro.json(parceiroAux);
                }

                relacaoObra = new RelacaoObra();
                if (!relacaoObra.json(JSON.parse(window.localStorage.getItem('relacaoObraVerPerfil')))) {
                    relacaoObra = false;
                }
                console.log(relacaoObra);
                window.localStorage.setItem('relacaoObraVerPerfil', undefined);

                var main = document.createElement("main");
                var infoDiv = document.createElement("div");
                infoDiv.className = "parallax-container container-big";
                infoDiv.style.height = "7em !important";

                var divImgUsuario = document.createElement("div");
                divImgUsuario.className = "center col s12";

                var imgUsuario = document.createElement("img");
                imgUsuario.style.marginTop = "1em";
                imgUsuario.style.width = "3em";
                imgUsuario.style.height = "3em";
                imgUsuario.className = "responsive-img";
                if (parceiro.getFoto()) {
                    imgUsuario.src = pagina.uploadedUserImages() + parceiro.getFoto();
                } else {
                    imgUsuario.src = "images/fulano.png";
                }
                divImgUsuario.appendChild(imgUsuario);

                infoDiv.appendChild(divImgUsuario);

                var divSpanNomeUsuario = document.createElement("div");
                divSpanNomeUsuario.className = "center col s12";

                var spanNomeUsuario = document.createElement("span");
                spanNomeUsuario.className = "white-text";
                spanNomeUsuario.style.fontSize = "1.5em";
                spanNomeUsuario.appendChild(document.createTextNode(parceiro.getNome()));
                divSpanNomeUsuario.appendChild(spanNomeUsuario);

                infoDiv.appendChild(divSpanNomeUsuario);

                var parallax = document.createElement("div");
                parallax.className = "parallax";

                var img = document.createElement("img");
                img.style.background = "url('images/filter.png'),url(images/bg/bgParceiro.jpg)";

                parallax.appendChild(img);

                infoDiv.appendChild(parallax);
                main.appendChild(infoDiv);

                var tabDiv = document.createElement("div");
                tabDiv.className = "row";

                var div_1 = document.createElement('div');
                div_1.className = "col s12";

                var ul_0 = document.createElement('ul');
                ul_0.className = "tabs";

                var li_0 = document.createElement('li');
                li_0.className = "tab col s3";

                var a_0 = document.createElement('a');
                a_0.href = "#test1";
                a_0.className = "teal-text active";
                a_0.appendChild(document.createTextNode("Informações"));
                li_0.appendChild(a_0);

                ul_0.appendChild(li_0);



                // TAB AVALIACAO

                var li_3 = document.createElement('li');
                li_3.className = "tab col s3";

                var a_3 = document.createElement('a');
                a_3.style.color = "#029688";
                a_3.appendChild(document.createTextNode("Avaliação"));
                li_3.appendChild(a_3);

                if (relacaoObra.getEstado() != 'pendente') {
                    a_3.href = "#test2";
                    ul_0.appendChild(li_3);
                }

                //


                var li_2 = document.createElement('li');
                li_2.className = "tab col s3";

                var a_2 = document.createElement('a');
                a_2.href = "#test2";
                if (relacaoObra.getEstado() != 'pendente') {
                    a_2.href = "#test3";
                }
                a_2.style.color = "#029688";
                a_2.appendChild(document.createTextNode("Chat"));
                li_2.appendChild(a_2);

                ul_0.appendChild(li_2);

                div_1.appendChild(ul_0);

                tabDiv.appendChild(div_1);



                var div_test1 = document.createElement('div');
                div_test1.id = "test1";
                div_test1.className = "col s12";

                // BOTOES

                var row = document.createElement("div");
                row.className = "row card pointer";
                var col = document.createElement("div");
                col.className = "col s12";
                col.style.padding = "0.5em";



                var div = document.createElement("div");
                div.className = "col s12 waves-effect waves-green pointer";
                div.style.padding = "0em !important";
                var col2 = document.createElement("div");
                col2.className = "col s12 center";
                var botaoIniciar = document.createElement('span');
                var i = document.createElement("i");
                i.className = "mdi mdi-close";
                i.style.fontSize = "1.4em";
                col2.appendChild(i);
                div.appendChild(col2);
                var col2 = document.createElement("div");
                col2.className = "col s12 center";
                var span = document.createElement("span");
                span.appendChild(document.createTextNode("Remover Parceiro da Obra"));
                col2.appendChild(span);
                div.appendChild(col2);
                div.addEventListener("click", function () {


                    swal({
                            title: "Deseja remover este parceiro da obra?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Confirmar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: false,
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/removerRelacaoObra', function (result) {
                                    if (result.err) {
                                        alerta.abrirErro(result.err);
                                    } else {
                                        pagina.abrirPaginas('obra');
                                    }
                                });
                                request.enviar("idRelacaoObra=" + relacaoObra.getId());
                                swal("Parceiro removido da obra", "", "success");
                            }
                        });

                });

                col.appendChild(div);
                row.appendChild(col);
                div_test1.appendChild(row);

                //

                var row = document.createElement("div");
                row.className = "row card";
                col = document.createElement("div");
                col.className = "col s12";

                //Celula Descricao
                var p = document.createElement("p");
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("Descrição"));
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                col.appendChild(p);
                var p = document.createElement("p");
                p.appendChild(document.createTextNode(parceiro.getDescricao()));
                col.appendChild(p);

                //CÉLULA EMAIL
                var p = document.createElement("p");
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("E-MAIL"));
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                col.appendChild(p);
                var p = document.createElement("p");
                p.appendChild(document.createTextNode(parceiro.getEmail()));
                col.appendChild(p);

                var p = document.createElement("p");
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("Telefone"));
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                if (usuarioParceiro.getTelefone()) {
                    p.appendChild(document.createTextNode(usuarioParceiro.getTelefone()));
                } else {
                    p.appendChild(document.createTextNode("Sem telefone"));
                }
                col.appendChild(p);

                row.appendChild(col);
                div_test1.appendChild(row);

                tabDiv.appendChild(div_test1);





                // AVALIACAO

                ///////////////////AQUI ESTAO OS CAPACETES!!!!!!!!!!!!
                var div_test3 = document.createElement('div');
                if (relacaoObra.getEstado() != 'pendente') {
                    div_test3.id = "test2";
                }
                div_test3.className = "col s12";
                div_test3.setAttribute("style", "margin-bottom:3em");



                var div = document.createElement("div");
                div.className = "row";

                p = document.createElement("span");
                p.className = "col s12";
                p.setAttribute("style", "margin-bottom:1em");
                p.appendChild(document.createTextNode("Avalie o serviço do parceiro"));
                div.appendChild(p);

                var row = document.createElement("div");
                row.className = "row center";
                var estrelas = document.createElement("span");
                estrelas.className = "rating";

                //Seta valor padrao


                if (relacaoObra.getAvaliacao()) {
                    console.log('avaliacao');
                    console.log(relacaoObra.getAvaliacao());
                    estrelas.setAttribute("data-default-rating", relacaoObra.getAvaliacao());
                } else {
                    console.log(relacaoObra);
                    estrelas.setAttribute("data-default-rating", "0");
                }

                //Nota desativada(não dá para mudar)
                //estrelas.setAttribute("disabled", "");


                row.appendChild(estrelas);

                div.appendChild(row);
                div_test3.appendChild(div);



                var rowComentario = document.createElement('div');
                rowComentario.className = "row";

                var divComentario = document.createElement('div');
                divComentario.className = "input-field col s12";


                var input_comentario = document.createElement('textarea');
                input_comentario.className = "materialize-textarea";
                input_comentario.id = "comentario";
                divComentario.appendChild(input_comentario);


                var lavelComentario = document.createElement('label');
                lavelComentario.htmlFor = "comentarioLabel";
                lavelComentario.className = "active";
                lavelComentario.appendChild(document.createTextNode("Comente a qualidade do serviço"));
                divComentario.appendChild(lavelComentario);

                rowComentario.appendChild(divComentario);

                div_test3.appendChild(rowComentario);



                var footer = document.createElement("footer");
                footer.setAttribute("style", "bottom:-16px !important;");
                var divFooter = document.createElement('div');
                divFooter.className = "row";

                var aFooter = document.createElement('a');
                aFooter.className = "waves-effect waves-teal btn btn-large btn-xl white-text";
                if (relacaoObra.getComentario()) {
                    if (relacaoObra.getComentario().length > 0) {
                        aFooter.appendChild(document.createTextNode("Atualizar Comentário"));
                        input_comentario.value = relacaoObra.getComentario();
                    } else {
                        aFooter.appendChild(document.createTextNode("Enviar Comentário"));
                    }
                } else {
                    aFooter.appendChild(document.createTextNode("Enviar Comentário"));
                }
                aFooter.addEventListener("click", function () {

                    var textoComentario = document.getElementById('comentario').value;
                    if (!textoComentario || textoComentario.length == 0) {
                        alerta.abrirErro('Preencher comentário antes de enviar.');
                    } else {
                        pag.enviarComentario(textoComentario);
                    }


                });
                divFooter.appendChild(aFooter);

                footer.appendChild(divFooter);
                div_test3.appendChild(footer);



                if (relacaoObra.getEstado() != 'pendente') {
                    tabDiv.appendChild(div_test3);
                }


                /////////Aqui É o CHAT////////////////////////////////////////
                ////Coloque as groselhas dentro desse div_test3
                //CHAT

                colChat = document.createElement('div');
                colChat.className = "col s12";
                colChat.id = "test2";
                if (relacaoObra.getEstado() != 'pendente') {
                    colChat.id = "test3";
                }
                colChat.setAttribute("style", "margin-top:2em");
                div_test4 = document.createElement('div');
                div_test4.className = "col s12";
                div_test4.id = "containerChat";
                div_test4.style.marginBottom = "5em";

                if (this.conectarInChat()) {
                    var footer = document.createElement("footer");
                    footer.style.backgroundColor = "#f5f5f5";
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
                            window.scrollTo(0, document.body.scrollHeight);
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
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                    var i = document.createElement("i");
                    i.className = "mdi mdi-send";

                    a.appendChild(i);
                    col.appendChild(a);

                    row.appendChild(col);
                    footer.appendChild(row);

                    colChat.appendChild(footer);

                    // <<<<<<< HEAD
                    //                     $('.modal-trigger').leanModal();
                    //                 }
                    //                 else{
                    //                     var row = document.createElement("div");
                    //                     row.className = "row card pointer";
                    //                     var p = document.createElement("p");
                    //                     p.style.margin = "1em 0em";
                    //                     p.appendChild(document.createTextNode("Erro ao carregar chat."));
                    //                     row.appendChild(p);
                    //                     //div_test4.appendChild(row);
                    //                     scroll.appendChild(row);
                    //                 }
                    // =======
                    $('.modal-trigger').leanModal();
                } else {
                    var row = document.createElement("div");
                    row.className = "row card pointer";
                    var p = document.createElement("p");
                    p.style.margin = "1em 0em";
                    p.appendChild(document.createTextNode("Erro ao carregar chat."));
                    row.appendChild(p);
                    colChat.appendChild(row);
                }
                //>>>>>>> 775d5154a484e898cdc850185e0e8e139553cd5d
                // var row = document.createElement("div");
                // row.className = "row card";
                // var col = document.createElement("div");
                // col.className = "col s3";
                // var p = document.createElement("p");
                // p.appendChild(document.createTextNode("16/Fev"));
                // col.appendChild(p);
                // row.appendChild(col);
                // col = document.createElement("div");
                // col.className = "col s9";
                // p = document.createElement("p");
                // p.appendChild(document.createTextNode("Aceitou uma obra"));
                // col.appendChild(p);
                // row.appendChild(col);
                // div_test2.appendChild(row);
                //tabDiv.appendChild(div_test3);

                //div_test4.appendChild(scroll);

                colChat.appendChild(div_test4);
                tabDiv.appendChild(colChat);
                //
                main.appendChild(tabDiv);
                pagina.getPagina().appendChild(main);

                $('ul.tabs').tabs();
                $('.parallax').parallax();

                var ratings = document.getElementsByClassName('rating');

                for (var i = 0; i < ratings.length; i++) {
                    var r = new SimpleStarRating(ratings[i]);

                    ratings[i].addEventListener('rate', function (e) {
                        console.log('Rating: ' + e.detail);
                        pag.enviarAvaliacao(e.detail);
                    });
                }
            } else {
                pagina.abrirPaginas("main");
            }
        }
    }

    this.enviarComentario = function (comentario) {

        var hr = new HttpReq("post", pagina.apiUrl() + "relacaoObra/comentarRelacaoObra", function (res) {
            if (typeof res == typeof "x") {
                res = JSON.parse(res);
            }
            if (res.err) {
                alerta.abrirErro("Erro ao comentar serviço.");
            } else {
                alerta.abrirSucesso('Enviado com sucesso.');
            }
        });
        var formData = new FormData();
        formData.append("idRelacaoObra", relacaoObra.getId());
        formData.append("comentario", comentario);

        hr.enviar(formData);

    }

    this.enviarAvaliacao = function (avaliacao) {

        var hr = new HttpReq("post", pagina.apiUrl() + "relacaoObra/avaliarRelacaoObra", function (res) {
            if (typeof res == typeof "x") {
                res = JSON.parse(res);
            }
            if (res.err) {
                alerta.abrirErro("Erro ao avaliar serviço.");
            } else {
                alerta.abrirSucesso('Avaliado com sucesso.');
            }
        });
        var formData = new FormData();
        formData.append("idRelacaoObra", relacaoObra.getId());
        formData.append("avaliacao", avaliacao);

        hr.enviar(formData);

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
        p_1.className = "left horaMensagem";

        p_1.appendChild(document.createTextNode(data));
        div_7.appendChild(p_1);

        div_6.appendChild(div_7);

        div_3.appendChild(div_6);

        div_1.appendChild(div_3);
        //div_test4.appendChild(div_1);
        div_test4.appendChild(div_1);
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
        p_1.className = "right horaMensagem";

        p_1.appendChild(document.createTextNode(data));
        div_7.appendChild(p_1);

        div_6.appendChild(div_7);

        div_3.appendChild(div_6);

        div_1.appendChild(div_3);
        //div_test4.appendChild(div_1);
        div_test4.appendChild(div_1);
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

        if (!relacaoObra || relacaoObra.getChatId().length < 3) {
            return false;
        }

        console.log('INCHAT ID');
        console.log(relacaoObra.getChatId());

        carregando.abrir(17000);
        this.inChat = new InChat(pagina.socketUrl() + "InChat/obra", relacaoObra.getChatId(), JSON.parse(window.localStorage.getItem("usuario")).nome, function (msg) {
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
                        console.log('InChat/obra/mensagem/listar');
                        console.log(res);
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
                    hr.enviar("chatId=" + relacaoObra.getChatId());
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