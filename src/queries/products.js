import { Product } from "../models/index.js";

const findAllProductsQuery = async () => {
    const products = await Product.findAll();
    return products;
};

const findByPkProductQuery = (id) => {
    const product = Product.findByPk(id);
    return product;
};
const findOneProductQuery = (id) => {
    const product = Product.findOne({ where: id });
    return product;
};

const createProductQuery = async (product) => {
    const createdProduct = await Product.create(product);
    return createdProduct;
};

const updateProductQuery = async (id, product) => {
    await Product.update(product, { where: { ...id } });
};

const deleteProductQuery = async (id) => {
    await Product.destroy({
        where: id,
    });
};

export {
    findAllProductsQuery,
    findByPkProductQuery,
    findOneProductQuery,
    createProductQuery,
    updateProductQuery,
    deleteProductQuery,
};
