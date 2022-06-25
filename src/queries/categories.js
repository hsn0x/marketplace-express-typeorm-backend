import { Category } from "../scopes/index.js";

const findAllCategoriesQuery = async () => {
    const categories = await Category.scope("withAssociations").findAll();
    return categories;
};

const findByPkCategoryQuery = async (id) => {
    const category = await Category.scope("withAssociations").findByPk(id);
    return category;
};
const findOneCategoryQuery = async (where) => {
    const category = await Category.scope("withAssociations").findOne({
        where,
    });
    return category;
};

const createCategoryQuery = async (category) => {
    const { title, description, price, UserId, MarketId, CategoryId } =
        category;

    const createdCategory = await Category.create({
        title,
        description,
        price,
        UserId,
        MarketId,
        CategoryId,
    });
    return createdCategory;
};

const updateCategoryQuery = async (category, where) => {
    const updatedCategory = await Category.update(category, { where });

    return updatedCategory;
};

const deleteCategoryQuery = async (id) => {
    const deletedCategory = await Category.destroy({
        where: id,
    });

    return deletedCategory;
};

export {
    findAllCategoriesQuery,
    findByPkCategoryQuery,
    findOneCategoryQuery,
    createCategoryQuery,
    updateCategoryQuery,
    deleteCategoryQuery,
};
