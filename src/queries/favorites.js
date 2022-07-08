import { Op } from "sequelize";
import { Favorite, Product } from "../scopes/index.js";
import { findByPkProductQuery } from "./products.js";

const findAllFavoritesQuery = async () => {
    const favorites = await Favorite.scope("withAssociations").findAll();
    return favorites;
};
const findAllFavoritesBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.favorite]: `%${q}%` } }));

    const favorite = await Favorite.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return favorite;
};
const findByPkFavoriteQuery = async (id) => {
    const favorite = await Favorite.scope("withAssociations").findByPk(id);
    return favorite;
};
const findOneFavoriteQuery = async (where) => {
    const favorite = await Favorite.scope("withAssociations").findOne({
        where,
    });
    return favorite;
};

const createFavoriteQuery = async (favoriteData) => {
    const product = await findByPkProductQuery(favoriteData.ProductId);

    const createdFavorite = await product.createFavorite({
        UserId: favoriteData.UserId,
    });
    return createdFavorite;
};

const updateFavoriteQuery = async (favoriteData, where) => {};

const deleteFavoriteQuery = async (where) => {
    const deletedFavorite = await Favorite.destroy({
        where,
    });
    return deletedFavorite;
};

export {
    findAllFavoritesQuery,
    findAllFavoritesBySearchQuery,
    findByPkFavoriteQuery,
    findOneFavoriteQuery,
    createFavoriteQuery,
    updateFavoriteQuery,
    deleteFavoriteQuery,
};
