function PerfilSolicitante() {

    this.listaObrasAndamento = new Array();
    this.listaObrasPendentes = new Array();
    this.listaObrasFinalizadas = new Array();

    this.jsonString = function () {
        return JSON.stringify(this);
    }

    this.json = function (j) {
        var ok = false;
        if (typeof j == typeof "x") {
            j = JSON.parse(j);
            ok = true;
        } else if (typeof j == typeof new Object) {
            ok = true;
        } else {
            ok = false;
        }
        if (ok) {
            // aqui dentro tem que ter todos os sets
            this.setId(j.id);
            this.setNome(j.nome);
            return true;
        } else {
            return false;
        }
    }

    this.setId = function (id) {
        if (id > 0 && id < 9999999) {
            this.id = parseInt(id);
            return true;
        } else if (id == undefined) {
            this.id = undefined;
            return true;
        } else {
            return false;
        }
    }

    this.getListaObrasAndamento = function () {
        return this.listaObrasAndamento;
    }

    this.getListaObrasPendentes = function () {
        return this.listaObrasPendentes;
    }

    this.getListaObrasFinalizadas = function () {
        return this.listaObrasFinalizadas;
    }
}