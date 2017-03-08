const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;

/*staticFiles是一个普通函数，它接收两个参数：URL前缀和一个目录，
然后返回一个async函数。这个async函数会判断当前的URL是否以指定前
缀开头，如果是，就把URL的路径视为文件，并发送文件内容。如果不是，
这个async函数就不做任何事情，而是简单地调用await next()让下一个
middleware去处理请求。 */

/**我们使用了一个mz的包，并通过require('mz/fs');导入。mz提供的
 * API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs
 * 对应的函数，并改为Promise。这样，我们就可以非常简单的用await
 * 调用mz的函数，而不需要任何回调。 */