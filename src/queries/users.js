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
    const createdUser = await User.create(user);
    return createdUser;
};

const updateUserQuery = async (id, user) => {
    await User.update(user, { where: { ...id } });
};

const deleteUserQuery = async (id) => {
    await User.destroy({
        where: id,
    });
};

export {
    findAllUsersQuery,
    findByPkUserQuery,
    findOneUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
};
