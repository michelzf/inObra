function Banco() {
    this.aguardando = 0;
    this.updateCount = 0;
    var db = new Array();
    this.idIntervalAguardando = 0;
    if (window.indexedDB) {
        this.construtor = function () {
            var request = window.indexedDB.open("inopus-obra", 10);
            request.onsuccess = function (event) {
                banco.setCon(0, event.target.result);
                if (!(banco.getCon(0).version > 3)) {
                    window.top.location = "indisponivel.html";
                }

                // isso aqui ta aqui porque se eu troco para o autenticado e o banco nao terminou de iniciar da pau
                // if(usuario.getId() != "") {
                // console.log("pagina.alteraConfig('autenticado')");
                // } else {
                // console.log("pagina.alteraConfig('naoAutenticado')");
                // }
                // carregando.fechar();
            }
            request.onupgradeneeded = function (event) {
                /*banco.setCon(0, event.target.result);
                //
                var jaExiste_Unidade = false;
                //
                var osn = banco.getCon(0).objectStoreNames;
                var osnTmn = banco.getCon(0).objectStoreNames.length;
                for (var i = 0; i < osnTmn; i++) {
                    if (osn[i] == "Unidade") {
                        jaExiste_Unidade = true;
                    }
                }
                //
                if (jaExiste_Unidade) {
                    banco.getCon(0).deleteObjectStore("Unidade");
                    jaExiste_Unidade = false;
                }
                //
                if (!jaExiste_Unidade) {
                    var os = banco.getCon(0).createObjectStore("Unidade", {
                        keyPath: "id"
                    });
                }*/
            }
            request.onerror = function (event) {
                if (banco.getCon(0)) {
                    alert('Erro 001: Por favor, forneça o "User-Agent" que aparecerá na tela para o administrador do sistema. Dessa forma podemos sempre aprimorar o WebApp para todos. Obrigado!"');
                    // window.top.location = "indisponivel.html";
                } else {
                    window.top.location = "modoAnonimo.html";
                }
            }
            request.onblocked = function (event) {
                if (banco.getCon(0)) {
                    alert("Uma nova versão do banco de dados do WebApp está disponível. Por favor, feche todas as abas/janelas do Rapordo WebApp e recarregue esta página para atualizar o seu WebApp.");
                } else {
                    window.top.location = "indisponivel.html";
                }
            }
        }

        this.getCon = function (tipo) {
            if (tipo == 0) {
                return db[tipo];
            } else {
                return false;
            }
        }

        this.setCon = function (tipo, nDb) {
            if (tipo == 0) {
                db[tipo] = nDb;
                return true;
            } else {
                return false;
            }
        }
    } else {
        // TODO
        // Alternativa para quem não tem IndexedDB
        window.top.location = "indisponivel.html"; // isso é porque ainda não implementei nada para quem nao tem IndexedDB
    }
    this.aguardandoAdd = function () {
        this.aguardandoCarregando();
        this.aguardando++;
        return true;
    }

    this.aguardandoRm = function () {
        this.aguardando--;
        if (this.aguardando < 1) {
            this.aguardando = 0;
        }
        return true;
    }

    this.getAguardando = function () {
        return this.aguardando;
    }

    this.aguardandoCarregando = function () {
        if (this.getAguardando() == 0) {
            window.setTimeout(function () {
                if (banco.getAguardando() != 0 && banco.getIdIntervalAguardando() == 0) {
                    carregando.abrir();
                    banco.setIdIntervalAguardando(window.setInterval(function () {
                        if (banco.getAguardando() == 0) {
                            carregando.fechar();
                            clearInterval(banco.getIdIntervalAguardando());
                            // alerta.abrirAviso("Transação finalizada.");
                            banco.setIdIntervalAguardando(0);
                        }
                        console.log("idIntervalAguardando: " + banco.getIdIntervalAguardando());
                    }, 1400));
                    // alerta.abrirAtencao("Dependendo da quantitade de dados e do seu dispositivo, essa transação pode demorar alguns minutos. Para evitar perda de dados, não feche esse App (Janela / Aba) até que a transação finalize.", 90000);
                }
            }, 700);
        }
    }

    this.getIdIntervalAguardando = function () {
        return this.idIntervalAguardando;
    }

    this.setIdIntervalAguardando = function (id) {
        this.idIntervalAguardando = id;
        return true;
    }

    this.construtor();
}