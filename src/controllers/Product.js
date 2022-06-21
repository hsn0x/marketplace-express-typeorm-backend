import {
    createProductQuery,
    deleteProductQuery,
    findAllProductsQuery,
    findOneProductQuery,
    updateProductQuery,
} from "../queries/products.js";

const getProducts = async (request, response) => {
    const products = await findAllProductsQuery();
    response.status(200).json(products);
};

const getProductById = (request, response) => {
    const id = parseInt(request.params.id);
    const product = findOneProductQuery({ id });
    response.status(200).json(product);
};

const createProduct = (request, response) => {
    const product = createProductQuery(request.body);
    response.status(201).json({
        message: `Product added with ID: ${product[0]?.id}`,
        data: product,
    });
};

const updateProduct = async (request, response) => {
    const id = parseInt(request.params.id);
    await updateProductQuery(request.body, { id });

    response.status(200).json({ message: `Product modified with ID: ${id}` });
};

const deleteProduct = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteProductQuery({ id });
    response.status(200).json({ message: `Product deleted with ID: ${id}` });
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
