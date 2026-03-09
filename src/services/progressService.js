import DailyProgress from "../models/DailyProgress.js";
import { ApiError } from "../utils/ApiError.js";

const createProgress = async (progressData) => {
    try {
        const progress = new DailyProgress(progressData);
        await progress.save();
        return progress;
    } catch (err) {
        throw new ApiError(500, "Database error while creating progress", null, err.stack);
    }
};

const getProgressById = async (progressId) => {
    try {
        const progress = await DailyProgress.findById(progressId)
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name");
        if (!progress) {
            throw new ApiError(404, "Progress not found");
        }
        return progress;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving progress", null, err.stack);
    }
};

const getAllProgress = async () => {
    try {
        const progress = await DailyProgress.find()
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .sort({ date: -1 });
        return progress;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving progress", null, err.stack);
    }
};

const getProgressByUser = async (userId) => {
    try {
        const progress = await DailyProgress.find({ userId })
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .sort({ date: -1 });
        return progress;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving progress by user", null, err.stack);
    }
};

const getProgressByBootcamp = async (bootcampId) => {
    try {
        const progress = await DailyProgress.find({ bootcampId })
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .sort({ date: -1 });
        return progress;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving progress by bootcamp", null, err.stack);
    }
};

const getProgressByDate = async (date) => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const progress = await DailyProgress.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        })
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .sort({ date: -1 });
        return progress;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving progress by date", null, err.stack);
    }
};

const updateProgress = async (progressId, updateData) => {
    try {
        const updatedProgress = await DailyProgress.findByIdAndUpdate(
            progressId,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("userId", "name email")
            .populate("bootcampId", "name")
            .populate("domainId", "name");
        return updatedProgress;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating progress", null, err.stack);
    }
};

const deleteProgress = async (progressId) => {
    try {
        const deletedProgress = await DailyProgress.findByIdAndDelete(progressId);
        if (!deletedProgress) {
            throw new ApiError(404, "Progress not found");
        }
        return deletedProgress;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while deleting progress", null, err.stack);
    }
};

export default {
    createProgress,
    getProgressById,
    getAllProgress,
    getProgressByUser,
    getProgressByBootcamp,
    getProgressByDate,
    updateProgress,
    deleteProgress,
};
