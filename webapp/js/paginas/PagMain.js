function PagMain() {

    this.construtor = function () {
        pagina.setTitle("Home");
        setTimeout(function () {
            pag.montaPagHtml();
        }, 500);
    }

    var listaPendentes;
    var listaAndamento;
    var listaConcluidas;

    var listaPendentesRelacaoObra;
    var listaAndamentoRelacaoObra;
    var listaConcluidasRelacaoObra;

    this.montaPagHtml = function () {

        listaPendentes = new Array();
        listaAndamento = new Array();
        listaConcluidas = new Array();

        listaPendentesRelacaoObra = new Array();
        listaAndamentoRelacaoObra = new Array();
        listaConcluidasRelacaoObra = new Array();

        if (window.localStorage.getItem("usuario")) {

            var usuario = new Usuario();
            usuario.json(window.localStorage.getItem('usuario'));

            pagina.getPagina().empty();
            var main = document.createElement("main");
            var infoDiv = document.createElement("div");
            infoDiv.className = "parallax-container container-big";

            var divImgUsuario = document.createElement("div");
            divImgUsuario.className = "center col s12";

            var imgUsuario = document.createElement("img");
            imgUsuario.style.marginTop = "1em";
            imgUsuario.style.width = "4em";
            imgUsuario.style.height = "4em";
            imgUsuario.className = "responsive-img";
            if (usuario.getFoto()) {
                imgUsuario.src = pagina.uploadedUserImages() + usuario.getFoto();
            } else {
                imgUsuario.src = "images/fulano.png";
            }
            divImgUsuario.appendChild(imgUsuario);

            infoDiv.appendChild(divImgUsuario);

            var divSpanNomeUsuario = document.createElement("div");
            divSpanNomeUsuario.className = "center col s12";

            var spanNomeUsuario = document.createElement("span");
            spanNomeUsuario.className = "white-text";
            spanNomeUsuario.style.fontSize = "1.4em";
            var nomeUsuario = usuario.getNome();
            if (nomeUsuario) {
                if (nomeUsuario.length == 0) {
                    nomeUsuario = "Fulano";
                }
            } else {
                nomeUsuario = "Fulano";
            }
            spanNomeUsuario.appendChild(document.createTextNode(nomeUsuario));
            divSpanNomeUsuario.appendChild(spanNomeUsuario);


            infoDiv.appendChild(divSpanNomeUsuario);

            var parallax = document.createElement("div");
            parallax.className = "parallax";
            var img = document.createElement("img");
            img.style.background = "url('images/filter.png'),url(images/bg/bgPerfil.jpg)";

            parallax.appendChild(img);

            infoDiv.appendChild(parallax);
            main.appendChild(infoDiv);

            var botaoMaisDiv = document.createElement("div");
            botaoMaisDiv.className = "center col s12";
            botaoMaisDiv.style.margin = "0.5em";

            var botaoMais = document.createElement("a");
            botaoMais.className = "waves-effect waves-light btn btn-large btn-xl green darken-1";
            botaoMais.appendChild(document.createTextNode("+ Adicionar uma obra"));
            botaoMais.addEventListener("click", function () {
                obraEditar = undefined;
                pagina.abrirPaginas("addObra");

            });
            botaoMaisDiv.appendChild(botaoMais);
            main.appendChild(botaoMaisDiv);


            var tabDiv = document.createElement("div");
            tabDiv.id = "tabDiv";
            tabDiv.className = "row";

            var div_1 = document.createElement('div');
            div_1.className = "col s12";

            var ul_0 = document.createElement('ul');
            ul_0.className = "tabs";

            var li_0 = document.createElement('li');
            li_0.className = "tab col s3";

            var a_0 = document.createElement('a');
            a_0.href = "#test1";
            a_0.className = "teal-text";
            a_0.className = "active";
            a_0.appendChild(document.createTextNode("Pendentes"));
            li_0.appendChild(a_0);

            ul_0.appendChild(li_0);


            var li_1 = document.createElement('li');
            li_1.className = "tab col s3";

            var a_1 = document.createElement('a');
            a_1.href = "#test2";
            a_1.style.color = "#029688";
            a_1.appendChild(document.createTextNode("Andamento"));
            li_1.appendChild(a_1);

            ul_0.appendChild(li_1);


            var li_2 = document.createElement('li');
            li_2.className = "tab col s3";

            var a_2 = document.createElement('a');
            a_2.href = "#test3";
            a_2.style.color = "#029688";
            a_2.appendChild(document.createTextNode("Concluídas"));
            li_2.appendChild(a_2);

            ul_0.appendChild(li_2);

            div_1.appendChild(ul_0);

            tabDiv.appendChild(div_1);

            var div_test1 = document.createElement('div');
            div_test1.id = "test1";
            div_test1.className = "col s12";
            tabDiv.appendChild(div_test1);

            var div_test2 = document.createElement('div');
            div_test2.className = "col s12";
            div_test2.id = "test2";
            tabDiv.appendChild(div_test2);


            var div_test3 = document.createElement('div');
            div_test3.className = "col s12";
            div_test3.id = "test3";
            tabDiv.appendChild(div_test3);

            main.appendChild(tabDiv);
            pagina.getPagina().appendChild(main);

            $('ul.tabs').tabs();
            $('.parallax').parallax();

            var request = new HttpReq('POST', pagina.apiUrl() + 'tags', function (result) {
                tags = JSON.parse(result).result;

                console.log('Lista de tags disponíveis: ' + tags);
            });

            request.enviar();


            var request = new HttpReq('POST', pagina.apiUrl() + 'obra/buscar', function (result) {
                if (result) {
                    result = JSON.parse(result);
                    if (result.length > 0) {
                        //var obra;
                        document.getElementById("test1").innerHTML = "";
                        document.getElementById("test2").innerHTML = "";
                        document.getElementById("test3").innerHTML = "";
                        for (var i = 0; i < result.length; i++) {
                            var obra = new Obra();
                            obra.json(result[i]);
                            console.log(result[i]);
                            if (obra.getAndamento() == 'criada') {
                                console.log(obra);
                                console.log(i);
                                pag.addListaPendente(obra, i);
                                console.log("bbbbbbbb");
                            } else if (obra.getAndamento() == 'iniciada' || obra.getAndamento() == 'pausada') {
                                pag.addListaAndamento(obra, i);
                            } else if (obra.getAndamento() == 'concluida' || obra.getAndamento() == 'interrampida') {
                                pag.addListaConcluida(obra, i);
                            } else {
                                console.log('Erro - andamento da obra não existe: Obra -> ' + obra.jsonString());
                            }
                        }
                    } else {
                        // TODO [michel]
                        // mostrar uma mensagem dizendo que a lista está vazia
                    }
                }
            });
            request.enviar();

            var usuario = new Usuario();
            usuario.json(window.localStorage.getItem('usuario'));
            if (usuario) {
                if (usuario.getPrestadorServico()) {
                    //Puxar todos os relações obra do prestador de servíço.
                    var relacoesObra = new Array();
                    var request2 = new HttpReq('POST', pagina.apiUrl() + 'relacaoObra/buscarRelacoesObraDoPrestador', function (result) {
                        if (result) {
                            result = JSON.parse(result);
                            var relacaoObra;
                            if (result.result.length > 0) {
                                for (var i = 0; i < result.result.length; i++) {
                                    relacaoObra = new RelacaoObra();
                                    relacaoObra.json(result.result[i]);
                                    relacoesObra.push(relacaoObra);
                                }
                            }
                        }
                        //Método listarObrasComIds
                        var request3 = new HttpReq('POST', pagina.apiUrl() + 'obra/buscarObrasComIds', function (result) {
                            if (result) {
                                result = JSON.parse(result);
                                var relacaoObraAux = new RelacaoObra();
                                if (result.result.length > 0) {
                                    var obra;
                                    for (var i = 0; i < result.result.length; i++) {
                                        console.log('* obra');
                                        obra = new Obra();
                                        obra.json(result.result[i]);
                                        relacaoObraAux.json(relacoesObra[i]);
                                        if (relacaoObraAux.getEstado() == 'rejeitada') {
                                            continue;
                                        }
                                        if (obra.getAndamento() == 'criada') {
                                            pag.addListaPendente(obra, i, relacoesObra[i]);
                                        } else if (obra.getAndamento() == 'iniciada' || obra.getAndamento() == 'pausada') {
                                            pag.addListaAndamento(obra, i, relacoesObra[i]);
                                        } else if (obra.getAndamento() == 'concluida' || obra.getAndamento() == 'interrampida') {
                                            pag.addListaConcluida(obra, i, relacoesObra[i]);
                                        } else {
                                            console.log('Erro - andamento da obra não existe: Obra -> ' + obra.jsonString());
                                        }
                                    }
                                } else {
                                    // TODO [michel]
                                    // mostrar uma mensagem dizendo que a lista está vazia
                                }
                            }
                        });
                        if (relacoesObra.length > 0) {
                            //request3.enviar("obraIds="+JSON.stringify(relacoesObra));
                            var ro;
                            var array = new Array();
                            for (var j = 0; j < relacoesObra.length; j++) {
                                ro = relacoesObra[j];
                                array.push(ro.getIdObra());
                            }
                            request3.enviar("obraIds=" + JSON.stringify(array));
                        }
                    });
                    request2.enviar("idUsuarioPrestador=" + usuario.getId());
                }
            }
        } else {
            pagina.abrirPaginas("login");
        }
    }

    this.abrirObra = function (obra) {

        if (obra) {
            window.localStorage.setItem('obra', obra.jsonString());
            pagina.abrirPaginas("obra");
        }

    }

    this.addListaPendente = function (obra, qntNovo, relacaoObra) {

        var nome = ' ';
        nome = obra.getNome();

        var subtitulo = '';

        if (relacaoObra) {
            nome = obra.getNome();
            subtitulo = relacaoObra.getEstado();
        }

        var imgSrc = "images/fulano2.png";
        if (obra.getFoto()) {
            imgSrc = pagina.uploadedObraImages() + obra.getFoto();
        }

        listaPendentes.push(obra);

        var row = document.createElement("div");
        row.className = "row card pointer";
        row.style.height = "5em";
        row.style.background = "url('images/filter.png'),url(" + imgSrc + ")";
        row.style.backgroundSize = "cover";
        row.addEventListener("click", function () {
            if (relacaoObra) {
                window.localStorage.setItem('parceiroConsultarObra', relacaoObra.jsonString());
            }
            pag.abrirObra(obra);
        });
        var col = document.createElement("div");
        col.className = "col s3";
        var img = document.createElement("img");
        img.src = imgSrc;
        img.className = "responsive-img";
        img.style.margin = "0.6em 0em";
        //col.appendChild(img);
        //row.appendChild(col);
        col = document.createElement("div");
        col.className = "col s9";
        var p = document.createElement("p");
        p.className = "white-text";
        p.style.fontWeight = "bold";
        p.style.margin = "1em 0em";
        p.appendChild(document.createTextNode(nome));
        col.appendChild(p);

        //subtitulo
        var p = document.createElement("p");
        p.className = "white-text";
        p.style.fontWeight = "bold";
        p.style.margin = "1em 0em";
        p.style.fontSize = "0.8em";
        p.appendChild(document.createTextNode(subtitulo));
        col.appendChild(p);
        //--subtitulo

        row.appendChild(col);


        //        col = document.createElement("div");
        //        col.className = "col s3";
        //        var span = document.createElement("span");
        //        span.className = "teal badge white-text";
        //        span.style.margin = "2em 0em";
        //        span.appendChild(document.createTextNode(qntNovo));
        //        col.appendChild(span);
        //        row.appendChild(col);


        document.getElementById("test1").appendChild(row);
    }

    this.addListaAndamento = function (obra, qntNovo, relacaoObra) {

        var nome = ' ';
        nome = obra.getNome();

        var subtitulo = '';

        if (relacaoObra) {
            subtitulo = relacaoObra.getEstado();
            nome = obra.getNome() + " : Relacao Obra";
        }

        var imgSrc = "images/fulano2.png";
        if (obra.getFoto()) {
            imgSrc = pagina.uploadedObraImages() + obra.getFoto();
        }

        listaAndamento.push(obra);

        var row = document.createElement("div");
        row.className = "row card pointer";
        row.style.height = "5em";
        row.style.background = "url('images/filter.png'),url(" + imgSrc + ")";
        row.style.backgroundSize = "cover";
        row.addEventListener("click", function () {
            if (relacaoObra) {
                window.localStorage.setItem('parceiroConsultarObra', relacaoObra.jsonString());
            }
            pag.abrirObra(obra);
        });
        var col = document.createElement("div");
        col.className = "col s3";
        var img = document.createElement("img");
        img.src = imgSrc;
        img.className = "responsive-img circle";
        img.style.margin = "0.6em 0em";
        col.appendChild(img)
            //row.appendChild(col);
        col = document.createElement("div");
        col.className = "col s6";
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.style.fontWeight = "bold";
        p.className = "white-text";
        p.appendChild(document.createTextNode(nome));
        col.appendChild(p);

        //subtitulo
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.style.fontWeight = "bold";
        p.style.fontSize = "0.8em";
        p.className = "white-text";
        p.appendChild(document.createTextNode(subtitulo));
        col.appendChild(p);
        //--subtitulo

        row.appendChild(col);

        //        col = document.createElement("div");
        //        col.className = "col s3";
        //        var span = document.createElement("span");
        //        span.className = "teal badge white-text";
        //        span.style.margin = "2em 0em";
        //        span.appendChild(document.createTextNode(qntNovo));
        //        col.appendChild(span);
        //        row.appendChild(col);


        document.getElementById("test2").appendChild(row);
    }

    this.addListaConcluida = function (obra, qntNovo, relacaoObra) {

        var nome = ' ';
        nome = obra.getNome();

        var subtitulo = '';

        if (relacaoObra) {
            subtitulo = relacaoObra.getEstado();
            nome = obra.getNome() + " : Relacao Obra";
        }

        var imgSrc = "images/fulano2.png";
        if (obra.getFoto()) {
            imgSrc = pagina.uploadedObraImages() + obra.getFoto();
        }

        listaConcluidas.push(obra);

        var row = document.createElement("div");
        row.className = "row card pointer";
        row.style.background = "url('images/filter.png'),url(" + imgSrc + ")";
        row.style.backgroundSize = "cover";
        row.addEventListener("click", function () {
            if (relacaoObra) {
                window.localStorage.setItem('parceiroConsultarObra', relacaoObra.jsonString());
            }
            pag.abrirObra(obra);
        });
        var col = document.createElement("div");
        col.className = "col s3";
        var img = document.createElement("img");
        img.src = imgSrc;
        img.className = "responsive-img circle";
        img.style.margin = "0.6em 0em";
        col.appendChild(img)
            //row.appendChild(col);
        col = document.createElement("div");
        col.className = "col s6";
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.style.fontWeight = "bold";
        p.className = "white-text";
        p.appendChild(document.createTextNode(nome));
        col.appendChild(p);

        //subtitulo
        var p = document.createElement("p");
        p.style.margin = "1em 0em";
        p.style.fontSize = "0.8em";
        p.style.fontWeight = "bold";
        p.className = "white-text";
        p.appendChild(document.createTextNode(subtitulo));
        col.appendChild(p);
        //--subtitulo


        row.appendChild(col);

        //        col = document.createElement("div");
        //        col.className = "col s3";
        //        var span = document.createElement("span");
        //        span.className = "teal badge white-text";
        //        span.style.margin = "2em 0em";
        //        span.appendChild(document.createTextNode(qntNovo));
        //        col.appendChild(span);
        //        row.appendChild(col);


        document.getElementById("test3").appendChild(row);
    }

    this.construtor();
}