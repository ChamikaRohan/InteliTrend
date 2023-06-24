import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    const token = localStorage.getItem('token');

    axios.post('http://localhost:8000/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in request headers
        },
      })
      .then((response) => {
        console.log('Test1');
        console.log(response);
        // Do something with the response from the backend
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
      <h1>File Upload</h1>
      <form>
        <div>
          <label htmlFor="fileInput">Select a file to upload:</label>
          <input type="file" id="fileInput" onChange={handleFileInputChange} />
        </div>
        <button type="button" onClick={handleFileUpload}>
          Upload File
        </button>
      </form>
    </div>
  );
}

export default Upload;
