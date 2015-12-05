'use strict';

///////////////
///INCLUDES///
//////////////

var fs = require('fs');

///////////////
////EXPORTS////
//////////////

exports.params = params;
exports.relativePath = relativePath;
exports.parseReqURL = parseReqURL;
exports.assetAvailable = assetAvailable;

///////////////
/////MAIN/////
//////////////

function params(req) {

    var obj = Object.keys(req.query).length > 0 ? {} : null;

    if (obj !== null) {
        var width = Number(req.query.width);
        obj.width = width > 0 && typeof(width) === "number" ? width : null;
    }

    if (obj !== null) {
        var height = Number(req.query.height);
        obj.height = height > 0 && typeof(height) === "number" ? height : null;
    }

    return obj;
}

function relativePath (reqPath) {
    var path = reqPath;

    if (reqPath.charAt(0) === '/') {
        path = reqPath.slice(1);
    }

    return path;
}

function parseReqURL(path) {
    var arr = [];

    return arr.concat(path.split('/'));
}

function assetAvailable(assetPath, done) {

    assetPath = relativePath(assetPath);

    fs.access(assetPath, fs.F_OK, function (err) {
        return done(err);
    });
}