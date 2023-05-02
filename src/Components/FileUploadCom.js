import React, { useState } from 'react';
import './fileUploadCom.css'
import axios from 'axios';

function FileUploadCom() {

  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  var catogorystring =null;

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleFileUpload = (event) => {
    console.log(category);
    switch (category) {
        case '10':
          catogorystring = 'General Reports';
        break;
        case '20':
            catogorystring = 'Heart';
          break;
        case '30':
            catogorystring = 'Brain';
          break;
        case '40':
            catogorystring = 'Diabetics';
          break;
        case '50':
            catogorystring = 'Bone fractures';
        break;
        case '60':
            catogorystring = 'Other';
      }
    console.log(catogorystring);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    const token = localStorage.getItem('token');

    axios.post('http://localhost:8000/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in request headers
        Type: catogorystring
      },
    })
      .then((response) => {
        console.log(response);
        // Do something with the response from the backend
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


    
    

  return (
    <div>
        <div className="upload-container">
            <div className="upload-heading">
                <span>Upload Your Document</span>
            </div>
            <div className="upload-items">
                {/* <div className="upload-doc">
                    <input type="text" placeholder='Drag & Drop file OR' id='upload-file' name='upload-file'></input>
                </div> */}

                <div class="container">
                    <div class="header-1">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ></path>{" "}
                        </g>
                        </svg>{" "}
                        <label htmlFor="fileInput">Select a file to upload:</label>
                        <input type="file" id="fileInput" onChange={handleFileInputChange} />
                        <button type="button" onClick={handleFileUpload}>
                            Upload File
                            </button>
                    </div>
                    
                    <input id="file" type="file" />
                    </div>

                <div className="upload-details">
                    <div className="details-item">
                        <label>Date: </label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div className="details-item">
                        <label>Select Category: </label>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="">Select a category</option>
                            <option value="10">General Reports</option>
                            <option value="20">Heart Related</option>
                            <option value="30">Brain Related</option>
                            <option value="40">Diabetics</option>
                            <option value="50">Bone fractures</option>
                            <option value="60">Other Category</option>
                        </select>
                        {/* <input type='text' placeholder=''></input> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FileUploadCom;