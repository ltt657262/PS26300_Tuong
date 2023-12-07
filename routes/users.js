var express = require('express');
var router = express.Router();
const UserController = require('../bin/components/users/controller');
const checkToken = require('../bin/components/helper/CheckToken')
const checkRole = require('../bin/components/helper/CheckRole');
const passwordController = require('../bin/components/helper/passwordController');
//http://localhost:3000/users/register
//đăng kí tài khoản 
//method: post
router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;
    await UserController.register(body);
    return res.status(200).json({ status: true });
    
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ status: false, message: error.message });
  }
});
//quên mật khẩu
router.post('/forgot-password-and-reset', passwordController.sendMail);

//login
//method: post
router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserController.login(body);
    return res.status(200).json(user);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: error.message });
  }
});
// lấy chi tiết product theo id
// method : get
router.get('/:id', async (req, res, next) => {
  try {
      const { id } = req.params;
      const user = await UserController.getUserById(id);
      return res.status(200).json(user);
  } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: error.message });
  }
})

//Xác thực tài khoản
//http://localhost:3000/users/verify/:id
//method: post
router.post('/verify/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserController.verify(id);
    return res.status(200).json({ status: result });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ status: false, error: error.message });
  }
});
//quên mật khẩu
//http://localhost:3000/users/forgot-password
//method: post
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await UserController.forgotPassword(email);
    res.status(200).json({ status: result });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

//check token reset password
//http://localhost:3000/users/users/check-token-reset-password
//method: post
router.post('/check-token-reset-password', async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await UserController.checkTokenResetPassword(token);
    res.status(200).json({ status: result });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});

//reset password
//http://localhost:3000/users/reset-password
//method: post
router.post('/reset-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await UserController.resetPassword(email);
    res.status(200).json({ status: result });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
// test token
//http://localhost:8686/users/test-token
// authentication: chứng thực
// authenrization: phẩn quyền
// 1: user
// 2: managerS
// 3: admin
router.get('/test-token', [checkToken, checkRole.checkRoleManager], async (req, res, next) => {
  try {
    console.log('>>>>>>>>', req.user);
    return res.status(200).json({ message: 'test token thành công' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router;
