import React, { useEffect, useState } from 'react'
import AdminPanelLayout from './AdminPanelLayout'
import { FaTachometerAlt,FaChartLine, FaBlog,FaRegUserCircle, FaQuestionCircle ,FaEdit } from 'react-icons/fa';
import { MdFeedback } from "react-icons/md";
import axios from 'axios';
const AdminIndex = () => {
    var [userData,setUser]=useState([]);
var fetchData=()=>{
  axios.get("http://localhost:4000/userDetails").then((resp)=>{
    setUser(resp.data);
  })
}

    var [feedbackData,Setfeedback]=useState([]);
var fetchfeedback=()=>{
  axios.get("http://localhost:4000/fetchfeedback").then((resp)=>{
    Setfeedback(resp.data)
  })
}
        var [faqdetail,Setfaq]=useState([]);
var fetchfaq=()=>{
  axios.get("http://localhost:4000/fetchfaq").then((resp)=>{
  Setfaq(resp.data)
  })
}
    var [blogFetch,setBlogDetail]=useState([])
var fetchblog=()=>{
    axios.get("http://localhost:4000/fetchblog").then((blogData)=>{
     setBlogDetail(blogData.data)
    })
}

useEffect(()=>{
    fetchData();
    fetchfeedback();
    fetchfaq();
    fetchblog()
})
  return (
    <>
      <AdminPanelLayout>
    <div className="row">
        <div className="col bg-danger p-5 m-5 ">
           <h4>Users</h4>
<h5 className='text-white'>{userData.length}</h5>
          <FaRegUserCircle style={{fontSize:"2.5rem"}}></FaRegUserCircle>
           
        </div>
          <div className="col bg-danger p-5 m-5 ">
           <h4>Feedback</h4>
<h5 className='text-white'>{feedbackData.length}</h5>
          <MdFeedback style={{fontSize:"2.5rem"}}></MdFeedback>
           
        </div>
    </div>
  <div className="row">
        <div className="col bg-danger p-5 m-5">
           <h4>FAQ</h4>
<h5 className='text-white'>{faqdetail.length}</h5>
          <FaQuestionCircle style={{fontSize:"2.5rem"}}></FaQuestionCircle>
           
        </div>
          <div className="col bg-danger p-5 m-5">
           <h4>Blogs</h4>
<h5 className='text-white'>{blogFetch.length}</h5>
          <FaEdit style={{fontSize:"2.5rem"}}></FaEdit>
           
        </div>
    </div>


      </AdminPanelLayout>



    </>
  )
}

export default AdminIndex
