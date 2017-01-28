function PagCadastroGeral() {
    this.construtor = function () {
        pagina.setTitle("Cadastro");
        this.montaPagHtml();
    }
    var usuarioAtualizar;
    this.montaPagHtml = function () {
        usuarioAtualizar = new Usuario();
        if (window.localStorage.getItem('usuario')) {
            if (!usuarioAtualizar.json(window.localStorage.getItem('usuario'))) {
                usuarioAtualizar = undefined;
            }
        } else {
            usuarioAtualizar = undefined;
        }

        if (window.localStorage.getItem('usuario')) {
            document.getElementById("btnVoltar").style.display = "block";
        } else {
            document.getElementById("btnVoltar").style.display = "none";
        }
        document.getElementById("btnVoltar").addEventListener("click", function () {
            if (usuarioAtualizar) {
                pagina.abrirPaginas("main");
            } else {
                pagina.abrirPaginas("selecionarPerfil");
            }
        });
        pagina.getPagina().empty();
        var div_1 = document.createElement('main');
        div_1.className = "row";
        if (usuarioAtualizar) {
            div_1.setAttribute("style", "margin-top: 5em !important");
        } else {
            div_1.setAttribute("style", "margin-top: 5em !important");
        }
        var form_0 = document.createElement('form');
        form_0.className = "col s12";
        var div_0 = document.createElement('div');
        div_0.className = "row";
        var div_r = document.createElement('div');
        div_r.className = "col s12";
        var div_imgPerfil = document.createElement('div');
        div_imgPerfil.id = "imgPerfil";
        div_imgPerfil.className = "pointer";
        var div_2 = document.createElement('div');
        div_2.className = "image-upload center";
        var container = document.createElement("div");
        container.id = "cadastroFotoPerfil";
        var img_0 = document.createElement('img');
        if (usuarioAtualizar) {
            if (!usuarioAtualizar.getFoto()) {
                img_0.src = "images/obraIcon.png";
            } else {
                img_0.src = pagina.uploadedUserImages() + usuarioAtualizar.getFoto();
            }
        } else {
            img_0.src = "images/obraIcon.png";
        }
        img_0.className = "pointer";
        img_0.id = 'perfilAtualizarFoto';
        img_0.alt = "foto";
        img_0.style.width = "25%";
        container.appendChild(img_0);
        div_2.appendChild(container);
        var input = document.createElement("input");
        input.type = "file";
        input.id = "filePerfilCadastro";
        input.style.display = "none";
        input.addEventListener("change", function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                cropEditor(100, 100, 'circle', e.target.result);
            }
            reader.readAsDataURL(document.getElementById("filePerfilCadastro").files[0]);
            document.getElementById("cropedImage").textContent = "cadastroImg";
            $('#modalEditarImg').openModal();
        });
        div_2.appendChild(input);
        div_2.addEventListener("click", function () {
            $("#filePerfilCadastro").click();
        });
        div_imgPerfil.appendChild(div_2);
        div_r.appendChild(div_imgPerfil);
        var div_legendaFoto = document.createElement('div');
        div_legendaFoto.id = "legendaFoto";
        div_legendaFoto.className = "center";
        div_legendaFoto.appendChild(document.createTextNode("Clique acima para adicionar uma foto e  deixar seu perfil bacana"));
        div_r.appendChild(div_legendaFoto);
        div_0.appendChild(div_r);
        form_0.appendChild(div_0);
        //Nome
        var divNome = document.createElement('div');
        divNome.className = "input-field col s12";
        var input_nome = document.createElement('input');
        input_nome.className = "validate";
        input_nome.type = "text";
        input_nome.id = "nome";
        if (usuarioAtualizar) {
            input_nome.value = usuarioAtualizar.getNome();
        }
        divNome.appendChild(input_nome);
        var labelNome = document.createElement('label');
        labelNome.htmlFor = "nome";
        labelNome.appendChild(document.createTextNode("Nome"));
        divNome.appendChild(labelNome);
        if (usuarioAtualizar) {
            labelNome.className = "active";
        }
        form_0.appendChild(divNome);
        //
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanEmail = document.createElement("span");
        spanEmail.className = "red-text";
        spanEmail.style.display = "none";
        spanEmail.style.fontSize = "0.8em";
        spanEmail.style.margin = "0em";
        spanEmail.appendChild(document.createTextNode("Email incorreto"));
        var input_email = document.createElement('input');
        input_email.className = "validate";
        input_email.type = "email";
        input_email.id = "email";
        input_email.addEventListener("keyup", function () {
            if (!valida.email(input_email.value)) {
                spanEmail.style.display = "block";
            } else {
                spanEmail.style.display = "none";
            }
        });
        input_email.addEventListener("blur", function () {
            if (!valida.email(input_email.value)) {
                spanEmail.style.display = "block";
            } else {
                spanEmail.style.display = "none";
            }
        });
        div_3.appendChild(input_email);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "email";
        label_0.appendChild(document.createTextNode("Email"));
        div_3.appendChild(label_0);
        div_3.appendChild(spanEmail);
        if (!usuarioAtualizar) {
            form_0.appendChild(div_3);
        }
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanSenha = document.createElement("span");
        spanSenha.className = "red-text";
        spanSenha.style.display = "none";
        spanSenha.style.fontSize = "0.8em";
        spanSenha.style.margin = "0em";
        spanSenha.appendChild(document.createTextNode("O campo senha deve conter 6 ou mais caracteres"));
        var input_senha = document.createElement('input');
        input_senha.className = "validate";
        input_senha.type = "password";
        input_senha.id = "senha";
        input_senha.addEventListener("keyup", function () {
            if (!valida.senha(input_senha.value)) {
                spanSenha.style.display = "block";
            } else {
                spanSenha.style.display = "none";
            }
        });
        input_senha.addEventListener("blur", function () {
            if (!valida.senha(input_senha.value)) {
                spanSenha.style.display = "block";
            } else {
                spanSenha.style.display = "none";
            }
        });
        div_3.appendChild(input_senha);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "senha";
        label_0.appendChild(document.createTextNode("Senha"));
        div_3.appendChild(label_0);
        div_3.appendChild(spanSenha);
        if (!usuarioAtualizar) {
            form_0.appendChild(div_3);
        }
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanConfirmarSenha = document.createElement("span");
        spanConfirmarSenha.className = "red-text";
        spanConfirmarSenha.style.display = "none";
        spanConfirmarSenha.style.fontSize = "0.8em";
        spanConfirmarSenha.style.margin = "0em";
        spanConfirmarSenha.appendChild(document.createTextNode("As senhas devem ser iguais"));
        var input_confirmaSenha = document.createElement('input');
        input_confirmaSenha.className = "validate";
        input_confirmaSenha.type = "password";
        input_confirmaSenha.id = "confirmarSenha";
        input_confirmaSenha.addEventListener("keyup", function () {
            if (input_senha.value != input_confirmaSenha.value) {
                spanConfirmarSenha.style.display = "block";
            } else {
                spanConfirmarSenha.style.display = "none";
            }
        });
        input_confirmaSenha.addEventListener("blur", function () {
            if (input_senha.value != input_confirmaSenha.value) {
                spanConfirmarSenha.style.display = "block";
            } else {
                spanConfirmarSenha.style.display = "none";
            }
        });
        div_3.appendChild(input_confirmaSenha);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "confirmarSenha";
        label_0.appendChild(document.createTextNode("Confirmar senha"));
        div_3.appendChild(label_0);
        div_3.appendChild(spanConfirmarSenha);
        if (!usuarioAtualizar) {
            form_0.appendChild(div_3);
        }
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanTelefone = document.createElement("span");
        spanTelefone.className = "red-text";
        spanTelefone.style.display = "none";
        spanTelefone.style.fontSize = "0.8em";
        spanTelefone.style.margin = "0em";
        spanTelefone.appendChild(document.createTextNode("O campo telefone deve conter apenas números"));
        var input_telefone = document.createElement('input');
        input_telefone.className = "validate";
        input_telefone.type = "text";
        input_telefone.id = "telefone";
        if (usuarioAtualizar) {
            input_telefone.value = usuarioAtualizar.getTelefone();
        }
        input_telefone.addEventListener("keyup", function () {
            if (!valida.telefone(input_telefone.value)) {
                spanTelefone.style.display = "block";
            } else {
                spanTelefone.style.display = "none";
            }
        });
        input_telefone.addEventListener("blur", function () {
            if (!valida.telefone(input_telefone.value)) {
                spanTelefone.style.display = "block";
            } else {
                spanTelefone.style.display = "none";
            }
        });
        div_3.appendChild(input_telefone);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "telefone";
        label_0.appendChild(document.createTextNode("Telefone"));
        div_3.appendChild(label_0);
        div_3.appendChild(spanTelefone);
        if (usuarioAtualizar) {
            label_0.className = "active";;
        }
        form_0.appendChild(div_3);
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanCep = document.createElement("span");
        spanCep.className = "red-text";
        spanCep.style.display = "none";
        spanCep.style.fontSize = "0.8em";
        spanCep.style.margin = "0em";
        spanCep.appendChild(document.createTextNode("O CEP deve ser inserido corretamente. Ex: 00000-000"));
        var input_cep = document.createElement('input');
        input_cep.className = "validate";
        input_cep.type = "text";
        input_cep.id = "cep";
        if (usuarioAtualizar) {
            input_cep.value = usuarioAtualizar.getCpf();
        }
        input_cep.addEventListener("keyup", function () {
            if (!valida.cep(input_cep.value)) {
                spanCep.style.display = "block";
            } else {
                spanCep.style.display = "none";
            }
        });
        input_cep.addEventListener("blur", function () {
            if (!valida.cep(input_cep.value)) {
                spanCep.style.display = "block";
            } else {
                spanCep.style.display = "none";
            }
        });
        div_3.appendChild(input_cep);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "cep";
        label_0.appendChild(document.createTextNode("CEP"));
        div_3.appendChild(label_0);
        div_3.appendChild(spanCep);
        if (usuarioAtualizar) {
            label_0.className = "active";
        }
        form_0.appendChild(div_3);
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var input_userName = document.createElement('input');
        input_userName.className = "validate";
        input_userName.type = "text";
        input_userName.id = "endereco";
        if (usuarioAtualizar) {
            input_userName.value = usuarioAtualizar.getRua();
        }
        div_3.appendChild(input_userName);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "endereco";
        label_0.appendChild(document.createTextNode("Endereço"));
        div_3.appendChild(label_0);
        if (usuarioAtualizar) {
            label_0.className = "active";
        }
        form_0.appendChild(div_3);
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var input_userName = document.createElement('input');
        input_userName.className = "validate";
        input_userName.type = "text";
        input_userName.id = "cidade";
        if (usuarioAtualizar) {
            input_userName.value = usuarioAtualizar.getCidade();
        }
        div_3.appendChild(input_userName);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "cidade";
        label_0.appendChild(document.createTextNode("Cidade"));
        div_3.appendChild(label_0);
        if (usuarioAtualizar) {
            label_0.className = "active";
        }
        form_0.appendChild(div_3);
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var spanNumero = document.createElement("span");
        spanNumero.className = "red-text";
        spanNumero.style.display = "none";
        spanNumero.style.fontSize = "0.8em";
        spanNumero.style.margin = "0em";
        spanNumero.appendChild(document.createTextNode("O campo número deve conter apenas números"));
        var input_numero = document.createElement('input');
        input_numero.className = "validate";
        input_numero.type = "number";
        input_numero.id = "numero";
        if (usuarioAtualizar) {
            input_numero.value = usuarioAtualizar.getNumero();
        }
        input_numero.addEventListener("keyup", function () {
            if (!valida.numero(input_numero.value)) {
                spanNumero.style.display = "block";
            } else {
                spanNumero.style.display = "none";
            }
        });
        input_numero.addEventListener("blur", function () {
            if (!valida.numero(input_numero.value)) {
                spanNumero.style.display = "block";
            } else {
                spanNumero.style.display = "none";
            }
        });
        div_3.appendChild(input_numero);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "numero";
        label_0.appendChild(document.createTextNode("Número"));
        if (usuarioAtualizar) {
            label_0.className = "active";
        }
        div_3.appendChild(label_0);
        div_3.appendChild(spanNumero);
        form_0.appendChild(div_3);
        var div_3 = document.createElement('div');
        div_3.className = "input-field col s12";
        var input_userName = document.createElement('input');
        input_userName.className = "validate";
        input_userName.type = "text";
        input_userName.id = "comp";
        if (usuarioAtualizar) {
            input_userName.value = usuarioAtualizar.getComplemento();
        }
        div_3.appendChild(input_userName);
        var label_0 = document.createElement('label');
        label_0.htmlFor = "comp";
        label_0.appendChild(document.createTextNode("Complemento"));
        div_3.appendChild(label_0);
        if (usuarioAtualizar) {
            label_0.className = "active";
        }
        form_0.appendChild(div_3);
        //TAGS
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
        var label_0 = document.createElement('label');
        label_0.appendChild(document.createTextNode("Tipo de serviço"));
        div_7.appendChild(label_0);
        div_6.appendChild(div_7);
        if (usuarioAtualizar) {
            if (usuarioAtualizar.getPrestadorServico()) {
                form_0.appendChild(div_6);
            }
        }
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
        if (usuarioAtualizar) {
            if (usuarioAtualizar.getPrestadorServico()) {
                form_0.appendChild(div_2);
            }
        }
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
        if (usuarioAtualizar) {
            if (usuarioAtualizar.getPrestadorServico()) {
                form_0.appendChild(rowDescricao);
            }
        }
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
        if (usuarioAtualizar) {
            if (usuarioAtualizar.getPrestadorServico()) {
                $("#selectTags").val(usuarioAtualizar.getTags());
                $('select').material_select();
            }
        }
        div_1.appendChild(form_0);
        pagina.getPagina().appendChild(div_1);
        var footer = document.createElement("div");
        footer.className = "container";
        var div_16 = document.createElement("div");
        div_16.className = "row center";
        var button = document.createElement('a');
        button.className = "waves-effect waves-light btn btn-large btn-xl";
        if (usuarioAtualizar) {
            button.appendChild(document.createTextNode("Atualizar"));
        } else {
            button.appendChild(document.createTextNode("Próximo"));
        }
        button.addEventListener("click", function () {
            var emailValue;
            var senhaValue;
            if (usuarioAtualizar) {
                emailValue = 'aaaaa@inopus.com.br';
                senhaValue = '123456';
            } else {
                emailValue = document.getElementById("email").value;
                senhaValue = document.getElementById("senha").value;
            }
            var usuario = new Usuario();
            if (usuario.setEmail(emailValue)) {
                if (usuario.setNome(document.getElementById("nome").value)) {
                    if (usuario.setSenha(senhaValue)) {
                        if (usuario.setTelefone(document.getElementById("telefone").value)) {
                            if (usuario.setRua(document.getElementById("endereco").value)) {
                                if (usuario.setNumero(document.getElementById("numero"))) {
                                    if (usuario.setComplemento(document.getElementById("comp").value)) {
                                        if (usuario.setCep(document.getElementById("cep").value)) {
                                            if (usuarioAtualizar) {
                                                var usrAux = new Usuario();
                                                usrAux.json(window.localStorage.getItem('usuario'));
                                                usuario.setFoto(usrAux.getFoto());
                                                usuario.setId(usuarioAtualizar.getId());
                                                var hr = new HttpReq("post", pagina.apiUrl() + "usuario/atualizar", function (result) {
                                                    if (result.err) {
                                                        alerta.abrirErro(result.err);
                                                    } else {
                                                        result = JSON.parse(result);
                                                        var usur = new Usuario();
                                                        usur.json(window.localStorage.getItem('usuario'));
                                                        //console.log(window.localStorage.getItem('usuario'));
                                                        var imgAux = usur.getFoto();
                                                        if (result.imageFileName) {
                                                            imgAux = result.imageFileName;
                                                        }
                                                        usur.setNome(usuario.getNome());
                                                        usur.setTelefone(usuario.getTelefone());
                                                        usur.setRua(usuario.getRua());
                                                        usur.setNumero(usuario.getNumero());
                                                        usur.setComplemento(usuario.getComplemento());
                                                        usur.setCep(usuario.getCep());
                                                        usur.setFoto(imgAux);
                                                        console.log('result');
                                                        console.log(result.imageFileName);
                                                        window.localStorage.setItem('usuario', usur.jsonString());
                                                        pagina.abrirPaginas('main');
                                                    }
                                                });
                                                var img;
                                                if (document.getElementById("imgFotoPerfil")) {
                                                    img = pagina.dataURItoBlob(document.getElementById("imgFotoPerfil").src);
                                                } else {
                                                    img = undefined;
                                                }
                                                // if(!document.getElementById("perfilAtualizarFoto")){
                                                //         if(!document.getElementById("imgFotoPerfil")){
                                                //             alerta.abrirErro('Necessário escolher uma foto para o perfil.');
                                                //             return;
                                                //         }
                                                //     }
                                                var formData = new FormData();
                                                formData.append("userImage", img);
                                                formData.append("usuario", usuario.jsonString(true));
                                                //hr.enviar("usuario=" + usuario.jsonString(true));
                                                hr.enviar(formData);
                                                return;
                                            }
                                            if (localStorage.getItem("controle") == "prestador") {
                                                if (usuario.setPrestadorServico(true)) {
                                                    console.log('Cadastro geral ira passar esse usuario para a proxima página:');
                                                    console.log(usuario);
                                                    window.localStorage.setItem('cadastrarPrestador', usuario.jsonString(true));
                                                    if (!document.getElementById("imgFotoPerfil")) {
                                                        alerta.abrirErro('Necessário escolher uma foto para o perfil.');
                                                        return;
                                                    }
                                                    localStorage.setItem("controle", pagina.dataURItoBlob(document.getElementById("imgFotoPerfil").src));
                                                    pagina.abrirPaginas("cadastroParceiro");
                                                }
                                            } else { // Usuário Comum
                                                var hr = new HttpReq("post", pagina.apiUrl() + "usuario/cadastrar/1", function (result) {
                                                    if (typeof result == typeof 'string') {
                                                        result = JSON.parse(result);
                                                    }
                                                    if (result.err) {
                                                        if (result.err == 1111) {
                                                            alerta.abrirErro('Esse e-mail já está em uso.');
                                                        } else {
                                                            alerta.abrirErro(result.err);
                                                        }
                                                    } else {
                                                        //console.log(result.result);
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
                                                if (!document.getElementById("imgFotoPerfil")) {
                                                    alerta.abrirErro('Necessário escolher uma foto para o perfil.');
                                                    return;
                                                }
                                                var img = pagina.dataURItoBlob(document.getElementById("imgFotoPerfil").src);
                                                var formData = new FormData();
                                                formData.append("userImage", img);
                                                formData.append("usuario", usuario.jsonString(true));
                                                //hr.enviar("usuario=" + usuario.jsonString(true));
                                                hr.enviar(formData);
                                            }
                                        } else {
                                            alert("numero invalido");
                                        }
                                    } else {
                                        alert("complemento invalido");
                                    }
                                } else {
                                    alert("numero invalido");
                                }
                            } else {
                                alert("endereço inválido");
                            }
                        } else {
                            alert("telefone invalido");
                        }
                    } else {
                        alert("senha inválida");
                    }
                } else {
                    alert("nome inválido");
                }
            } else {
                alert("email invalido");
            }
        });
        div_16.appendChild(button);
        footer.appendChild(div_16);
        var col = document.createElement("div");
        col.className = "col s12 center";
        var a_2 = document.createElement('a');
        a_2.className = "waves-effect waves-teal btn-flat teal-text";
        if (!usuarioAtualizar) {
            a_2.appendChild(document.createTextNode("Voltar"));
        }
        a_2.addEventListener("click", function () {
            pagina.abrirPaginas("selecionarPerfil");
        });
        col.appendChild(a_2);
        footer.appendChild(col);
        pagina.getPagina().appendChild(footer);
        var request = new HttpReq('POST', pagina.apiUrl() + 'tags', function (result) {
            tags = JSON.parse(result).result;
            console.log(tags);
            //  console.log('Lista de tags disponíveis: ' + tags);
            pag.construtorTags(select_0, tags);
        });
        request.enviar();
        $('select').material_select();
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