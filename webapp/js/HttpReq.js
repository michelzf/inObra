function HttpReq(metodoRecebido, urlRecebido, fSucesso, fErro) {
    // versão 12

    // Comentários da versão
    // suporte a FormData e String no enviar(); Suporte a PUT, GET e POST; GET nâo envia Token;

    // dependencias
    // precisa ter instanciado as seguintes classes: Carregando, Token e Alerta

    this.paginaInicial = "login";
    this.url = undefined;
    this.metodo = undefined;
    this.xmlHttpRequest = undefined;
    this.variaveisCache = undefined; // acho que eu fiz essa para poder reenviar a requisição automaticamente

    this.construtor = function (metodoRecebido, urlRecebido) {
        this.metodo = metodoRecebido.toLowerCase();
        this.url = urlRecebido;
        this.xmlHttpRequest = new XMLHttpRequest();
        if (!fSucesso) {
            fSucesso = function (result) {
                console.log("Sucesso:" + result);
            }
        }
        if (!fErro) {
            fErro = function (result) {
                //pagina.erroPadraoConexao();
                console.log("erro: ");
                console.log(result);
            }
        }
        return true;
    }

    this.enviar = function (variaveis, logado, telaCarregando, tempoEsgotado) {
        if (typeof variaveis == "undefined") {
            variaveis = "";
        } else {
            this.variaveisCache = variaveis;
        }
        if (typeof telaCarregando == "undefined") {
            // aparecer a tela de carregando
            telaCarregando = true;
        }
        if (typeof logado == "undefined") {
            // tem que enviar o token (para paginas restritas do servidor)
            logado = true;
        }
        if (typeof tempoEsgotado == "undefined" || tempoEsgotado < 1) {
            tempoEsgotado = 30000;
        }
        this.xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                fSucesso(this.response);
                if (telaCarregando) {
                    carregando.fechar();
                }
            } else if (this.readyState == 4 && this.status != 200) {
                if (this.status == 401) {
                    if (window.localStorage.getItem("usuario")) {
                        var usuario = new Usuario();
                        usuario.json(window.localStorage.getItem("usuario"));
                        usuario.setSenhaSemVerificar(JSON.parse(window.localStorage.getItem("usuario")).senha);
                        var hr = new HttpReq("post", pagina.apiUrl() + "usuario/entrar", function (result) {
                            if (result.err) {
                                alerta.abrirErro(result.err);
                            } else {
                                var senha = usuario.getSenha();
                                usuario = new Usuario();
                                if (typeof result == typeof "x") {
                                    result = JSON.parse(result);
                                }
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
                        }, function (result) {
                            console.log("erro perda de conexao");
                            window.localStorage.setItem("usuario", undefined);
                            window.localStorage.setItem("token", undefined);
                            pagina.abrirPaginas(pagina.paginaInicial);
                        });
                        hr.enviar("usuario=" + usuario.jsonString());
                    } else {
                        alerta.abrirErro("Esse acesso precisa ser autenticado.", 10000);
                        console.log(this.status + " : " + this.readyState);
                        carregando.terminar(fErro);
                        pagina.abrirPaginas(pagina.paginaInicial);
                    }
                } else if (this.status == 404) {
                    alerta.abrirErro("Serviço não encontrado", 10000);
                    console.log(this.status + " : " + this.readyState);
                    carregando.terminar(fErro);
                } else {
                    alerta.abrirErro("Erro desconhecido. Tente novamente mais tarde.");
                    console.log(this.status + " : " + this.readyState);
                    carregando.terminar(fErro);
                }
            }
        };
        var retorno = false;
        if (this.metodo == "post") {
            this.xmlHttpRequest.open("POST", this.url, true);
            this.xmlHttpRequest.timeout = tempoEsgotado;
            if (typeof variaveis == typeof new Object) {
                if (typeof variaveis.append == typeof Function && typeof variaveis.get == typeof Function && typeof variaveis.keys == typeof Function) {
                    // this.xmlHttpRequest.setRequestHeader("Content-type", "multipart/form-data");
                    variaveis.append("token", window.localStorage.getItem("token"));
                    retorno = true;
                } else {
                    this.xmlHttpRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    variaveis["token"] = window.localStorage.getItem("token");
                    retorno = true;
                }
            } else if (typeof variaveis == typeof "x") {
                this.xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                if (window.localStorage.getItem("token") && logado) {
                    variaveis = variaveis + "&token=" + window.localStorage.getItem("token");
                }
                retorno = true;
            } else {
                if (variaveis) {
                    variaveis = JSON.stringify(variaveis);
                    if (window.localStorage.getItem("token") && logado) {
                        variaveis = variaveis + "&token=" + window.localStorage.getItem("token");
                    }
                    retorno = true;
                } else {
                    variaveis = undefined;
                    retorno = true;
                }
            }
            if (retorno) {
                this.xmlHttpRequest.send(variaveis);
            }
        } else if (this.metodo == "get") {
            this.xmlHttpRequest.open("GET", this.url, true);
            this.xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            this.xmlHttpRequest.timeout = tempoEsgotado;
            if (variaveis) {
                alerta.abrirAtencao("Os valores enviados por parametro serão ignorados (Método GET).");
            } else if (window.localStorage.getItem("token") && logado) {
                alerta.abrirAtencao("O token não será enviado (Método GET).");
            } else if (window.localStorage.getItem("token") && logado && variaveis) {
                alerta.abrirAtencao("Os valores enviados por parametro serão ignorados. O token não será enviado (Método GET).");
            }
            this.xmlHttpRequest.send();
            retorno = true;
        } else if (this.metodo == "put") {
            this.xmlHttpRequest.open("PUT", this.url, true);
            this.xmlHttpRequest.timeout = tempoEsgotado;
            if (typeof variaveis == typeof new Object) {
                if (typeof variaveis.append == typeof Function && typeof variaveis.get == typeof Function && typeof variaveis.keys == typeof Function) {
                    // this.xmlHttpRequest.setRequestHeader("Content-type", "multipart/form-data");
                    variaveis.append("token", window.localStorage.getItem("token"));
                    retorno = true;
                } else {
                    variaveis["token"] = window.localStorage.getItem("token");
                    retorno = true;
                }
            } else if (typeof variaveis == typeof "x") {
                this.xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                if (window.localStorage.getItem("token") && logado) {
                    variaveis = variaveis + "&token=" + window.localStorage.getItem("token");
                }
                retorno = true;
            } else {
                if (variaveis) {
                    variaveis = JSON.stringify(variaveis);
                    if (window.localStorage.getItem("token") && logado) {
                        variaveis = variaveis + "&token=" + window.localStorage.getItem("token");
                    }
                    retorno = true;
                } else {
                    variaveis = undefined;
                    retorno = true;
                }
            }
            if (retorno) {
                this.xmlHttpRequest.send(variaveis);
            }
        } else {
            console.log("Método inválido: " + this.metodo);
            retorno = false;
        }
        if (telaCarregando) {
            carregando.abrir(tempoEsgotado, "Verifique a sua conexão com a Internet e tente novamente.");
        }
        return retorno;
    }

    this.construtor(metodoRecebido, urlRecebido);
}