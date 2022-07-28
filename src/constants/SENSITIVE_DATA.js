export default {
    USER_SENSITIVE_DATA_CONSTANTS: [
        // The following are sensitive data that should not be return to the client.
        // The salt should not return to the client.
        // The hash should not return to the client.
        // The password should not return to the client
        "passwordSalt",
        "passwordHash",
        "password",
    ],
}
