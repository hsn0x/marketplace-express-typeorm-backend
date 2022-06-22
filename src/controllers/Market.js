import { Avatar, Image, Product, User } from "../models/index.js";
import {
    createMarketQuery,
    deleteMarketQuery,
    findAllMarketsQuery,
    findOneMarketQuery,
    updateMarketQuery,
} from "../queries/markets.js";

const getMarkets = async (request, response) => {
    const markets = await findAllMarketsQuery([User, Product, Image, Avatar]);
    response.status(200).json(markets);
};

const getMarketById = (request, response) => {
    const id = parseInt(request.params.id);
    const market = findOneMarketQuery({ id });
    response.status(200).json(market);
};

const createMarket = async (request, response) => {
    try {
        const market = await createMarketQuery(request.body);
        response.status(201).json({
            message: `Market added with ID: ${market[0]?.id}`,
            data: market,
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const updateMarket = async (request, response) => {
    const id = parseInt(request.params.id);
    await updateMarketQuery(request.body, { id });

    response.status(200).json({ message: `Market modified with ID: ${id}` });
};

const deleteMarket = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteMarketQuery({ id });
    response.status(200).json({ message: `Market deleted with ID: ${id}` });
};

export { getMarkets, getMarketById, createMarket, updateMarket, deleteMarket };
