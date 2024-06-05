const apiUrl = `${process.env.REACT_APP_API_KEY}/api/login` || 'https://employeemanagementweb.onrender.com/api/login';

// const apiUrl = process.env.REACT_APP_API_KEY || 'https://employeemanagementweb.onrender.com';

exports. loginAuthentication = async () => {
  const response = await fetch(apiUrl);
  return response.json();
};


// export { fetchContractors };
