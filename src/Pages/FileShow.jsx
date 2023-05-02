import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoList() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/photos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setPhotos(response.data.files);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Photos</h1>
      {photos.map((photo) => (
        <div key={photo}>
          <img src={`uploads/${photo}`}  />
          <p>{photo}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
