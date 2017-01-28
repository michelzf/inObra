function PagEscolhePerfil() {

    this.construtor = function () {
        pagina.setTitle("Selecionar Perfil");
        this.montaPagHtml();
    }

    this.montaPagHtml = function () {
        pagina.getPagina().empty();
        var main = document.createElement("main");
        main.setAttribute("style", "margin-top: 1em !important");
        var tagMain = document.createElement("div");

        //------------------DIV ICON-------

        var divIcon = document.createElement("div");
        divIcon.className = "row center";

        //-Icon

        var divIconCol = document.createElement("div");
        divIconCol.className = "col s12";

        var imgIcon = document.createElement("img");
        imgIcon.className = "responsive-img";
        imgIcon.src = "images/obraIcon.png";
        imgIcon.style.height = "7em";

        divIconCol.appendChild(imgIcon);

        divIcon.appendChild(divIconCol);

        //-text

        var divOla = document.createElement("div");
        divOla.className = "col s12 white-text";

        var textSpan = document.createElement("span");

        textSpan.appendChild(document.createTextNode("Olá!"));

        textSpan.style.fontSize = "2.5em";

        divOla.appendChild(textSpan);


        divIcon.appendChild(divOla);

        //--


        tagMain.appendChild(divIcon);

        //------------DIV texto central---

        var divLabelCenter = document.createElement("div");
        divLabelCenter.className = "row center";
        divLabelCenter.setAttribute("style", "margin-bottom: 2em !important");

        //-texto de cima

        var tagTextoCima = document.createElement("span");
        tagTextoCima.appendChild(document.createTextNode("Gostaríamos de saber"));
        tagTextoCima.className = "col s12 white-text";
        tagTextoCima.style.fontSize = "1.5em";


        divLabelCenter.appendChild(tagTextoCima);

        //-texto de baixo

        var tagTextoBaixo = document.createElement("span");
        tagTextoBaixo.appendChild(document.createTextNode("qual é o seu perfil de usuário?"));
        tagTextoBaixo.className = "col s12 white-text";

        divLabelCenter.appendChild(tagTextoBaixo);

        //--


        tagMain.appendChild(divLabelCenter);

        //------------DIV BOTOES
        var row = document.createElement("div");
        row.className = "row container";
        row.style.marginBottom = "0em";
        row.style.display = "flex";


        var col = document.createElement("div");
        col.className = "col s6";
        col.style.display = "flex";
        var col2 = document.createElement("div");
        col2.className = "col s12 teal darken-1 pointer";
        col2.addEventListener("click", function () {
            localStorage.setItem("controle", "prestador");
            pagina.abrirPaginas("cadastroGeral");
        });
        var col3 = document.createElement("div");
        col3.className = "col s12 center";
        col3.style.marginTop = "0.3em";
        var img = document.createElement("img");
        img.className = "responsive-img";
        img.src = "images/chaveInglesa.png";
        col3.appendChild(img);
        col2.appendChild(col3);

        var col4 = document.createElement("div");
        col4.className = "col s12";
        var p = document.createElement("p");
        p.className = "white-text center";
        p.style.margin = "1em 0em";
        p.appendChild(document.createTextNode("Sou um prestador de serviços"));
        col4.appendChild(p);
        col2.appendChild(col4);
        col.appendChild(col2);
        row.appendChild(col);


        var col = document.createElement("div");
        col.className = "col s6";
        var col2 = document.createElement("div");
        col2.className = "col s12 teal darken-1 pointer";
        col2.addEventListener("click", function () {
            localStorage.setItem("controle", "");
            pagina.abrirPaginas("cadastroGeral");
        });
        var col3 = document.createElement("div");
        col3.className = "col s12 center";
        col3.style.marginTop = "0.3em";
        var img = document.createElement("img");
        img.className = "responsive-img";
        img.src = "images/usuario.png";
        col3.appendChild(img);
        col2.appendChild(col3);

        var col4 = document.createElement("div");
        col4.className = "col s12";
        var p = document.createElement("p");
        p.className = "white-text center";
        p.style.margin = "1em 0em";
        p.appendChild(document.createTextNode("Procuro um profissional"));

        col4.appendChild(p);
        col4.appendChild(document.createElement("br"));
        col2.appendChild(col4);
        col.appendChild(col2);
        row.appendChild(col);
        tagMain.appendChild(row);

        var col = document.createElement("div");
        col.className = "col s12 center";
        col.style.marginTop = "2em";

        var a_2 = document.createElement('a');
        a_2.className = "waves-effect waves-teal btn-flat white-text";
        a_2.appendChild(document.createTextNode("Voltar"));
        a_2.addEventListener("click", function () {
            pagina.abrirPaginas("login");
        });
        col.appendChild(a_2);
        tagMain.appendChild(col);


        main.appendChild(tagMain);
        pagina.getPagina().appendChild(main);

    }

    this.construtor();
}