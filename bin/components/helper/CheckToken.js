const jwt = require('jsonwebtoken');
// đọc token từ header của api
const checkToken = (req, res, next) => {
    try {
        // lấy token từ header
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            throw new Error('No token provided')
        } else {
            // test token: đúnng token, đúng key, còn hạn sử dụng token
            jwt.verify(token, 'hehehe', (err, decoded) => {
                if(err){
                    throw new Error('Unauthorized');
                } else {
                    // lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở sau
                    req.user = decoded;
                    next();
                }
            })
        }
    } catch (error) {
        console.log("checkToken error: ", error);
        return res.status(401).json({error: 'Unauthozied'})
    }
}
module.exports = checkToken;