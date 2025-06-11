
import UserDashboardLayout from './UserDashboardLayout'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserIndex = () => {
    const [progress, setProgress] = useState([]);

  const userLogin = JSON.parse(window.localStorage.getItem("userData"))?._id;

  const getProgress = () => {
    axios.get(`http://localhost:4000/fetchprogress/${userLogin}`)
      .then((res) => {
        // Format data: convert date to readable format if needed
        const formattedData = res.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(), // make 'date' readable for X-axis
        }));
        setProgress(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    if (userLogin) {
      getProgress();
    }
  }, [userLogin]);
  return (
    <>
<UserDashboardLayout>
   <div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-11">
 <div style={{ width: '100%', padding: '2rem' }}>

      <h2 className="text-2xl font-bold mb-4">
        Your Progress Over Time</h2>

      <div style={{ width: '100%', height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progress}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateDay" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Example Lines - you can add/remove depending what you want to track */}
            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="runTime" stroke="#82ca9d" />
            <Line type="monotone" dataKey="squatMax" stroke="#ffc658" />
            <Line type="monotone" dataKey="benchPressMax" stroke="#ff7300" />
            <Line type="monotone" dataKey="deadliftMax" stroke="#00c49f" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
      
    </div>
</div></div>

 </UserDashboardLayout>
    </>
  )
}

export default UserIndex
