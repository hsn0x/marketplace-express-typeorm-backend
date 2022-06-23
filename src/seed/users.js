import { faker } from "@faker-js/faker";
import { User } from "../models/index.js";
import { cloudinary } from "../db/cloudinary.js";
import { findAllUsersQuery } from "../queries/users.js";
import { genPassword } from "../lib/passwordUtils.js";

export const createFakeUsers = async () => {
    const fakeUsers = [];
    for (let index = 0; index < 5; index++) {
        const hashedPassword = genPassword(faker.internet.password());
        const passwordHash = hashedPassword.hash;
        const passwordSalt = hashedPassword.salt;

        fakeUsers.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            passwordHash,
            passwordSalt,
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
        });
    }

    await User.bulkCreate(fakeUsers);
    const hashedPassword = genPassword("123qwe");
    const passwordHash = hashedPassword.hash;
    const passwordSalt = hashedPassword.salt;
    await User.create({
        firstName: "Amine",
        lastName: "Jamal",
        username: "amine123",
        email: "amine@me.com",
        passwordHash,
        passwordSalt,
        age: "18",
        gender: "male",
    });

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
