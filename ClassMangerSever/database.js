/**
 * 数据库连接
 */

//导入mysql模块
const mysql=require('mysql')
//配置mysql模块
const db=mysql.createPool({
    //服务器地址
    host:'ayakagami.top',
    //数据库用户名
    user:'memoli',
    //密码
    password:'Xly5201314',
    //数据库对象，要操作的数据库
    database:'classsix'
})

module.exports =db