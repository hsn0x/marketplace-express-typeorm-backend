import { Op } from "sequelize"
import { Product } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, { page, size }) => {
        const { limit, offset } = getPagination(page, size)

        const rows = await Product.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await Product.count()
        const { totalItems, totalPages, currentPage } = getPagingData(
            count,
            page,
            limit
        )
        return {
            totalItems,
            totalPages,
            currentPage,
            count,
            rows,
        }
    },
    findByPkQuery: async (id, scope) => {
        const product = await Product.scope(scope).findByPk(id)
        return product
    },
    findOneQuery: async (filter, scope) => {
        const product = await Product.scope(scope).findOne(filter)
        return product
    },

    create: async (productData) => {
        const createdProduct = await Product.create(productData)
        console.log(createdProduct.id)
        productData.CategoriesIds.map(
            async (ci) => await createdProduct.addCategory(ci)
        )
        return createdProduct
    },

    create: async (productData, where) => {
        await Product.update(productData, { where })
        const updatedProduct = await Product.scope(scope).findOne({
            where,
        })
        updatedProduct.categories.map(
            async (c) => await updatedProduct.removeCategory(c.id)
        )
        productData.CategoriesIds.map(
            async (ci) => await updatedProduct.addCategory(ci)
        )

        return updatedProduct
    },

    remove: async (where) => {
        const deletedProduct = await Product.destroy({
            where,
        })

        return deletedProduct
    },
}
