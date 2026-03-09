import { ApiError } from "../utils/ApiError.js";
import submissionService from "../services/submissionService.js";

const createSubmissionController = async (req, res, next) => {
  try {
    const submissionData = {
      ...req.body,
      userId: req.user.id,
    };
    const newSubmission = await submissionService.createSubmission(submissionData);
    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: newSubmission,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to create submission", null, err.stack),
    );
  }
};

const getSubmissionByIdController = async (req, res, next) => {
  try {
    const submissionId = req.params.id;
    const submission = await submissionService.getSubmissionById(submissionId);
    res.status(200).json({
      success: true,
      message: "Submission retrieved successfully",
      data: submission,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve submission", null, err.stack),
    );
  }
};

const getAllSubmissionsController = async (req, res, next) => {
  try {
    const submissions = await submissionService.getAllSubmissions();
    res.status(200).json({
      success: true,
      message: "All submissions retrieved successfully",
      data: submissions,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve submissions", null, err.stack),
    );
  }
};

const getSubmissionsByAssignmentController = async (req, res, next) => {
  try {
    const assignmentId = req.params.assignmentId;
    const submissions = await submissionService.getSubmissionsByAssignment(assignmentId);
    res.status(200).json({
      success: true,
      message: "Submissions by assignment retrieved successfully",
      data: submissions,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve submissions by assignment", null, err.stack),
    );
  }
};

const getSubmissionsByUserController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const submissions = await submissionService.getSubmissionsByUser(userId);
    res.status(200).json({
      success: true,
      message: "Submissions by user retrieved successfully",
      data: submissions,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve submissions by user", null, err.stack),
    );
  }
};

const updateSubmissionController = async (req, res, next) => {
  try {
    const submissionId = req.params.id;
    const updateData = req.body;
    const updatedSubmission = await submissionService.updateSubmission(submissionId, updateData);
    if (!updatedSubmission) {
      throw new ApiError(404, "Submission not found for update");
    }
    res.status(200).json({
      success: true,
      message: "Submission updated successfully",
      data: updatedSubmission,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update submission", null, err.stack),
    );
  }
};

const gradeSubmissionController = async (req, res, next) => {
  try {
    const submissionId = req.params.id;
    const gradeData = {
      ...req.body,
      gradedBy: req.user.id,
    };
    const gradedSubmission = await submissionService.gradeSubmission(submissionId, gradeData);
    if (!gradedSubmission) {
      throw new ApiError(404, "Submission not found for grading");
    }
    res.status(200).json({
      success: true,
      message: "Submission graded successfully",
      data: gradedSubmission,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to grade submission", null, err.stack),
    );
  }
};

const deleteSubmissionController = async (req, res, next) => {
  try {
    const submissionId = req.params.id;
    const deletedSubmission = await submissionService.deleteSubmission(submissionId);
    res.status(200).json({
      success: true,
      message: "Submission deleted successfully",
      data: deletedSubmission,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to delete submission", null, err.stack),
    );
  }
};

export default {
  createSubmissionController,
  getSubmissionByIdController,
  getAllSubmissionsController,
  getSubmissionsByAssignmentController,
  getSubmissionsByUserController,
  updateSubmissionController,
  gradeSubmissionController,
  deleteSubmissionController,
};

