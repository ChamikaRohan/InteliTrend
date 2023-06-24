import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const token = localStorage.getItem('token');


        if (!token) {
          throw new Error('No token found');
          console.log('Eror in token variable');
        }

        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in request headers
          },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        setError(error.response.data.msg);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {userData.firstName} {userData.lastName}
      </h1>
      <p>Email: {userData.email}</p>
      <p>Date of Birth: {userData.dateOfBirth}</p>
      <p>Mobile Number: {userData.mobileNumber}</p>
    </div>
  );
};

export default Profile;
