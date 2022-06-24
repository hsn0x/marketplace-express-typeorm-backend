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
