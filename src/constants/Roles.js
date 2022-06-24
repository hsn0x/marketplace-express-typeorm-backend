export const ROLES = [
    {
        name: "ADMIN",
        description: "",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
    },
    {
        name: "MODERATOR",
        description: "",
        permissions: ["VIEW", "CREATE", "UPDATE"],
    },
    {
        name: "EDITOR",
        description: "",
        permissions: ["VIEW", "CREATE", "UPDATE"],
    },
    { name: "USER", description: "", permissions: ["VIEW"] },
    { name: "GUEST", description: "", permissions: ["VIEW"] },
    { name: "BOT", description: "", permissions: ["VIEW"] },
    { name: "ANONYMOUS", description: "", permissions: ["VIEW"] },
];
