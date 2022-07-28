import { Op } from "sequelize"
import { FavoriteScope } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, { page, size }) => {
        const { limit, offset } = getPagination(page, size)

        const rows = await FavoriteScope.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await FavoriteScope.count()
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
        const record = await FavoriteScope.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await FavoriteScope.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const product = await findByPkQuery(data.FavoriteId)

        const recordCreated = await product.create({
            UserId: data.UserId,
        })
        return recordCreated
    },

    update: async (data, where) => {},

    remove: async (filter) => {
        const recordDeleted = await Favorite.destroy(filter)
        return recordDeleted
    },
}
