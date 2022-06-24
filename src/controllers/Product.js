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
    if (products) {
        response.status(200).json(products);
    } else {
        response.status(404).json({ message: `Products not found` });
    }
};

const getProductById = async (request, response) => {
    const id = parseInt(request.params.id);
    const product = await findOneProductQuery({ id });
    if (product) {
        response.status(200).json(product);
    } else {
        response
            .status(404)
            .json({ message: `Product not found with ID: ${id}` });
    }
};

const createProduct = async (request, response) => {
    try {
        const product = await createProductQuery(request.body);

        if (product) {
            response.status(201).json({
                message: `Product added with ID: ${product[0]?.id}`,
                data: product,
            });
        } else {
            response.status(500).json({ message: `Product not created` });
        }
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
