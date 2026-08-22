const express = require("express");

const router = express.Router();

const {
    getCompanyDetails,
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");

router.get("/:company", protect, getCompanyDetails);

module.exports = router;