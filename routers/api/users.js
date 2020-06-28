const Router = require("koa-router");
const router = new Router();

const tools = require("../../libs/tools");
//引入User
const User = require("../../models/User");


router.get("/test", async ctx => {
    ctx.status = 200
    ctx.body = {msg:"test api"}
})


router.post("/register", async ctx => {

    const findResult = await User.find({email:ctx.request.body.email})
    if(findResult.length>0){
        ctx.status = 500;
        ctx.body = {email:"邮箱已被占用"}
    }else{
        let newUser = new User({
            name:ctx.request.body.name,
            email:ctx.request.body.email,
            avatar:'FewFwe',
            password:tools.enBcrypt(ctx.request.body.password),
        })
        await newUser.save().then( user=>{
            ctx.body = user
        }).catch(err=>{
            console.log(err)
        })
        // ctx.body = newUser
    }
})
module.exports = router.routes()