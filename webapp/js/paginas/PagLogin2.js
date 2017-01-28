function PagLogin2() {
    this.construtor = function () {
        pagina.setTitle("Login");
        this.montaPagHtml();
    }

    this.montaPagHtml = function () {
        pagina.getPagina().empty();
        if (window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("main");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            var main_0 = document.createElement('div');
            main_0.className = "container";

            var div_0 = document.createElement('div');
            div_0.className = "row center";
            div_0.style.marginTop = "1em";

            var div_1 = document.createElement('div');
            div_1.className = "col s12";

            var img_0 = document.createElement('img');
            img_0.style.width = "6em";
            img_0.src = "images/obraIcon.png";
            img_0.className = "responsive-img";
            div_1.appendChild(img_0);

            div_0.appendChild(div_1);

            main_0.appendChild(div_0);


            var div_2 = document.createElement('div');
            div_2.className = "row";

            var form_0 = document.createElement('form');
            form_0.className = "col s12";

            var div_3 = document.createElement('div');
            div_3.className = "row";

            var div_4 = document.createElement('div');
            div_4.className = "input-field col s12";

            var input_email = document.createElement('input');
            input_email.className = "validate";
            input_email.type = "email";
            input_email.id = "email";
            input_email.style.color = "#FFFFFF";
            input_email.autofocus;
            input_email.addEventListener("keyup", function (event) {
                if (event.key == "Enter" || event.keyCode == 13) {
                    $("#password").focus();
                }
            });
            div_4.appendChild(input_email);


            var label_0 = document.createElement('label');
            label_0.htmlFor = "email";
            label_0.appendChild(document.createTextNode("Email"));
            div_4.appendChild(label_0);

            div_3.appendChild(div_4);

            form_0.appendChild(div_3);


            var div_5 = document.createElement('div');
            div_5.className = "row";

            var div_6 = document.createElement('div');
            div_6.className = "input-field col s12";

            var input_password = document.createElement('input');
            input_password.className = "validate";
            input_password.id = "password";
            input_password.type = "password";
            input_password.style.color = "#FFFFFF";
            input_password.addEventListener("keyup", function (event) {
                if (event.key == "Enter" || event.keyCode == 13) {
                    pag.login(document.getElementById("email").value, document.getElementById("password").value);
                }
            });
            div_6.appendChild(input_password);


            var label_1 = document.createElement('label');
            label_1.htmlFor = "password";
            label_1.appendChild(document.createTextNode("Senha"));
            div_6.appendChild(label_1);

            div_5.appendChild(div_6);

            form_0.appendChild(div_5);

            div_2.appendChild(form_0);

            main_0.appendChild(div_2);

            pagina.getPagina().appendChild(main_0);


            var footer_0 = document.createElement('div');
            footer_0.className = "container";

            var div_7 = document.createElement('div');
            div_7.className = "row";

            var a_0 = document.createElement('a');
            a_0.className = "light-blue waves-effect waves-light btn-large btn-xl";
            a_0.style.height = "44px";
            a_0.style.lineHeight = "44px";
            a_0.appendChild(document.createTextNode("Entrar"));
            a_0.addEventListener("click", function () {
                pag.login(document.getElementById("email").value, document.getElementById("password").value);
            });
            div_7.appendChild(a_0);

            footer_0.appendChild(div_7);


            var div_8 = document.createElement('div');
            div_8.className = "row";

            var a_1 = document.createElement('a');
            a_1.addEventListener("click", function () {
                pagina.abrirPaginas("selecionarPerfil");
            });
            a_1.className = "green waves-effect waves-light btn-large btn-xl";
            a_1.style.height = "44px";
            a_1.style.lineHeight = "44px";
            a_1.appendChild(document.createTextNode("Cadastre-se"));
            div_8.appendChild(a_1);
            footer_0.appendChild(div_8);


            var div_9 = document.createElement('div');
            div_9.className = "row center";

            var div_10 = document.createElement('div');
            div_10.className = "col s12 center";
            var a_2 = document.createElement('a');
            a_2.className = "waves-effect waves-teal btn-flat white-text";
            a_2.appendChild(document.createTextNode("Esqueçeu seus dados?"));
            a_2.addEventListener("click", function () {
                pagina.abrirPaginas("redefinirSenha");
            });
            div_10.appendChild(a_2);
            div_9.appendChild(div_10);

            var a_2 = document.createElement('a');
            a_2.className = "waves-effect waves-teal btn-flat white-text";
            a_2.appendChild(document.createTextNode("Voltar"));
            a_2.addEventListener("click", function () {
                pagina.abrirPaginas("login");
            });
            div_10.appendChild(a_2);
            div_9.appendChild(div_10);

            footer_0.appendChild(div_9);

            pagina.getPagina().appendChild(footer_0);

        }

        this.login = function (email, senha) {
            var usuario = new Usuario();
            if (!usuario.setEmail(email) ||
                !usuario.setSenha(senha)
            ) {
                alerta.abrirErro("E-mail ou senha inválidos.");
            } else {
                var hr = new HttpReq("post", pagina.apiUrl() + "usuario/entrar", function (result) {
                    if (result.err) {
                        alerta.abrirErro(result.err);
                    } else {

                        console.log(result.err);
                        console.log(result);

                        var senha = usuario.getSenha();
                        usuario = new Usuario();
                        if (typeof result == typeof "x") {
                            result = JSON.parse(result);
                        }
                        if (result.err) {
                            alerta.abrirErro("Email ou senha incorretos.");
                        } else {
                            usuario.json(result.result[0]);
                            usuario.setSenhaSemVerificar(senha);
                            var tkn = new Token(result.result[1]);
                            if (tkn.getSeq()) {
                                localStorage.setItem("usuario", usuario.jsonString());
                                localStorage.setItem("token", tkn.jsonString());
                                pagina.abrirPaginas("main");
                            } else {
                                alerta.abrirErro("Algo deu errado. Tente novamente mais tarde.");
                            }
                        }
                    }
                });
                hr.enviar("usuario=" + usuario.jsonString());
            }
        }

    }

    this.construtor();
}