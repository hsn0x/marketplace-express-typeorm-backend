import { Market, Product } from "../models/index.js";

Product.belongsTo(Market);

export default Product;
