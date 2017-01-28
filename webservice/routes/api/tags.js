#!/bin/env node

module.exports = function (app) {
    app.post('/api/tags', new Token().acessoLivre, function (req, res) {

        var lista = ['pedreiro','caçamba','azulejo','piso','laje','telhado','eletricista','encanador'];

        res.status(200).json({
            result: lista
        })
    });

    app.post('/api/tags/getUsuariosComNome', new Token().acessoLivre, function (req, res) {

        var nome = req.body.nome;
        var tags = req.body.tags;
        var util = require('util');
        var daoUsuario = new DaoUsuario();

        console.log('Nome');
        console.log(nome);
        console.log('Tags');
        console.log(tags);

        if(tags){
            if(nome && typeof nome === 'string'){
                daoUsuario.getUsuariosComNomeETags(nome,tags,function(err,result){
                    if(err){
                        res.status(200).json({
                            err: err
                        })
                    }
                    else{
                        res.status(200).json({
                            result: result
                        })
                    }
                });
            }
            else{
                console.log('Nome vazio ou com formato errado.');
                res.status(500).json({
                    err: 'Nome vazio ou com formato errado.'
                })
            }
        }
        else{
            console.log('Lista de tags vazia ou com formato errado.');
            res.status(500).json({
                err: 'Lista de tags vazia ou com formato errado.'
            })
        }
    });

    app.post('/api/tags/getUsuariosComTags', new Token().acessoRestrito, function (req, res) {

        //var tags = req.body.tags;
        var tags = JSON.parse(req.body.tags);
        var util = require('util');
        var daoUsuario = new DaoUsuario();

        if(tags && util.isArray(tags)){
        	daoUsuario.getUsuariosComTags(tags,function(err,result){
                if(err){
                    res.status(200).json({
                        err: err
                    })
                }
                else{
                    res.status(200).json({
                        result: result
                    })
                }
            });
        }
        else{
            console.log('Lista de tags vazia ou com formato errado.');
        	res.status(500).json({
            	err: 'Lista de tags vazia ou com formato errado.'
        	})
        }
    });

}