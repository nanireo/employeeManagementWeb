// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/LoginForm.css';

const LoginForm = () => {
  const [f_userName, setUserName] = useState('');
  const [f_Pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const apiUrl = process.env.REACT_APP_API_KEY || 'https://employeemanagementweb.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
  const response = await axios.post(`${apiUrl}/api/login`, { "f_userName":f_userName, "f_Pwd":f_Pwd });
  console.log("frontend response", response)

    // const response = await axios.post('https://employee-management-web-phi.vercel.app//login', { "f_userName":f_userName, "f_Pwd":f_Pwd });
    // console.log("frontend response", response)

     
      if (response.data.sessionId) {
        localStorage.setItem('sessionId', response.data.sessionId);

        // Retrieve the sessionId from local storage
        const sessionId = localStorage.getItem('sessionId');
        console.log('Session ID in login from:', sessionId);

        localStorage.setItem('username', f_userName);
        
        alert(response.data.message);
        navigate(`/Dashboard`)


        // navigate(`/Dashboard?username=${f_userName}`);Pass username as URL parameter
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in nani');
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <div className="login-container"> 
        <form onSubmit={handleSubmit} className="login-form"> 
          <div className="input-group"> 
            <label className="label">Username </label> 
            <input type="text" 
                   className="input" 
                   placeholder="Enter your username" 
                   value={f_userName} 
                   onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="input-group"> 
            <label className="label">Password </label> 
            <input type="password" 
                   className="input" 
                   placeholder="Enter your password" 
                   value={f_Pwd} 
                   onChange={(e) => setPwd(e.target.value)} />
          </div>
          <button type="submit" className="login-button">Login</button> 
          {error && <div className="error-message">{error}</div>} 
        </form>
      </div>
    </>
  );
};

export default LoginForm;





















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../style/LoginForm.css';

// const LoginForm = () => {
//   const [f_userName, setUserName] = useState('');
//   const [f_Pwd, setPwd] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/login', { "f_userName":f_userName, "f_Pwd":f_Pwd });
//       if (response.data.success) {
//         let BackendMessage = response.data.message;
//         alert(BackendMessage);
//         navigate(`/Dashboard?username=${f_userName}`); // Pass username as URL parameter
//         console.log(BackendMessage);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred while logging in');
//     }
//   };

//   return (
//     <>
//       <h1>Login Page</h1>
//       <div className="login-container"> 
        
//         <form onSubmit={handleSubmit} className="login-form"> 
//           <div className="input-group"> 
//             <label className="label">Username </label> 
//             <input type="text" 
//                    className="input" 
//                    placeholder="Enter your username" 
//                    value={f_userName} 
//                    onChange={(e) => setUserName(e.target.value)} />
//           </div>
//           <div className="input-group"> 
//             <label className="label">Password </label> 
//             <input type="password" 
//                    className="input" 
//                    placeholder="Enter your password" 
//                    value={f_Pwd} 
//                    onChange={(e) => setPwd(e.target.value)} />
//           </div>
//           <button type="submit" className="login-button">Login</button> 
//           {error && <div className="error-message">{error}</div>} 
//         </form>
//       </div>
//     </>
//   );
// };

// export default LoginForm;
