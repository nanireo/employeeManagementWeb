import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import '../style/EditEmployeeDetails.css'; // Import the CSS file

const EditEmployeeDetails = ({ employeeID, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [file, setFile] = useState(null); // State to hold the selected file
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleStatusChange = () => {
        // Toggle the status
        const updatedStatus = formData.Status ? 0 : 1; // Convert to number
        setFormData({ ...formData, Status: updatedStatus });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithFile = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithFile.append(key, value);
            });
            // Append the file if it exists
            if (file) {
                formDataWithFile.append('profilePic', file);
            }
            await axios.put(`http://localhost:4000/api/employee/${employeeID}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Employee updated successfully');
            alert("Employee Updated successfully");
            // Navigate upon successful update
            navigate('/EmployeeListPages');
        } catch (error) {
            console.error('Error updating employee:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'left' }}>Employee Edit</h1>
            <div className="form-container">
                <Link to="/EmployeeListPages">
                    <p className="form-title"><IoIosClose /></p>
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>MobileNo:</label>
                        <input type="text" name="MobileNo" value={formData.MobileNo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <label>Designation:</label>
                    <select name="Designation" value={formData.Designation} onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    </div>

                    <div className="form-group course-group">
                            <label>Gender:</label>
                            <div className="course-group">
                                <div>
                                    <input type="radio" id="male" name="Gender" value="Male" onChange={handleChange} />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div>
                                    <input type="radio" id="female" name="Gender" value="Female" onChange={handleChange} />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group course-group">
                            <label>Course:</label>
                            <div>
                                <input type="checkbox" id="mca" name="Course" value="MCA" onChange={handleChange} />
                                <label htmlFor="mca">MCA</label>
                            </div>
                            <div>
                                <input type="checkbox" id="bca" name="Course" value="BCA" onChange={handleChange} />
                                <label htmlFor="bca">BCA</label>
                            </div>
                            <div>
                                <input type="checkbox" id="bsc" name="Course" value="BSC" onChange={handleChange} />
                                <label htmlFor="bsc">BSC</label>
                            </div>
                        </div>

                    <div className="form-group">
                        <label>Profile Picture:</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input
                            type="checkbox"
                            name="Status"
                            checked={formData.Status}
                            onChange={handleStatusChange}
                        />
                        <span>{formData.Status ? 'Active' : 'Inactive'}</span> 
                    </div>
                    <button type="submit" className="submit-button">Update Form</button>
                </form>
            </div>
        </>
    );
};

export default EditEmployeeDetails
