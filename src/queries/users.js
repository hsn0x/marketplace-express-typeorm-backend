import { User } from "../models/index.js";

const findAllUsersQuery = async (include) => {
    const users = await User.findAll({ include: [...include] });
    return users;
};

const findByPkUserQuery = async (id) => {
    const user = await User.findByPk(id);
    return user;
};
const findOneUserByIdQuery = async (id) => {
    const user = await User.findOne({ where: id });
    return user;
};
const findOneUserByEmailQuery = async (where) => {
    const user = await User.findOne({ where });
    return user;
};

const createUserQuery = async (user) => {
    const createdUser = await User.create(user);
    return await createdUser.toJSON();
};

const updateUserQuery = async (user, where) => {
    const updatedUser = await User.update(user, { where });
    return updatedUser;
};

const deleteUserQuery = async (where) => {
    const deletedUser = await User.destroy({
        where,
    });
    return deletedUser;
};

export {
    findAllUsersQuery,
    findByPkUserQuery,
    findOneUserByIdQuery,
    findOneUserByEmailQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
};
