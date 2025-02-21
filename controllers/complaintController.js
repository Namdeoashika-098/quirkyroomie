const Complaint = require('../models/complaint');

// Create a new complaint

const createComplaint = async (req, res) => {
      try {
        const { title, description, complaintType, severity } = req.body;
    
        // Validation
        if (!title || !description || !complaintType || !severity) {
          return res.status(400).json({ error: "All fields are required" });
        }
    
        // Create complaint with createdBy from req.user.userId
        const newComplaint = new Complaint({
          title,
          description,
          complaintType,
          severity,
          createdBy: req.user.userId // Use userId from decoded token
        });
    
        await newComplaint.save();
    
        res.status(201).json({ message: "Complaint created successfully", complaint: newComplaint });
      } catch (error) {
        console.error("Error while creating complaint:", error);
        res.status(500).json({ error: "Server Error" });
      }
    };
    
// Get all complaints
const getComplaints = async (req, res) => {
  try {
    // Fetch all complaints
    const complaints = await Complaint.find().populate('createdBy', 'name email'); // Populate with user details

    // Return the complaints list
    res.json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Mark a complaint as resolved
const resolveComplaint = async (req, res) => {
      try {
        const complaintId = req.params.id;
    
        const updatedComplaint = await Complaint.findByIdAndUpdate(
          complaintId,
          { status: 'resolved' },
          { new: true }
        );
    
        if (!updatedComplaint) {
          return res.status(404).json({ error: 'Complaint not found' });
        }
    
        res.status(200).json({ message: 'Complaint resolved', complaint: updatedComplaint });
      } catch (err) {
        console.error('Error resolving complaint:', err.message);
        res.status(500).json({ error: 'Server Error' });
      }
    };
    


module.exports = { createComplaint, getComplaints, resolveComplaint };
