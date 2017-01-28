function PagCadastroParceiro() {
    this.construtor = function () {
        pagina.setTitle("Cadastro");
        this.montaPagHtml();
    }
    this.montaPagHtml = function () {
        pagina.getPagina().empty();
        var div_1 = document.createElement('main');
        div_1.className = "container";
        div_1.setAttribute("style", "margin-top: 4em !important");
        var form_0 = document.createElement('form');
        form_0.className = "col s12";
        var div_2 = document.createElement('div');
        div_2.className = "row";
        var inputField = document.createElement("div");
        inputField.className = "input-field col s12";
        var input = document.createElement("input");
        input.type = "text";
        input.tagName = "tags";
        input.id = "tags";
        input.setAttribute("data-role", "materialtags");
        inputField.appendChild(input);
        var label_2 = document.createElement('label');
        label_2.htmlFor = "tags";
        label_2.setAttribute("style", "left:0em !important");
        label_2.appendChild(document.createTextNode("Serviços"));
        inputField.appendChild(label_2);
        //form_0.appendChild(inputField);
        var div_6 = document.createElement('div');
        div_6.className = "row";
        var div_7 = document.createElement('div');
        div_7.className = "input-field col s12";
        var select_0 = document.createElement('select');
        select_0.multiple = "multiple";
        select_0.id = "selectTags";
        var option_0 = document.createElement('option');
        option_0.selected = "selected";
        option_0.value = "";
        option_0.disabled = "disabled";
        option_0.appendChild(document.createTextNode("Selecione o tipo de serviço"));
        select_0.appendChild(option_0);
        div_7.appendChild(select_0);
        this.construtorTags(select_0, tags);
        var label_0 = document.createElement('label');
        label_0.appendChild(document.createTextNode("Tipo de serviço"));
        div_7.appendChild(label_0);
        div_6.appendChild(div_7);
        form_0.appendChild(div_6);
        var div_8 = document.createElement('div');
        div_8.className = "input-field col s12";
        var input_rg = document.createElement('input');
        input_rg.className = "validate";
        input_rg.type = "text";
        input_rg.id = "cpf";
        div_8.appendChild(input_rg);
        var label_3 = document.createElement('label');
        label_3.htmlFor = "cpf";
        label_3.appendChild(document.createTextNode("CPF"));
        div_8.appendChild(label_3);
        div_2.appendChild(div_8);
        form_0.appendChild(div_2);
        // Descricao
        var rowDescricao = document.createElement('div');
        rowDescricao.className = "row";
        var divDescricao = document.createElement('div');
        divDescricao.className = "input-field col s12";
        var input_descParceiro = document.createElement('textarea');
        input_descParceiro.className = "materialize-textarea";
        input_descParceiro.id = "descParceiro";
        divDescricao.appendChild(input_descParceiro);
        var lavelDescricao = document.createElement('label');
        lavelDescricao.htmlFor = "descObra";
        lavelDescricao.appendChild(document.createTextNode("Faça uma descrição do seu serviço"));
        divDescricao.appendChild(lavelDescricao);
        rowDescricao.appendChild(divDescricao);
        form_0.appendChild(rowDescricao);
        //
        div_1.appendChild(form_0);
        pagina.getPagina().appendChild(div_1);
        var footer = document.createElement("div");
        footer.className = "container";
        var div_16 = document.createElement("div");
        div_16.className = "row center";
        div_16.setAttribute("style", "margin:0em !important");
        var button = document.createElement('a');
        button.className = "waves-effect waves-light btn btn-large btn-xl";
        button.appendChild(document.createTextNode("Concluir Cadastro"));
        button.addEventListener("click", function () {
            //var listaTags = $('#selectTags').val();
            //if(listaTags.length == 0){
            var listaTags = new Array();
            listaTags = $('#selectTags').val();
            if (listaTags.length == 0) {
                listaTags = undefined;
            }

            //}
            var descricao = document.getElementById('descParceiro').value;
            if (descricao.length == 0) {
                descricao = undefined;
            }
            var cpf = document.getElementById('cpf').value;
            if (cpf.length == 0) {
                cpf = undefined;
            }
            var usuario = new Usuario();
            var perfilUsuario = JSON.parse(window.localStorage.getItem('cadastrarPrestador'));
            console.log('usuario a ser cadastrado');
            console.log(usuario);
            if (usuario.json(perfilUsuario) && perfilUsuario) {
                if (usuario.setTags(listaTags) && listaTags) {
                    if (usuario.setDescricao(descricao) && descricao) {
                        if (usuario.setCpf(cpf) && cpf) {
                            usuario.setPrestadorServico(true);
                            pag.concluirCadastro(usuario, perfilUsuario.senha);
                        } else {
                            alert('CPF faltante.');
                        }
                    } else {
                        alert('Descrição faltante.');
                    }
                } else {
                    alert('Lista de serviço faltante.');
                }
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        });
        div_16.appendChild(button);
        footer.appendChild(div_16);
        var col = document.createElement("div");
        col.className = "col s12 center";
        var a_2 = document.createElement('a');
        a_2.className = "waves-effect waves-teal btn-flat teal-text";
        a_2.appendChild(document.createTextNode("Voltar"));
        a_2.addEventListener("click", function () {
            pagina.abrirPaginas("selecionarPerfil");
        });
        col.appendChild(a_2);
        footer.appendChild(col);
        pagina.getPagina().appendChild(footer);
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });
        $('#selectTags').material_select();
        $('#selectTags').change(function () {
            var newValuesArr = [],
                select = $(this),
                ul = select.prev();
            ul.children('li').toArray().forEach(function (li, i) {
                if ($(li).hasClass('active')) {
                    newValuesArr.push(select.children('option').toArray()[i].value);
                }
            });
            select.val(newValuesArr);

            console.log($(this).val());
        });
        // var perfilUsuario = JSON.parse(window.localStorage.getItem('cadastrarPrestador'));
        // console.log(perfilUsuario);
    }
    this.concluirCadastro = function (usr, senha) {
        var hr = new HttpReq("post", pagina.apiUrl() + "usuario/cadastrar/1", function (result) {
            console.log('Request returns:');
            if (typeof result == typeof 'string') {
                result = JSON.parse(result);
            }
            console.log(result);
            if (result.err) {
                if (result.err == 1111) {
                    alerta.abrirErro('Esse e-mail já está em uso.');
                } else {
                    alerta.abrirErro(result.err);
                }
                localStorage.setItem("controle", "prestador");
                pagina.abrirPaginas("cadastroGeral");
            } else {
                r = result;
                var t = new Token(result.result);
                if (t.getSeq() != undefined && t.getUsuarioId() != undefined) {
                    alerta.abrirSucesso("Usuário cadastrado com sucesso");
                    localStorage.setItem("token", t.jsonString());
                    usuario.setId(t.getUsuarioId());
                    if (result.usuario.foto) {
                        usuario.setFoto(result.usuario.foto);
                    }
                    localStorage.setItem("usuario", usuario.jsonString(true));
                    pagina.abrirPaginas("main");
                } else {
                    // não é para cair aqui, mas temos que ter o if porque vai que cai
                    alerta.abrirErro("Não foi possível entrar no aplicativo. Tente novamente mais tarde.");
                }
            }
        });
        var usuario = new Usuario();
        if (usuario.json(usr)) {
            usuario.setSenhaSemVerificar(senha);
            console.log('usuario a ser cadastrado:');
            console.log(usuario);
            var img = localStorage.getItem("controle");
            console.log('imagem do usuario a ser cadastrado:');
            console.log(img);
            var formData = new FormData();
            formData.append("userImage", img);
            formData.append("usuario", usuario.jsonString(true));
            localStorage.setItem("controle", undefined);
            hr.enviar(formData);
        } else {
            alerta('Erro no cadastro de usuário.');
        }
    }
    this.construtorTags = function (pai, options) {
        for (i = 0; i < options.length; i++) {
            var option_1 = document.createElement('option');
            option_1.value = options[i];
            option_1.appendChild(document.createTextNode(options[i]));
            pai.appendChild(option_1);
        }
    }
    this.construtor();
}