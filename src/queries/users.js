import { User } from "../models/index.js";

const findAllUsersQuery = async () => {
    const users = await User.findAll();
    return users;
};

const findByPkUserQuery = (id) => {
    const user = User.findByPk(id);
    return user;
};
const findOneUserQuery = (id) => {
    const user = User.findOne({ where: id });
    return user;
};

const createUserQuery = async (user) => {
    console.log(user);
    const createdUser = await User.create(user);
    return createdUser;
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
    findOneUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
};
