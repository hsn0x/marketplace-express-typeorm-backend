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
        const record = await Product.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await Product.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const product = await findByPkQuery(data.ProductId)

        const recordCreated = await product.create({
            UserId: data.UserId,
        })
        return recordCreated
    },

    update: async (data, where) => {},

    remove: async (filter) => {
        const recordDeleted = await Vote.destroy(filter)
        return recordDeleted
    },
}
