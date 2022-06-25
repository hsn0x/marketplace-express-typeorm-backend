import { Product } from "../scopes/index.js";

const findAllProductsQuery = async () => {
    const products = await Product.scope("withAssociations").findAll();
    return products;
};

const findByPkProductQuery = async (id) => {
    const product = await Product.scope("withAssociations").findByPk(id);
    return product;
};
const findOneProductQuery = async (where) => {
    const product = await Product.scope("withAssociations").findOne({ where });
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
    return createdProduct;
};

const updateProductQuery = async (product, where) => {
    const updatedProduct = await Product.update(product, { where });

    return updatedProduct;
};

const deleteProductQuery = async (id) => {
    const deletedProduct = await Product.destroy({
        where: id,
    });

    return deletedProduct;
};

export {
    findAllProductsQuery,
    findByPkProductQuery,
    findOneProductQuery,
    createProductQuery,
    updateProductQuery,
    deleteProductQuery,
};
