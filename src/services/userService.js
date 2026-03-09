import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";


const addUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw new ApiError(500, "Database error while registering user", null, err.stack);
    }   
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = user.generateAccessToken();
        return token;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while logging in user", null, err.stack);
    }
};

const getUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new ApiError(404, "User not found");
        }   
        return user;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving user profile", null, err.stack);
    }
};
const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select("-password");
        return updatedUser;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating user", null, err.stack);
    }   

};

const getAllUsers = async () => {
    try {
        const users = await User.find().select("-password");    
        return users;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving users", null, err.stack);
    }   
};

export default {
    addUser,
    loginUser,
    updateUser,
    getUserProfile,
    getAllUsers,
};