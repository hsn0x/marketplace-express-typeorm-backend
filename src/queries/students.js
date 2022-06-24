export const findAllStudents = async (Student) => {
    const students = await Student.findAll({
        attributes: ["name"],
        where: {
            [Op.or]: {
                favorite_class: "Principal Intranet Executive",
                subscribed_to_withcode: true,
            },
        },
    });

    students.forEach((student) => console.log(student));
};
