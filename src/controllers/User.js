import { genPassword, passwordMatch } from "../lib/passwordUtils.js"
import {
    Market,
    Product,
    Image,
    Avatar,
    Role,
    Student,
} from "../models/index.js"
import { usersQueries } from "../queries/index.js"
import {
    validateCreateUser,
    validateUpdateUserEmail,
    validateUpdateUserPassword,
    validateUpdateUser,
} from "../validation/User.js"

export default {
    getAll: async (req, res) => {
        const users = await usersQueries.findAllUsersQuery(true)
        if (users) {
            res.status(200).json({ users })
        } else {
            res.status(500).json({ message: `Faile to get users` })
        }
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id)
        const user = await usersQueries.findOneQuery({ where: { id } })
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({ message: `User not found with ID: ${id}` })
        }
    },

    getByUsername: async (req, res) => {
        const username = req.params.username
        const user = await usersQueries.findOneQuery({ where: { username } })
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({
                message: `User not found with ID: ${username}`,
            })
        }
    },

    getByEmail: async (req, res) => {
        const email = parseInt(req.params.email)
        const user = await usersQueries.findOneQuery({ where: { email } })
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({
                message: `User not found with email: ${email}`,
            })
        }
    },

    create: async (req, res, next) => {
        const {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            age,
            gender,
        } = req.body

        const userData = {
            firstName,
            lastName,
            username,
            description,
            email,
            password,
            gender,
        }
        userData.age = Number(age)

        const hashedPassword = genPassword(userData.password)
        userData.passwordHash = hashedPassword.hash
        userData.passwordSalt = hashedPassword.salt

        const isUserValid = validateCreateUser(userData)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const user = await usersQueries.createQuery(userData)

        if (user) {
            res.status(201).json({
                message: `User created with ID: ${user.id}`,
                user,
            })
        } else {
            res.status(500).json({
                message: `Faile to create a user`,
            })
        }
    },

    update: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const { firstName, lastName, username, email, password, age, gender } =
            req.body
        const userData = {
            firstName,
            lastName,
            username,
            age,
            gender,
        }

        userData.age = Number(userData.age)

        const isUserValid = validateUpdateUser(userData)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const updatedUser = await usersQueries.updateQuery(userData, { id })
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },

    updateEmail: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        const { email } = req.body
        const userData = {
            email,
        }

        const isUserValid = validateUpdateUserEmail(userData)

        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }
        const updatedUser = await usersQueries.updateQuery(userData, { id })
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },

    updatePassword: async (req, res) => {
        const id = parseInt(req.params.id)
        const { session, user } = req
        if (user.id !== id) {
            return res.status(401).json({
                message: `You are not authorized to update this user`,
            })
        }

        const currentUser = await usersQueries.findOneQuery({ where: { id } })
        if (!currentUser) {
            return res.status(404).json({
                message: `User not found with ID: ${id}`,
            })
        }

        const { password, newPassword } = req.body
        const userData = {
            password,
            newPassword,
        }

        /**
         * Check if the current password is valid
         */
        let isUserValid = validateUpdateUserPassword({
            ...userData,
            passwordHash: currentUser.passwordHash,
            passwordSalt: currentUser.passwordSalt,
        })
        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        const newHashedPassword = genPassword(userData.newPassword)
        userData.passwordHash = newHashedPassword.hash
        userData.passwordSalt = newHashedPassword.salt

        /**
         * Check if the current password is valid
         */
        isUserValid = validateUpdateUserPassword(userData)
        if (!isUserValid.valid) {
            return res.status(401).json({
                valid: isUserValid.valid,
                errors: isUserValid.errors,
            })
        }

        /**
         * Check if the password is correct
         */

        const isPasswordMatch = passwordMatch(
            userData.password,
            currentUser.passwordHash,
            currentUser.passwordSalt
        )
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: `Password is incorrect`,
            })
        }

        userData.password = userData.newPassword
        const updatedUser = await usersQueries.updateQuery(userData, { id })
        if (updatedUser) {
            res.status(200).json({
                message: `User updated with ID: ${user.id}`,
                data: updatedUser,
            })
        } else {
            res.status(500).json({
                message: `Faile to update a user, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = parseInt(req.params.id)
        await usersQueries.deleteQuery({ id })
        res.status(200).json({ message: `User deleted with ID: ${id}` })
    },
}
