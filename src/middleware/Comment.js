import { commentsQueries } from "../queries/index.js"

export default {
    isOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Comments || !user.Comments.length > 0) {
            return res.status(401).json({
                message: `You dont have any records`,
            })
        }
        const record = await commentsQueries.findByPkQuery(id)
        if (!record) {
            return res.status(404).json({
                message: `Record not found with ID: ${id}`,
            })
        }

        const isOwner = record.User.id == user.id

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the comment`,
            })
        }
    },
}
