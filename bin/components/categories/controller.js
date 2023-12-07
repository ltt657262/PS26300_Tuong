// controller dùng để tương tác với db
const CategoryModel = require('../categories/model');

// lấy danh sách danh mục
const getAllCategories = async () => {
   
   try {
        // select *from categories
        const categories = await CategoryModel.find({});
        // select name from categories
        // const categories = await CategoryModel.finf({}, 'name')
        // const categories = await CategoryModel.find({description: /Tan/}, 'name description');

        return categories;
   } catch (error) {
    console.log('getAllCate error: ', error);
    throw new Error('Có lỗi xảy ra khi lấy danh sách Cate');
   }
   
}

// lấy chi tiết danh mục
const getCategoryById = async (id) => {
    
    try {
        const categories = await CategoryModel.findById(id);
        return categories;
    } catch (error) {
           console.log('getCategoryById error: ', error);
    throw new Error('Có lỗi xảy ra khi lấy danh mục Cate');
    }
}

// thêm mới danh mục
const createCategory = async(data) => {
    try {
        const {name, description} = data;
        const category = new CategoryModel({name, description});
        await category.save();
    } catch (error) {
        console.log('createCategory error: ', error);
        throw new Error('Có lỗi xảy ra khi thêm mới Cate');
    }
}

// cập nhật danh mục
const updateCategory = async(id, data) => {
   try {
    const{name, description} = data;
    const categories = await  CategoryModel.findById(id);
    await categories.updateOne(data)
   } catch (error) {
    console.log('createCategory error: ', error);
        throw new Error('Có lỗi xảy ra khi cập nhật Cate');
   }
}

// xóa danh mục
const deleteCategory =  async (id) => {
    try {
         await CategoryModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('deleteCategory error: ', error);
        throw new Error('Có lỗi xảy ra khi delete Cate');
    }
   
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}