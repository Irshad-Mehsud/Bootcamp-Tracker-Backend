
import bootcampService from '../services/bootcampService.js';
import { ApiError } from '../utils/ApiError.js';


const createBootcampController = async (req, res, next) => {
    try {
        const bootcampData = req.body;
        const newBootcamp = await bootcampService.createBootcamp(bootcampData);
        res.status(201).json({
            success: true,
            message: "Bootcamp created successfully",
            data: newBootcamp,
        });
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError(500, "Failed to create bootcamp", null, err.stack));
    }
};

const getBootcampsController = async (req, res, next) => {

    try {
        // Pagination, Filtering, Sorting logic yahan implement karna hai
        const bootcamps = await bootcampService.getBootcamps(req.query);
        res.status(200).json({
            success: true,
            message: "Bootcamps retrieved successfully",
            data: bootcamps,
        });
    }catch (err) {
        next(err instanceof ApiError ? err : new ApiError(500, "Failed to retrieve bootcamps", null, err.stack));
    }

};

const getSingleBootcampController = async (req, res, next) => {
    try {
        const bootcampId = req.params.id;
        const bootcamp = await bootcampService.getBootcampById(bootcampId);
        if (!bootcamp) {
            throw new ApiError(404, "Bootcamp not found");
        }
        res.status(200).json({
            success: true,
            message: "Single Bootcamp retrieved successfully",
            data: bootcamp,
        });
    } catch (err) { 
        next(err instanceof ApiError ? err : new ApiError(500, "Failed to retrieve bootcamp", null, err.stack));
    }
};

const updateBootcampController = async (req, res, next) => {
    // Update Bootcamp logic yahan implement karna hai
    try {
        const bootcampId = req.params.id;
        const updateData = req.body;
        const updatedBootcamp = await bootcampService.updateBootcamp(bootcampId, updateData);
        if (!updatedBootcamp) {
            throw new ApiError(404, "Bootcamp not found for update");
        }
        res.status(200).json({
            success: true,
            message: "Bootcamp updated successfully",
            data: updatedBootcamp,
        });
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError(500, "Failed to update bootcamp", null, err.stack));
    }
};

const deleteBootcampController = async (req, res, next) => {
    
    try{
        const bootcampId = req.params.id;
        const deletedBootcamp = await bootcampService.deleteBootcamp(bootcampId);
        if (!deletedBootcamp) {
            throw new ApiError(404, "Bootcamp not found for deletion");
        }
        res.status(200).json({
            success: true,
            message: "Bootcamp deleted successfully",
            data: deletedBootcamp,
        });
    } catch (err) {
        next(err instanceof ApiError ? err : new ApiError(500, "Failed to delete bootcamp", null, err.stack));
    }

};






export default {
    createBootcampController,
    getBootcampsController,
    getSingleBootcampController,
    updateBootcampController,
    deleteBootcampController
};