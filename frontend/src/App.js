import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginFromPage from './pages/loginFromPage';
import Dashboard from './pages/DashboardPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import EmployeeListPages from './pages/EmployeeListPage';
import EditEmployeeDetailsPage from './pages/EditEmployeeDetailsPage';
import ViewEmployeeDetailsPage from './pages/viewEmployeeDetailsPage';

const HeaderBar = () => {
  const headerStyle = {
    // backgroundColor: '#333', 
  };

  const headerContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  };

  const logoStyle = {
    width: '100px',
    height: '100px',
  };
  return (
    <header style={headerStyle}>
      <div style={headerContainer}>
        <img src="unnamed.png" alt="logo" style={logoStyle} />
        {/* Navigation can be added here */}
      </div>
    </header>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('sessionId');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('sessionId'));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<LoginFromPage onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/CreateEmployeePage" element={<ProtectedRoute><CreateEmployeePage /></ProtectedRoute>} />
          <Route path="/EmployeeListPages" element={<ProtectedRoute><EmployeeListPages /></ProtectedRoute>} />
          <Route path="/EditEmployeeDetailsPage/:id" element={<ProtectedRoute><EditEmployeeDetailsPage /></ProtectedRoute>} />
          <Route path="/ViewEmployeeDetailsPage/:id" element={<ProtectedRoute><ViewEmployeeDetailsPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;






// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import LoginFromPage from './pages/loginFromPage';
// import Dashboard from './pages/DashboardPage';
// import CreateEmployeePage from './pages/CreateEmployeePage';
// import EmployeeListPages from './pages/EmployeeListPage';
// import EditEmployeeDetailsPage from './pages/EditEmployeeDetailsPage';
// import ViewEmployeeDetailsPage from './pages/viewEmployeeDetailsPage';

// const HeaderBar = () => {
//   const headerStyle = {
//     // backgroundColor: '#333', 
//   };

//   const headerContainer = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px',
//   };

//   const logoStyle = {
//     width: '100px',
//     height: '100px',
//   };
//   return (
//     <header style={headerStyle}>
//       <div style={headerContainer}>
//         <img src="unnamed.png" alt="logo" style={logoStyle} />
//         {/* Navigation can be added here */}
//       </div>
//     </header>
//   );
// };

// // const ProtectedRoute = ({ component: Component, ...rest }) => {
// //   const isAuthenticated = localStorage.getItem('sessionId');

// //   return isAuthenticated ? <Route {...rest} element={<Component {...rest} />} /> : <Navigate to="/login" replace />;
// // };

// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('sessionId')); // Check for the session ID instead of JWT token

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

//   return (
//     <>
//       <Router>
//         <HeaderBar />
//         <Routes>
//           <Route path="/" element={<LoginFromPage onLogin={handleLogin} />} />
//           {/* <ProtectedRoute path="/dashboard" component={Dashboard} /> */}
//           <Route path="/" element={<Navigate to="/" replace />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//           <Route path="/CreateEmployeePage" element={<CreateEmployeePage />} />
//          <Route path="/EmployeeListPages" element={<EmployeeListPages />} />
//          <Route path="/EditEmployeeDetailsPage/:id" element={<EditEmployeeDetailsPage />} />
//          <Route path="/ViewEmployeeDetailsPage/:id" element={<ViewEmployeeDetailsPage />} />

//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;
// modifiy the code as the session id not comae for localstoreg don't navigat to the path.