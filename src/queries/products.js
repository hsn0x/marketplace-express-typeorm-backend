import { faker } from "@faker-js/faker";
import { Market, Product, User } from "../models/index.js";

const findAllProductsQuery = async (include) => {
    const products = await Product.findAll({ include: [...include] });
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
    const { title, description, price, UserId, MarketId, CategoryId } = product;

    const createdProduct = await Product.create({
        title,
        description,
        price,
        UserId,
        MarketId,
        CategoryId,
    });
    await createdProduct.setUser(UserId);
    await createdProduct.setMarket(MarketId);
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
