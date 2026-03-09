import { ApiError } from "../utils/ApiError.js";
import domainService from "../services/domainService.js";

const createDomainController = async (req, res, next) => {
  try {
    const domainData = req.body;
    const newDomain = await domainService.createDomain(domainData);
    res.status(201).json({
      success: true,
      message: "Domain created successfully",
      data: newDomain,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to create domain", null, err.stack),
    );
  }
};

const getDomainByIdController = async (req, res, next) => {
  try {
    const domainId = req.params.id;
    const domain = await domainService.getDomainById(domainId);
    res.status(200).json({
      success: true,
      message: "Domain retrieved successfully",
      data: domain,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve domain", null, err.stack),
    );
  }
};

const getAllDomainsController = async (req, res, next) => {
  try {
    const domains = await domainService.getAllDomains();
    res.status(200).json({
      success: true,
      message: "All domains retrieved successfully",
      data: domains,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve domains", null, err.stack),
    );
  }
};

const getDomainsByBootcampController = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const domains = await domainService.getDomainsByBootcamp(bootcampId);
    res.status(200).json({
      success: true,
      message: "Domains by bootcamp retrieved successfully",
      data: domains,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve domains by bootcamp", null, err.stack),
    );
  }
};

const updateDomainController = async (req, res, next) => {
  try {
    const domainId = req.params.id;
    const updateData = req.body;
    const updatedDomain = await domainService.updateDomain(domainId, updateData);
    if (!updatedDomain) {
      throw new ApiError(404, "Domain not found for update");
    }
    res.status(200).json({
      success: true,
      message: "Domain updated successfully",
      data: updatedDomain,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update domain", null, err.stack),
    );
  }
};

const deleteDomainController = async (req, res, next) => {
  try {
    const domainId = req.params.id;
    const deletedDomain = await domainService.deleteDomain(domainId);
    res.status(200).json({
      success: true,
      message: "Domain deleted successfully",
      data: deletedDomain,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to delete domain", null, err.stack),
    );
  }
};

export default {
  createDomainController,
  getDomainByIdController,
  getAllDomainsController,
  getDomainsByBootcampController,
  updateDomainController,
  deleteDomainController,
};

