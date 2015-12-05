var assert = require('assert');
var util = require('../utils/utils');


describe('params', function () {
    it('should return an object with two keys: height, width', function () {
        var req = {
            query: {
                height: 600,
                width: 600
            }
        };
        var result = util.params(req);
        assert.equal(2, Object.keys(result).length);
    });
    it('should return an object with the keys: height = 600, width = null', function () {
        var req = {
            query: {
                height: 600,
                width: '6dsf00'
            }
        };
        var result = util.params(req);
        assert.equal((Object.keys(result).length == 2),(result.width == null));
    });
    it('should return an object with the keys: height = null, width = 600', function () {
        var req = {
            query: {
                height: 0,
                width: 600
            }
        };
        var result = util.params(req);
        assert.equal((Object.keys(result).length == 2),(result.height == null));
    });
    it('should return null', function () {
        var req = {
            query: {}
        };
        var result = util.params(req);
        assert.equal(null, result);
    });
});

describe('relativePath', function () {
    it('should return a path without leading slash', function () {
        var path = '/Content/Images/car.jpeg';
        var result = util.relativePath(path);
        assert.equal(true, (result.charAt(0) !== '/'));
    });
});

describe('parseReqUrl', function () {
    it('return an array', function () {
        var path = 'content/image.jpg';
        var result = util.parseReqURL(path);
        assert.equal("object", typeof(result));
    });
    it('return an array with two keys', function () {
        var path = 'content/image.jpg';
        var result = util.parseReqURL(path);
        assert.equal(2, result.length);
    });
});

describe('assetAvaialble', function () {
    it('should callback when asset is available', function () {
        var path = 'tests/test.png';
        util.assetAvailable(path, function (err) {
            if (err)
                assert.equal(true, false);
            assert.equal(true, true);
        });
    });
    it('should vallback with error when asset is unavailable', function () {
        var path = 'tests/test.jpg';
        util.assetAvailable(path, function (err) {
            if (err)
                assert.equal(true, false);
            assert.equal(true, true);
        });
    });
});
