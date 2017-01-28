function PagAddObra() {

    this.construtor = function () {
        pagina.setTitle("Criar Obra");
        this.montaPagHtml();
    }

    this.construtorTags = function (pai, options) {
        for (i = 0; i < options.length; i++) {
            var option_1 = document.createElement('option');
            option_1.value = options[i];
            option_1.appendChild(document.createTextNode(options[i]));
            pai.appendChild(option_1);
        }
    }

    this.montaPagHtml = function () {

        if (!window.localStorage.getItem("usuario")) {
            pagina.abrirPaginas("login");
        } else {
            var listaTags = new Array();

            pagina.getPagina().empty();

            listaParceirosJaAdicionados = undefined;

            document.getElementById("btnVoltar").addEventListener("click", function () {
                if (obraEditar) {
                    pagina.abrirPaginas("obra");
                } else {
                    pagina.abrirPaginas("main");
                }
            });

            //tags = new Array();
            //tags = ["Eletricista", "Mestre de obras", "Encanador", "Pedreiro"];
            var div_0 = document.createElement('main');
            div_0.className = "row";
            div_0.setAttribute("style", "margin-bottom: 3em !important");

            var div_1 = document.createElement('div');
            div_1.className = "col s12 center";
            div_1.style.margin = "1em 0em";

            var p_0 = document.createElement('span');
            p_0.style.fontSize = "1.3em";
            if (obraEditar) {
                p_0.appendChild(document.createTextNode("Editar Obra"));
            } else {
                p_0.appendChild(document.createTextNode("Vamos dar início a uma nova obra :)"));
            }
            div_1.appendChild(p_0);

            div_0.appendChild(div_1);


            var form_0 = document.createElement('form');
            form_0.className = "col s12";

            //foto

            var divFoto = document.createElement('div');
            divFoto.className = "row";

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
            img_0.id = 'obraImagem';
            img_0.src = "images/cameraIcon.png";
            if (obraEditar) {
                img_0.src = pagina.uploadedObraImages() + obraEditar.getFoto();
            }
            img_0.className = "pointer";
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
                    cropEditor(150, 50, 'square', e.target.result);
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
            div_legendaFoto.appendChild(document.createTextNode("Clique acima para adicionar uma foto para sua nova obra."));
            div_r.appendChild(div_legendaFoto);

            divFoto.appendChild(div_r);

            form_0.appendChild(divFoto);

            //

            //Nome

            var divNome = document.createElement('div');
            divNome.className = "input-field col s12";

            var input_nome = document.createElement('input');
            input_nome.className = "validate";
            input_nome.type = "text";
            input_nome.id = "nome";
            if (obraEditar) {
                input_nome.value = obraEditar.getNome();
            }
            divNome.appendChild(input_nome);

            var labelNome = document.createElement('label');
            labelNome.htmlFor = "nome";
            if (obraEditar) {
                labelNome.className = "active";
            }
            labelNome.appendChild(document.createTextNode("Nome"));
            divNome.appendChild(labelNome);
            form_0.appendChild(divNome);

            //

            var div_2 = document.createElement('div');
            div_2.className = "row";

            var div_3 = document.createElement('div');
            div_3.className = "input-field col s12";


            var label_0 = document.createElement('label');
            label_0.htmlFor = "data_grupo";
            label_0.className = "active";
            label_0.appendChild(document.createTextNode("Data Início"));
            div_3.appendChild(label_0);

            var input_enviar_dataInicio = document.createElement('input');
            //  input_enviar_dataInicio.className = "datepicker";
            input_enviar_dataInicio.id = "data_grupo";
            input_enviar_dataInicio.type = "text";
            div_3.appendChild(input_enviar_dataInicio);


            div_2.appendChild(div_3);

            form_0.appendChild(div_2);


            var div_4 = document.createElement('div');
            div_4.className = "row";

            var div_5 = document.createElement('div');
            div_5.className = "input-field col s12";

            var input_local = document.createElement('input');
            input_local.id = "local";
            input_local.className = "validate";
            input_local.type = "text";
            if (obraEditar) {
                input_local.value = obraEditar.getLocal();
            }
            div_5.appendChild(input_local);


            var label_1 = document.createElement('label');
            label_1.htmlFor = "local";
            if (obraEditar) {
                label_1.className = "active";
            }
            label_1.appendChild(document.createTextNode("Local"));
            div_5.appendChild(label_1);

            div_4.appendChild(div_5);

            form_0.appendChild(div_4);


            var div_6 = document.createElement('div');
            div_6.className = "row";

            var div_7 = document.createElement('div');
            div_7.className = "input-field col s12";

            var select_0 = document.createElement('select');
            select_0.id = "selectTags";
            select_0.multiple = "multiple";

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
            form_0.appendChild(div_6);


            var div_8 = document.createElement('div');
            div_8.className = "row";

            var div_9 = document.createElement('div');
            div_9.className = "input-field col s12";


            var input_descObra = document.createElement('textarea');
            input_descObra.className = "materialize-textarea";
            input_descObra.id = "descObra";
            if (obraEditar) {
                input_descObra.value = obraEditar.getDescricao();
            }
            div_9.appendChild(input_descObra);


            var label_3 = document.createElement('label');
            label_3.htmlFor = "descObra";
            if (obraEditar) {
                label_3.className = "active";
            }
            label_3.appendChild(document.createTextNode("Como será essa obra?"));
            div_9.appendChild(label_3);

            div_8.appendChild(div_9);

            form_0.appendChild(div_8);

            div_0.appendChild(form_0);

            pagina.getPagina().appendChild(div_0);

            var footer = document.createElement("footer");
            footer.setAttribute("style", "bottom:-16px !important;");
            var div_10 = document.createElement('div');
            div_10.className = "row";

            var a_0 = document.createElement('a');
            a_0.className = "waves-effect waves-teal btn btn-large btn-xl white-text";
            if (obraEditar) {
                a_0.appendChild(document.createTextNode("Atualizar"));
            } else {
                a_0.appendChild(document.createTextNode("Próximo"));
            }
            a_0.addEventListener("click", function () {

                var obra = new Obra();

                if (obraEditar) {
                    obra.json(obraEditar);
                }

                var dataObra = document.getElementById('data_grupo').value;
                //dataObra = '20/12/2016';
                if (dataObra) {

                    // MOCADO
                    //dataObra = '2016-11-05'; //Descomentar essa linha

                    var d = new Date();
                    var timezone = Math.round(d.getTimezoneOffset() / 60);
                    if (timezone > 0 && timezone < 10) {
                        timezone = "-0" + Math.abs(timezone) + ":00";
                    } else if (timezone >= 10) {
                        timezone = "-" + Math.abs(timezone) + ":00";
                    } else if (timezone < 0 && timezone > -10) {
                        timezone = "+0" + Math.abs(timezone) + ":00";
                    } else if (timezone <= -10) {
                        timezone = "+" + Math.abs(timezone) + ":00";
                    } else {
                        timezone = "Z";
                    }

                    d = new Date(dataObra + "T" + '00:00' + ":00.000" + timezone);

                    obra.setData(d);

                } else {
                    alerta.abrirErro("Campo Data não preenchido.");
                    return;
                }

                var nomeObra = document.getElementById('nome').value;
                if (nomeObra) {
                    obra.setNome(nomeObra);
                } else {
                    alerta.abrirErro("Campo nome não preenchido.");
                    return;
                }

                var localObra = document.getElementById('local').value;
                //localObra = 'Rua Da Obra, 1000 , São Paulo, SP';
                if (localObra) {
                    obra.setLocal(localObra);
                } else {
                    alerta.abrirErro("Campo Local não preenchido.");
                    return;
                }

                var listaTags = $('#selectTags').val();
                if (listaTags) {
                    console.log('LISTA TAGS');
                    console.log(listaTags);
                    obra.setListaTags(listaTags);
                } else {
                    alerta.abrirErro("Campo das tags de necessidade de serviços não preenchido.");
                    return;
                }

                var descricaoObra = document.getElementById('descObra').value;
                //descricaoObra = "Obra interessante";
                if (descricaoObra) {
                    obra.setDescricao(descricaoObra);
                } else {
                    alerta.abrirErro("Campo da descricão da obra não preenchido.");
                    return;
                }

                if (obraEditar) {

                    if (document.getElementById("imgFotoPerfil")) {
                        imagemObra = document.getElementById("imgFotoPerfil").src;
                    } else {
                        imagemObra = undefined;
                    }

                    var request = new HttpReq('POST', pagina.apiUrl() + 'obra/atualizar', function (result) {
                        var usuario;
                        if (result.err) {
                            alerta(result.err);
                        } else {

                            obraEditar = undefined;
                            window.localStorage.setItem('obra', obra.jsonString());
                            pagina.abrirPaginas("obra");

                        }
                    });

                    var img = undefined;
                    if (imagemObra) {
                        img = pagina.dataURItoBlob(imagemObra);
                    }
                    var formData = new FormData();
                    formData.append("obraImage", img);
                    formData.append("obra", obra.jsonString());

                    request.enviar(formData, undefined, false);

                    imagemObra = undefined;

                    return;
                }

                var token = new Token(window.localStorage.getItem('token'));

                obra.setIdUsuario(token.getUsuarioId());
                obra.setAndamento('criada');


                window.localStorage.setItem("obraAdicionarParceiros", obra.jsonString());

                if (document.getElementById("imgFotoPerfil")) {
                    imagemObra = document.getElementById("imgFotoPerfil").src;
                } else {
                    imagemObra = undefined;
                }

                pagina.abrirPaginas("escolheParceiro");
            });

            div_10.appendChild(a_0);
            footer.appendChild(div_10);
            pagina.getPagina().appendChild(footer);

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
            $('#data_grupo').bootstrapMaterialDatePicker({
                weekStart: 0,
                time: false,
                // minDate: new Date(),
                format: 'YYYY-MM-DD'
            });

            if (obraEditar) {
                console.log(obraEditar.getData());
                $('#data_grupo').bootstrapMaterialDatePicker('setDate', obraEditar.getData());

                $("#selectTags").val(obraEditar.getListaTags());
                $('select').material_select();
            }
            //$('#data_grupo').bootstrapMaterialDatePicker('setDate', moment());

            var request = new HttpReq('POST', pagina.apiUrl() + 'tags', function (result) {
                listaTags = JSON.parse(result);
                //console.log('Lista de tags disponíveis: ' + JSON.stringify(result));
                tags = JSON.parse(result).result;
                //tags = JSON.stringify(tags);
                console.log(tags);
                console.log(select_0);
                pag.construtorTags(select_0, tags);
            });
            request.enviar();


        }
    }

    this.construtorTags = function (pai, options) {
        console.log("aaaaaaaaaaa");
        console.log(options);
        console.log(options.length);
        for (i = 0; i < options.length; i++) {
            var option_1 = document.createElement('option');
            option_1.value = options[i];
            option_1.appendChild(document.createTextNode(options[i]));
            pai.appendChild(option_1);
        }
        $('select').material_select();
    }
    this.construtor();
}