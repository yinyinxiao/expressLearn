var express=require('express');
var app=express();

/**
 * use()使用中间件，use中的function若不调用next(),
 * 则get中function将得不到运行
 * （next()用来传递给下一个中间件）
 * function中的参数next和next（）没有关系
 */
app.use(function(req,res,next){
    console.log("first middleware");
    next();
    console.log("first middleware after")
})
app.get('/',function(req,res,next){
    console.log("get");
    res.send("haha");
})
/**
 * console输出的顺序
 * first middleware
 *   get
*first middleware after  
 */
app.use('/home',function(req,res){
    res.send('this is home!');
})
//////////////////////////////////////////////
//express.static是express内置的中间件
//app.use(express.static('public'));//这里相当于一个根目录,在网址栏输入public下的资源可直接访问，例如：http://localhost:3000/a.html
//也可以加入路由
app.use('/assets',express.static('public'));//http://localhost:3000/assets/a.html



app.listen(3000);
console.log("listening to port 3000");