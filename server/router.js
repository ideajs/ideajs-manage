const express = require('express');
const router = express.Router();
const api = require('./api');

// 查询
router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});
// 增加
router.post('/addValue', (req, res, next) => {
  api.addValue(req, res, next);
});
// 修改
router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});
// 删除
router.post('/delValue', (req, res, next) => {
  api.delValue(req, res, next);
});

module.exports = router;
