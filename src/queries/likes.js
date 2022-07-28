import { Op } from "sequelize"
import { LikeScope } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, params) => {
        const { limit, offset } = getPagination(params.page, params.size)

        const rows = await LikeScope.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await LikeScope.count()
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
        const record = await LikeScope.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await LikeScope.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const product = await findByPkQuery(data.LikeId)

        const recordCreated = await product.create({
            UserId: data.UserId,
        })
        return recordCreated
    },

    update: async (data, where) => {},

    remove: async (filter) => {
        const recordDeleted = await LikeScope.destroy(filter)
        return recordDeleted
    },
}
