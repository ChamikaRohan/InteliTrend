import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Doclist({ userData }) {
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {

  //       const token = localStorage.getItem('token');


  //       if (!token) {
  //         throw new Error('No token found');
  //         console.log('Eror in token variable');
  //       }

  //       const response = await axios.get('http://localhost:8000/doclsit', {
  //         headers: {  
  //           Authorization: `Bearer ${token}`, // Include JWT token in request headers
  //         },
  //       });
  //       console.log(response.data);
  //       setUserData(response.data);
  //     } catch (error) {
  //       setError(error.response.data.msg);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:8000/doclist", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setData(data.data);
    });
  },[]);



  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>nic</th>
          <th>email</th>
          <th>dateOfBirth</th>
          <th>mobileNumber</th>
        </tr>
        </thead>
        <tbody>
          {data.map((i) =>{
            return(
              <tr>
                <td>{i.firstName}</td>
                <td>{i.lastName}</td>
                <td>{i.nic}</td>
                <td>{i.email}</td>
                <td>{i.dateOfBirth}</td>
                <td>{i.mobileNumber}</td>
              </tr>
              


            )
          })}
        </tbody>
      </table>
    </div>
  )
}
