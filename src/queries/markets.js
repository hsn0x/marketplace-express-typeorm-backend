import { Market } from "../models/index.js";

const findAllMarketsQuery = async (include) => {
    const markets = await Market.findAll({ include: [...include] });
    return markets;
};

const findByPkMarketQuery = (id) => {
    const market = Market.findByPk(id);
    return market;
};
const findOneMarketQuery = (id) => {
    const market = Market.findOne({ where: id });
    return market;
};

const createMarketQuery = async (market) => {
    const { title, description, price, UserId, MarketId, CategoryId } = market;

    const createdMarket = await Market.create({
        title,
        description,
        price,
        UserId,
        MarketId,
        CategoryId,
    });
    await createdMarket.setUser(UserId);
    await createdMarket.setMarket(MarketId);
    return createdMarket;
};

const updateMarketQuery = async (id, market) => {
    await Market.update(market, { where: { ...id } });
};

const deleteMarketQuery = async (id) => {
    await Market.destroy({
        where: id,
    });
};

export {
    findAllMarketsQuery,
    findByPkMarketQuery,
    findOneMarketQuery,
    createMarketQuery,
    updateMarketQuery,
    deleteMarketQuery,
};
