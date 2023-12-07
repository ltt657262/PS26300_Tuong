const express = require('express');
const router = express.Router();
const ProductController = require('../bin/components/product/controller');
const checkToken = require('../bin/components/helper/CheckToken');
const validation = require('../bin/components/helper/Validation');
const validateProduct = require('../bin/components/helper/Validation');
// http://localhost:3000/products;

router.get('/', async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const product = await ProductController.getAllProducts(page, limit);
        return res.status(200).json(product);
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
        const product = await ProductController.getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message });
    }
})

// search product theo từ khóa
// http://localhost:3000/products/search/name?keyword=iphone
router.get('/search/name', async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const product = await ProductController.searchProduct(keyword);
        return res.status(200).json(product);
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message });
    }
})
// thêm mới sản phẩm
//method: post
router.post('/',[checkToken, validateProduct], async (req, res, next) => {
    try {
        const { body, user } = req;
        // xác định đc ai là người tạo sp
        await ProductController.createProduct(body, user._id,user._id);
        return res.status(200).json({ message: 'Thêm mới product thành công' });
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message });
    }
})
// cập nhật sản phẩm theo id
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {body} = req;
        await ProductController.updateProduct(id, body);
        return res.status(200).json({ message: 'Cập nhật product thành công' });
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message });
    }
});
// 5. Xóa 1 product
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await ProductController.deleteProduct(id);
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ status: false });
    }
})

module.exports = router;