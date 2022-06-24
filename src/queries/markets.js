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
    const createdMarket = await Market.create(market);
    return createdMarket;
};

const updateMarketQuery = async (market, where) => {
    const updatedMarket = await Market.update(market, { where });
    return updatedMarket;
};

const deleteMarketQuery = async (where) => {
    const deletedMarket = await Market.destroy({
        where,
    });
    return deletedMarket;
};

export {
    findAllMarketsQuery,
    findByPkMarketQuery,
    findOneMarketQuery,
    createMarketQuery,
    updateMarketQuery,
    deleteMarketQuery,
};
