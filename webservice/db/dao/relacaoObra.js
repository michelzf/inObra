#!/bin/env node

function DaoRelacaoObra() {
    this.add = function (relacaoObra, fcb) {
        // FIXME
        // verificar se essa relacao obra tem os campos obrigatorios preenchidos e tudo mais que for necessario antes de realmente mandar para o banco

        relacaoObra.setIdUsuarioSolicitante(ObjectId(relacaoObra.getIdUsuarioSolicitante()));
        relacaoObra.setIdUsuarioPrestador(ObjectId(relacaoObra.getIdUsuarioPrestador()));
        relacaoObra.setIdObra(ObjectId(relacaoObra.getIdObra()));

        var clt = dbCon[0].collection("RelacaoObra");
        clt.insert(relacaoObra, {
            w: 1
        }, function (err, result) {
            fcb(err,result);
        });
    }

    this.buscarRelacaoObraComArgumentos = function (idObra,idSolicitante,idPrestador, fcb) {

        var clt = dbCon[0].collection("RelacaoObra");

        //console.log("idObra > " + idObra + " idSolicitante > " + idSolicitante + " idPrestador > " + idPrestador);

        clt.findOne({idObra:ObjectId(idObra),ativo:1,idUsuarioSolicitante:ObjectId(idSolicitante),idUsuarioPrestador:ObjectId(idPrestador)} ,function(err, result) {
            fcb(err,result);
        });

    }

    this.removerRelacaoObra = function (relacaoObraId,idUsuario,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.findOne({ativo:1,_id:ObjectId(relacaoObraId)} ,function(err, result) {
            if(err){
                fcb(err,null);
            }
            else{
                if(result == null){
                    fcb(null,'Este usuário não é dono ou prestador de serviço desta obra.');
                }
                else{
                    //console.log(">>>>>>> verificar >>>>>>" + JSON.stringify(result));
                    var idUsuarioDono = result.idUsuarioSolicitante;
                    var idUsuarioPrestador = result.idUsuarioPrestador;
                    if(idUsuarioDono == idUsuario || idUsuarioPrestador == idUsuario){
                        clt.update({"_id":ObjectId(relacaoObraId)}, { $set:{"ativo":0}}, {w:1}, function(err2, result2) {
                            if(idUsuarioDono == idUsuario){
                                //notificar prestador
                            }
                            else if(dUsuarioPrestador == idUsuario){
                                //notificar solicitante
                            }
                            fcb(err2,result2);
                        });
                    }   
                }
           }
           
       });
    }

    this.avaliarRelacaoObra = function (idRelacaoObra,idUsuario,avaliacao,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.findOne({ativo:1,_id:ObjectId(idRelacaoObra)} ,function(err, result) {
            if(err){
                fcb(err,null);
            }
            else{
                if(result == null){
                    fcb('Relacao Obra com este ID não existe.',null);
                }
                //console.log(">>>>>>> verificar >>>>>>" + JSON.stringify(result));
                var idUsuarioDono = result.idUsuarioSolicitante;
                if(idUsuarioDono == idUsuario){
                    clt.update({"_id":ObjectId(idRelacaoObra)}, { $set:{
                        "avaliacao":avaliacao}}, {w:1}, function(err2, result2) {
                            fcb(err2,result2);
                        });
                }
                else{
                   fcb(null,'Este usuário não é dono desta obra.'); 
               }
           }
       });
    }

    this.comentarRelacaoObra = function (idRelacaoObra,idUsuario,comentario,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.findOne({ativo:1,_id:ObjectId(idRelacaoObra)} ,function(err, result) {
            if(err){
                fcb(err,null);
            }
            else{
                if(result == null){
                    fcb('Relacao Obra com este ID não existe.',null);
                }
                //console.log(">>>>>>> verificar >>>>>>" + JSON.stringify(result));
                var idUsuarioDono = result.idUsuarioSolicitante;
                if(idUsuarioDono == idUsuario){
                    clt.update({"_id":ObjectId(idRelacaoObra)}, { $set:{
                        "comentario":comentario}}, {w:1}, function(err2, result2) {
                            fcb(err2,result2);
                        });
                }
                else{
                   fcb(null,'Este usuário não é dono desta obra.'); 
               }
           }
       });
    }

    this.responderProposta = function (idRelacaoObra,idUsuario,resposta,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.findOne({ativo:1,_id:ObjectId(idRelacaoObra)} ,function(err, result) {
            if(err){
                fcb(err,null);
            }
            else{
                if(result == null){
                    fcb('Relacao Obra com este ID não existe.',null);
                }
                //console.log(">>>>>>> verificar >>>>>>" + JSON.stringify(result));
                var idUsuarioDono = result.idUsuarioPrestador;
                if(idUsuarioDono == idUsuario){
                    clt.update({"_id":ObjectId(idRelacaoObra)}, { $set:{
                        "estado":resposta}}, {w:1}, function(err2, result2) {
                            fcb(err2,result2);
                        });
                }
                else{
                   fcb(null,'Este usuário não é prestador de serviço desta relação obra.'); 
               }
           }
       });
    }

    this.buscarRelacoesObrasDoPrestadorComId = function (idPrestador,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.find({ativo:1,idUsuarioPrestador:ObjectId(idPrestador)}).toArray(function(err, items){
            fcb(err,items);
        });
    }

    this.buscarRelacoesObrasDaObra = function (idObra,fcb){
        var clt = dbCon[0].collection("RelacaoObra");

        clt.find({ativo:1,idObra:ObjectId(idObra)}).toArray(function(err, items) {
            fcb(err,items);
        });
    }
}

module.exports = DaoRelacaoObra;