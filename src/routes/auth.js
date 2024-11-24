const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { userAuth, userAuthStatus } = require("../middlewares/auth");

authRouter.post("/auth/register", async (req, res) => {
    try {

        validateSignUpData(req);

        const { firstName, lastName, emailId, password, gender, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            gender,
            role
        });

        await user.save();

        res.json({ message: "User Added successfully!" });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/auth/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send({ message: "User is logged in successfully" });
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/auth/logout", userAuth, async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout is successfull!!");
});

authRouter.get("/auth/validateToken", userAuthStatus, async (req, res) => {
    const { firstName, lastName, emailId, role } = req.user;
    res.status(200).json({ isValid: true, firstName, lastName, emailId, role });
})

module.exports = authRouter;