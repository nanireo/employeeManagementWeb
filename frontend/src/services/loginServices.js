const apiUrl = 'https://employeemanagementweb.onrender.com/api/login';


exports. loginAuthentication = async () => {
  const response = await fetch(apiUrl);
  return response.json();
};


// export { fetchContractors };
