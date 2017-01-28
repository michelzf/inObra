function Token(t) {
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

    this.construtor(t);
}