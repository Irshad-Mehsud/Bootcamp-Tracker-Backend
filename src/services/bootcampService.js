import Bootcamp from "../models/Bootcamp.js";
import { ApiError } from "../utils/ApiError.js";


const createBootcamp = async (bootcampData) => {
    try {
        const bootcamp = new Bootcamp(bootcampData);
        await bootcamp.save();
        return bootcamp;
    } catch (err) {
        throw new ApiError(500, "Database error while creating bootcamp", null, err.stack);
    }
};

const getBootcamps = async (query) => {
    try {
        // Pagination, Filtering, Sorting logic yahan implement karna hai
        const bootcamps = await Bootcamp.find();
        return bootcamps;
    }catch (err) {
        throw new ApiError(500, "Database error while retrieving bootcamps", null, err.stack);
    }
}

const getBootcampById = async (id) => {
    try {
        const bootcamp = await Bootcamp.findById(id);
        return bootcamp;
    } catch (err) {
        throw new ApiError(500, "Database error while retrieving bootcamp", null, err.stack);
    }   
}  
const updateBootcamp = async (id, updateData) => {
    try {
        const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return updatedBootcamp;
    }
    catch (err) {
        throw new ApiError(500, "Database error while updating bootcamp", null, err.stack);
    }   
}

const deleteBootcamp = async (id) => {
    try {
        const deletedBootcamp = await Bootcamp.findByIdAndDelete(id);   
        return deletedBootcamp;
    } catch (err) {
        throw new ApiError(500, "Database error while deleting bootcamp", null, err.stack);
    }
};




export default{
    createBootcamp,
    getBootcamps,
    getBootcampById,
    updateBootcamp,
    deleteBootcamp,
}