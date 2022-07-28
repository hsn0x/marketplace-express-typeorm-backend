import { getPagingData } from "../lib/handlePagination.js"
import { productsQueries } from "../queries/index.js"
import { validatecreate, validateupdate } from "../validation/Product.js"

const getAll = async (req, res) => {
    const { page, size } = req.query
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    }
    const products = await productsQueries.findAllQuery(params)
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404).json({ message: `Products not found` })
    }
}
const getAllBySearch = async (req, res) => {
    const query = req.params.query
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ title: { [Op.like]: `%${q}%` } }))
    const products = await productsQueries.findAllQuery({
        where: {
            [Op.or]: [...queries],
        },
    })
    if (products) {
        return res.status(200).json({
            message: `Products found with query: ${query}, `,
            length: products.length,
            products,
        })
    } else {
        return res
            .status(404)
            .json({ message: `Product not found with Query: ${query}` })
    }
}
const getAllByFilters = async (req, res) => {
    const query = req.params.query
    const filters = {}
    filters.minPrice = Number(req.query.minPrice)
    filters.maxPrice = Number(req.query.maxPrice)
    filters.CategoriesIds = req.query.CategoriesIds?.map((ci) => Number(ci))

    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ title: { [Op.like]: `%${q}%` } }))

    console.log(query, filters)
    const queryFilter = {
        [Op.or]: [...queries],
    }
    const priceFilter = {
        [Op.and]: [],
    }
    if (filters.minPrice) {
        priceFilter[Op.and].push({ price: { [Op.gte]: filters.minPrice } })
    }
    if (filters.maxPrice) {
        priceFilter[Op.and].push({ price: { [Op.lte]: filters.maxPrice } })
    }

    const categoryFilter = []
    if (filters.CategoriesIds) {
        categoryFilter.push({
            model: Category,
            where: {
                id: filters.CategoriesIds,
            },
        })
    }

    const products = await productsQueries.findAll({
        where: {
            [Op.and]: [{ ...queryFilter }, { ...priceFilter }],
        },
        include: [...categoryFilter],
    })
    if (products) {
        return res.status(200).json({
            message: `Products found with query: ${query}, `,
            length: products.length,
            products,
        })
    } else {
        return res
            .status(404)
            .json({ message: `Product not found with Query: ${query}` })
    }
}
const getById = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productsQueries.findOneQuery({ id })
    if (product) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ message: `Product not found with ID: ${id}` })
    }
}
const getBySlug = async (req, res) => {
    const slug = req.params.slug
    const product = await productsQueries.findOneQuery({ slug })
    if (product) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({
            message: `Product not found with Slug: ${slug}`,
        })
    }
}
const create = async (req, res, next) => {
    const { session, user } = req

    const { title, description, price, quantity, MarketId, CategoriesIds } =
        req.body
    const data = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    }

    const isValid = validatecreate(data)

    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: isValid.errors,
        })
    }

    const createdProduct = await productsQueries.create(data)

    if (createdProduct) {
        return res.status(201).json({
            message: `Product created with ID: ${createdProduct.id}`,
            createdProduct,
        })
    } else {
        return res.status(500).json({ message: `Faile to create a product` })
    }
}
const update = async (req, res) => {
    const id = parseInt(req.params.id)
    const { session, user } = req

    const { title, description, price, quantity, MarketId, CategoriesIds } =
        req.body
    const data = {
        title,
        description,
        price,
        quantity,
        MarketId,
        CategoriesIds,
        UserId: user.id,
    }

    const isValid = validateupdate(data)

    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: isValid.errors,
        })
    }

    const updatedProduct = await productsQueries.update(data, { id })

    if (updatedProduct) {
        return res.status(200).json({
            message: `Product updated with ID: ${updatedProduct.id}`,
            updatedProduct,
        })
    } else {
        return res.status(500).json({ message: `Faile to update a product` })
    }
}
const remove = async (req, res) => {
    const id = parseInt(req.params.id)
    await productsQueries.remove({ id })
    res.status(200).json({ message: `Product deleted with ID: ${id}` })
}

export {
    getAll,
    getById,
    getBySlug,
    getAllBySearch,
    getAllByFilters,
    create,
    update,
    remove,
}
