import Submission from "../models/Submission.js";
import { ApiError } from "../utils/ApiError.js";

const createSubmission = async (submissionData) => {
    try {
        const submission = new Submission(submissionData);
        await submission.save();
        return submission;
    } catch (err) {
        throw new ApiError(500, "Database error while creating submission", null, err.stack);
    }
};

const getSubmissionById = async (submissionId) => {
    try {
        const submission = await Submission.findById(submissionId)
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email");
        if (!submission) {
            throw new ApiError(404, "Submission not found");
        }
        return submission;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving submission", null, err.stack);
    }
};

const getAllSubmissions = async () => {
    try {
        const submissions = await Submission.find()
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email")
            .sort({ createdAt: -1 });
        return submissions;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving submissions", null, err.stack);
    }
};

const getSubmissionsByAssignment = async (assignmentId) => {
    try {
        const submissions = await Submission.find({ assignmentId })
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email")
            .sort({ createdAt: -1 });
        return submissions;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving submissions by assignment", null, err.stack);
    }
};

const getSubmissionsByUser = async (userId) => {
    try {
        const submissions = await Submission.find({ userId })
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email")
            .sort({ createdAt: -1 });
        return submissions;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving submissions by user", null, err.stack);
    }
};

const updateSubmission = async (submissionId, updateData) => {
    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email");
        return updatedSubmission;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating submission", null, err.stack);
    }
};

const gradeSubmission = async (submissionId, gradeData) => {
    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            {
                score: gradeData.score,
                feedback: gradeData.feedback,
                status: "graded",
                gradedBy: gradeData.gradedBy,
                gradedAt: new Date()
            },
            { new: true, runValidators: true }
        )
            .populate("assignmentId", "title dueDate")
            .populate("userId", "name email")
            .populate("gradedBy", "name email");
        return updatedSubmission;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while grading submission", null, err.stack);
    }
};

const deleteSubmission = async (submissionId) => {
    try {
        const deletedSubmission = await Submission.findByIdAndDelete(submissionId);
        if (!deletedSubmission) {
            throw new ApiError(404, "Submission not found");
        }
        return deletedSubmission;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while deleting submission", null, err.stack);
    }
};

export default {
    createSubmission,
    getSubmissionById,
    getAllSubmissions,
    getSubmissionsByAssignment,
    getSubmissionsByUser,
    updateSubmission,
    gradeSubmission,
    deleteSubmission,
};
