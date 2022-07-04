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

const createProductQuery = async (productData) => {
    console.log(productData);
    const createdProduct = await Product.create(productData);
    console.log(createdProduct.id);
    productData.CategoriesIds.map(
        async (ci) => await createdProduct.addCategory(ci)
    );
    return createdProduct;
};

const updateProductQuery = async (product, where) => {
    const updatedProduct = await Product.update(product, { where });

    return updatedProduct;
};

const deleteProductQuery = async (where) => {
    const deletedProduct = await Product.destroy({
        where,
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
