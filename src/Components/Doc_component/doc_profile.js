import React from 'react';
import './doc_profile.css'; 
import LoginImage from '../../Images/login-form-image.jpg';

//import Table from '@mui/material/Table';
// or
import { Table } from '@mui/material';

const DoctorProfile = ({ doctor }) => {
  const handleBookAppointment = () => {
    doctor.specialization = "Specia";
    doctor.name = "Dela";
    // You can implement your booking logic here, such as opening a modal or redirecting to a booking page
    console.log(`Booking appointment with ${doctor.name}`);
  };        



  return (  
    <div className="doctor-profile">    
      <div className="doctor-details">  
        <img src={LoginImage} alt="Doc_name" className="doctor-photo" />
        <h2>Dr Prabath</h2>  
        <p>Consultant Orthopedic Surgeon</p>
        <p>kandy General hospital</p>
        <p class='doc_main_profile_para'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum molestiae tempora a laborum unde nesciunt consequatur sed. In tempora nostrum sed dolores dolor est vel recusandae quae nihil magnam? Id aperiam tenetur asperiores similique sapiente iure iste voluptas, modi eius omnis blanditiis quidem debitis molestias consequuntur illum rem ab architecto velit. Fugiat hic commodi illo molestias, nihil, numquam, accusantium eveniet eligendi vero in aut sed quae debitis esse! Voluptas dicta corrupti doloremque quas natus?</p>     
      </div>
      <button className="book-appointment-button" onClick={handleBookAppointment}>
        Book Appointment
      </button>
          
    </div>  
  );
};

export default DoctorProfile;
