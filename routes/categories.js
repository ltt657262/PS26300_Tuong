var express = require('express');
var router = express.Router();
const CategoryController = require('../bin/components/categories/controller');

// http://localhost:8686/categories

// http://localhost:8686/categories
// method: GET
// 1. Lấy danh sách categories
router.get('/', async (req, res, next) => {
 try {
  const categories = await CategoryController.getAllCategories();
  return res.status(200).json(categories);
 } catch (error) {
  console.log('error: ', error);
  return res.status(500).json({ message: error.message });
 }
});
// http://localhost:8686/categories/1
// method: GET
// 2. Lấy chi tiết 1 categories
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const categories = await CategoryController.getCategoryById(id);
        return res.status(200).json(categories);
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message});
    }
})

// http://localhost:8686/categories
// method: POST
// 3. Thêm mới 1 categories
router.post('/', async (req, res, next) => {
    try {
        const {body} = req;
        await CategoryController.createCategory(body);
        return res.status(200).json({message: 'Thêm mới thành công'});
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message});
    }
})
// http://localhost:8686/categories/1
// method: PUT
// 4. Cập nhật 1 categories
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        const{body} = req;
        await CategoryController.updateCategory(id, body);
        return res.status(200).json({message: 'Cập nhật thành công'});
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: error.message});
    }
})
// http://localhost:8686/categories/1
// method: DELETE
// 5. Xóa 1 categories
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await CategoryController.deleteCategory(id);
        return res.status(200).json({status: true});
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({status: false });
    }
})

module.exports = router;
