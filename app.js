const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose")
const bodyParser = require('koa-bodyparser');

const MonoURL = require("./config/keys").mongoURL;

const app = new koa();
const router = new Router();
app.use(bodyParser())
mongoose.connect(MonoURL,{ useNewUrlParser: true,useUnifiedTopology: true } ).then(res=>{
    console.log('mongose connected')
}).catch(err=>{
    console.log(err)
})
//引入user.js
const users = require("./routers/api/users")  


//路由
router.get("/",async ctx =>{
        ctx.body = {msg:'Helle Kos'}
})

//配置路由地址
router.use("/api/users",users)
//配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.POST || 5000;

app.listen(port,() =>{
    console.log(`server started on ${port}`)
})