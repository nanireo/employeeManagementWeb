import React from 'react';
import { FiXCircle } from 'react-icons/fi'; // Import close icon from react-icons/fi
import '../style/viewEmployeeDetails.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

          //<img className="profile-pic" src={'https://employeemanagementweb.onrender.com'/`${profilePic}`} alt={Name + "'s profile picture"} />

const ViewEmployeeDetails = ({ initialData }) => {
  const navigate = useNavigate();

  const {
    profilePic,
    Name,
    Email,
    MobileNo,
    Designation,
    Gender,
    Course,
    Status // Add Status here
  } = initialData;

  const handleClose = () => {
    navigate('/EmployeeListPages');
  };

  const apiUrl = process.env.REACT_APP_API_KEY || 'https://employeemanagementweb.onrender.com';


  return (
    <>
    <Navbar/>
    <div className="employee-details-container">
      
      <div className="employee-details">
        <div className="profile-pic-container">
        <img src={`https://employeemanagementweb.onrender.com/${profilePic}`} alt={`${Name}'s profile picture`} style={{ width: '50px', height: '50px' }} />
        </div>
        <p>Name: {Name}</p>
        <p>Email: {Email}</p>
        <p>MobileNo: {MobileNo}</p>
        <p>Designation: {Designation}</p>
        <p>Gender: {Gender}</p>
        <p>Course: {Course}</p>
        <p>Status: {Status ? 'Active' : 'Inactive'}</p> {/* Render Status here */}
        <FiXCircle onClick={handleClose} className="close-icon" />
      </div>
    </div>
    </>
  );
};

export default ViewEmployeeDetails;
