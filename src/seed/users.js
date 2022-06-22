import { faker } from "@faker-js/faker";
import { User } from "../models/index.js";
import { cloudinary } from "../db/cloudinary.js";
import { findAllUsersQuery } from "../queries/users.js";

export const createFakeUsers = async () => {
    const fakeUsers = [];
    for (let index = 0; index < 5; index++) {
        fakeUsers.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
            isAdmin: faker.datatype.boolean(),
        });
    }

    await User.bulkCreate(fakeUsers);

    const users = await findAllUsersQuery([]);
    for (let index = 0; index < 5; index++) {
        const market = users[index];
        await market.createImage({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(),
        });
    }
    for (let index = 0; index < 5; index++) {
        const market = users[index];
        await market.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(),
        });
    }
};
