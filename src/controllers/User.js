import {
    createUserQuery,
    deleteUserQuery,
    findAllUsersQuery,
    findOneUserQuery,
    updateUserQuery,
} from "../queries/users.js";

const getUsers = async (request, response) => {
    const users = await findAllUsersQuery();
    response.status(200).json(users);
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    const user = findOneUserQuery({ id });
    response.status(200).json(user);
};

const createUser = (request, response) => {
    const user = createUserQuery(request.body);
    if (user) {
        response.status(201).json({
            message: `User added with ID: ${user[0]?.id}`,
            data: user,
        });
    } else {
        response.status(500).json({
            message: `Faile to create a user`,
        });
    }
};

const updateUser = async (request, response) => {
    const id = parseInt(request.params.id);
    await updateUserQuery(request.body, { id });
    response.status(200).json({ message: `User modified with ID: ${id}` });
};

const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteUserQuery({ id });
    response.status(200).json({ message: `User deleted with ID: ${id}` });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
