import { Market } from "../scopes/index.js";

const findAllMarketsQuery = async () => {
    const markets = await Market.scope("withAssociations").findAll();
    return markets;
};

const findByPkMarketQuery = async (id) => {
    const market = await Market.scope("withAssociations").findByPk(id);
    return market;
};
const findOneMarketQuery = async (where) => {
    const market = await Market.scope("withAssociations").findOne({ where });
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
