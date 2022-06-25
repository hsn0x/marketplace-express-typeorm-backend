import {
    createMarketQuery,
    deleteMarketQuery,
    findAllMarketsQuery,
    findOneMarketQuery,
    updateMarketQuery,
} from "../queries/markets.js";
import {
    validateCreateMarket,
    validateUpdateMarket,
} from "../validation/Market.js";

const getMarkets = async (request, response) => {
    const markets = await findAllMarketsQuery();
    if (markets) {
        response.status(200).json({
            message: `Markets found`,
            data: markets,
        });
    } else {
        response.status(404).json({ message: "No markets found" });
    }
};

const getMarketById = async (request, response) => {
    const id = parseInt(request.params.id);
    const market = await findOneMarketQuery({ id });
    if (market) {
        response.status(200).json({
            message: `Market found with ID: ${id}`,
            data: market,
        });
    } else {
        response.status(404).json({
            message: `Market not found with ID: ${id}`,
        });
    }
};

const createMarket = async (request, response) => {
    const { session, user } = request;

    const { name, username, about, title } = request.body;
    const marketData = {
        name,
        username,
        about,
        title,
        UserId: user.id,
    };

    const isMarketValid = validateCreateMarket(marketData);

    if (!isMarketValid.valid) {
        return response
            .status(400)
            .json({
                message: "Invalid market data",
                errors: isMarketValid.errors,
            });
    }

    const createdMarket = await createMarketQuery(marketData);

    if (createdMarket) {
        return response.status(201).json({
            message: `Market added with ID: ${createdMarket.id}`,
            data: createdMarket,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a market` });
    }
};

const updateMarket = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, username, about, title } = request.body;

    const marketData = {
        name,
        username,
        about,
        title,
    };

    const isMarketValid = validateUpdateMarket(marketData);

    if (!isMarketValid) {
        response.status(400).json({ message: "Market not updated" });
    }

    const updatedMarket = await updateMarketQuery(marketData, { id });

    if (updatedMarket) {
        response.status(200).json({
            message: `Market updated with ID: ${updatedMarket[0]?.id}`,
            data: updatedMarket,
        });
    } else {
        response.status(500).json({
            message: `Faile to update a market, ${id}`,
        });
    }
};

const deleteMarket = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteMarketQuery({ id });
    response.status(200).json({ message: `Market deleted with ID: ${id}` });
};

export { getMarkets, getMarketById, createMarket, updateMarket, deleteMarket };
