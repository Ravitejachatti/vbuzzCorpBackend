const mongoose = require("mongoose");
const { roleConstants } = require("../config/constants")
const { PLACEMENT_ADMIN, COLLEGE_ADMIN, UNIVERSITY_ADMIN, PLACEMENT_DIRECTOR, DEPARTMENT_ADMIN,  STUDENT, FACULTY, ADMISSION_ADMIN, COLLEGE_ADMISSION_ADMIN } = roleConstants;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: [UNIVERSITY_ADMIN, COLLEGE_ADMIN, PLACEMENT_ADMIN, PLACEMENT_DIRECTOR, DEPARTMENT_ADMIN, FACULTY, ADMISSION_ADMIN, COLLEGE_ADMISSION_ADMIN, STUDENT],
    default: FACULTY,
  },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', default: null }, // Optional reference to University
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', default: null }, // Optional reference to College
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null }, // Optional reference to Department
}, { timestamps: true });

module.exports = userSchema; // Export only the schema