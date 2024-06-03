const Employees = require('../models/employeeModel');
const path = require('path');

// Get all Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employeeGetedData = await Employees.find();
    res.json(employeeGetedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//http post method 

exports.addEmployee = async (req, res) => {
  try {
    const { Name, Email, MobileNo, Designation, Gender, Course } = req.body;
    const profilePic = req.file ? req.file.path : ''; // Check if file was uploaded and get its path

    // Find the highest existing EID
    const highestEIDEmployee = await Employees.findOne({}, { EID: 1 }).sort({ EID: -1 });

    let EID = 1; // Default EID if there are no employees yet

    if (highestEIDEmployee) {
      EID = highestEIDEmployee.EID + 1; // Increment EID
    }

    // Create new Employee document with generated EID
    const employeeData = new Employees({ EID, Name, Email, MobileNo, Designation, Gender, Course, profilePic });
    // Save Employee data to the database
    await employeeData.save();

    res.status(201).json({ message: 'Employee created successfully', employeeData });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: error.message });
  }
};

//get Employee by id - http method GET
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findOne({ "_id": id });

    if (!employee) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//delete Employees
exports.deleteEmployee = async (req, res) => {
  try {
    await Employees.findByIdAndDelete(req.params.id);
    res.json('Employee Deleted Successfully!.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

//update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let employee = await Employees.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.EID = req.body.EID || employee.EID;
    employee.Name = req.body.Name || employee.Name;
    employee.Email = req.body.Email || employee.Email;
    employee.MobileNo = req.body.MobileNo || employee.MobileNo;
    employee.Designation = req.body.Designation || employee.Designation;
    employee.Gender = req.body.Gender || employee.Gender;
    employee.Course = req.body.Course || employee.Course;
    employee.Status = req.body.Status !== undefined ? req.body.Status : employee.Status;

    if (req.file) {
      employee.profilePic = req.file.path;
    }

    await employee.save();
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error updating employee: ' + error.message });
  }
};



  
  // exports.updateEmployee = async (req, res) => {
  // try {
  //   const employees = await Employees.findById(req.params.id);
  //   employees.EID = req.body.EID;
  //   employees.Name = req.body.Name;
  //   employees.Email = req.body.Email;
  //   employees.MobileNo = req.body.MobileNo;
  //   employees.Designation = req.body.Designation;
  //   employees.Gender=req.body.Gender;
  //   employees.Course=req.body.Course
  
  
  //   await employees.save();
  //   res.json('employee updated!');
  // } catch (error) {
  //   res.status(400).json('Error: ' + error);
  // }
  // };












  // exports.addEmployee = async (req, res) => {
//   try {
//     const { EID, Name, Email, MobileNo, Designation, Gender, Course} = req.body;
//     const profilePic = req.file ? req.file.path : 'hello'; // Check if file was uploaded and get its path

//     console.log("Uploaded file path:", profilePic);

//     // Create new Employee document
//     const employeeData = new Employees({ EID, Name, Email, MobileNo, Designation, Gender, Course, profilePic });
//     // Save Employee data to the database
//     await employeeData.save();

//     res.status(201).json({ message: 'Employee created successfully', employeeData });
//   } catch (error) {
//     console.error("Error adding employee:", error);
//     res.status(500).json({ error: error.message });
//   }
// };



// exports.addEmployee  = async (req, res) => {
//     try {
//       const EmployeeAddedData = new Employees(req.body);
//       await EmployeeAddedData.save();

//       res.status(201).json({ success: 'Employees Added Successfully!..', data: EmployeeAddedData });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   };


// exports.addEmployee = async (req, res) => {
//   try {
//     // Include the "Create Date" field with the current date
//     const currentDate = new Date();
//     req.body.createDate = currentDate;

//     const employeeAddedData = new Employees(req.body);
//     await employeeAddedData.save();

//     res.status(201).json({ success: 'Employee added successfully!', data: employeeAddedData });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };








//adding new Employees to the Employees collection in DB - http method POST



// exports.addEmployee = async (req, res) => {
//    try {
//       // Adding creation date to the request body
//       req.body.createdAt = new Date();
      
//       // Creating a new Employee object with the request body
//       const EmployeeAddedData = new Employees(req.body);

//       // Saving the Employee object to the database
//       await EmployeeAddedData.save();

//       // Sending success response with the added Employee data
//       res.status(201).json({ success: 'Employee Added Successfully!', data: EmployeeAddedData });
//    } catch (error) {
//       // Sending error response in case of failure
//       res.status(500).json({ success: false, error: error.message });
//    }
// };



// Assuming the rest of your imports are properly set up


// EmployeeControllers.js