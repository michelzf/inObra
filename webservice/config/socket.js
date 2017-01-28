#!/bin/env node

module.exports = function (server, app) {
    require("../library/InChat.js")(server, app, "obra");
}