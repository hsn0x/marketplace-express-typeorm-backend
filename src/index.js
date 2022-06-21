import sequelize from "./db/connection.js";
import { Market, Product, Student, User, Category } from "./models/index.js";
import { createFakeStudents } from "./seed/students.js";
import { createFakeUsers } from "./seed/users.js";
import "./associations/index.js";

(async () => {
    await sequelize.sync({ force: true });
    // await createFakeUsers(User);
    // await createFakeStudents(Student);
    // Code here
})();
