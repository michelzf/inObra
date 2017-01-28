function PagLogin() {
    this.construtor = function () {
        pagina.setTitle("Login");
        this.montaPagHtml();
    }

    this.montaPagHtml = function () {
        pagina.getPagina().empty();
        if (!window.localStorage.getItem("usuario")) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            var main = document.createElement("main");
            var main_0 = document.createElement('div');
            main_0.className = "container";

            var div_0 = document.createElement('div');
            div_0.className = "row center";
            div_0.style.marginTop = "2em";

            var div_1 = document.createElement('div');
            div_1.className = "col s12";

            var img_0 = document.createElement('img');
            img_0.src = "images/logo.png";
            img_0.style.width = "13em";
            img_0.className = "responsive-img";
            div_1.appendChild(img_0);


            div_0.appendChild(div_1);

            main_0.appendChild(div_0);
            main.appendChild(main_0);
            pagina.getPagina().appendChild(main);


            var footer_0 = document.createElement('div');
            footer_0.className = "container";

            var div_7 = document.createElement('div');
            div_7.className = "row";

            var div_8 = document.createElement('div');
            div_8.className = "row";

            var a_1 = document.createElement('a');
            a_1.addEventListener("click", function () {
                pagina.abrirPaginas("main");
            });
            a_1.className = "teal waves-effect waves-light btn-large btn-xl";
            var i = document.createElement("i");
            i.className = "mdi mdi-wrench left";
            a_1.appendChild(i);
            a_1.appendChild(document.createTextNode("Acesse com a conta Obra"));
            a_1.addEventListener("click", function () {
                pagina.abrirPaginas("login2");

            });
            div_8.appendChild(a_1);

            footer_0.appendChild(div_8);

            var a_0 = document.createElement('a');
            a_0.className = "light-blue darken-4 waves-effect waves-light btn-large btn-xl";
            var i = document.createElement("i");
            i.className = "mdi mdi-facebook left";
            a_0.appendChild(i);
            a_0.appendChild(document.createTextNode("Acesse com o facebook"));
            a_0.addEventListener("click", function () {
                pagina.abrirPaginas("main");

            });
            div_7.appendChild(a_0);

            footer_0.appendChild(div_7);

            var div_9 = document.createElement('div');
            div_9.className = "row center";

            var a_2 = document.createElement('a');
            a_2.className = "green waves-effect waves-light btn-large btn-xl white-text";
            var i = document.createElement("i");
            i.className = "mdi mdi-account-plus left";
            a_2.appendChild(i);
            a_2.appendChild(document.createTextNode("Cadastre-se"));
            a_2.addEventListener("click", function () {
                pagina.abrirPaginas("selecionarPerfil");


            });
            div_9.appendChild(a_2);

            footer_0.appendChild(div_9);

            pagina.getPagina().appendChild(footer_0);

        } else {
            pagina.abrirPaginas("main");
        }

    }

    this.construtor();
}