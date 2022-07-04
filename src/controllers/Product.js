import { User, Market, Image } from "../models/index.js";
import {
    createProductQuery,
    deleteProductQuery,
    findAllProductsQuery,
    findOneProductQuery,
    updateProductQuery,
} from "../queries/products.js";
import {
    validateCreateProduct,
    validateUpdateProduct,
} from "../validation/Product.js";

const getProducts = async (request, response) => {
    const products = await findAllProductsQuery([User, Market, Image]);
    if (products) {
        response.status(200).json({ products });
    } else {
        response.status(404).json({ message: `Products not found` });
    }
};

const getProductById = async (request, response) => {
    const id = parseInt(request.params.id);
    const product = await findOneProductQuery({ id });
    if (product) {
        response.status(200).json({ product });
    } else {
        response
            .status(404)
            .json({ message: `Product not found with ID: ${id}` });
    }
};

const getProductBySlug = async (request, response) => {
    const slug = request.params.slug;
    const product = await findOneProductQuery({ slug });
    if (product) {
        response.status(200).json({ product });
    } else {
        response
            .status(404)
            .json({ message: `Product not found with Slug: ${slug}` });
    }
};

const createProduct = async (request, response, next) => {
    const { session, user } = request;
    const { title, description, price, quantity, MarketId, CategoriesIds } =
        request.body;

    const productData = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    };

    const isProductValid = validateCreateProduct(productData);

    if (!isProductValid.valid) {
        return response.status(400).json({
            message: "Invalid product data",
            errors: isProductValid.errors,
        });
    }

    const createdProduct = await createProductQuery(productData);

    if (createdProduct) {
        return response.status(201).json({
            message: `Product created with ID: ${createdProduct.id}`,
            createdProduct,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a product` });
    }
};

const updateProduct = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { title, description, price, quantity, MarketId, CategoriesIds } =
        request.body;
    const productData = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    };

    const isProductValid = validateUpdateProduct(productData);

    if (!isProductValid.valid) {
        return response.status(400).json({
            message: "Invalid product data",
            errors: isProductValid.errors,
        });
    }

    const updatedProduct = await updateProductQuery(productData, { id });

    if (updatedProduct) {
        return response.status(200).json({
            message: `Product updated with ID: ${updatedProduct.id}`,
            updatedProduct,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to update a product` });
    }
};

const deleteProduct = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteProductQuery({ id });
    response.status(200).json({ message: `Product deleted with ID: ${id}` });
};

export {
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
};
