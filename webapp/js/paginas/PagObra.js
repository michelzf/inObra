function PagObra() {

    this.construtor = function () {
        pagina.setTitle("Obra");
        this.montaPagHtml();
    }

    this.inChat = undefined;

    var div_test2;

    var obraPertenceAoUsuarioAtual;
    var estadoRelacaoObra;

    var rowEstadoRelacaoObra;
    var div_aba1;

    var relacaoObra;

    var obra;

    var botaoMaisDiv;

    var div_test3;

    this.montaPagHtml = function () {
        if (!window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("login");
        } else {
            document.getElementById("btnVoltar").addEventListener("click", function () {
                pagina.abrirPaginas("main");
            });
            console.log('Pagina Obra será carregada');

            obra = new Obra();

            listaParceirosJaAdicionados = new Array();

            obra.json(JSON.parse(window.localStorage.getItem('obra')));

            if (obra) {

                var token = JSON.parse(window.localStorage.getItem('token'));

                var usuarioAtualId = token.usuario_id;

                if (usuarioAtualId == obra.getIdUsuario()) {
                    //Usuário atual é dono da obra
                    obraPertenceAoUsuarioAtual = true;

                    estadoRelacaoObra = undefined;
                } else {
                    //Usuário atual não é dono da obra
                    obraPertenceAoUsuarioAtual = false;
                    relacaoObra = new RelacaoObra();
                    if (relacaoObra.json(JSON.parse(window.localStorage.getItem('parceiroConsultarObra')))) {
                        console.log('DEPURAR RELACAO');
                        console.log(relacaoObra);
                        if (relacaoObra.getEstado() == 'pendente') { // relacao obra pendente
                            estadoRelacaoObra = 'pendente';
                        } else if (relacaoObra.getEstado() == 'aceita') { // relacao obra em andamento
                            console.log('_+_+É ACEITA____');
                            estadoRelacaoObra = 'andamento';
                        } else { // relacao obra concluida
                            estadoRelacaoObra = 'concluida';
                        }
                    }
                }
                pagina.setTitle(obra.getNome());
                pagina.getPagina().empty();
                var main = document.createElement("main");
                var infoDiv = document.createElement("div");
                infoDiv.className = "parallax-container container-small row rowCover";
                infoDiv.setAttribute("style", "display:flex");


                var divSpanNomeUsuario = document.createElement("div");
                divSpanNomeUsuario.className = "col s12";
                divSpanNomeUsuario.setAttribute("style", "align-self:center");

                var spanNomeObra = document.createElement("span");
                spanNomeObra.className = "white-text";
                spanNomeObra.style.fontSize = "1.2em";
                spanNomeObra.appendChild(document.createTextNode(obra.getNome()));
                divSpanNomeUsuario.appendChild(spanNomeObra);

                infoDiv.appendChild(divSpanNomeUsuario);

                var parallax = document.createElement("div");
                parallax.className = "parallax";

                var img = document.createElement("img");
                if (obra.getFoto()) {
                    img.style.background = "url('images/filter.png'),url(" + pagina.uploadedObraImages() + obra.getFoto() + ")";
                } else {
                    img.style.background = "url('images/filter.png'),url(images/bg/bgObra.jpg)";
                }


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


                var a_0 = document.createElement('a');
                a_0.href = "#test1";
                a_0.className = "teal-text";
                a_0.className = "active";
                a_0.appendChild(document.createTextNode("Info"));
                li_0.appendChild(a_0);

                ul_0.appendChild(li_0);


                var li_1 = document.createElement('li');
                li_1.className = "tab col s6";

                var a_1 = document.createElement('a');
                a_1.href = "#test2";
                a_1.style.color = "#029688";
                a_1.appendChild(document.createTextNode("Envolvidos"));
                li_1.appendChild(a_1);

                if (!obraPertenceAoUsuarioAtual && estadoRelacaoObra == 'pendente') {

                    li_0.className = "tab col s12";
                } else {
                    li_0.className = "tab col s6";
                    ul_0.appendChild(li_1);
                }

                if (relacaoObra) {
                    var li_2 = document.createElement('li');
                    li_2.className = "tab col s3";

                    var a_2 = document.createElement('a');
                    a_2.href = "#test3";
                    a_2.style.color = "#029688";
                    a_2.appendChild(document.createTextNode("Chat"));
                    li_2.appendChild(a_2);

                    ul_0.appendChild(li_2);
                }

                div_1.appendChild(ul_0);

                tabDiv.appendChild(div_1);


                //Aba 1

                div_aba1 = document.createElement('div');
                div_aba1.id = "test1";
                div_aba1.className = "col s12";

                if (!obraPertenceAoUsuarioAtual) {
                    this.carregaBotoesParceiro();
                } else {
                    this.carregaBotoesSolicitante();
                    this.carregaBotaoEditarObra(div_aba1);
                }

                var row = document.createElement("div");
                row.className = "row card";
                var col = document.createElement("div");
                col.className = "col s12";
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("ANDAMENTO"));
                var p = document.createElement("p");
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                p.appendChild(document.createTextNode(obra.getAndamento()));
                col.appendChild(p);
                row.appendChild(col);

                var col = document.createElement("div");
                col.className = "col s12";
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("DESCRIÇÃO"));
                var p = document.createElement("p");
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                p.appendChild(document.createTextNode(obra.getDescricao()));
                col.appendChild(p);
                row.appendChild(col);


                var col = document.createElement("div");
                col.className = "col s6";
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("DATA"));
                var p = document.createElement("p");
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                if (obra.getData()) {
                    var dateObra = obra.getData();
                    p.appendChild(document.createTextNode(dateObra.getDate() + '/' + (dateObra.getMonth() + 1) + "/" + dateObra.getFullYear()));

                }


                col.appendChild(p);
                row.appendChild(col);

                var col = document.createElement("div");
                col.className = "col s6";
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("LOCAL"));
                var p = document.createElement("p");
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                p.appendChild(document.createTextNode(obra.getLocal()));
                col.appendChild(p);
                row.appendChild(col);


                var col = document.createElement("div");
                col.className = "col s12";
                var span = document.createElement("span");
                span.style.fontSize = "0.7em";
                span.appendChild(document.createTextNode("NECESSIDADES"));
                var p = document.createElement("p");
                p.style.wordWrap = "break-word";
                p.appendChild(span);
                p.appendChild(document.createElement("br"));
                p.appendChild(document.createTextNode(obra.getListaTags()));
                col.appendChild(p);
                row.appendChild(col);
                div_aba1.appendChild(row);

                tabDiv.appendChild(div_aba1);


                //Aba 2

                if (!obraPertenceAoUsuarioAtual && estadoRelacaoObra == 'pendente') {

                } else {

                    div_test2 = document.createElement('div');
                    div_test2.className = "col s12";
                    div_test2.id = "test2";
                    div_test2.setAttribute("style", "margin-bottom:4em !important");
                    this.carregarParceiros(obra);
                    if (obraPertenceAoUsuarioAtual) {
                        botaoMaisDiv = document.createElement("div");
                        botaoMaisDiv.className = "center col s12";
                        botaoMaisDiv.style.margin = "0.5em";

                        var botaoMais = document.createElement("a");
                        botaoMais.className = "waves-effect waves-light btn btn-large btn-xl green darken-1";
                        botaoMais.appendChild(document.createTextNode("+ Adicionar Novo Parceiro"));
                        botaoMais.addEventListener("click", function () {
                            controleAux = obra;
                            pagina.abrirPaginas("escolheParceiro");
                        });
                        botaoMaisDiv.appendChild(botaoMais);
                        //div_test2.appendChild(botaoMaisDiv);
                    }

                    var footerBotao = document.createElement("footer");
                    footerBotao.setAttribute("style", "bottom:-16px !important; z-index: 1000;");
                    var divBotao = document.createElement('div');
                    divBotao.className = "row";

                    var aBotao = document.createElement('a');
                    aBotao.className = "waves-effect waves-teal btn btn-large btn-xl white-text";
                    aBotao.appendChild(document.createTextNode("Adicionar Novos Parceiros"));
                    aBotao.addEventListener("click", function () {

                        controleAux = obra;
                        window.localStorage.setItem('obraAdicionarParceiros', obra.jsonString());
                        pagina.abrirPaginas("escolheParceiro");

                    });
                    divBotao.appendChild(aBotao);

                    footerBotao.appendChild(divBotao);

                    if (obraPertenceAoUsuarioAtual) {
                        div_test2.appendChild(footerBotao);
                    }

                    tabDiv.appendChild(div_test2);
                }

                //Aba 3
                div_test3 = document.createElement('div');
                div_test3.className = "col s12";
                div_test3.id = "test3";
                if (this.conectarInChat()) {
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
                        if (document.getElementById("mensagem").value.length > 0) {
                            pag.inChat.enviar(document.getElementById("mensagem").value);
                            document.getElementById("mensagem").value = "";
                        }
                    });
                    var i = document.createElement("i");
                    i.className = "mdi mdi-send";

                    a.appendChild(i);
                    col.appendChild(a);

                    row.appendChild(col);
                    footer.appendChild(row);

                    div_test3.appendChild(footer);

                    $('.modal-trigger').leanModal();
                } else {
                    var row = document.createElement("div");
                    row.className = "row card pointer";
                    var p = document.createElement("p");
                    p.style.margin = "1em 0em";
                    p.appendChild(document.createTextNode("Erro ao carregar chat."));
                    row.appendChild(p);
                    div_test3.appendChild(row);
                }
                // div_test3.className = "col s12";
                // div_test3.id = "test3";
                // var row = document.createElement("div");
                // row.className = "row card pointer";
                // row.addEventListener("click", function () {
                //     pagina.abrirPaginas("chat");

                // });
                // var line = document.createElement("div");
                // line.className = "col s12 green darken-1";
                // line.style.height = "0.3em";
                // row.appendChild(line);


                // var col = document.createElement("div");
                // col.className = "col s3";
                // var img = document.createElement("img");
                // img.src = "images/fulano2.png";
                // img.className = "responsive-img circle";
                // img.style.margin = "0.6em 0em";
                // col.appendChild(img)
                // row.appendChild(col);
                // col = document.createElement("div");
                // col.className = "col s6";
                // var p = document.createElement("p");
                // p.style.margin = "1em 0em";
                // p.appendChild(document.createTextNode("Obra do Apartamento"));
                // col.appendChild(p);
                // row.appendChild(col);

                // //                col = document.createElement("div");
                // //                col.className = "col s3";
                // //                var span = document.createElement("span");
                // //                span.className = "new badge";
                // //                span.style.margin = "2em 0em";
                // //                span.appendChild(document.createTextNode("5"));
                // //                col.appendChild(span);
                // //                row.appendChild(col);

                // div_test3.appendChild(row);

                if (relacaoObra) {
                    tabDiv.appendChild(div_test3);
                }
                main.appendChild(tabDiv);
                pagina.getPagina().appendChild(main);
            } else {
                //erro ao carregar obra
                console.log('Erro ao carregar obra.');
            }


            $('ul.tabs').tabs();
            $('.parallax').parallax();

        }
    }

    this.carregaBotoesSolicitante = function () {
        var row = document.createElement("div");
        row.className = "row card pointer";
        var col = document.createElement("div");
        col.className = "col s12";
        col.style.padding = "0.5em";



        if (obra.getAndamento() == 'criada') {
            var div = document.createElement("div");
            div.className = "col s6 waves-effect waves-green pointer";
            div.style.padding = "0em !important";
            col2 = document.createElement("div");
            col2.className = "col s12 center";
            var botaoIniciar = document.createElement('span');
            var i = document.createElement("i");
            i.className = "mdi mdi-wrench";
            i.style.fontSize = "1.4em";
            col2.appendChild(i);
            div.appendChild(col2);
            var col2 = document.createElement("div");
            col2.className = "col s12 center";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Iniciar Obra"));
            col2.appendChild(span);
            div.appendChild(col2);
            div.addEventListener("click", function () {

                swal({
                        title: "Deseja iniciar essa obra?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#009688",
                        confirmButtonText: "Iniciar",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizarAndamento', function (result) {
                                if (result.err) {
                                    alerta.abrirErro(result.err);
                                } else {
                                    obra.setAndamento('iniciada');
                                    window.localStorage.setItem('obra', obra.jsonString());
                                    pag.montaPagHtml();
                                }
                            });
                            request.enviar("idObra=" + obra.getId() + "&andamento=iniciada");
                            swal("Obra Iniciada", "", "success");
                        }
                    });
            });

            col.appendChild(div);

        } else if (obra.getAndamento() == 'iniciada') {

            var div = document.createElement("div");
            div.className = "col s4 waves-effect waves-yellow pointer";
            div.style.padding = "0em !important";
            col2 = document.createElement("div");
            col2.className = "col s12 center";
            var botaoIniciar = document.createElement('span');
            var i = document.createElement("i");
            i.className = "mdi mdi-pause";
            i.style.fontSize = "1.4em";
            col2.appendChild(i);
            div.appendChild(col2);
            var col2 = document.createElement("div");
            col2.className = "col s12 center";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Pausar Obra"));
            col2.appendChild(span);
            div.appendChild(col2);

            div.addEventListener("click", function () {

                swal({
                        title: "Deseja pausar essa obra?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#009688",
                        confirmButtonText: "Pausar",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizarAndamento', function (result) {
                                if (result.err) {
                                    alerta.abrirErro(result.err);
                                } else {
                                    obra.setAndamento('pausada');
                                    window.localStorage.setItem('obra', obra.jsonString());
                                    pag.montaPagHtml();
                                }
                            });
                            request.enviar("idObra=" + obra.getId() + "&andamento=pausada");
                            swal("Obra Pausada", "", "success");
                        }
                    });
            });

            col.appendChild(div);


            var div = document.createElement("div");
            div.className = "col s4 waves-effect waves-teal pointer";
            div.style.padding = "0em !important";
            col2 = document.createElement("div");
            col2.className = "col s12 center";
            var botaoIniciar = document.createElement('span');
            var i = document.createElement("i");
            i.className = "mdi mdi-domain";
            i.style.fontSize = "1.4em";
            col2.appendChild(i);
            div.appendChild(col2);
            var col2 = document.createElement("div");
            col2.className = "col s12 center";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Finalizar Obra"));
            col2.appendChild(span);
            div.appendChild(col2);


            div.addEventListener("click", function () {
                swal({
                        title: "Deseja finalizar essa obra?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#009688",
                        confirmButtonText: "Finalizar",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizarAndamento', function (result) {
                                if (result.err) {
                                    alerta.abrirErro(result.err);
                                } else {
                                    obra.setAndamento('concluida');
                                    window.localStorage.setItem('obra', obra.jsonString());
                                    pag.montaPagHtml();
                                }
                            });
                            request.enviar("idObra=" + obra.getId() + "&andamento=concluida");
                            swal("Obra Finalizada", "", "success");
                        }
                    });
            });

            col.appendChild(div);
        } else if (obra.getAndamento() == 'pausada') {


            var div = document.createElement("div");
            div.className = "col s6 waves-effect waves-green pointer";
            div.style.padding = "0em !important";
            col2 = document.createElement("div");
            col2.className = "col s12 center";
            var botaoIniciar = document.createElement('span');
            var i = document.createElement("i");
            i.style.fontSize = "1.4em;";
            i.className = "mdi mdi-domain";
            col2.appendChild(i);
            div.appendChild(col2);
            var col2 = document.createElement("div");
            col2.className = "col s12 center";
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Retomar Obra"));
            col2.appendChild(span);
            div.appendChild(col2);


            div.addEventListener("click", function () {
                swal({
                        title: "Deseja retomar essa obra?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#009688",
                        confirmButtonText: "Retomar",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizarAndamento', function (result) {
                                if (result.err) {
                                    alerta.abrirErro(result.err);
                                } else {
                                    obra.setAndamento('iniciada');
                                    window.localStorage.setItem('obra', obra.jsonString());
                                    pag.montaPagHtml();
                                }
                            });
                            request.enviar("idObra=" + obra.getId() + "&andamento=iniciada");
                            swal("Obra Retomada", "", "success");
                        }
                    });
            });

            col.appendChild(div);

        }


        var div = document.createElement("div");
        if (obra.getAndamento() == 'iniciada') {
            div.className = "col s4 waves-effect waves-red pointer";
        } else if (obra.getAndamento() == 'concluida') {
            div.className = "col s12 waves-effect waves-red pointer";
        } else {
            div.className = "col s6 waves-effect waves-red pointer";
        }

        col2 = document.createElement("div");
        col2.className = "col s12 center";
        col2.style.padding = "0em !important";
        var botaoIniciar = document.createElement('span');
        var i = document.createElement("i");
        i.className = "mdi mdi-close";
        i.style.fontSize = "1.4em";
        col2.appendChild(i);
        div.appendChild(col2);
        var col2 = document.createElement("div");
        col2.className = "col s12 center";
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("Excluir Obra"));
        col2.appendChild(span);
        div.appendChild(col2);

        div.addEventListener("click", function () {

            swal({
                    title: "Deseja excluir essa obra?",
                    text: "Essa operação não poderá ser desfeita.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Excluir",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizarAndamento', function (result) {
                            if (result.err) {
                                alerta.abrirErro(result.err);
                            } else {
                                var request = new HttpReq('POST', pagina.apiUrl() + 'obra/remove', function (result2) {
                                    if (result2.err) {
                                        alerta.abrirErro(result2.err);
                                    } else {
                                        pagina.abrirPaginas("main");
                                    }
                                });
                                request.enviar("idObra=" + obra.getId());
                            }
                        });
                        request.enviar("idObra=" + obra.getId() + "&andamento=cancelada");
                        swal("Obra Excluída!", "Clique no botão abaixo para continuar.", "success");
                    } else {
                        swal("Operação Cancelada", "Clique no botão abaixo para continuar.", "error");
                    }
                });
        });
        col.appendChild(div);

        row.appendChild(col);
        div_aba1.appendChild(row);
    }

    this.carregaBotoesParceiro = function () {




        var row = document.createElement("div");
        row.className = "row card pointer";
        var col = document.createElement("div");
        col.className = "col s12";

        var divAceitar = document.createElement("div");
        divAceitar.className = "col s6 waves-effect waves-green pointer";
        divAceitar.style.padding = "0em !important";
        col2 = document.createElement("div");
        col2.className = "col s12 center";
        var botaoIniciar = document.createElement('span');
        var i = document.createElement("i");
        i.style.fontSize = "1.4em;";
        i.className = "mdi mdi-check";
        col2.appendChild(i);
        divAceitar.appendChild(col2);
        var col2 = document.createElement("div");
        col2.className = "col s12 center";
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("Aceitar Obra"));
        col2.appendChild(span);
        divAceitar.appendChild(col2);

        divAceitar.addEventListener("click", function () {
            if (confirm('Deseja aceitar essa obra?')) {
                var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/responder', function (result) {
                    if (result.err) {
                        alerta.abrirErro('Erro ao responder proposta de obra.');
                    } else {
                        relacaoObra.setEstado('aceita');
                        window.localStorage.setItem('parceiroConsultarObra', relacaoObra.jsonString());
                        pag.montaPagHtml();
                    }
                });
                request.enviar("idRelacaoObra=" + relacaoObra.getId() + '&resposta=aceita');
            }
        });



        var divRecusar = document.createElement("div");
        divRecusar.className = "col s6 waves-effect waves-red pointer";
        divRecusar.style.padding = "0em !important";
        col2 = document.createElement("div");
        col2.className = "col s12 center";
        var botaoIniciar = document.createElement('span');
        var i = document.createElement("i");
        i.style.fontSize = "1.4em;";
        i.className = "mdi mdi-close";
        col2.appendChild(i);
        divRecusar.appendChild(col2);
        var col2 = document.createElement("div");
        col2.className = "col s12 center";
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("Rejeitar Obra"));
        col2.appendChild(span);
        divRecusar.appendChild(col2);

        divRecusar.addEventListener("click", function () {
            if (confirm('Deseja rejeitar essa obra?')) {
                var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/responder', function (result) {
                    if (result.err) {
                        alerta.abrirErro(result.err);
                    } else {
                        window.localStorage.setItem('parceiroConsultarObra', undefined);
                        pagina.abrirPaginas("main");
                    }
                });
                request.enviar("idRelacaoObra=" + relacaoObra.getId() + '&resposta=rejeitada');
            }
        });



        var p = document.createElement("p");

        if (estadoRelacaoObra == 'pendente') {
            col.appendChild(divAceitar);
            col.appendChild(divRecusar);
        } else if (estadoRelacaoObra == 'andamento') {
            var spanAndamento = document.createElement("span");
            spanAndamento.className = "col s6 center";
            spanAndamento.style.fontSize = "0.9em";
            spanAndamento.appendChild(document.createTextNode("VOCE JA FAZ PARTE DESTA OBRA"));

            var botaoAbandonar = document.createElement('a');
            botaoAbandonar.className = "waves-effect waves-light btn";
            botaoAbandonar.appendChild(document.createTextNode("Abandonar Obra"));
            //botaoRejeitar.style.marginLeft = "50px";
            botaoAbandonar.addEventListener("click", function () {
                if (confirm('Deseja abandonar essa obra?')) {
                    var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/responder', function (result) {
                        if (result.err) {
                            alerta.abrirErro(result.err);
                        } else {
                            window.localStorage.setItem('parceiroConsultarObra', undefined);
                            pagina.abrirPaginas("main");
                        }
                    });
                    request.enviar("idRelacaoObra=" + relacaoObra.getId() + '&resposta=abandonada');
                }
            });

            p.appendChild(spanAndamento);
            p.appendChild(divRecusar);
        }

        col.appendChild(p);
        row.appendChild(col);
        div_aba1.appendChild(row);
    }

    this.carregarParceiros = function (obraParametro) {
        console.log('Carregando parceiros');
        index = 0;
        var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/buscarRelacoesDaObra', function (result) {
            var array = JSON.parse(result);
            array = array.result;
            if (array) {
                var relacaoObra2;
                if (array.length > 0) {
                    console.log('Array');
                    console.log(array);
                    for (var i = 0; i < array.length; i++) {
                        relacaoObra2 = new RelacaoObra();
                        relacaoObra2.json(array[i]);
                        if (relacaoObra2) {
                            console.log('Relacao obra Carregada');
                            var idUsuarioPrestador = relacaoObra2.getIdUsuarioPrestador();
                            var usuario;
                            var request2 = new HttpReq('POST', pagina.apiUrl() + 'usuario/getUsuario', function (result2) {
                                result2 = JSON.parse(result2);
                                if (result2.result) {
                                    usuario = new Usuario();
                                    usuario.json(result2.result);
                                    if (usuario) {
                                        var idParceiro = usuario.getId();
                                        var relacaoObra3 = new RelacaoObra();
                                        for (var h = 0; h < array.length; h++) {
                                            relacaoObra3.json(array[h]);
                                            if (relacaoObra3.getIdUsuarioPrestador() == idParceiro) {
                                                break;
                                            }
                                        }
                                        console.log('Parceiro carregado');
                                        listaParceirosJaAdicionados.push(usuario);
                                        pag.adicionarParceiro(usuario, relacaoObra3);
                                    }
                                }
                            });
                            console.log(relacaoObra2);
                            request2.enviar("usuarioId=" + JSON.stringify(idUsuarioPrestador));
                        }
                    }
                }
            }
        });
        request.enviar("idObra=" + JSON.stringify(obraParametro.getId()));
    }

    this.adicionarParceiro = function (parceiro, relacaoObra2) {

        var row = document.createElement("div");
        row.className = "row card pointer centralizacaoVertical";
        if (obraPertenceAoUsuarioAtual) {
            row.addEventListener("click", function () {
                if (relacaoObra2.getEstado() != 'rejeitada') {
                    window.localStorage.setItem('usuarioParceiroVerPerfil', parceiro.jsonString());
                    window.localStorage.setItem('relacaoObraVerPerfil', relacaoObra2.jsonString());

                    parceiroAux = parceiro;

                    pagina.abrirPaginas("parceiro");
                }
            });
        }
        var col = document.createElement("div");
        col.className = "col s3";
        var img = document.createElement("img");
        if (parceiro.getFoto()) {
            img.src = pagina.uploadedUserImages() + parceiro.getFoto();
        } else {
            img.src = "images/fulano2.png";
        }
        img.className = "responsive-img circle";
        img.style.margin = "0.6em 0em";
        col.appendChild(img)
        row.appendChild(col);
        col = document.createElement("div");
        col.className = "col s9";
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.appendChild(document.createTextNode(parceiro.getNome()));
        p.appendChild(document.createElement("br"));
        var span = document.createElement("span");
        span.style.fontSize = "0.7em";
        console.log('RELACAO OBRA GET ESTADO');
        console.log(relacaoObra2);
        span.appendChild(document.createTextNode(relacaoObra2.getEstado()));
        p.appendChild(span);
        col.appendChild(p);
        row.appendChild(col);

        div_test2.appendChild(row);
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
        div_test3.appendChild(div_1);
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
        div_test3.appendChild(div_1);
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

    this.carregaBotaoEditarObra = function (elementoPai) {

        var row = document.createElement("div");
        row.className = "row card pointer";
        var col = document.createElement("div");
        col.className = "col s12";

        var divAceitar = document.createElement("div");
        divAceitar.className = "col s12 waves-effect waves-blue pointer";
        divAceitar.style.padding = "0em !important";
        col2 = document.createElement("div");
        col2.className = "col s12 center";
        var botaoIniciar = document.createElement('span');
        var i = document.createElement("i");
        i.style.fontSize = "1.4em";
        i.className = "mdi mdi-pencil";
        col2.appendChild(i);
        divAceitar.appendChild(col2);
        var col2 = document.createElement("div");
        col2.className = "col s12 center";
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("Editar Obra"));
        col2.appendChild(span);
        divAceitar.appendChild(col2);

        divAceitar.addEventListener("click", function () {

            obraEditar = obra;
            pagina.abrirPaginas('addObra');

        });
        col.appendChild(divAceitar);
        row.appendChild(col);
        elementoPai.appendChild(row);
    }


    this.construtor();
}