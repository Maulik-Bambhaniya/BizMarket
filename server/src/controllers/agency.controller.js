import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Agency } from "../models/agency.model.js";

// Get all agencies with filtering and sorting
const getAllAgencies = asyncHandler(async (req, res) => {
    let { searchTerm, sortBy, sortOrder, budget, rating, services } = req.query;
    let page = parseInt(req.query.page) || 1; // Default page 1
    let limit = parseInt(req.query.limit) || 10; // Default limit 10

    let query = {};
    let sort = {};

    // Search Term
    if (searchTerm) {
        query.$or = [
            { agencyName: { $regex: searchTerm, $options: 'i' } },
            { agencyDescription: { $regex: searchTerm, $options: 'i' } },
            { services: { $regex: searchTerm, $options: 'i' } }
        ];
    }

    // Budget Filter (example, adjust as needed)
    if (budget) {
        const [min, max] = budget.split('-').map(Number);
        // Assuming your Agency model has a "budget" field
        query.budget = { $gte: min, $lte: max || Infinity };
    }

    // Rating Filter (example, adjust as needed)
    if (rating) {
        const minRating = parseInt(rating.replace('+', ''));
        // Assuming your Agency model has a "rating" field
        query.rating = { $gte: minRating };
    }

    // Services Filter (example, adjust as needed)
    if (services) {
        const serviceList = services.split(',');
        query.services = { $in: serviceList };
    }

    // Sorting
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
        // Default sorting by createdAt descending
        sort.createdAt = -1;
    }

    const agencies = await Agency.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    const totalAgencies = await Agency.countDocuments(query);
    const totalPages = Math.ceil(totalAgencies / limit);

    if (!agencies || agencies.length === 0) {
        return res
            .status(200) // or 200, depending on your API design
            .json(new ApiResponse(200, {
                agencies: [],
                page,
                limit,
                totalPages: 0,
                totalAgencies: 0
            }, "No agencies found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {
            agencies,
            page,
            limit,
            totalPages,
            totalAgencies
        }, "Agencies fetched successfully"));
});

// Get a single agency by ID
const getAgencyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const agency = await Agency.findById(id);

    if (!agency) {
        throw new ApiError(404, "Agency not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, agency, "Agency fetched successfully"));
});

export {
    getAllAgencies,
    getAgencyById
};
