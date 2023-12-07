const UserModel = require('../users/model');
const PasswordResetModel = require('../users/modelPR');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require("../helper/Mailer");
const { token } = require('morgan');

// đăng ký tài khoản
const register = async (data) => {
    try {
        const { email, name, password, role } = data;
        // tìm tài khoản trong db có email
        // mã hóa tài khoản
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        const user = new UserModel({
            email,
            name,
            password: hash,
            role,

        });
        await user.save();
        // gửi email xác thực tài khoản
        setTimeout(() => {
            mailer.sendMail({
                email: user.email,
                subject: 'Xác thực tài khoản',
                content: `Link xác thực tài khoản: http://localhost:3000/verify/${user._id}`
            });
        }, 0)
    } catch (error) {
        console.log('deleteCategory error: ', error);
        throw new Error('Có lỗi xảy ra khi đăng kí');
    }
}

// đăng nhập
const login = async (data) => {
    try {
        const { email, password } = data;
        //  tìm tài khoản trong db có email
        let user = await UserModel.findOne({ email });
        if (!user) throw new Error('Không tìm thấy tài khoản');
        // kiểm tra password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error('Mật khẩu không chính xác');

        // xóa field password trong user
        user.password = undefined;
        // tạo token sử dụng jwt
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            'hehehe',
            { expiresIn: 1 * 60 * 60 * 60 }
        );
        user = { ...user._doc, token };

        return user;
    } catch (error) {
        console.log('deleteCategory error: ', error);
        throw new Error('Có lỗi xảy ra khi đăng nhập');
    }
}
const verify = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("Không tìm thấy tài khoản");
        if (user.isVerified) throw new Error("Tài khoản đã được xác thực");
        user.isVerified = true;
        await user.save();
        return true;
    } catch (error) {
        console.log("create error: ", error);
        return false;
    }
}
const forgotPassword = async (email) => {
    try {
        //tìm user theo email
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("Không tìm thấy tài khoản");
        // tạo token
        const token = jwt.sign(
            { _id: user._id, email: user.email }, // thông tin lưu vào token
            'abc',
            { expiresIn: 1 * 1 * 5 * 60 } // hết hạn khi nào
        );
        // lưu token và email vào db
        const PasswordReset = new PasswordResetModel({ email, token });
        await PasswordReset.save();
        // gửi email khôi phục mật khẩu
        setTimeout(() => {
            mailer.sendMail({
                email: user.email,
                subject: 'Khôi phục mật khẩu',
                content: `Link khôi phục mật khẩu: http://localhost:3000/reset-password/${token}`
            });

        }, 0);
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}
// check token reset password
const checkTokenResetPassword = async (token) => {
    try {
        const decoded = jwt.verify(token, 'abc');
        if (decoded) {
            const { email } = decoded;
            const PasswordReset = await PasswordResetModel.findOne({
                email,
                token,
                status: true,
                created_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) }
            });
            if (PasswordReset) return true;
            return false;
        }
        return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}
// reset password
const resetPassword = async (token, password) => {
    try {
        const decoded = jwt.verify(token, 'abc');
        if(!decoded) throw new Error("Token không hợp lệ");
        const {email} = decoded;
        const PasswordReset = await PasswordResetModel.findOne({
            email,
            token,
            status: true,
            created_at: { $gte: new Date(Date.now() - 1 * 1 * 5 * 60 * 1000) }
        });
        if (!PasswordReset) throw new Error("Token không hợp lệ");
        
        
        // mã hóa mật khẩu
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // lưu vào db mật khẩu mới
        const user = await UserModel.findOne({ email });
        user.password = hash;
        await user.save();
        // xóa token
        await PasswordResetModel.updateOne({ email, token }, { status: false });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// cập nhật thông tin tài khoản
const updateProfile = (id, data) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// đổi mật khẩu
const changePassword = (id, data) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// xem danh sách tài khoản
const getAllUsers = () => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return [];
}

// xem chi tiết tài khoản
const getUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        console.log('getUserById error: ', error);
        throw new Error('Có lỗi xảy ra khi lấy chi tiết user theo id');
    }
}

// tìm kiếm tài khoản
const searchUser = (keyword) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return [];
}

// khóa tài khoản
const lockUser = (id) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// mở khóa tài khoản
const unlockUser = (id) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

module.exports = {
    register,
    login,
    updateProfile,
    changePassword,
    forgotPassword,
    getAllUsers,
    getUserById,
    searchUser,
    lockUser,
    unlockUser,
    verify,
    checkTokenResetPassword,
    resetPassword
}