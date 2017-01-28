function Usuario() {
    this.id = "";
    this.nome = "";
    this.nascimento = "";
    this.sexo = "";
    this.foto = "";
    this.rg = "";
    this.cpf = "";
    this.rua = "";
    this.numero = "";
    this.complemento = "";
    this.cidade = "";
    this.estado = "";
    this.pais = "";
    this.cep = "";
    this.facebookId = "";
    this.email = "";
    this.telefone = "";
    this.senha = undefined;

    this.descricao = undefined;

    // this.perfilSolicitante = undefined;
    // this.perfilPrestadorServico = undefined;

    this.tags = new Array();

    this.prestadorServico = false;

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
        if (typeof j == typeof "x" && j) {
            j = JSON.parse(j);
            ok = true;
        } else if (typeof j == typeof new Object) {
            ok = true;
        } else {
            ok = false;
        }
        if (ok) {
            // aqui dentro tem que ter todos os sets

            // TODO
            // precisa verificar se todos os sets voltam true para depois retornar true

            if(j.prestadorServico){
                this.setPrestadorServico(j.prestadorServico);
            }
            if(j.tags){
                this.setTags(j.tags);
            }
            if(j.descricao){
                this.setDescricao(j.descricao);
            }

            if (j.id == undefined || j.id == "" || j.id == 0 || j.id == "0") {
                this.setId(j._id); // id do mongo
            } else {
                this.setId(j.id);
            }
            return (
                this.setNome(j.nome) &&
                this.setNascimento(j.nascimento) &&
                this.setSexo(j.sexo) &&
                this.setFoto(j.foto) &&
                this.setRg(j.rg) &&
                this.setCpf(j.cpf) &&
                this.setRua(j.rua) &&
                this.setNumero(j.numero) &&
                this.setComplemento(j.complemento) &&
                this.setCidade(j.cidade) &&
                this.setEstado(j.estado) &&
                this.setPais(j.pais) &&
                this.setCep(j.cep) &&
                this.setFacebookId(j.facebookId) &&
                this.setEmail(j.email) &&
                this.setTelefone(j.telefone)
            );
        } else {
            return false;
        }
    }

    this.setId = function (id) {
        // verificar se eh um id valido (o id do mongo)
        if (id) {
            this.id = id.toString();
            return true;
        } else {
            return false;
        }
    }

    this.getTags = function (){
        return this.tags;
    }

    this.getPrestadorServico = function () {
        return this.prestadorServico;
    }

    this.setDescricao = function (descricao){
        this.descricao = descricao;
        return true;
    }

    this.getDescricao = function (){
        return this.descricao;
    }

    this.setPrestadorServico = function (s) {
        this.prestadorServico = s;
        return true;
    }

    this.setTags = function (s) {
        this.tags = s;
        return true;
    }

    this.getId = function () {
        return this.id;
    }

    this.setNome = function (s) {
        this.nome = s;
        return true;
    }

    this.getNome = function () {
        return this.nome;
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

    this.setRg = function (s) {
        this.rg = s;
        return true;
    }

    this.getRg = function () {
        return this.rg;
    }

    this.setCpf = function (s) {
        this.cpf = s;
        return true;
    }

    this.getCpf = function () {
        return this.cpf;
    }

    this.setRua = function (s) {
        this.rua = s;
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

    this.setCep = function (s) {
        this.cep = s;
        return true;
    }

    this.getCep = function () {
        return this.cep;
    }

    this.setFacebookId = function (s) {
        this.facebookId = s;
        return true;
    }

    this.getFacebookId = function () {
        return this.facebookId;
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

    this.setPerfilSolicitante = function (s) {
        this.perfilSolicitante = s;
        return true;
    }

    this.getEPerfilSolicitante = function () {
        return this.perfilSolicitante;
    }

    this.setPerfilPrestadorServico = function (s) {
        this.perfilPrestadorServico = s;
        return true;
    }

    this.getPerfilPrestadorServico = function () {
        return this.perfilPrestadorServico;
    }

    this.setTelefone = function (s) {
        this.telefone = s;
        return true;
    }

    this.getTelefone = function () {
        return this.telefone;
    }

    this.setSenha = function (s) {
        if (valida.senha(s)) {
            this.setSenhaSemVerificar(CryptoJS.SHA512(s).toString());
            return true;
        } else {
            return false;
        }
    }

    this.setSenhaSemVerificar = function (s) {
        if (valida.hash(s)) {
            this.senha = s;
            return true;
        } else {
            return false;
        }
    }

    this.getSenha = function () {
        return this.senha;
    }
}