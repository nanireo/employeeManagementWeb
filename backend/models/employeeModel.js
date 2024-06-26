const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  EID: Number,
  Name: String,
  Email: String,
  MobileNo: Number,
  Designation: String,
  Gender: String,
  Course: String,
  profilePic: String,

  //createdAt:String,

 createdAt: { type: Date, default: Date.now },
  Status: {
    type: Boolean,
    default: true // Default status set to true (Active)
  }
});

// Define the model with PascalCase naming convention
const Employees = mongoose.model("Employees", employeeSchema);

module.exports = Employees;
