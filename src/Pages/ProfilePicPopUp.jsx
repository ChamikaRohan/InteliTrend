import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer'
import Header from '../Components/header'

export default function ProfilePicPopUp() {
  const [image, setImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  const token = localStorage.getItem('token');

  function uploadImage() {
    fetch("http://localhost:8000/uploadpropic", {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Original": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchProfilePicture(); // Fetch the updated profile picture after uploading
      });
  }

  function fetchProfilePicture() {
    const token = localStorage.getItem('token');
  
    axios.get("http://localhost:8000/getpropic", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          const { image } = res.data;
          setProfilePicture(image);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  

  return (
    <div>
      <Header />
      <div className='signup-item'>
        <label>Upload Profile Picture</label>
        <input type="file" className="pro" accept='image/*' onChange={convertToBase64} />
      </div>
      <button type="button" className="photobut" onClick={uploadImage}>Upload Pro Pic</button>
      {profilePicture && (
        <div>
          <h2>Profile Picture:</h2>
          <img src={profilePicture} alt="Profile Picture" />
        </div>
      )}
      <Footer />
    </div>
  );
  
}
