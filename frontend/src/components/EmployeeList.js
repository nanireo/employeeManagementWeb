import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../style/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState({ key: '', ascending: true });

  useEffect(() => {
    fetchEmployees();
  }, [search, sortBy]);

  const apiUrl = process.env.REACT_APP_API_KEY || 'https://employeemanagementweb.onrender.com/api/employee';


  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}?search=${search}`);
      // Sort employees based on the selected key
      const sortedEmployees = response.data.sort((a, b) => {
        if (sortBy.key && a[sortBy.key] && b[sortBy.key]) {
          if (sortBy.key === 'EID') {
            return sortBy.ascending ? a[sortBy.key] - b[sortBy.key] : b[sortBy.key] - a[sortBy.key];
          }
          return sortBy.ascending ? a[sortBy.key].localeCompare(b[sortBy.key]) : b[sortBy.key].localeCompare(a[sortBy.key]);
        }
        return 0;
      });
      setEmployees(sortedEmployees);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching employee data');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      console.log("Deleted Employee with ID:", id);
      fetchEmployees();
      setShowSuccessMessage(true);
    } catch (error) {
      console.log("Error deleting Employee:", error);
    }
    setEmployeeToDelete(null);
    setShowConfirmation(false);
  };

  const handleDeleteConfirmation = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
    setShowConfirmation(false);
  };

  const handleOkSuccess = () => {
    setShowSuccessMessage(false);
  };

  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredEmployees = search
    ? employees.filter(employee => {
        // Filter by any field containing the search term or mobile number
        return Object.values(employee).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(search.toLowerCase());
          }
          return false;
        });
      })
    : employees;
  const currentRecords = filteredEmployees.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Navbar />
      <h2>Employee List</h2>
      <br />
      <br />
      <table className="tableStyle">
        <thead>
          <tr className="rowStyle">
            <th colSpan="10" style={{ textAlign: 'right' }} className="cellStyle">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ marginRight: '20px' }} />
              <Link to="/CreateEmployeePage"><button>Create Employee</button></Link>
            </th>
          </tr>
          <tr className="rowStyle">
            <th className="cellStyle">So.NO</th>

            <th className="cellStyle" onClick={() => setSortBy({ key: 'EID', ascending: !sortBy.ascending })}>
              EID {sortBy.key === 'EID' && (sortBy.ascending ? '▲' : '▼')}
            </th>

            <th className="cellStyle">Image</th>

            <th className="cellStyle" onClick={() => setSortBy({ key: 'Name', ascending: !sortBy.ascending })}>
              Name {sortBy.key === 'Name' && (sortBy.ascending ? '▲' : '▼')}
            </th>
            <th className="cellStyle" onClick={() => setSortBy({ key: 'Email', ascending: !sortBy.ascending })}>
            Email {sortBy.key === 'Email' && (sortBy.ascending ? '▲' : '▼')}
            </th>
            {/* <th className="cellStyle">Email</th> */}
            <th className="cellStyle">MobileNo</th>
            <th className="cellStyle">Designation</th>
            <th className="cellStyle">Gender</th>
            <th className="cellStyle">Course</th>
            {/* <th className="cellStyle">Create Date</th> */}
            <th className="cellStyle" onClick={() => setSortBy({ key: 'createdAt', ascending: !sortBy.ascending })}>
            CreateDate {sortBy.key === 'createdAt' && (sortBy.ascending ? '▲' : '▼')}
            </th>
            <th className="cellStyle">Edit</th>
            <th className="cellStyle">Delete</th>
            <th className="cellStyle">View</th>
            <th className="cellStyle">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((employee, index) => (
              <tr key={employee._id} className="rowStyle">
                <td className="cellStyle">{index+1}</td>
                <td className="cellStyle">{employee.EID}</td>
                <td>                 
                   <img src={`https://employeemanagementweb.onrender.com/${employee.profilePic}`} alt="EmployeeImage" style={{ width: '50px', height: '50px' }} />

                  {/* <img src="https://github.com/nanireo/employeeManagementWeb/tree/main/backend/uploadimage" alt="EmployeeImage" style={{ width: '50px', height: '50px' }} /> */}
                </td>
                <td className="cellStyle">{employee.Name}</td>
                <td className="cellStyle">{employee.Email}</td>
                <td className="cellStyle">{employee.MobileNo}</td>
                <td className="cellStyle">{employee.Designation}</td>
                <td className="cellStyle">{employee.Gender}</td>
                <td className="cellStyle">{employee.Course}</td>  

                <td className="cellStyle">{new Date(employee.createdAt).toLocaleDateString()}</td>

                {/* <td className="cellStyle">{new Date(employee.createdAt).toLocaleString()}</td> */}
                <td className="cellStyle">
                  <Link to={`/EditEmployeeDetailsPage/${employee._id}`} className="iconStyle"><MdEdit /></Link>
                </td>
                <td className="cellStyle">
                  <button onClick={() => handleDeleteConfirmation(employee._id)} className="iconStyle"><MdDelete /></button>
                </td>
                <td className="cellStyle">
                  <Link to={`/ViewEmployeeDetailsPage/${employee._id}`} ><IoEyeSharp /></Link>
                </td>
                <td className="cellStyle">
                  <p>{employee.Status ? 'Active' : 'Inactive'}</p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link' onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
          </li>

          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
              <button className='page-link' onClick={() => changePage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}

          <li className='page-item'>
            <button className='page-link' onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {showConfirmation && (
        <div className="modalStyle">
          <div className="modalContentStyle">
            <p>Are you sure you want to delete this employee?</p>
            <div className="buttonContainerStyle">
              <button onClick={() => deleteEmployee(employeeToDelete)} className="yesButtonStyle">Yes</button>
              <button onClick={handleCancelDelete} className="noButtonStyle">No</button>
            </div>
          </div>
        </div>
      )}
      {showSuccessMessage && (
        <div className="successMessageStyle">
          <p>Employee deleted successfully!</p>
          <button onClick={handleOkSuccess}>OK</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
