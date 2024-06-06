// /////////////////////////////////////////////////
// //backend example manual ga session Id creation//
// ////////////////////////////////////////////////
// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());

// const users = [
//   { id: 1, username: 'user1', password: 'password1' },
//   { id: 2, username: 'user2', password: 'password2' }
// ];

// const sessions = {}; // Object to store session IDs

// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     // Generate a session ID (you can use UUID or any other method to ensure uniqueness)
//     const sessionId = generateSessionId();

//     // Store the session ID in the sessions object
//     sessions[sessionId] = user.id;

//     // Send the session ID back to the client
//     res.json({ sessionId });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// // Function to generate a random session ID (you can replace this with your preferred method)
// function generateSessionId() {
//   return Math.random().toString(36).substr(2, 10);
// }

// const port = 5000;
// app.listen(port, () => console.log(Server is running on port ${port}));



// /////////////////////////////
// ////front end sample code////
// ////////////////////////////

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/login', { username, password });
//       const { sessionId } = response.data; // Assuming the session ID is returned from the backend
//       localStorage.setItem('sessionId', sessionId); // Store the session ID in local storage
//       onLogin();
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//         {error && <div>{error}</div>}
//       </form>
//     </div>
//   );
// };




// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('sessionId'); // Check for the session ID instead of JWT token

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };




// const Dashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('sessionId'); // Remove the session ID from local storage
//     window.location.href = '/login';
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };


// const App = () => {
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('sessionId')); // Check for the session ID instead of JWT token

//   const handleLogin = () => {
//     setLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Switch>
//         <Route path="/login">
//           <Login onLogin={handleLogin} />
//         </Route>
//         <ProtectedRoute path="/dashboard" component={Dashboard} />
//         <Redirect from="/" to="/login" />
//       </Switch>
//     </Router>
//   );
// };

// export default App;

