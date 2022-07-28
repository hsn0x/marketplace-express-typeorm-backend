import { User } from "../scopes/index.js"

export default {
    findAllUsersQuery: async (filter, scope) => {
        return await User.scope(scope).findAll(filter)
    },
    findByPkUserQuery: async (id, scope) => {
        return await User.scope(scope).findByPk(id)
    },
    findOneUserQuery: async (filter, scope) => {
        return await User.scope(scope).findOne(filter)
    },
    createUserQuery: async (user) => {
        const createdUser = await User.create(user)

        delete createdUser.dataValues.password
        delete createdUser.dataValues.passwordHash
        delete createdUser.dataValues.passwordSalt

        return createdUser
    },
    updateUserQuery: async (user, filter) => {
        const updatedUser = await User.update(user, filter)
        return updatedUser
    },
    deleteUserQuery: async (filter) => {
        const deletedUser = await User.destroy(filter)
        return deletedUser
    },
}
