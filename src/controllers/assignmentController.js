import { ApiError } from "../utils/ApiError.js";
import assignmentService from "../services/assignmentService.js";

const createAssignmentController = async (req, res, next) => {
  try {
    const assignmentData = {
      ...req.body,
      createdBy: req.user.id,
    };
    const newAssignment = await assignmentService.createAssignment(assignmentData);
    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: newAssignment,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to create assignment", null, err.stack),
    );
  }
};

const getAssignmentByIdController = async (req, res, next) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await assignmentService.getAssignmentById(assignmentId);
    res.status(200).json({
      success: true,
      message: "Assignment retrieved successfully",
      data: assignment,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve assignment", null, err.stack),
    );
  }
};

const getAllAssignmentsController = async (req, res, next) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    res.status(200).json({
      success: true,
      message: "All assignments retrieved successfully",
      data: assignments,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve assignments", null, err.stack),
    );
  }
};

const getAssignmentsByBootcampController = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const assignments = await assignmentService.getAssignmentsByBootcamp(bootcampId);
    res.status(200).json({
      success: true,
      message: "Assignments by bootcamp retrieved successfully",
      data: assignments,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve assignments by bootcamp", null, err.stack),
    );
  }
};

const getAssignmentsByDomainController = async (req, res, next) => {
  try {
    const domainId = req.params.domainId;
    const assignments = await assignmentService.getAssignmentsByDomain(domainId);
    res.status(200).json({
      success: true,
      message: "Assignments by domain retrieved successfully",
      data: assignments,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve assignments by domain", null, err.stack),
    );
  }
};

const updateAssignmentController = async (req, res, next) => {
  try {
    const assignmentId = req.params.id;
    const updateData = req.body;
    const updatedAssignment = await assignmentService.updateAssignment(assignmentId, updateData);
    if (!updatedAssignment) {
      throw new ApiError(404, "Assignment not found for update");
    }
    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: updatedAssignment,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update assignment", null, err.stack),
    );
  }
};

const deleteAssignmentController = async (req, res, next) => {
  try {
    const assignmentId = req.params.id;
    const deletedAssignment = await assignmentService.deleteAssignment(assignmentId);
    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
      data: deletedAssignment,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to delete assignment", null, err.stack),
    );
  }
};

export default {
  createAssignmentController,
  getAssignmentByIdController,
  getAllAssignmentsController,
  getAssignmentsByBootcampController,
  getAssignmentsByDomainController,
  updateAssignmentController,
  deleteAssignmentController,
};

