import express from "express";
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/imageSense', require('./imageSense'));
router.use('/refrigerator', require('./refrigerator'));
router.use('/users', require('./users'));

export default router;
