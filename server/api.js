const mysql = require('mysql');
const sql = require('./sql');

const pool = mysql.createPool(sql);

module.exports = {
  getValue(req, res, next) {
    var data = req.query,
      keys = Object.keys(data),
      sql = "SELECT * FROM usertable WHERE " + keys[0] + " = '" + data[keys[0]] + "'";
    keys.forEach((val, id) => {
      if (id > 0) {
        sql += " AND " + val + " = '" + data[val] + "'";
      }
    })
    console.log(sql);
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("连接失败");
      } else {
        console.log("连接成功");
        connection.query(sql, (err, result) => {
          console.log(JSON.stringify(result));
          res.json(result);
          connection.release();
        })
      }
    })
  },
  addValue(req, res, next) {
    var data = req.body,
      keys = Object.keys(data),
      type = "",
      value = "",
      sql = "";
    if (keys.length > 1) {
      keys.forEach((val, id) => {
        type += val + ",";
        value += data[val] + ",";
      })
      sql = "INSERT INTO usertable (" + type + ") VALUES (" + val + ")";
    } else {
      sql = "INSERT INTO usertable " + keys[0] + " VALUES '" + data[keys[0]] + "'";
    }
    console.log(sql);
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("连接失败");
      } else {
        console.log("连接成功");
        connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
        })
      }
    })
  },
  setValue(req, res, next) {
    var data = req.body,
      name = data.name,
      keys = Object.keys(data),
      val = "",
      sql = "";
    if (keys.length > 1) {
      keys.forEach((val, id) => {
        val += val + " = '" + data[val] + "',"
      })
      sql = "UPDATE usertable SET " + val + " WHERE name = '" + name + "'";
    } else {
      sql = "UPDATE usertable SET " + keys[0] + " = '" + data[keys[0]] + "' WHERE name = '" + name + "'";
    }
    console.log(sql);
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("连接失败");
      } else {
        console.log("连接成功");
        connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
        })
      }
    })
  },
  delValue(req, res, next) {
    var data = req.body,
      keys = Object.keys(data),
      sql = "DELETE FROM usertable WHERE " + keys[0] + " = '" + data[keys[0]] + "'";
    console.log(sql);
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("连接失败");
      } else {
        console.log("连接成功");
        connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
        })
      }
    })
  }
}
