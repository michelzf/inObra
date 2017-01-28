function Pagina() {
    var paginaAnterior = undefined;
    var paginaAtual = undefined;
    this.getPaginaAtual = function () {
        return paginaAtual;
    }

    this.getPaginaAnterior = function () {
        return paginaAnterior;
    }

    this.setPaginaAtual = function (pAtual) {
        paginaAtual = pAtual;
        return true;
    }

    this.setPaginaAnterior = function (pAnterior) {
        paginaAnterior = pAnterior;
        return true;
    }

    this.scrollTo = function (ele) {
        ele.scrollIntoView(true);
    }

    this.getPagina = function () {
        return document.getElementById("pagina");
    }

    this.dataURItoBlob = function (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {
            type: mimeString
        });
    }

    this.uploadedUserImages = function () {
        return 'http://app-inopus2obra.rhcloud.com/uploadedFiles/userImages/';
    }

    this.uploadedObraImages = function () {
        return 'http://app-inopus2obra.rhcloud.com/uploadedFiles/obraImages/';
    }

    this.abrirPaginas = function (novaPagina) {
        document.getElementsByTagName("body")[0].className = "grey lighten-4";
        document.getElementsByTagName("body")[0].style.backgroundImage = "";
        document.getElementsByTagName("header")[0].style.display = "block";
        document.getElementById("btnVoltar").style.display = "block";
        if (this.getPaginaAtual() == novaPagina && novaPagina == "menu_principal") {
            novaPagina = this.getPaginaAnterior();
        }

        if (novaPagina == "inicial") {
            pag = new PagInicial();
        } else if (novaPagina == "cadastroGeral") {
            document.getElementsByTagName("header")[0].style.display = "block";
            pag = new PagCadastroGeral();
        } else if (novaPagina == "cadastroParceiro") {
            document.getElementsByTagName("header")[0].style.display = "none";
            pag = new PagCadastroParceiro();
            document.getElementById("btnVoltar").style.display = "none";
        } else if (novaPagina == "selecionarPerfil") {
            document.getElementsByTagName("body")[0].className = "teal";
            document.getElementsByTagName("header")[0].style.display = "none";
            pag = new PagEscolhePerfil();
        } else if (novaPagina == "main") {
            document.getElementById("btnVoltar").style.display = "none";
            pag = new PagMain();
        } else if (novaPagina == "login") {
            document.getElementsByTagName("body")[0].style.backgroundImage = "url('images/filter.png'), url('images/bg/bgLogin.jpg')";
            document.getElementsByTagName("header")[0].style.display = "none";
            pag = new PagLogin();
        } else if (novaPagina == "login2") {
            document.getElementsByTagName("body")[0].style.backgroundImage = "url('images/filter.png'), url('images/bg/bgLogin2.jpg')";
            document.getElementsByTagName("header")[0].style.display = "none";
            pag = new PagLogin2();
        } else if (novaPagina == "parceiro") {
            pag = new PagParceiro();
        } else if (novaPagina == "addObra") {
            //document.getElementsByTagName("header")[0].style.display = "none";
            pag = new PagAddObra();
        } else if (novaPagina == "obra") {
            pag = new PagObra();
        } else if (novaPagina == "escolheParceiro") {
            pag = new PagEscolheParceiro();
        } else if (novaPagina == "chat") {
            pag = new PagChat();
        }

        window.history.pushState("", "", "#@!" + novaPagina);

        this.setPaginaAnterior(this.getPaginaAtual());
        this.setPaginaAtual(novaPagina);

        window.setTimeout(function () {
            pagina.scrollTo(document.getElementsByTagName("body")[0]);
        }, 50);
        return true;
    }

    this.setTitle = function (title) {
        document.getElementsByTagName("title")[0].innerHTML = title + " - Reformando";
    }

    this.apiUrl = function () {
        return "https://app-inopus2obra.rhcloud.com/api/";
        //        return "https://app-inopus2obra.rhcloud.com/api/";
    }

    this.socketUrl = function () {
        return "wss://localhost:8443/socket/";
        //        return "wss://app-inopus2obra.rhcloud.com:8443/socket/";
    }

    this.construtor = function () {
        setTimeout(function () {
            window.onpopstate = function (event) {
                pagina.aplicarRota();
            }
            pagina.aplicarRota();
        }, 700);
    }

    this.aplicarRota = function () {
        if (window.location.href.indexOf("#@!") < 1) {
            pagina.abrirPaginas("login");
        } else {
            var p = window.location.href.split("#@!");
            if (p) {
                if (p[1].indexOf("/") > 0 || p[1] == undefined) {
                    pagina.abrirPaginas("login");
                } else {
                    pagina.abrirPaginas(p[1]);
                }
            } else {
                pagina.abrirPaginas("login");
            }
        }
    }

    this.construtor();
}