module.exports = {
    'GET /blog': async (ctx, next) => {
        ctx.render('blog.html');
    }
}