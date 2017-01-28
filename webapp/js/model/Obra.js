function Obra() {

    this.id = undefined;
    this.nome = "";
    this.data = undefined;
    this.local = undefined;
    this.listaTags = new Array();
    this.descricao = "";
    this.andamento = ""; //Tipos de andamento: criada , iniciada , concluida , cancelada e pausada

    //     {
    // "obra":{
    // "nome":"Reforma AP10",
    // "data":"2016-06-20",
    // "local":"Rua São Paulo",
    // "listaTags":["Pedreiro","banheiro","quarto"],
    // "descricao":"Obra Legal",
    // "andamento":"criada"
    //     }
    // }

    this.idUsuario = undefined;
    this.chatId = undefined;
    this.foto;

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
            if (j.id == undefined || j.id == "" || j.id == 0) {
                this.setId(j._id); // id do mongo
            } else {
                this.setId(j.id);
            }
            return this.setAndamento(j.andamento) && this.setIdUsuario(j.idUsuario) && this.setNome(j.nome) && this.setData(j.data) &&
                this.setLocal(j.local) && this.setListaTags(j.listaTags) && this.setDescricao(j.descricao) && this.setChatId(j.chatId)
                && this.setFoto(j.foto);
        } else {
            return false;
        }
    }

    this.setFoto = function(foto){
        this.foto = foto;
        return true;
    }

    this.getFoto = function(){
        return this.foto;
    }

    this.setId = function (id) {
        this.id = id;
        return true;
    }

    this.setAndamento = function (andamento) {
        if (andamento != "criada" && andamento != "iniciada" && andamento != "concluida" && andamento != "cancelada" && andamento != "pausada") {
            return false;
        }
        this.andamento = andamento;
        return true;
    }

    this.setIdUsuario = function (idUsuario) {
        this.idUsuario = idUsuario;
        return true;
    }

    this.setNome = function (nome) {
        if (nome && nome.length > 0) {
            this.nome = nome;
            return true;
        }
        return false;
    }

    this.getChatId = function () {
        return this.chatId;
    }

    this.setChatId = function (chatId) {
        this.chatId = chatId;
        return true;
    }

    this.setLocal = function (local) {
        this.local = local;
        return true;
    }

    this.setData = function (data) {
        if (typeof data == typeof "s") {
            this.data = new Date(data);
        } else {
            this.data = data;
        }
        if (this.data == "Invalid Date") {
            this.data = undefined;
        }
        return true;
    }

    this.setListaTags = function (listaTags) {
        this.listaTags = listaTags;
        return true;
    }

    this.setDescricao = function (descricao) {
        this.descricao = descricao;
        return true;
    }

    this.getId = function () {
        return this.id;
    }

    this.getAndamento = function () {
        return this.andamento;
    }

    this.getIdUsuario = function () {
        return this.idUsuario;
    }

    this.getNome = function () {
        return this.nome;
    }

    this.getData = function () {
        return this.data;
    }

    this.getLocal = function () {
        return this.local;
    }

    this.getListaTags = function () {
        return this.listaTags;
    }

    this.getDescricao = function () {
        return this.descricao;
    }
}