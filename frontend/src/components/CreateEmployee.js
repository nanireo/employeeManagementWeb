import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/CreateEmployee.css'; // Import CSS file

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        EID: '',
        Name: '',
        Email: '',
        MobileNo: '',
        Designation: '',
        Gender: '',
        Course: '',
        profilePic: null
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle special cases like checkbox and file input
        const newValue = type === 'checkbox' ? (checked ? value : '') : (type === 'file' ? e.target.files[0] : value);

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        let isValid = true;

        if (!formData.Name || !formData.Email || !formData.MobileNo || !formData.Designation || !formData.Gender || !formData.Course) {
            formErrors = {
                ...formErrors,
                allFields: 'Please fill out all required fields.'
            };
            isValid = false;
        }

        if (formData.Email && !validateEmail(formData.Email)) {
            formErrors = {
                ...formErrors,
                email: 'Please enter a valid email address.'
            };
            isValid = false;
        }

        const intFields = ['EID', 'MobileNo'];
        intFields.forEach(field => {
            if (formData[field] && !Number.isInteger(Number(formData[field]))) {
                formErrors = {
                    ...formErrors,
                    [field]: 'Please enter a valid integer.'
                };
                isValid = false;
            }
        });

        if (!isValid) {
            setErrors(formErrors);
            return;
        }

        const apiUrl = process.env.REACT_APP_API_KEY || 'https://employeemanagementweb.onrender.com';


        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const response = await axios.post(`${apiUrl}/api/employee`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                setSuccessMessage('Employee data submitted successfully!');
                alert("Employee added  successfully")
                navigate('/EmployeeListPages');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ allFields: 'An error occurred while submitting employee data' });
        }

        setFormData({
            // EID: '',
            Name: '',
            Email: '',
            MobileNo: '',
            Designation: '',
            Gender: '',
            Course: '',
            profilePic: null
        });
        setErrors({});
        setSuccessMessage('');
    };

    return (
        <>
            <Navbar />
            <h2>Create Employee</h2>
            <div className="formContainer">
                <Link to="/EmployeeListPages">
                    <p className="formTitle"><IoIosClose /></p>
                </Link>
                <form onSubmit={handleSubmit} className="formStyle" encType="multipart/form-data">
                    <div className="formGroup">
                        <label className="labelStyle">Name:</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="inputStyle" />
                        {errors.Name && <span className="errorMessage">{errors.Name}</span>}
                    </div>
                    <div className="formGroup">
                        <label className="labelStyle">Email:</label>
                        <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="inputStyle" />
                        {errors.Email && <span className="errorMessage">{errors.Email}</span>}
                    </div>
                    <div className="formGroup">
                        <label className="labelStyle">Mobile Number:</label>
                        <input type="tel" name="MobileNo" value={formData.MobileNo} onChange={handleChange} className="inputStyle" />
                        {errors.MobileNo && <span className="errorMessage">{errors.MobileNo}</span>}
                    </div>
                    <div className="formGroup">
                        <label className="labelStyle">Designation:</label>
                        <select name="Designation" value={formData.Designation} onChange={handleChange} className="inputStyle">
                            <option value="">--Please choose an option--</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                        {errors.Designation && <span className="errorMessage">{errors.Designation}</span>}
                    </div>
                    <div className="formGroup">
                        <label className="labelStyle">Gender:</label>
                        <div className="radio-group">
                            <div>
                                <input type="radio" id="male" name="Gender" value="Male" onChange={handleChange} />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="Gender" value="Female" onChange={handleChange} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        {errors.Gender && <span className="errorMessage">{errors.Gender}</span>}
                    </div>
                    <div className="formGroup course-group">
                        <label className="labelStyle">Course:</label>
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
                        {errors.Course && <span className="errorMessage">{errors.Course}</span>}
                    </div>
                    <div className="formGroup">
                        <label className="labelStyle">Image</label>
                        <input 
                            type="file" 
                            name="profilePic" 
                            onChange={handleChange} 
                            className="inputStyle" 
                        />
                        {errors.profilePic && <span className="errorMessage">{errors.profilePic}</span>}
                    </div>
                    <button type="submit" className="buttonStyle">Submit</button>
                </form>
                {errors.allFields && <div className="errorMessage">{errors.allFields}</div>}
                {successMessage && <div className="successMessageStyle">{successMessage}</div>}
            </div>
        </>
    );
};

export default CreateEmployee;
