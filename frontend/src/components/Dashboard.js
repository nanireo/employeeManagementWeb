import React from 'react';
import Navbar from './navbar';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username') || localStorage.getItem('username');

  // Store the username in localStorage if it's not already there
  if (username &&!localStorage.getItem('username')) {
    localStorage.setItem('username', username);
  }

  return (
    <div>
      <Navbar />
      <h2>Dash Board</h2>
      <h2 style={{ textAlign: 'center' }}>Welcome {username}</h2>
    </div>
  );
};

export default Dashboard;











// import React from 'react';
// import Navbar from './navbar';
// import { useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const username = params.get('username') || localStorage.getItem('username');

//   return (
//     <div>
//       <Navbar />
//       <h2>Dash Board</h2> 
//       <h2 style={{ textAlign: 'center' }}>Welcome {username}</h2>
//     </div>
//   );
// };

// export default Dashboard;
