import { Op } from "sequelize"
import { ReviewScope } from "../scopes/index.js"
import { Category } from "../models/index.js"
import { getPagination, getPagingData } from "../lib/handlePagination.js"

export default {
    findAllQuery: async (filter, scope, params) => {
        const { limit, offset } = getPagination(params.page, params.size)

        const rows = await ReviewScope.scope(scope).findAll({
            limit,
            offset,
            filter,
        })
        const count = await ReviewScope.count()
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
        const record = await ReviewScope.scope(scope).findByPk(id)
        return record
    },
    findOneQuery: async (filter, scope) => {
        const record = await ReviewScope.scope(scope).findOne(filter)
        return record
    },

    create: async (data) => {
        const recordCreated = await ReviewScope.create(data)
        console.log(recordCreated.id)
        data.CategoriesIds.map(
            async (ci) => await recordCreated.addCategory(ci)
        )
        return recordCreated
    },

    create: async (data, where) => {
        await ReviewScope.update(data, { where })
        const recordUpdated = await ReviewScope.scope(scope).findOne(filter)
        recordUpdated.categories.map(
            async (c) => await recordUpdated.removeCategory(c.id)
        )
        data.CategoriesIds.map(
            async (ci) => await recordUpdated.addCategory(ci)
        )

        return recordUpdated
    },

    remove: async (filter, scope) => {
        const recordDeleted = await ReviewScope.destroy(filter)

        return recordDeleted
    },
}
