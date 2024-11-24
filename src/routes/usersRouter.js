const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateUsers } = require("../utils/validation");

userRouter.get("/users", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const selectedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
            status: user.status
        };
        res.send(selectedUser);

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.patch("/users", userAuth, async (req, res) => {
    try {
        if (!validateUsers(req)) {
            throw new Error("Invalid Edit Request");
        }

        const users = req.user;

        Object.keys(req.body).forEach((key) => (users[key] = req.body[key]));

        await users.save();

        res.json({
            message: `User is updated successfully`,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


module.exports = userRouter;