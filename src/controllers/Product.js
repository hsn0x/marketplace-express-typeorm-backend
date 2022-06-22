import { User, Market, Image } from "../models/index.js";
import {
    createProductQuery,
    deleteProductQuery,
    findAllProductsQuery,
    findOneProductQuery,
    updateProductQuery,
} from "../queries/products.js";

const getProducts = async (request, response) => {
    const products = await findAllProductsQuery([User, Market, Image]);
    response.status(200).json(products);
};

const getProductById = (request, response) => {
    const id = parseInt(request.params.id);
    const product = findOneProductQuery({ id });
    response.status(200).json(product);
};

const createProduct = async (request, response) => {
    try {
        const product = await createProductQuery(request.body);
        response.status(201).json({
            message: `Product added with ID: ${product[0]?.id}`,
            data: product,
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
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
