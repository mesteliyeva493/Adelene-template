const UserModel = require("../Model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "Bu email artıq istifadə olunur" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new UserModel({ username, email, password: hashedPassword, role });
            await newUser.save();
            res.status(201).json({ message: "Uğurla qeydiyyatdan keçdiniz" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
                res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } });
            } else {
                res.status(401).json({ message: "Email və ya şifrə yanlışdır" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getMe: async (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (err) {
            res.status(500).json({ message: "Xəta" });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find().select("-password");
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: "İstifadəçiləri gətirərkən xəta oldu" });
        }
    }
};

module.exports = userController;