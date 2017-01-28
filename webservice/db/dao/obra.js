#!/bin/env node

function DaoObra() {
    this.add = function (obra, fcb) {
        // FIXME
        // verificar se esse usuario tem os campos obrigatorios preenchidos e tudo mais que for necessario antes de realmente mandar para o banco

        var clt = dbCon[0].collection("Obra");
        obra.ativo = 1;
        clt.insert(obra, {
            w: 1
        }, function (err, result) {
            fcb(err,result);
        });
    }

    this.listarObras = function (idUsuario, fcb) {
        // FIXME
        // verificar se esse usuario tem os campos obrigatorios preenchidos e tudo mais que for necessario antes de realmente mandar para o banco

        var clt = dbCon[0].collection("Obra");

        clt.find({idUsuario:ObjectId(idUsuario),ativo:1}).toArray(function(err, items) {
            fcb(err,items);
        });
    }

    this.listarObrasComIds = function (listaIdsObras, fcb) {
        // FIXME
        // verificar se esse usuario tem os campos obrigatorios preenchidos e tudo mais que for necessario antes de realmente mandar para o banco

        var clt = dbCon[0].collection("Obra");

        var listaIds = new Array();

        // for (id in listaIdsObras) {
        //     listaIds.push(ObjectId(id));
        // }
        for(var i = 0;i < listaIdsObras.length;i++){
            listaIds.push(ObjectId(listaIdsObras[i]));
        }

        clt.find({_id:{
            $in: listaIds
        },ativo:1}).toArray(function(err, items) {
            fcb(err,items);
        });
    }

    this.recuperarObra = function (idObra, fcb) {
        // FIXME
        // verificar se esse usuario tem os campos obrigatorios preenchidos e tudo mais que for necessario antes de realmente mandar para o banco

        var clt = dbCon[0].collection("Obra");

        clt.findOne({_id:ObjectId(idObra),ativo:1} ,function(err, result) {
            if(err){
                fcb(err,'erro no DAO');
            }
            else{
                if(result == null){
                    fcb('Obra com esta id não existe.',null);
                }
                else{
                    fcb(null,result);
                }
            }
        });
    }

    this.atualizarObra = function (obra,fcb){
        var clt = dbCon[0].collection("Obra");

        clt.update({"idUsuario":ObjectId(obra.idUsuario),"_id":ObjectId(obra.id)}, { $set:{
            "nome":obra.nome,
            "data":obra.data,
            "local":obra.local,
            "listaTags":obra.listaTags,
            "descricao":obra.descricao,
            "andamento":obra.andamento,
            "foto":obra.foto}}, {w:1}, function(err, result) {

            fcb(err,result);
        });

        //fcb(obra,obra);
    }

    this.verificarDono = function (idObra,idUsuario,fcb){
        var clt = dbCon[0].collection("Obra");
        var idDonoObra = undefined;

        this.recuperarObra(idObra,function(error,result){
            if(error){
                fcb(error,null);
            }
            else{
                idDonoObra = result.idUsuario;
                if(idDonoObra == idUsuario){
                   fcb(null,1); 
                }
                else{
                    fcb('Usuário não é dono desta obra.',null); 
                }
            }
        });
    }

    this.modificarAndamento = function (idObra,idUsuario,andamento,fcb){
        var clt = dbCon[0].collection("Obra");

        clt.findOne({ativo:1,_id:ObjectId(idObra)} ,function(err, result) {
            if(err){
                fcb(err,null);
            }
            else{
                if(result == null){
                    fcb('Obra com este ID não existe.',null);
                }
                //console.log(">>>>>>> verificar >>>>>>" + JSON.stringify(result));
                var idUsuarioDono = result.idUsuario;
                if(idUsuarioDono == idUsuario){
                    clt.update({"_id":ObjectId(idObra)}, { $set:{
                        "andamento":andamento}}, {w:1}, function(err2, result2) {
                            //notificar prestadores
                            fcb(err2,result2);
                        });
                }
                else{
                   fcb(null,'Este usuário não é dono desta obra.'); 
               }
           }
       });
    }

    this.inative = function (idUsuario,idObra,fcb){
        var clt = dbCon[0].collection("Obra");

        clt.update({"idUsuario":ObjectId(idUsuario),"_id":ObjectId(idObra)}, { $set:{
            "ativo":0
        }}, {w:1}, function(err, result) {

            fcb(err,result);
        });
    }
}

module.exports = DaoObra;