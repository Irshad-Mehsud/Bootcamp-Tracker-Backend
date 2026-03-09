import { ApiError } from "../utils/ApiError.js";
import userService from "../services/userService.js";
import { createUserSchema } from "../validations/userValidation.js";

const addUserController = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const userData = req.body;
    const newUser = await userService.addUser(userData);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to register user", null, err.stack),
    );
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { token },
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to login user", null, err.stack),
    );
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(userId, updateData);
    if (!updatedUser) {
      throw new ApiError(404, "User not found for update");
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update user", null, err.stack),
    );
  }
};

const getUserProfileController = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    const userProfile = await userService.getUserProfile(userId);
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: userProfile,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve user profile", null, err.stack),
    );
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve users", null, err.stack),
    );
  }
};

export default {
  addUserController,
  loginUserController,
  getUserProfileController,
  getAllUsersController,
  updateUserController,
};
