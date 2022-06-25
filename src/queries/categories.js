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

const createCategoryQuery = async (categoryData) => {
    const createdCategory = await Category.create(categoryData);
    return createdCategory;
};

const updateCategoryQuery = async (categoryData, where) => {
    const updatedCategory = await Category.update(categoryData, { where });
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
