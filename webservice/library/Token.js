#!/bin/env node

Token = function (t) {
    this.seq = undefined;
    this.usuario_id = undefined;

    this.construtor = function (t) {
        this.json(t);
    }

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
            if (j.usuario_id != undefined && j.seq == undefined) {
                return (
                    this.setSeq(geraSeq()) &&
                    this.setUsuarioId(j.usuario_id)
                );
            } else if (j.usuario_id != undefined && j.seq != undefined) {
                this.setSeq(j.seq);
                this.setUsuarioId(j.usuario_id);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    this.setUsuarioId = function (s) {
        s = s.toString();
        if (typeof s == typeof "x") {
            this.usuario_id = s;
            return true;
        } else {
            return false;
        }
    }

    this.getUsuarioId = function () {
        return this.usuario_id;
    }

    this.setSeq = function (s) {
        if (s == undefined) {
            this.seq = undefined;
        } else {
            s = s.toString();
            if (valida.hash(s)) {
                this.seq = s;
                return true;
            } else {
                return false;
            }
        }

    }

    this.getSeq = function () {
        return this.seq;
    }

    var geraSeq = function () {
        //        return mhash("whirlpool", uuid.v1());
        var hash = crypto.createHash('sha512');
        hash.update(uuid.v1());
        return hash.digest('hex');
    }

    this.completo = function () {
        if (this.getSeq() != undefined && this.getSeq() != "" && this.getUsuarioId() != undefined && this.getUsuarioId() != "") {
            return true;
        } else {
            return false;
        }
    }

    this.acessoRestrito = function (req, res, next) {
        // funcao para usada sem instanciar
        if (req.body.token) {
            var tkn = new Token(req.body.token);
            if (tkn.completo()) {
                daoToken = new DaoToken();
                daoToken.verificar(tkn, function (result) {
                    if (result) {
                        req.token = tkn;
                        return next();
                    } else {
                        res.status(401);
                        res.send("Unauthorized");
                    }
                });
            } else {
                res.status(401);
                res.send("Unauthorized");
            }
        } else {
            res.status(401);
            res.send("Unauthorized");
        }
    }

    this.acessoLivre = function (req, res, next) {
        //         funcao para ser usada sem instancia
        return next();
    }

    this.valido = function (tkn, fcb) {
        if (tkn.completo()) {
            daoToken = new DaoToken();
            daoToken.verificar(tkn, function (result) {
                if (result) {
                    fcb(true);
                } else {
                    fcb(false);
                }
            });
        } else {
            fcb(false);
        }
    }

    this.construtor(t);
}

DaoToken = function () {
    this.renovar = function (tkn, fcb) {
        var clt = dbCon[0].collection("Token");
        clt.update({
            usuario_id: ObjectId(tkn.getUsuarioId())
        }, {
            $set: {
                seq: tkn.getSeq(),
                datetime: new Date().toISOString()
            }
        }, {
            upsert: true
        }, function (err, result) {
            if (err) {
                fcb(false);
            } else {
                fcb(true);
            }
        });
    }

    this.verificar = function (tkn, fcb) {
        var clt = dbCon[0].collection("Token");
        clt.findOne({
            seq: tkn.getSeq(),
            usuario_id: ObjectId(tkn.getUsuarioId())
        }, function (err, result) {
            if (err) {
                fcb(false);
            } else {
                if (result) {
                    fcb(true);
                } else {
                    fcb(false);
                }
            }
        });
    }
}