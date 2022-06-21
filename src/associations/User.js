import { Market, Post, Product, Student, User } from "../models/index.js";

User.hasMany(Market);
User.hasMany(Product);
User.hasOne(Student);
User.hasMany(Post);

export default User;
