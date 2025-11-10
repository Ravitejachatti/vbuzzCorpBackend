const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Types.ObjectId, required: true, index: true },
  studentId: { type: String, required: true, index: true },
  universityId: { type: String, required: true, index: true },
  status: { type: String, enum: ["Applied","Screening","Shortlisted","Rejected","Hired"], default: "Applied" },
  appliedAt: { type: Date, default: Date.now, index: true },

  // optional snapshot of student profile for faster recruiter listing
  snapshot: {
    name: String,
    cgpa: Number,
    resumeUrl: String
  }
});