const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: String,
  city: String,
  headName: String,
  hrContact: String,
  status: { type: String, enum: ["Active","Inactive","Merged"], default: "Active" }
}, { _id:false });

const zoneSchema = new mongoose.Schema({
  zoneName: String,
  zonalHead: String,
  designation: String,
  address: String,
  geo: { lat: Number, lng: Number },
  hrContact: String,
  branches: [branchSchema]
}, { _id:false });

const corporateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entityType: String,
  domain: { type: String, index: true },
  dbName: { type: String, required: true, unique: true },
  logoUrl: String,
  cin: String,
  incorporationDate: Date,
  website: String,
  officialEmail: String,
  contactNumber: String,
  turnover: Number,
  totalEmployees: { global: Number, national: Number },
  sector: String,
  subSectors: [String],
  headquarters: {
    global: String,
    india: String,
    geo: { lat: Number, lng: Number }
  },
  registeredOffice: String,
  ceo: { name: String, email: String, phone: String },
  chro: { name: String, email: String, phone: String },
  zones: [zoneSchema],

  hiringNow: { type: Boolean, default: false },
  hiringTypes: [String],
  openLocations: [String],
  estimatedPositions: Number,
  skillsRequired: [String],
  certifications: [String],
  jobProfiles: [{
    title: String,
    department: String,
    ctcMin: Number,
    ctcMax: Number,
    type: { type: String, enum: ["Full-time","Contract","Internship"] },
    jdUrl: String
  }],

  willingToCollaborate: { type: Boolean, default: false },
  preferredUniversities: [String],
  preferredDepartments: [String],
  trainingSupport: Boolean,
  onCampusDrives: Boolean,
  webinars: Boolean,
  internships: Boolean,

  countries: [String],
  totalOffices: Number,
  diversityHiring: Boolean,

  documents: {
    gstCertificate: String,
    companyProfile: String,
    annualReport: String,
    csrPolicy: String,
    hiringTerms: String
  },

  approvalStatus: { type: String, enum: ["Approved","Under Review","Rejected"], default: "Under Review" },
  adminNotes: String,
  engagementScore: Number
}, { timestamps: true });

module.exports = mongoose.model("Corporate", corporateSchema);