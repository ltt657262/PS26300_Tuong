// khai báo các hàm xử lý logic
const ProductModel = require('../product/model');
// lấy danh sách sản phẩm
const getAllProducts = async (page, limit) => {
    try {
        page = page || 1;
        limit = limit || 10;
        const skip = (page - 1) * limit;
        let query = {}
        // lấy sản phẩm có giá lớn hơn 90
        // query.price = {$gte: 90} // geater than equal
        // lấy price nhỏ hơn 30 hoặc lớn hơn 70 và số lượng từ 50 đến 100
        //    query = {
        //     $or: [
        //         {price: {$lt: 30}, },
        //         {price: {$gt: 70}, },
        //     ],
        //     $and: [
        //         {quantity: {$gt: 50}, },
        //         {quantity: {$lt: 100}, },
        //     ]
        //    }
        // lấy sản phẩm có giá là 10 và quantity là 20
        // query = {

        //     quantity: 20,
        // }
        // query = {
        //     ...query, // add query trên đưa vào chạy chung
        //     price:{ $in: [10,20,30] } // lấy giá nằm trong khoản này
        // }
        const product = await ProductModel.find({}).skip(skip).limit(limit).populate('category_id', 'name');
        return product;
    } catch (error) {
        console.log('getAllProducts error: ', error);
        throw new Error('Có lỗi xảy ra khi lấy danh sách Product');
    }
}

// lấy chi tiết sản phẩm theo id
const getProductById = async (id) => {
    try {
        const product = await ProductModel.findById(id);
        return product;
    } catch (error) {
        console.log('getProductById error: ', error);
        throw new Error('Có lỗi xảy ra khi lấy chi tiết theo id');
    }
}

// tìm kiếm sản phẩm theo từ khóa
const searchProduct = async (keyword) => {
    try {
        // 'i' là không phân biệt chữ hoa và chữ thường
        const product = await ProductModel.find({ name: new RegExp(keyword, 'i') });
        return product;
    } catch (error) {
        console.log('searchProduct error: ', error);
        throw new Error('Có lỗi xảy ra khi tìm kiếm sản phẩm');
    }
}

// thêm mới sản phẩm
const createProduct = async (data, created_by, updated_by) => {
    try {
        const { name, price, quantity, detail, image, category_id } = data;
        const product = new ProductModel({
            name,
            price,
            quantity,
            detail,
            image,
            category_id,
            created_by, 
            updated_by
        });
        await product.save();
    } catch (error) {
        console.log('searchProduct error: ', error);
        throw new Error('Có lỗi xảy ra khi thêm product');
    }
}

// cập nhật sản phẩm
const updateProduct = async(id, data) => {
   try {
    const { name, price, quantity, detail, image, category_id } = data;
    const product = await ProductModel.findById(id);
    if(!product) throw new Error('Không tìm thấy product');
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.detail = detail || product.detail;
    product.image = image || product.image;
    product.category_id = category_id || product.category_id;
    await product.save();
   } catch (error) {
    console.log('searchProduct error: ', error);
        throw new Error('Có lỗi xảy ra khi cập nhật product');
   }
}

// xóa sản phẩm
const deleteProduct = async(id) => {
    try {
        await ProductModel.findByIdAndDelete(id);
   } catch (error) {
       console.log('deleteCategory error: ', error);
       throw new Error('Có lỗi xảy ra khi delete Cate');
   }
  
}


module.exports = {
    getAllProducts,
    getProductById,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct
}