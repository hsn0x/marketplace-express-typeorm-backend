export const findAllStudents = async (User) => {
    const users = JSON.stringify(
        await User.findAll({
            attributes: ["firstname", "lastname", "email", "password"],
        })
    );
    console.log("---------------");
    console.log(JSON.parse(users));
};
