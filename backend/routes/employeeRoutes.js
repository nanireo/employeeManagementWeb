const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const EmployeeControllers = require('../controllers/EmployeeControllers');
const Employees = require('../models/employeeModel');

// Multer middleware for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadimage/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', EmployeeControllers.getAllEmployees);
router.post('/', upload.single('profilePic'), EmployeeControllers.addEmployee);
router.get('/:id', EmployeeControllers.getEmployeeById);
router.delete('/:id', EmployeeControllers.deleteEmployee);
router.put('/:id', upload.single('profilePic'), EmployeeControllers.updateEmployee);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const userController = require('../controllers/userController');

// // Multer middleware for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('profilePic'), userController.createUser);

// module.exports = router;