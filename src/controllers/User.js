import { genPassword } from "../lib/passwordUtils.js";
import { Market, Product, Image, Avatar } from "../models/index.js";
import {
    createUserQuery,
    deleteUserQuery,
    findAllUsersQuery,
    findOneUserByIdQuery,
    updateUserQuery,
} from "../queries/users.js";
import { validateUser } from "../validation/User.js";

const getUsers = async (request, response) => {
    const users = await findAllUsersQuery([Market, Product, Image, Avatar]);
    response.status(200).json(users);
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    const user = findOneUserByIdQuery({ id });
    response.status(200).json(user);
};

const getUserByEmail = (request, response) => {
    const email = parseInt(request.params.email);
    const user = findOneUserByIdQuery({ email });
    response.status(200).json(user);
};

const createUser = async (request, response, next) => {
    const { firstName, lastName, username, email, password, age, gender } =
        request.body;
    const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        age,
        gender,
    };
    userData.age = Number(userData.age);

    const hashedPassword = genPassword(userData.password);
    userData.passwordHash = hashedPassword.hash;
    userData.passwordSalt = hashedPassword.salt;

    const isUserValid = validateUser(userData);

    if (!isUserValid.valid) {
        return response.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }
    const user = await createUserQuery(userData);
    if (user) {
        response.status(201).json({
            message: `User added with ID: ${user?.id}`,
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

export {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
