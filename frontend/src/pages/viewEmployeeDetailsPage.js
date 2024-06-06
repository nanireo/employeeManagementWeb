import React, { useEffect, useState } from 'react';
import ViewEmployeeDetails from '../components/viewEmployeeDetails';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import ViewContractorDetails from './../components/UpdateForm';

const ViewEmployeeDetailsPage = () => {
  let { id } = useParams();


  const [contractorData, setContractorData] = useState(null);
  console.log( "contractorData " , contractorData);


  useEffect(() => {
    // Fetch contractor data using the ID
    axios.get(`${process.env.REACT_APP_API_KEY}/${id}`)
        .then((response) => {
          //console.log( "after get the data View Contractor Details Page " , response);
            setContractorData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching contractor data:', error);
        });
}, [id]);
       
       
  return (
    <div>
      {/* <h1>Contractor Profile</h1> */}
      {contractorData && <ViewEmployeeDetails  initialData = {contractorData} />}
      {/* Add other components as needed */}
    </div>
  );
};

export default ViewEmployeeDetailsPage;
