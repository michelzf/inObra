function PagEscolheParceiro() {

    this.construtor = function () {
        pagina.setTitle("Escolhe Parceiro");
        this.montaPagHtml();
    }

    var div_0;

    var obra;

    var listaIdsParceirosSelecionados;

    var divParceiros;

    var input_search;

    this.buscaComNome = function () {

        var t = document.getElementById('search').value

        if (t.length <= 3) {
            return;
        }

        var request = new HttpReq('POST', pagina.apiUrl() + 'tags/getUsuariosComNome', function (result) {
            var usuario;
            var resultado = JSON.parse(result).result;
            if (resultado.length > 0) {
                divParceiros.innerHTML = '';
            } else {
                divParceiros.innerHTML = '';
                pag.carregarParceiros();
            }
            if (resultado) {

                console.log(resultado);

                for (var i = 0; i < resultado.length; i++) {
                    usuario = new Usuario();
                    var parceiro;
                    if (usuario.json(resultado[i])) {
                        parceiro = new Usuario();
                        parceiro.json(resultado[i]);
                        if (!pag.parceiroJaExiste(parceiro)) {
                            pag.adicionarParceiroNaLista(parceiro);
                        }
                    }
                }
            }
        });
        console.log('t');
        console.log(t);
        request.enviar("nome=" + t + "&tags=" + JSON.stringify(obra.getListaTags()));
    }

    this.montaPagHtml = function () {
        if (!window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("login");
        } else {

            document.getElementById("btnVoltar").addEventListener("click", function () {
                if (obra) {
                    pagina.abrirPaginas("addObra");
                } else {
                    pagina.abrirPaginas("obra");
                }

            });
            listaIdsParceirosSelecionados = new Array();

            pagina.getPagina().empty();
            div_0 = document.createElement("main");
            div_0.className = "row container";
            div_0.setAttribute("style", "margin-top: 6em !important;margin-bottom:5em !important;");

            var nav_0 = document.createElement('nav');
            nav_0.className = "grey lighten-1";

            var div_2 = document.createElement('div');
            div_2.className = "nav-wrapper";

            var form_0 = document.createElement('form');

            var div_1 = document.createElement('div');
            div_1.className = "input-field";

            input_search = document.createElement('input');
            input_search.id = "search";
            input_search.type = "text";
            div_1.appendChild(input_search);

            input_search.addEventListener("keydown", function () {

                pag.buscaComNome();

            });


            var label_0 = document.createElement('label');
            label_0.htmlFor = "search";
            label_0.id = "searchLabel";

            var i_0 = document.createElement('i');
            i_0.className = "mdi-action-search";
            label_0.appendChild(i_0);

            div_1.appendChild(label_0);


            var i_1 = document.createElement('i');
            i_1.className = "mdi-navigation-close";
            div_1.appendChild(i_1);

            form_0.appendChild(div_1);

            div_2.appendChild(form_0);

            nav_0.appendChild(div_2);

            div_0.appendChild(nav_0);

            pagina.getPagina().appendChild(div_0);



            divParceiros = document.createElement('div');
            this.carregarParceiros();
            div_0.appendChild(divParceiros);


            var footer = document.createElement("footer");
            footer.setAttribute("style", "bottom:-16px !important;");
            var div_10 = document.createElement('div');
            div_10.className = "row";

            var a_0 = document.createElement('a');
            a_0.className = "waves-effect waves-teal btn btn-large btn-xl white-text";
            a_0.appendChild(document.createTextNode("Concluir"));
            a_0.addEventListener("click", function () {
                obra = new Obra();
                obra.json(window.localStorage.getItem('obraAdicionarParceiros'));
                if (controleAux) {
                    obra.json(controleAux);
                }
                pag.concluirAcao(obra);

            });
            div_10.appendChild(a_0);

            footer.appendChild(div_10);
            pagina.getPagina().appendChild(footer);
        }
    }

    this.carregarParceiros = function () {
        obra = new Obra();
        obra.json(window.localStorage.getItem('obraAdicionarParceiros'));
        if (obra == false || obra.getId() == undefined) {
            obra.json(controleAux);
        }
        if (obra) {

            var request = new HttpReq('POST', pagina.apiUrl() + 'tags/getUsuariosComTags', function (result) {
                var usuario;
                var resultado = JSON.parse(result).result;
                console.log(JSON.parse(result));
                if (resultado) {
                    for (var i = 0; i < resultado.length; i++) {
                        usuario = new Usuario();
                        var parceiro;
                        if (usuario.json(resultado[i])) {
                            parceiro = new Usuario();
                            parceiro.json(resultado[i]);
                            if (!pag.parceiroJaExiste(parceiro)) {
                                pag.adicionarParceiroNaLista(parceiro);
                            }
                        }
                    }
                } else {
                    var div = document.createElement("div");
                    var h4 = document.createElement("h4");
                    h4.appendChild(document.createTextNode("Sem prestadores disponíveis"));
                    div.appendChild(h4);
                    divParceiros.appendChild(div);
                }
            });
            request.enviar("tags=" + JSON.stringify(obra.getListaTags()));
        }
    }

    this.parceiroJaExiste = function (usuario) {
        var idAux = usuario.getId();
        var usr;
        if (listaParceirosJaAdicionados) {
            for (var i = 0; i < listaParceirosJaAdicionados.length; i++) {
                usr = new Usuario();
                usr.json(listaParceirosJaAdicionados[i]);
                if (usr.getId() == idAux) {
                    return true;
                    s
                }
            }
        }
        return false;
    }

    this.concluirAcao = function (obra) {

        if (listaIdsParceirosSelecionados.length == 0) {
            pag.paginaIraSair();
            window.localStorage.setItem("obra", obra.jsonString());
            controleAux = undefined;
            pagina.abrirPaginas("obra");

            return;
        }

        carregando.abrir();

        var obraAux = new Obra();
        obraAux.json(window.localStorage.getItem('obraAdicionarParceiros'));
        if (!controleAux) { //Criando obra e adicionando parceiros

            console.log('Inicio conclusao de insersao de nova obra');

            var req = new HttpReq('POST', pagina.apiUrl() + 'InChat/obra/criar', function (res) {

                res = JSON.parse(res);

                if (res.err) {
                    carregando.fechar();
                    alerta.abrirErro('Erro ao cadastrar obra, erro na criação do chat para a obra.');
                } else {

                    var request = new HttpReq('POST', pagina.apiUrl() + 'obra/cadastrar', function (result) {
                        if (result.err) {
                            carregando.fechar();
                            alerta.abrirErro('Erro ao cadastrar obra');
                            console.log('Erro ao cadastrar obra');
                        } else {
                            if (obra.json(JSON.parse(result))) {
                                console.log('Sucesso ao cadastrar obra');
                            } else {
                                carregando.fechar();
                                alerta.abrirErro('Erro ao cadastrar obra');
                                console.log('Erro ao cadastrar obra');
                            }
                            if (listaIdsParceirosSelecionados.length > 0) {
                                pag.enviarRelacoesObras(obra);
                            } else {
                                carregando.fechar();
                                pag.paginaIraSair();
                                window.localStorage.setItem("obra", obra.jsonString());
                                pagina.abrirPaginas("obra");
                            }
                        }
                    });

                    obra.setChatId(res.result);

                    console.log(obra.getChatId());

                    console.log('Cadastro de obra com imagem');
                    var img = pagina.dataURItoBlob(imagemObra);
                    var formData = new FormData();
                    formData.append("obraImage", img);
                    formData.append("obra", obra.jsonString());

                    request.enviar(formData, undefined, false);

                    imagemObra = undefined;

                }
            });
            req.enviar(undefined, true, false);
        } else if (controleAux) { //Atualizando parceiros de uma obra existente

            console.log('Inicio conclusao de incluir parceiros em obra existente');

            if (listaIdsParceirosSelecionados.length > 0) {
                pag.enviarRelacoesObras(obra);
            } else {
                alerta.abrirErro('Erro ao atualizar parcerios em obra existe.');
                carregando.fechar();
            }
        }
    }

    this.enviarRelacoesObras = function (obra) {
        var count = 0;
        var index = 0;
        var index2 = 0;
        for (var i = 0; i < listaIdsParceirosSelecionados.length; i++) {

            var req = new HttpReq('POST', pagina.apiUrl() + 'InChat/obra/criar', function (res) {

                res = JSON.parse(res);

                if (res.err) {
                    alerta.abrirErro('Erro ao cadastrar relacao obra, erro na criação do chat para a relacao obra.');
                    carregando.fechar();
                    alerta.abrirErro('Erro ao cadastrar relacao obra, erro na criação do chat para a relacao obra.');
                } else {

                    var req2 = new HttpReq('POST', pagina.apiUrl() + 'InChat/obra/participantes/adicionar', function (res2) {

                        res2 = JSON.parse(res2);

                        if (res2.err) {
                            alerta.abrirErro('Erro ao atualizar parcerios em obra existe.');
                            carregando.fechar();
                            alerta.abrirErro('Erro ao cadastrar relacao obra, erro na autorizacao do chat.');
                        } else {


                            var relObra = new RelacaoObra();
                            relObra.setIdObra(obra.getId());
                            relObra.setIdUsuarioPrestador(listaIdsParceirosSelecionados[index]);
                            index = index + 1;

                            var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/cadastrar', function (result) {
                                if (result.err) {
                                    //erro ao cadastrar obra
                                    alerta.abrirErro('Erro ao cadastrar relacao obra');
                                    carregando.fechar();
                                    console.log('Erro ao cadastrar relacao obra');
                                } else {
                                    console.log('Sucesso ao cadastrar relacao obra');
                                }
                                count++;
                                if (count == listaIdsParceirosSelecionados.length) {
                                    carregando.fechar();
                                    pag.paginaIraSair();
                                    window.localStorage.setItem("obra", obra.jsonString());
                                    controleAux = undefined;
                                    pagina.abrirPaginas("obra");
                                }
                            });
                            relObra.setChatId(res.result);

                            console.log('Relacao Obra a ser enviada:');
                            console.log(relObra);

                            request.enviar("relacaoObra=" + relObra.jsonString(), true, false);
                        }

                    });
                    console.log('++++++' + index2);
                    console.log(res.result);
                    console.log(listaIdsParceirosSelecionados[index2]);
                    req2.enviar("chatId=" + res.result + "&usuarioId=" + listaIdsParceirosSelecionados[index2], true, false);
                    index2 = index2 + 1;
                }
            });
            req.enviar(undefined, true, false);
        }
    }

    this.paginaIraSair = function () {
        window.localStorage.setItem("obraAdicionarParceiros", false);
        window.localStorage.setItem("obraAtualizarParceiros", false);
        listaParceirosJaAdicionados = undefined;
    }

    this.adicionarParceiroNaLista = function (p) {

        var parceiro = new Usuario();
        parceiro.json(p);

        var nome = parceiro.getNome();

        if (!nome) {
            nome = 'Sem nome';
        }

        var div_4 = document.createElement("div");
        div_4.className = "col s12";

        var row = document.createElement("div");
        row.className = "row card pointer";
        row.style.display = "flex";

        var col = document.createElement("div");
        col.className = "col s3";
        col.addEventListener("click", function () {
            //abrir perfil com vizualizacao comum
            window.localStorage.setItem('usuarioParceiroVerPerfil', parceiro.jsonString());
            //pagina.abrirPaginas("parceiro");
            pag.alertDadosParceiro(parceiro);
        });
        var img = document.createElement("img");
        if (parceiro.getFoto()) {
            img.src = pagina.uploadedUserImages() + parceiro.getFoto();
        } else {
            img.src = "images/obraDefault.png";
        }
        img.style.height = "3em";
        img.style.width = "3em";
        img.className = "responsive-img circle";
        img.style.margin = "0.6em 0em";
        col.appendChild(img)
        row.appendChild(col);
        col = document.createElement("div");
        col.className = "col s7";
        col.addEventListener("click", function () {
            //abrir perfil com vizualizacao comum
            window.localStorage.setItem('usuarioParceiroVerPerfil', parceiro.jsonString());
            //pagina.abrirPaginas("parceiro");
            pag.alertDadosParceiro(parceiro);
        });
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(nome));
        col.appendChild(p);

        //subtitulo - Especialidades
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.style.fontSize = "0.8em";
        p.appendChild(document.createTextNode(parceiro.getTags()));
        col.appendChild(p);
        //--subtitulo - Especialidades

        row.appendChild(col);

        col = document.createElement("div");
        col.className = "col s2 centralizacaoVertical";
        col.setAttribute("style", "justify-content: space-between");
        var i = document.createElement("i");
        i.className = "small mdi mdi-plus green-text pointer";
        if (this.parceiroEstaSelecionado(parceiro)) {
            i.className = "small mdi mdi-minus red-text pointer";
        }
        i.addEventListener("click", function () {
            if (pag.parceiroEstaSelecionado(parceiro)) {
                i.className = "small mdi mdi-plus green-text pointer";
                pag.removerParceiro(parceiro);
            } else {
                i.className = "small mdi mdi-minus red-text pointer";
                listaIdsParceirosSelecionados.push(parceiro.getId());
            }
        });
        col.appendChild(i);
        row.appendChild(col);

        div_4.appendChild(row);

        divParceiros.appendChild(div_4);
    }

    this.abrirUsuarioParceiro = function (usuarioParceiro) {

    }

    this.removerParceiro = function (parceiro) {
        var id = parceiro.getId();
        var idAux;

        for (var i = 0; i < listaIdsParceirosSelecionados.length; i++) {
            idAux = listaIdsParceirosSelecionados[i];
            if (id == idAux) {
                listaIdsParceirosSelecionados.splice(i);
            }
        }
    }

    this.parceiroEstaSelecionado = function (parceiro) {

        var id = parceiro.getId();
        var idAux;
        for (var i = 0; i < listaIdsParceirosSelecionados.length; i++) {
            idAux = listaIdsParceirosSelecionados[i];
            if (id == idAux) {
                return true;
            }
        }
        return false;
    }

    this.alertDadosParceiro = function (parceiro) {
        console.log(parceiro);

        carregando.abrir(17000);

        var request = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/buscarRelacoesObraDoPrestador', function (result) {
            carregando.fechar();
            if (result.err) {
                alerta.abrirErro(result.err);
            } else {

                result = JSON.parse(result);

                console.log(result);

                var comentariosHtml = '';
                var avaliacaoGeral = 0;
                var avaliacaoQuantidade = 0;
                for (var i = 0; i < result.result.length; i++) {
                    var relacaoObra = new RelacaoObra();
                    relacaoObra.json(result.result[i]);
                    if (relacaoObra.getAvaliacao()) {
                        if (relacaoObra.getAvaliacao().length > 0 || typeof relacaoObra.getAvaliacao() == 'number') {
                            console.log(relacaoObra);
                            avaliacaoQuantidade = avaliacaoQuantidade + 1;
                            avaliacaoGeral = avaliacaoGeral + relacaoObra.getAvaliacao();
                        }
                    }
                    if (relacaoObra && relacaoObra.getComentario() && relacaoObra.getComentario().length > 0) {
                        //console.log(relacaoObra);
                        var linhaComentarioHtml = relacaoObra.getComentario() + '<br><br>';
                        comentariosHtml = comentariosHtml + linhaComentarioHtml;
                    }
                }

                avaliacaoGeral = avaliacaoGeral / avaliacaoQuantidade;

                // Quadro

                var image = parceiro.getFoto();
                if (!image || image.length < 3) {
                    image = 'images/fulano.png';
                } else {
                    image = pagina.uploadedUserImages() + image;
                }

                pai = document.getElementById("modalContainer");
                pai.empty();
                var div_parceiroDados = document.createElement('div');
                div_parceiroDados.id = "parceiroDados";
                div_parceiroDados.className = "modal modal-fixed-footer modalFull";

                var div_0 = document.createElement('div');
                div_0.className = "modal-content";

                var row = document.createElement('div');
                row.className = "row center";
                var img = document.createElement("img");
                img.style.width = "2.5em";

                img.src = image;
                row.appendChild(img);
                var h5_0 = document.createElement('h5');

                h5_0.appendChild(document.createTextNode(parceiro.getNome()));
                row.appendChild(h5_0);
                div_0.appendChild(row);

                var div_1 = document.createElement('div');
                div_1.className = "row";

                var div_2 = document.createElement('div');
                div_2.className = "col s12";
                div_2.style.wordBreak = "break-all";

                var p_0 = document.createElement('p');

                var span_0 = document.createElement('span');
                span_0.style.fontSize = "1em";
                span_0.appendChild(document.createTextNode("Descrição"));
                p_0.appendChild(span_0);

                div_2.appendChild(p_0);


                var p_1 = document.createElement('p');
                p_1.setAttribute("style", "margin-bottom:0.8em !important; font-size:1.2em");

                p_1.appendChild(document.createTextNode(parceiro.getDescricao()));
                div_2.appendChild(p_1);


                if (avaliacaoGeral != NaN) {
                    var p_2 = document.createElement('p');

                    var span_1 = document.createElement('span');
                    span_1.style.fontSize = "1em";
                    span_1.appendChild(document.createTextNode("Avaliação Geral"));
                    p_2.appendChild(span_1);

                    div_2.appendChild(p_2);
                    console.log(avaliacaoGeral);
                    if ((-1 < avaliacaoGeral) && (avaliacaoGeral < 9999999)) {
                        var span_2 = document.createElement('span');
                        span_2.className = "rating";
                        span_2.setAttribute("style", "margin-bottom:0.8em !important;");
                        span_2.setAttribute("disabled", "disabled");
                        span_2.setAttribute("data-default-rating", avaliacaoGeral);
                        span_2.disabled = true;
                        div_2.appendChild(span_2);
                    } else {
                        var span_2 = document.createElement('span');
                        span_2.className = "black-text";
                        span_2.appendChild(document.createTextNode("Sem avaliação"));
                        div_2.appendChild(span_2);
                        div_2.appendChild(document.createElement("br"));
                        div_2.appendChild(document.createElement("br"));
                    }

                }



                var p_4 = document.createElement('p');

                var span_2 = document.createElement('span');
                span_2.style.fontSize = "1em";
                span_2.appendChild(document.createTextNode("Comentários"));
                p_4.appendChild(span_2);

                div_2.appendChild(p_4);


                var p_5 = document.createElement('p');
                p_5.setAttribute("style", "margin-bottom:0.8em !important; font-size:1.2em");
                p_5.appendChild(document.createTextNode(comentariosHtml));
                div_2.appendChild(p_5);



                var p_6 = document.createElement('p');

                var span_2 = document.createElement('span');
                span_2.style.fontSize = "1em";
                span_2.appendChild(document.createTextNode("Especialidades"));
                p_6.appendChild(span_2);

                div_2.appendChild(p_6);


                var p_7 = document.createElement('p');
                p_7.setAttribute("style", "margin-bottom:0.8em !important; font-size:1.2em");
                p_7.appendChild(document.createTextNode(parceiro.getTags()));
                div_2.appendChild(p_7);


                div_1.appendChild(div_2);

                div_0.appendChild(div_1);

                div_parceiroDados.appendChild(div_0);


                var div_3 = document.createElement('div');
                div_3.className = "modal-footer";

                var a_0 = document.createElement('a');
                a_0.onclick = function () {
                    pag.respostaOrcamento(1)
                };
                a_0.className = "modal-action modal-close waves-effect waves-light green-text btn-flat ";
                a_0.appendChild(document.createTextNode("Fechar"));
                div_3.appendChild(a_0);

                div_parceiroDados.appendChild(div_3);

                pai.appendChild(div_parceiroDados);
                var ratings = document.getElementsByClassName('rating');

                for (var i = 0; i < ratings.length; i++) {
                    var r = new SimpleStarRating(ratings[i]);

                    ratings[i].addEventListener('rate', function (e) {
                        console.log('Rating: ' + e.detail);
                    });
                }
                $("#parceiroDados").openModal();
            }
        });
        request.enviar("idUsuarioPrestador=" + parceiro.getId());
    }

    this.construtor();
}