const apiUrl = `${process.env.REACT_APP_API_KEY}/api/login`;


exports. loginAuthentication = async () => {
  const response = await fetch(apiUrl);
  return response.json();
};


// export { fetchContractors };
