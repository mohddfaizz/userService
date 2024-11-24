const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Kindly login! ");
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

const userAuthStatus = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token");
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("user is invalid")
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ isValid: false });
    }
};

module.exports = {
    userAuth,
    userAuthStatus
};