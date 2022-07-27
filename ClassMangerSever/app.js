/**
 * 服务器
 */
const express=require('express');
//获取jsonwebtoken和express-jwt

const expressJWT=require('express-jwt');
const port=6900
//后端接口路由
const router=require('./router')
const key=require('./secretKey')
//导入https模块
const https=require('https');

//允许跨域资源共享
const cors= require('cors');

//创建服务器实例
const app=express();

app.use(cors());

//添加字符串解析
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(expressJWT({secret: key, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}))




app.use('/api',router)

//全局中间件
app.use((err, req, res, next) => {
    
    //判断是否为token过期或者token解析错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: 'token过期或者不合法'
        })
    }
    res.send({
        status: 500,
        message: '未知的错误'
    })
})



//监听端口
app.listen(6900,()=>{
    console.log('welcome to classManager')
})