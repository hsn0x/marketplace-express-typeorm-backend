import { faker } from "@faker-js/faker";

export const createFakeStudents = async (Student) => {
    const fakeStudents = [];
    for (let index = 0; index < 5; index++) {
        fakeStudents.push({
            name: faker.name.firstName(),
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
            favorite_class: faker.name.jobTitle(),
            school_year: faker.datatype.number({ min: 2, max: 20 }),
            subscribed_to_withcode: faker.datatype.boolean(),
        });
    }
    await Student.bulkCreate(fakeStudents);
};
