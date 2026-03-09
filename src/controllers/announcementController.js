import { ApiError } from "../utils/ApiError.js";
import announcementService from "../services/announcementService.js";

const createAnnouncementController = async (req, res, next) => {
  try {
    const announcementData = {
      ...req.body,
      createdBy: req.user.id,
    };
    const newAnnouncement = await announcementService.createAnnouncement(announcementData);
    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: newAnnouncement,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to create announcement", null, err.stack),
    );
  }
};

const getAnnouncementByIdController = async (req, res, next) => {
  try {
    const announcementId = req.params.id;
    const announcement = await announcementService.getAnnouncementById(announcementId);
    res.status(200).json({
      success: true,
      message: "Announcement retrieved successfully",
      data: announcement,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve announcement", null, err.stack),
    );
  }
};

const getAllAnnouncementsController = async (req, res, next) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.status(200).json({
      success: true,
      message: "All announcements retrieved successfully",
      data: announcements,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve announcements", null, err.stack),
    );
  }
};

const getAnnouncementsByBootcampController = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const announcements = await announcementService.getAnnouncementsByBootcamp(bootcampId);
    res.status(200).json({
      success: true,
      message: "Announcements by bootcamp retrieved successfully",
      data: announcements,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve announcements by bootcamp", null, err.stack),
    );
  }
};

const getAnnouncementsByDomainController = async (req, res, next) => {
  try {
    const domainId = req.params.domainId;
    const announcements = await announcementService.getAnnouncementsByDomain(domainId);
    res.status(200).json({
      success: true,
      message: "Announcements by domain retrieved successfully",
      data: announcements,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to retrieve announcements by domain", null, err.stack),
    );
  }
};

const updateAnnouncementController = async (req, res, next) => {
  try {
    const announcementId = req.params.id;
    const updateData = req.body;
    const updatedAnnouncement = await announcementService.updateAnnouncement(announcementId, updateData);
    if (!updatedAnnouncement) {
      throw new ApiError(404, "Announcement not found for update");
    }
    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to update announcement", null, err.stack),
    );
  }
};

const deleteAnnouncementController = async (req, res, next) => {
  try {
    const announcementId = req.params.id;
    const deletedAnnouncement = await announcementService.deleteAnnouncement(announcementId);
    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
      data: deletedAnnouncement,
    });
  } catch (err) {
    next(
      err instanceof ApiError
        ? err
        : new ApiError(500, "Failed to delete announcement", null, err.stack),
    );
  }
};

export default {
  createAnnouncementController,
  getAnnouncementByIdController,
  getAllAnnouncementsController,
  getAnnouncementsByBootcampController,
  getAnnouncementsByDomainController,
  updateAnnouncementController,
  deleteAnnouncementController,
};

