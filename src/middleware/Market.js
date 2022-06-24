import { findOneMarketQuery } from "../queries/markets.js";

const isMarketUsernameTaken = async (req, res, next) => {
    const { username } = req.body;
    const isMarketUsernameTaken = await findOneMarketQuery({ username });
    if (isMarketUsernameTaken) {
        return res.status(401).json({
            message: `Username ${username} is already taken`,
        });
    } else {
        return next();
    }
};

const isMarketOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;
    const isMarketOwner = user.Markets.find((market) => market.id === id);
    console.log({ id, marketId: user.Markets[0].id });
    if (isMarketOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not authorized to perform this action`,
        });
    }
};

export { isMarketUsernameTaken, isMarketOwner };
