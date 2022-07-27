/**
 * 接口路由
 */
const express = require("express");
const db = require("./database");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const key = require("./secretKey");
const { ArrayFilter } = require("./util/Tool");

/**
 * 登录接口路由
 */

//登录
router.post("/login", (req, res) => {
  let params = req.body;
  const sql = `select ID, name, typeid, roleID from member where ID=? and password=?`;
  db.query(sql, [params.ID, params.password], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        message: "error",
        data: err,
      });
    } else {
      if (result.length > 0) {
        //配置token
        const tokenstr = jsonwebtoken.sign({ ID: params.ID }, key, {
          expiresIn: "1m",
        });
        let success = {
          result,
          tokenstr,
        };
        res.send({
          status: 200,
          message: "success",
          data: success,
        });
      } else {
        res.send({
          status: 400,
          message: "failed",
          data: "账号或密码错误",
        });
      }
    }
  });
});

//修改密码
router.post("/ChangePassword", (req, res) => {
  let params = req.body;
  const searchSQL = `select password from member where ID=?`;
  db.query(searchSQL, params.ID, (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        message: "服务器内部出错",
      });
    } else {
      //两次密码相同的情况下
      if (result[0].password === params.newpassword) {
        return res.send({
          status: 409,
          message: "两次密码相同",
        });
      } else {
        const updateSQL = `update member set password= ? where ID= ?`;
        db.query(updateSQL, [params.newpassword, params.ID], (err, result) => {
          if (err) {
            return res.send({
              status: 408,
              message: "发生未知错误",
            });
          } else {
            res.send({
              status: 200,
              message: "密码修改成功",
            });
          }
        });
      }
    }
  });
});

/**
 * 成绩接口路由
 */

//查询学期成绩和绩点
router.post("/searchTerm", (req, res) => {
  let params = req.body;
  let tableName = params.time.substring(0, 2);
  const sql = `select * from ${tableName} where ID=? and time=?`;
  db.query(sql, [params.ID, params.time], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        message: "服务器内部出错",
        data: err,
      });
    } else {
      if (result.length > 0) {
        let temp = result[0];
        let objkey = ArrayFilter(temp);
        res.send({
          status: 200,
          message: "查询成功",
          data: objkey,
        });
      } else {
        res.send({
          status: 500,
          message: "查询出错",
          data: err,
        });
      }
    }
  });
});

/**
 * 重修部分路由接口
 */
//提交重修
router.post("/commitRebuild", (req, res) => {
  let params = req.body;
  const sql = `insert into rebuild(ID,type,classname,IsComplete) values (?,?,?,?)`;
  db.query(
    sql,
    [params.ID, params.type, params.classname, params.IsComplete],
    (err, result) => {
      if (err) {
        return res.send({
          status: 409,
          message: "重复提交相同数据",
          data: err,
        });
      } else {
        if (result.affectedRows >= 1) {
          res.send({
            status: 200,
            message: "提交成功",
          });
        } else {
          return res.send({
            status: 400,
            message: "提交失败",
          });
        }
      }
    }
  );
});

//查询重修
router.get("/searchRebuild", (req, res) => {
  let query = req.query;
  const sql = `select classname,IsComplete from rebuild where ID=? and IsComplete=0`;
  db.query(sql, [query.ID], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        message: "服务器内部出错",
        data: err,
      });
    } else {
      if (result.length > 0) {
        res.send({
          status: 200,
          message: "查询成功",
          data: result,
        });
      } else {
        res.send({
          status: 400,
          message: "查无重修信息",
          data: "无重修信息",
        });
      }
    }
  });
});

//结束重修
router.put("/endRebuild", (req, res) => {
  let params = req.body;
  const sql = `update rebuild set IsComplete=1 where ID=? and classname like '%${params.classname}%'`;
  db.query(sql, [params.ID], (err, result) => {
    if (err) {
      return res.send({
        status: 409,
        message: "重复提交相同数据",
        data: err,
      });
    } else {
      if (result.affectedRows >= 1) {
        res.send({
          status: 200,
          message: "提交成功",
        });
      } else {
        return res.send({
          status: 400,
          message: "提交失败",
        });
      }
    }
  });
});

/**
 * 查询课程接口
 */
//查询学期课程
router.get("/searchCurriculum", (req, res) => {
  let query = req.query;
  const sql = `select * from curriculum  `;
  db.query(sql, [query.time], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        message: "服务器出现未知错误",
        data: err,
      });
    } else {
      if (result.length > 0) {
        res.send({
          status: 200,
          message: "查询成功",
          data: result,
        });
      } else {
        res.send({
          status: 400,
          message: "查询失败",
        });
      }
    }
  });
});


module.exports = router;
