import Domain from "../models/Domain.js";
import { ApiError } from "../utils/ApiError.js";

const createDomain = async (domainData) => {
    try {
        const domain = new Domain(domainData);
        await domain.save();
        return domain;
    } catch (err) {
        throw new ApiError(500, "Database error while creating domain", null, err.stack);
    }
};

const getDomainById = async (domainId) => {
    try {
        const domain = await Domain.findById(domainId)
            .populate("bootcampId", "name")
            .populate("mentor", "name email");
        if (!domain) {
            throw new ApiError(404, "Domain not found");
        }
        return domain;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving domain", null, err.stack);
    }
};

const getAllDomains = async () => {
    try {
        const domains = await Domain.find()
            .populate("bootcampId", "name")
            .populate("mentor", "name email")
            .sort({ createdAt: -1 });
        return domains;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving domains", null, err.stack);
    }
};

const getDomainsByBootcamp = async (bootcampId) => {
    try {
        const domains = await Domain.find({ bootcampId })
            .populate("bootcampId", "name")
            .populate("mentor", "name email")
            .sort({ name: 1 });
        return domains;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving domains by bootcamp", null, err.stack);
    }
};

const updateDomain = async (domainId, updateData) => {
    try {
        const updatedDomain = await Domain.findByIdAndUpdate(
            domainId,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("bootcampId", "name")
            .populate("mentor", "name email");
        return updatedDomain;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating domain", null, err.stack);
    }
};

const deleteDomain = async (domainId) => {
    try {
        const deletedDomain = await Domain.findByIdAndDelete(domainId);
        if (!deletedDomain) {
            throw new ApiError(404, "Domain not found");
        }
        return deletedDomain;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while deleting domain", null, err.stack);
    }
};

export default {
    createDomain,
    getDomainById,
    getAllDomains,
    getDomainsByBootcamp,
    updateDomain,
    deleteDomain,
};
