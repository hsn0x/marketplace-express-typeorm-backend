import { marketsQueries } from "../queries/index.js"

export default {
    isUsernameTaken: async (req, res, next) => {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ message: "Username is required" })
        }

        const isUsernameTaken = await marketsQueries.findOneQuery({
            where: { username },
        })
        if (isUsernameTaken) {
            return res.status(401).json({
                message: `Username ${username} is already taken`,
            })
        } else {
            return next()
        }
    },

    isOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Markets || !user.Markets.length > 0) {
            return res.status(401).json({
                message: `You dont have any markets`,
            })
        }

        const isOwner = user.Markets.find((market) => market.id === id)

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the market`,
            })
        }
    },
}
