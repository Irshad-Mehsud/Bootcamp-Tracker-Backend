import { ApiError } from "../utils/ApiError.js";
import progressService from "../services/progressService.js";

const createProgressController = async (req, res, next) => {
  try {
    const progressData = {
      ...req.body,
      userId: req.user.id,
    };
    const newProgress = await progressService.createProgress(progressData);
    res.status(201).json({
      success: true,
      message: "Progress created successfully",
      data: newProgress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to create progress", null, err.stack),
    );
  }
};

const getProgressByIdController = async (req, res, next) => {
  try {
    const progressId = req.params.id;
    const progress = await progressService.getProgressById(progressId);
    res.status(200).json({
      success: true,
      message: "Progress retrieved successfully",
      data: progress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve progress", null, err.stack),
    );
  }
};

const getAllProgressController = async (req, res, next) => {
  try {
    const progress = await progressService.getAllProgress();
    res.status(200).json({
      success: true,
      message: "All progress retrieved successfully",
      data: progress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve progress", null, err.stack),
    );
  }
};

const getProgressByUserController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const progress = await progressService.getProgressByUser(userId);
    res.status(200).json({
      success: true,
      message: "Progress by user retrieved successfully",
      data: progress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve progress by user", null, err.stack),
    );
  }
};

const getProgressByBootcampController = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const progress = await progressService.getProgressByBootcamp(bootcampId);
    res.status(200).json({
      success: true,
      message: "Progress by bootcamp retrieved successfully",
      data: progress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve progress by bootcamp", null, err.stack),
    );
  }
};

const getProgressByDateController = async (req, res, next) => {
  try {
    const date = req.params.date;
    const progress = await progressService.getProgressByDate(date);
    res.status(200).json({
      success: true,
      message: "Progress by date retrieved successfully",
      data: progress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve progress by date", null, err.stack),
    );
  }
};

const updateProgressController = async (req, res, next) => {
  try {
    const progressId = req.params.id;
    const updateData = req.body;
    const updatedProgress = await progressService.updateProgress(progressId, updateData);
    if (!updatedProgress) {
      throw new ApiError(404, "Progress not found for update");
    }
    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: updatedProgress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update progress", null, err.stack),
    );
  }
};

const deleteProgressController = async (req, res, next) => {
  try {
    const progressId = req.params.id;
    const deletedProgress = await progressService.deleteProgress(progressId);
    res.status(200).json({
      success: true,
      message: "Progress deleted successfully",
      data: deletedProgress,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to delete progress", null, err.stack),
    );
  }
};

export default {
  createProgressController,
  getProgressByIdController,
  getAllProgressController,
  getProgressByUserController,
  getProgressByBootcampController,
  getProgressByDateController,
  updateProgressController,
  deleteProgressController,
};

