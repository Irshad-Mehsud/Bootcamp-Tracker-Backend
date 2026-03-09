import Announcement from "../models/Announcement.js";
import { ApiError } from "../utils/ApiError.js";

const createAnnouncement = async (announcementData) => {
    try {
        const announcement = new Announcement(announcementData);
        await announcement.save();
        return announcement;
    } catch (err) {
        throw new ApiError(500, "Database error while creating announcement", null, err.stack);
    }
};

const getAnnouncementById = async (announcementId) => {
    try {
        const announcement = await Announcement.findById(announcementId)
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email");
        if (!announcement) {
            throw new ApiError(404, "Announcement not found");
        }
        return announcement;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while retrieving announcement", null, err.stack);
    }
};

const getAllAnnouncements = async () => {
    try {
        const announcements = await Announcement.find()
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        return announcements;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving announcements", null, err.stack);
    }
};

const getAnnouncementsByBootcamp = async (bootcampId) => {
    try {
        const announcements = await Announcement.find({ bootcampId })
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        return announcements;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving announcements by bootcamp", null, err.stack);
    }
};

const getAnnouncementsByDomain = async (domainId) => {
    try {
        const announcements = await Announcement.find({ domainId })
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        return announcements;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving announcements by domain", null, err.stack);
    }
};

const updateAnnouncement = async (announcementId, updateData) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            updateData,
            { new: true, runValidators: true }
        )
            .populate("bootcampId", "name")
            .populate("domainId", "name")
            .populate("createdBy", "name email");
        return updatedAnnouncement;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while updating announcement", null, err.stack);
    }
};

const deleteAnnouncement = async (announcementId) => {
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
        if (!deletedAnnouncement) {
            throw new ApiError(404, "Announcement not found");
        }
        return deletedAnnouncement;
    } catch (err) {
        throw err instanceof ApiError ? err : new ApiError(500, "Database error while deleting announcement", null, err.stack);
    }
};

export default {
    createAnnouncement,
    getAnnouncementById,
    getAllAnnouncements,
    getAnnouncementsByBootcamp,
    getAnnouncementsByDomain,
    updateAnnouncement,
    deleteAnnouncement,
};
