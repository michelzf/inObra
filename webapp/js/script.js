window.addEventListener("load", function () {
    funcionalidadesDisponiveis();
    carregando = new Carregando();
    alerta = new Alerta();
    valida = new Valida();
    controleAux = undefined;
    listaParceirosJaAdicionados = undefined;
    tags = undefined;
    imagemObra = undefined;
    parceiroAux = undefined;
    iraEditarPerfil = undefined;
    iraEditarObra = undefined;
    obraEditar = undefined;
    //    banco = new Banco(); // temos que implementar isso, mas não para o MVP
    if (typeof document.getElementById("pagina").empty != typeof Function) {
        Element.prototype.empty = function () {
            while (this.firstChild) this.removeChild(this.firstChild);
        }
        console.log("Element.empty() criado manualmente.");
    }

    $('.button-collapse').sideNav({
        menuWidth: 240, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.modal-trigger').leanModal();

    pagina = new Pagina();

    carregando.fechar();

});

function cropImage(idContainer) {
    console.log(idContainer);
    vanilla.result('canvas').then(function (src) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = idContainer;
        if (idContainer == "cadastroImg") {
            document.getElementById("cadastroFotoPerfil").innerHTML = "";
            img.id = "imgFotoPerfil";
            img.style.width = "70%";
            document.getElementById("filePerfilCadastro").setAttribute("value", img.src);
            document.getElementById("cadastroFotoPerfil").appendChild(img);
        } else if (idContainer == "cadastroBg") {
            document.getElementById("cadastroBgPerfil").innerHTML = "";
            img.id = "imgBgPerfil";
            img.style.width = "100%";
            document.getElementById("fileBgCadastro").setAttribute("value", img.src);
            document.getElementById("cadastroBgPerfil").appendChild(img);
        } else {
            console.log("Imagem não encontrada");
        }
    });

}

function cropEditor(largura, altura, type, urlImg) {
    document.getElementById('vanilla-demo').innerHTML = "";
    var el = document.getElementById('vanilla-demo');
    if (type == 'square') {
        vanilla = new Croppie(el, {
            viewport: {
                width: largura,
                height: altura,
                type: 'square'
            },
            boundary: {
                width: largura + 100,
                height: altura + 100
            },
            showZoomer: true,
            enableOrientation: true
        });
    } else {
        vanilla = new Croppie(el, {
            viewport: {
                width: largura,
                height: altura,
                type: 'circle'
            },
            boundary: {
                width: largura + 100,
                height: altura + 100
            },
            showZoomer: true,
            enableOrientation: true
        });
    }
    vanilla.bind({
        url: urlImg,
        orientation: 1
    });
}