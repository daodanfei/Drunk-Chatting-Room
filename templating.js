const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
    //默认配置设置
        autoescape = opts.autoescape && true,//安全性的设置
        noCache = opts.noCache || false,//使用缓存，不会每次都编译模板
        watch = opts.watch || false,//不使用监视器，不会当模板改变的时候实时更新
        throwOnUndefined = opts.throwOnUndefined || false,//遇见空值抛出错误
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {//模板所在的文件查询
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
}

module.exports = templating;
