import "./profile.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer, PolarAngleAxis, RadialBarChart, RadialBar,  LineChart, Line  } from 'recharts';
import profileImage from "../Images/profile-image.jpg"
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

  const data = [
    { goal: 'Cardiology', amount: 20 },
    { goal: 'Pediatrician', amount: 20},
    { goal: 'Pediatrician', amount: 10},
    { goal: 'Pediatrician', amount: 14},
    { goal: 'Pediatrician', amount: 24},
  ];

  const data1 = [
    { name: 'L1', value: 40 }
  ];
  
  const circleSize = 250;

const data2 = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='profile'>
        <div className="profile-container">
            <div className="pic-container">
              <img src={profileImage} alt="" className="profile-image" />
              
              <div className="profile-details">
                <h1 className="Name">{userData.firstName} {userData.lastName}</h1>
                <div className="page-item">
                  <span>Blood Group:</span>
                  <span>A+</span>
                </div>
                <div className="page-item">
                  <span>Height:</span>
                  <span>150cm</span>
                </div>
                <div className="page-item">
                  <span>Weight:</span>
                  <span>60kg</span>
                </div>
                <div className="page-item">
                  <span>Date of Birth:</span>
                  <span>{userData.dateOfBirth.slice(0, 10)}</span>
                </div>
                  <div className="page-item">
                    <span>Contact No:</span>
                    <span>{userData.mobileNumber}</span>
                  </div>
                  <div className="page-item">
                    <span>Email:</span>
                    <span>{userData.email}</span>
                  </div>
                  <div className="page-item">
                    <span>Gender:</span>
                    <span>Male</span>
                  </div>
              </div>
            </div>

            <div className="combined-container">
                <div className="detials-container">
                  <div className="page-item">
                    <span>Blood pressure:</span>
                    <span>80 mmHg</span>
                  </div>
                  <div className="page-item">
                    <span>Breathing</span>
                    <span>16 breaths/min</span>
                  </div>
                  <div className="page-item">
                    <span>Pulse:</span>
                    <span>72 beats/min</span>
                  </div>
                  <div className="page-item">
                    <span>Temperature:</span>
                    <span>97.8°F</span>
                  </div>
                </div>
                <div className="reoprts-container">
                  <div className="reprts-heading"><span>My Medical Reports</span></div>
                  
                  <button type='submit' className='repot-button'>General Reports</button>
                  <button type='submit' className='repot-button'>Heart Related</button>
                  <button type='submit' className='repot-button'>Brain Related</button>
                  <button type='submit' className='repot-button'>Diabetics</button>
                  <button type='submit' className='repot-button'>Bone fractures</button>
                  
                </div>
            </div>

            <div className="charts">
              <div className='barchart-container'>
                <div className="barchart-head"><span>Health Goals</span></div>
                <div className="barchart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart width={430} height={170} data={data} layout="vertical">
                        <XAxis type="number" orientation="top" stroke="#285A64" />
                        <YAxis type="category" dataKey="none" axisLine={false} dx={-5} tickLine={false} style={{ fill: "#4D9B98" }} />
                        <Bar background dataKey="amount" fill="#4D9B98" barSize={{ height: 26 }}>
                          <LabelList dataKey="goal"  style={{ fill: "black" }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                </div>                           
              </div>

              <div className="piechart-container">
                <div className="piechart-head"><span>Health Goals</span></div>
                <div className="piechart">
                  <ResponsiveContainer background="yellow">
                    <RadialBarChart
                      width={circleSize}
                      height={circleSize}
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      innerRadius={100}
                      outerRadius={110}
                      barSize={10}
                      data={data1}
                      startAngle={90}
                      endAngle={-270}
                      >
                      <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                      />
                      <RadialBar
                      background
                      clockWise
                      dataKey="value"
                      cornerRadius={circleSize / 2}
                      fill="#82ca9d"
                      />
                      <text
                      x={circleSize / 2}
                      y={circleSize / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="progress-label"
                      >
                      25
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

                


        </div>

        <div className="linechart-container">
          <div className="linechart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={600} height={300} data={data2}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>            
            </ResponsiveContainer>
          </div>
        </div>  

    </div>
  )
}

export default Profile;
