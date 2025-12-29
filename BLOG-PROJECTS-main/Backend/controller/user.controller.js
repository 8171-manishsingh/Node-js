import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js"
import bcrypt from "bcrypt"
import "dotenv/config"

const userController = {
    Signup: async (req, res) => {
        const { email, username, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword,
                role: "user"
            });

            const tokenPayload = { _id: newUser._id, username, email, role: "user" };
            const userToken = jwt.sign(tokenPayload, process.env.JWT_KEY);

            res.cookie("userToken", userToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            }).status(201).json({
                message: "You have been registered",
                user: { username, email, role: "user" },
            });

        } catch (err) {
            console.log("Signup error:", err);
            res.status(500).json({ message: err.message });
        }
    }
    ,

    Signin: async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body)

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Please sign up first" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const { password: _, ...rest } = user._doc;
            const userToken = jwt.sign(rest, process.env.JWT_KEY);

            res.cookie("userToken", userToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            }).status(200).json({
                message: "Login successful",
                user: rest
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
    ,
    logout: (req, res) => {
        res.clearCookie("userToken").status(200).json({ message: "Logged out successfully" });
    }

}
export default userController


