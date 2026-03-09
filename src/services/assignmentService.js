import Assignment from "../models/Assignment.js";
import { ApiError } from "../utils/ApiError.js";

const createAssignment = async (assignmentData) => {
    try {
        const assignment = new Assignment(assignmentData);
        await assignment.save();
        return assignment;
    } catch (err) {
        throw new ApiError(500, "Database error while creating assignment", null, err.stack);
    }
};

const getAssignmentById = async (assignmentId) => {
    try {
        const assignment = await Assignment.findById(assignmentId)
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email");
        if (!assignment) {
            throw new ApiError(404, "Assignment not found");
        }
        return assignment;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving assignment", null, err.stack);
    }
};

const getAllAssignments = async () => {
    try {
        const assignments = await Assignment.find()
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ dueDate: -1 });
        return assignments;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving assignments", null, err.stack);
    }
};

const getAssignmentsByBootcamp = async (bootcampId) => {
    try {
        const assignments = await Assignment.find({ bootcampId })
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ dueDate: -1 });
        return assignments;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving assignments by bootcamp", null, err.stack);
    }
};

const getAssignmentsByDomain = async (domainId) => {
    try {
        const assignments = await Assignment.find({ domainId })
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ dueDate: -1 });
        return assignments;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving assignments by domain", null, err.stack);
    }
};

const updateAssignment = async (assignmentId, updateData) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email");
        return updatedAssignment;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating assignment", null, err.stack);
    }
};

const deleteAssignment = async (assignmentId) => {
    try {
        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
        if (!deletedAssignment) {
            throw new ApiError(404, "Assignment not found");
        }
        return deletedAssignment;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while deleting assignment", null, err.stack);
    }
};

export default {
    createAssignment,
    getAssignmentById,
    getAllAssignments,
    getAssignmentsByBootcamp,
    getAssignmentsByDomain,
    updateAssignment,
    deleteAssignment,
};
