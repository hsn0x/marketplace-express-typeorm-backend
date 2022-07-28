import { UserScope } from "../scopes/index.js"

export default {
    findAllUsersQuery: async (filter, scope) => {
        return await UserScope.scope(scope).findAll(filter)
    },
    findByPkQuery: async (id, scope) => {
        return await UserScope.scope(scope).findByPk(id)
    },
    findOneQuery: async (filter, scope) => {
        return await UserScope.scope(scope).findOne(filter)
    },
    createQuery: async (user) => {
        const createdUser = await UserScope.create(user)
        return createdUser
    },
    updateQuery: async (user, filter) => {
        const updatedUser = await UserScope.update(user, filter)
        return updatedUser
    },
    deleteQuery: async (filter) => {
        const deletedUser = await UserScope.destroy(filter)
        return deletedUser
    },
}
