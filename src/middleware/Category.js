import { findOneCategoryQuery } from "../queries/categories.js";

const isCategoryExist = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const category = await findOneCategoryQuery({ id });
    if (category) {
        return next();
    } else {
        return res.status(404).json({
            message: `Category not found with ID: ${id}`,
        });
    }
};

export { isCategoryExist };
