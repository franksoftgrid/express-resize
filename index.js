'use strict';

///////////////
///INCLUDES///
//////////////

var sharp = require('sharp');
var pathUtil = require('path');

var util = require('./utils/utils');

///////////////
//PUBLIC API//
//////////////

module.exports = resizer;

///////////////
/////MAIN/////
//////////////

function resizer(req, res, next) {

    var path = util.relativePath(req._parsedUrl.pathname);
    var requestedAsset = util.parseReqURL(path);
    var ext = pathUtil.extname(path).toLowerCase();

    var formats = ['.jpg', '.jpeg', '.gif', '.png', '.svg'];

    if (formats.indexOf(ext) !== -1) {

        util.assetAvailable(path, function (err) {
            if (err) {
                return res.sendStatus(404);
            }

            var reqParams = util.params(req);

            if (reqParams !== null && (reqParams.hasOwnProperty('height') || reqParams.hasOwnProperty('width'))) {

                if (ext == '.gif') {

                  // pass through gifs - sharp doesn't support gif output
                  return res.sendFile(process.cwd() + '/' + path);

                } else {
                    res.writeHead(200, {'Content-Type': 'image/' + ext.slice(1)});

                    return sharp(path)
                        .resize(reqParams.width, reqParams.height, {
                            kernel: sharp.kernel.nearest
                        })
                        .pipe(res);
                }
            }

            return res.sendFile(process.cwd() + '/' + path);

        })

    }
    else {
        return next();
    }
}

