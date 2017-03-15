// sign in:

var index = 0;
var index_l = Math.round(Math.random()*20);
var index_f = Math.round(Math.random()*20);

var last_name = ["赵","钱","孙","李","周","吴","郑","王","冯","陈","褚","卫","蒋","沈","韩","杨","朱","秦","尤","许","马"];
var first_name = ["子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨","建国"];
//let names = '甲乙丙丁戊己庚辛壬癸';
var name = last_name[index_l]+first_name[index_f];

module.exports = {
    'GET /change': async (ctx,next) =>{
        index_l = Math.round(Math.random()*20);
        index_f = Math.round(Math.random()*20);
        name = last_name[index_l]+first_name[index_f];
        ctx.response.type = 'text/plain';
        ctx.response.body = name;
    },

    'GET /signin': async (ctx, next) => {
        ctx.render('signin.html', {
            name: `${name}`
        });
    },

    'POST /signin': async (ctx, next) => {
        index ++;
        let name = ctx.request.body.name;
        let user = {
            id: index,
            name: name,
            image: index % 20
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        //index --;
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    },

};
