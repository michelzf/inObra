function Usuario() {
    this.id = undefined;
    this.nome = undefined;
    this.nascimento = undefined;
    this.sexo = undefined;
    this.foto = undefined;
    this.rg = undefined;
    this.cpf = undefined;
    this.rua = undefined;
    this.numero = undefined;
    this.complemento = undefined;
    this.cidade = undefined;
    this.estado = undefined;
    this.pais = undefined;
    this.cep = undefined;
    this.facebookID = undefined;
    this.email = undefined;
    this.senha = undefined;
    this.ativo = undefined;

    this.tags = new Array();

    this.prestadorServico = false;

    // this.perfilSolicitante = new PerfilSolicitante();
    // this.perfilPrestadorServico = new PerfilPrestadorServico();

    this.jsonString = function (senha) {
        var s = this.senha;
        if (!senha) {
            this.setSenhaSemVerificar(undefined);
        }

        var j = JSON.stringify(this);

        if (!senha) {
            this.setSenhaSemVerificar(s);
        }

        return j;
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
        if (ok && j) {
            // aqui dentro tem que ter todos os sets
            if (j.id == undefined || j.id == "undefined" || j.id == "" || j.id == 0 || j.id == "0") {
                this.setId(j._id); // id do mongo
            } else {
                this.setId(j.id);
            }

            this.setNome(j.nome);
            this.setNascimento(j.nascimento);
            this.setSexo(j.sexo);
            this.setFoto(j.foto);
            this.setRG(j.rg);
            this.setCPF(j.cpf);
            this.setRua(j.rua);
            this.setNumero(j.numero);
            this.setComplemento(j.complemento);
            this.setCidade(j.cidade);
            this.setEstado(j.estado);
            this.setPais(j.pais);
            this.setCEP(j.cep);
            this.setFacebookID(j.facebookID);
            this.setEmail(j.email);
            this.setSenha(j.senha);
            this.setPrestadorServico(j.prestadorServico);
            if(j.ativo){
                this.setAtivo(j.ativo);
            }

            // this.setPerfilSolicitante(j.perfilSolicitante);
            // this.setPerfilPrestadorServico(j.perfilPrestadorServico);

            return true;
        } else {
            return false;
        }
    }

    this.setId = function (id) {
        // verificar se eh um id valido (o id do mongo)
        this.id = id;
        return true;
    }

    this.getId = function () {
        return this.id;
    }

    this.getTags = function (){
        return this.tags;
    }

    this.getPrestadorServico = function () {
        return this.prestadorServico;
    }

    this.setNome = function (s) {
        this.nome = s;
        return true;
    }

    this.getNome = function () {
        return this.nome;
    }

    this.setAtivo = function (s) {
        this.ativo = s;
        return true;
    }

    this.getAtivo = function () {
        return this.ativo;
    }

    this.setNascimento = function (s) {
        this.nascimento = s;
        return true;
    }

    this.getNascimento = function () {
        return this.nascimento;
    }

    this.setSexo = function (s) {
        this.sexo = s;
        return true;
    }

    this.getSexo = function () {
        return this.sexo;
    }

    this.setFoto = function (s) {
        this.foto = s;
        return true;
    }

    this.getFoto = function () {
        return this.foto;
    }

    this.setRG = function (s) {
        this.rg = s;
        return true;
    }

    this.getRG = function () {
        return this.rg;
    }

    this.setCPF = function (s) {
        this.cpf = s;
        return true;
    }

    this.getCPF = function () {
        return this.cpf;
    }

    this.setRua = function (s) {
        this.rua = s;
        return true;
    }

    this.setPrestadorServico = function (s) {
        this.prestadorServico = s;
        return true;
    }

    this.setTags = function (s) {
        this.tags = s;
        return true;
    }

    this.getRua = function () {
        return this.rua;
    }

    this.setNumero = function (s) {
        this.numero = s;
        return true;
    }

    this.getNumero = function () {
        return this.numero;
    }

    this.setComplemento = function (s) {
        this.complemento = s;
        return true;
    }

    this.getComplemento = function () {
        return this.complemento;
    }

    this.setCidade = function (s) {
        this.cidade = s;
        return true;
    }

    this.getCidade = function () {
        return this.cidade;
    }

    this.setEstado = function (s) {
        this.estado = s;
        return true;
    }

    this.getEstado = function () {
        return this.estado;
    }

    this.setPais = function (s) {
        this.pais = s;
        return true;
    }

    this.getPais = function () {
        return this.pais;
    }

    this.setCEP = function (s) {
        this.cep = s;
        return true;
    }

    this.getCEP = function () {
        return this.cep;
    }

    this.setFacebookID = function (s) {
        this.facebookID = s;
        return true;
    }

    this.getFacebookID = function () {
        return this.facebookID;
    }

    this.setEmail = function (s) {
        if (valida.email(s)) {
            this.email = s;
            return true;
        } else {
            return false;
        }
    }

    this.getEmail = function () {
        return this.email;
    }

    this.getSenha = function () {
        return this.senha;
    }

    this.setSenha = function (s) {
        if (this.getEmail() != undefined && this.getEmail() != "" && valida.hash(s)) {
            this.senha = mhash("whirlpool", this.getEmail() + ":" + s);
            return true;
        } else {
            return false;
        }
    }

    this.setSenhaSemVerificar = function (s) {
        // esse método só deve ser utilizado por essa classe.
        this.senha = s;
        return true;
    }


    // this.setPerfilSolicitante = function (o) {
    //     if (o == undefined || o == "" || typeof o != new Object()) {
    //         this.perfilSolicitante = new PerfilSolicitante();
    //     } else {
    //         this.perfilSolicitante = o;
    //     }
    //     return true;
    // }

    // this.getEPerfilSolicitante = function () {
    //     return this.perfilSolicitante;
    // }

    // this.setPerfilPrestadorServico = function (o) {
    //     if (o == undefined || o == "" || typeof o != typeof new Object()) {
    //         this.perfilPrestadorServico = new PerfilPrestadorServico();
    //     } else {
    //         this.perfilPrestadorServico = o;
    //     }
    //     return true;
    // }

    // this.getPerfilPrestadorServico = function () {
    //     return this.perfilPrestadorServico;

    // }
}