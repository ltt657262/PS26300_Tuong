var express = require('express');
var router = express.Router();
const upload = require('../bin/components/helper/Upload');

// uploaf file
// middleware: xử lý trung gian
router.post('/upload-file',[upload.single('image')],async (req,res,next)=>{
  // const path = req.file.path.replace('public','');
  // return res.json({path:'http://localhost:8686'+path});
  const path = 'http://172.16.119.17:8686/images/' +req.file.filename;
  return res.json({path: path})

});



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });

//   const anhtuong = [12, 12, 333]
//   res.json({message: 'tuong', array: anhtuong});
// });

// router.get('/tuong', function(req, res, next){
//   const {name} = req.query;
//  return res.json({message: `PS26300, ${name}!`});
// });
// router.get('/dientichtamgiac', function(req, res, next){
//  let {day, cao} = req.query;
//  day = Number(day); 
//  cao = Number(cao);
//  const s = (day * cao) /2;
//   return res.json({DienTich : s});
// });

// router.get('/tinh-toan', (req, res, next) => {
//   const {a, b,tenPhepToan} = req.params;
//   const soA = Number(a);
//   const soB = Number(b);
//   const ketQua = calculator.tinhToan(soA, soB, tenPhepToan);
//   return res.json({ketQua});
// });
// router.post('/tinh-toan', (req, res, next) => {
//   const {a, b,tenPhepToan} = req.body;
//   const soA = Number(a);
//   const soB = Number(b);
//   const ketQua = calculator.tinhToan(soA, soB, tenPhepToan);
//   return res.json({ketQua});
// });
module.exports = router;
