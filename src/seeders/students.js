import { faker } from "@faker-js/faker";
import { Student } from "../models/index.js";

export const createFakeStudents = async (record) => {
    const fakeStudents = [];
    for (let index = 0; index < record; index++) {
        fakeStudents.push({
            name: faker.name.firstName(),
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
            favorite_class: faker.name.jobTitle(),
            school_year: faker.datatype.number({ min: 2, max: 20 }),
            subscribed_to_withcode: faker.datatype.boolean(),
        });
    }
    const students = await Student.bulkCreate(fakeStudents);
};
