var express=require('express');//引入express
//express的中间件body-parser作用:把客户端发送的HTTP请求体里本应是纯文本的内容，转换为方便的对象（req.body）的形式供你的路由调用
var bodyParser = require('body-parser');
var fs=require('fs');


//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件，
//Multer 不会处理任何非 multipart/form-data 类型的表单数据。
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })//文件上传后指定放在的目录，这里即根目录下的unloads目录下
//------------文件的上传------multer-------
app.post('/upload',upload.single('picture'),function(req,res){//upload.single('表单中input的name值');
    res.end("上传ok");
})

var app=express();//express() 是一个由 express 模块导出的入口（top-level）函数。

//ejs呈现引擎的应用，创建一个目录views,再在目录下面创建一个文件 form.ejs
app.set('view engines','ejs')
//ejs应用
app.get('/form/:id',function(req,res){
    var person=req.params.id;
    var data={age:29,job:"student",hobby:['shuijiao','dayouxi','changge']};
    res.render('form.ejs',{person:data});
})
//ejs在网页中固定模板的引用
//新建一个partial.ejs,然后在网页中<%-include('partial.ejs的目录')-%>



//------------------中间件body-parser的使用方法1-------------
app.use(bodyParser.urlencoded({extended:false}));//app.use()使用一个中间件
app.post('/',function(req,res){
    console.dir(req.body);
    res.send(req.body.name);
})

// parse application/x-www-form-urlencoded 解析标准的表单格式
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 解析JSON格式
//app.use(bodyParser.json())

//-----------------中间件的使用方法2-----------------
//特定路由下的中间件用法：这种用法是针对特定路由下的特定请求的，只有请求该路由时，中间件才会拦截和解析该请求；也即这种用法是局部的
// create application/json parser
//var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })

// POST /api/users gets JSON bodies
// app.post('/api/users', jsonParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
  // create user in req.body
//})
//----------------------------------------------------------
//---------------路由变量的使用-------------------------------
app.get('/profile/:id/:pram',function(req,res){//:变量 可变的路由地址
    console.dir(req.params);//req.param请求地址中填入的可变路由地址的键值对也就是{’id‘:请求地址中的值,"pram":"请求地址中对应的值"}
    res.send("you requested to see profile with the id of "+req.params.id);//req.params.id 获取变量:id对应的值
})

//-------------------地址中参数的获取---------------------
app.get('/',function(req,res){
    // console.dir(req.query);//req.query获得地址栏中的参数和值
    // res.send("home pade:"+req.query.find);//req.query.find获取地址中参数fand对应的值
 ///////////////////////////////////////////////////////////////////////////////////////////
    console.log("input /")
    fs.createReadStream(__dirname+'/index.html').pipe(res);
    //express提供的方法 res.sendFile(__dirname+'/index.html')
})




app.listen(3003);
console.log("listening to 3003");
