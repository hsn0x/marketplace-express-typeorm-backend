import { getPagingData } from "../lib/handlePagination.js";
import {
    createQuery,
    removeQuery,
    findAllProductsQuery,
    findOneProductQuery,
    updateQuery,
    findAllProductsBySearchQuery,
    findAllProductsBySearchQueryWithFilters,
} from "../queries/products.js";
import { validatecreate, validateupdate } from "../validation/Product.js";

const getProducts = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };
    const products = await findAllProductsQuery(params);
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({ message: `Products not found` });
    }
};
const getProductsBySearch = async (req, res) => {
    const query = req.params.query;

    const products = await findAllProductsBySearchQuery({ query });
    if (products) {
        return res.status(200).json({
            message: `Products found with query: ${query}, `,
            length: products.length,
            products,
        });
    } else {
        return res
            .status(404)
            .json({ message: `Product not found with Query: ${query}` });
    }
};
const getProductsBySearchWithFilters = async (req, res) => {
    const query = req.params.query;
    const filters = {};
    filters.minPrice = Number(req.query.minPrice);
    filters.maxPrice = Number(req.query.maxPrice);
    filters.CategoriesIds = req.query.CategoriesIds?.map((ci) => Number(ci));

    const products = await findAllProductsBySearchQueryWithFilters({
        query,
        filters,
    });
    if (products) {
        return res.status(200).json({
            message: `Products found with query: ${query}, `,
            length: products.length,
            products,
        });
    } else {
        return res
            .status(404)
            .json({ message: `Product not found with Query: ${query}` });
    }
};
const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await findOneProductQuery({ id });
    if (product) {
        res.status(200).json({ product });
    } else {
        res.status(404).json({ message: `Product not found with ID: ${id}` });
    }
};
const getProductBySlug = async (req, res) => {
    const slug = req.params.slug;
    const product = await findOneProductQuery({ slug });
    if (product) {
        res.status(200).json({ product });
    } else {
        res.status(404).json({
            message: `Product not found with Slug: ${slug}`,
        });
    }
};
const create = async (req, res, next) => {
    const { session, user } = req;

    const { title, description, price, quantity, MarketId, CategoriesIds } =
        req.body;
    const data = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    };

    const isValid = validatecreate(data);

    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: isValid.errors,
        });
    }

    const createdProduct = await createQuery(data);

    if (createdProduct) {
        return res.status(201).json({
            message: `Product created with ID: ${createdProduct.id}`,
            createdProduct,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a product` });
    }
};
const update = async (req, res) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    const { title, description, price, quantity, MarketId, CategoriesIds } =
        req.body;
    const data = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    };

    const isValid = validateupdate(data);

    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: isValid.errors,
        });
    }

    const updatedProduct = await updateQuery(data, { id });

    if (updatedProduct) {
        return res.status(200).json({
            message: `Product updated with ID: ${updatedProduct.id}`,
            updatedProduct,
        });
    } else {
        return res.status(500).json({ message: `Faile to update a product` });
    }
};
const remove = async (req, res) => {
    const id = parseInt(req.params.id);
    await removeQuery({ id });
    res.status(200).json({ message: `Product deleted with ID: ${id}` });
};

export {
    getProducts,
    getProductById,
    getProductBySlug,
    getProductsBySearch,
    getProductsBySearchWithFilters,
    create,
    update,
    remove,
};
