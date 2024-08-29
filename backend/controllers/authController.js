import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Register a user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Login a user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password',
            });
        }

        // Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            });
        }

        // If everything is ok, send token to client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
