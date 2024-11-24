const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Enter a valid name");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid Email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validateUsers = (req) => {
    const editList = [
        "firstName",
        "lastName",
        "emailId",
        "age",
    ];

    let isValidRequest = Object.keys(req.body).every((obj) =>
        editList.includes(obj)
    );
    if (Object.keys(req.body).length === 0) {
        isValidRequest = false;
    }
    return isValidRequest;
}

module.exports = { validateSignUpData, validateUsers };