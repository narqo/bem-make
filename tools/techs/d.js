// 2012

var Q = require('qq'),
    FS = require('fs'),
    PATH = require('path'),
    INHERIT = require('inherit'),

    BaseTech = require('bem/lib/tech').Tech,

    /** {String} */
    PRJ_ROOT = PATH.resolve(__dirname, '../../');

/**
 * @param {String} path
 * @return {String}
 */
function prjRelPath(path) {
    return PATH.relative(PRJ_ROOT, path);
}

exports.Tech = INHERIT(BaseTech, {

    getSuffixes : function() {

        // TODO: передавать в параметрах технологии
        return ['deps.js', 'css', 'ie.css', 'js'];

    },

    getBuildResultChunk : function(relPath, path, suffix) {
        //console.log(relPath);
        return prjRelPath(path);
    },

    /**
     * @param {String} path
     * @return {fs.WriteStream}
     */
    getStore : function(path) {
        this._store || (this._store = {});
        return this._store[path] || (this._store[path] = FS.createWriteStream(path, { flags: 'w' }));
    },

    /**
     * @param {String} prefix
     * @return {String}
     */
    getStorePath : function(prefix) {
        return this.getPath(prefix);
    },

    storeBuildResult : function(path, suffix, res) {
        var _this = this,
            //suffixTarget = PATH.basename(path, this.getTechName()) + suffix,
            suffixTarget = PATH.join(prjRelPath(PATH.dirname(path)), PATH.basename(path, this.getTechName())) + suffix,
            data = suffixTarget + ' : ' + res.join(' ') + '\n';

        data += res.reduce(function(a, b) { return a + b + ' : \n' }, '');

        return Q.when(data, function(data) {
            _this.getStore(path).write(data + '\n');
        });
    },

    storeBuildResults : function(prefix, res) {
        var _this = this;
        return Q.when(res, function(res) {

            var done;
            _this.getSuffixes().forEach(function(suffix) {

                done = Q.wait(done,
                    _this.storeBuildResult(_this.getStorePath(prefix, suffix),
                        suffix, res[suffix]));

            });
            return done;

        });
    }

});

