const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据是需要
const express = require('express');
const app = express();

app.use('/server', express.static('server'));
app.use(bodyParser.json());

// 后端api路由
app.use('/api', routerApi);

// 监听端口
var server = app.listen(3000, '127.0.0.1', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用访问地址为 http://" + host + ':' + port);
})
