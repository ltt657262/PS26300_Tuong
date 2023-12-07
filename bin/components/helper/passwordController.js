const userModel = require('../users/model');
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');

const passwordController = {

    sendMail: async (req, res, next) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'lethanhtuong657262@gmail.com',
                pass: 'epkyzdvgdmihkqdu'
                //ok
            }
        });
        const passwordNew = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(passwordNew, salt);
            const user = await userModel.findOne({ email: req.body.email })
            if (user) {
                await transporter.sendMail({
                    from: '"My gmail" <lethanhtuong657262@gmail.com>',
                    to: user.email,
                    subject: "Yêu cầu mật khẩu mới",
                    text: `xin chào: ${user.email}`,
                    html: `Mật khẩu mới của bạn là : ${passwordNew}`
                });
                // await User.updateOne({email: user.email},{ $set: { password: passwordNew } });
                await userModel.findOneAndUpdate({ email: user.email }, { $set: { password: hashedPassword } },
                    { returnDocument: "after" });
                res.status(200).json({ message: "Gửi mail thành công" });
            }
            else {
                res.status(500).json({  message: "không tìm thấy email" });
                console.log("mail lỗi",error);
            }

        } catch (error) {
            res.status(500).json({ status: error, message: "Gửi mail thất bại" });
            console.log("mail lỗi",error);
        }

    }

}

module.exports = passwordController;