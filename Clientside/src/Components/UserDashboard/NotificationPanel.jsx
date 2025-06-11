import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashboardLayout from './UserDashboardLayout';
import { toast } from 'react-toastify';
const NotificationPanel = () => {
    const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem("userData"))?._id;

 var  fetchNoti=()=>{
 axios.get(`http://localhost:4000/notifications/${userId}`)
      .then(res => setNotifications(res.data)) 
  }
  useEffect(() => {
  fetchNoti()
   
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:4000/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch {
      alert("Failed to mark notification as read.");
    }
  };


function deleteNot(id){
  axios.delete(`http://localhost:4000/deleteNoti/${id}`).then(()=>{
 fetchNoti();
      toast.error("The Nofication is Deleted successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });
  })
}

  return (
    <>
    <UserDashboardLayout>
       <div>
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            
          {notifications.map(n => (
            
            <li
              key={n._id}
              onClick={() => markAsRead(n._id)}
              style={{
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: n.isRead ? 'grey' : 'lightgray',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >
                 <div className="container  text-end">
           <button className=' btn btn-danger' onClick={()=>{
            deleteNot(n._id)
           }}>Delete </button>
           </div>
              <strong>{n.message}</strong>
              <br />
              <small>{new Date(n.createdAt).toLocaleString()}</small>
          
            </li>
          ))}
        </ul>
      )}
    </div>
    </UserDashboardLayout>
    </>
  )
}

export default NotificationPanel
