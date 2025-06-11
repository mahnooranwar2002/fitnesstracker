import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {  toast } from 'react-toastify';
const Feedback = () => {
var[feedbacks,Setfeedback]=useState({
   name:"",
     email:"",
     Subject:"",
    feedback: "",
    date:"" 
})

var inputhandle=(e)=>{
  Setfeedback({...feedbacks,[e.target.name]:e.target.value})
}
 
    const username = JSON.parse(localStorage.getItem("userData"))?.name;
        const useremail = JSON.parse(localStorage.getItem("userData"))?.email;
 var [errors, setErrors] = useState({
    subject:null,
     feedback: null
          });
var insertFeeback=(e)=>{
  e.preventDefault();

 const newErrors = {
  subject:null,
   feedback: null
    };
       if (!feedbacks.Subject.trim()) {
      newErrors.subject = "The subject is required";
    } 
        if (!feedbacks.feedback.trim()) {
      newErrors.feedback = "The feedback is required";
    } 
        if (  newErrors.subject||newErrors.feedback) {
      setErrors(newErrors);
        
      return;
  
    }else{
       var myDate = new Date();
  var year = myDate.getFullYear();
  var month = String(myDate.getMonth() + 1).padStart(2, '0');
   var dayOfMonth = String(myDate.getDate()).padStart(2, '0');
  var weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(myDate);
   var formattedDateWithWeekday = `${weekday}, ${year}-${month}-${dayOfMonth}`;
        setErrors({  subject:null,
   feedback: null});
  feedbacks.name=username,
  feedbacks.email=useremail,
  feedbacks.date=formattedDateWithWeekday;
       axios.post("http://localhost:4000/addfeedback",feedbacks).then(()=>{
          toast.success("Feedback submitted successfully! Thank you for helping us improve !", { position: "top-right", theme: "dark" });
          Setfeedback({
              Subject:"",
    feedback: "",
    date:"" 
          })

       })
      }
}



  return (
    <>
      <Navbar />

      {/* Banner Section */}
           <div className="container-fluid bannarSec  text-white py-5">
             <div className="row justify-content-center">
               <div className="col-md-8 text-center">
                 <h2>our <span className="text-light">Review</span></h2>
                 <nav className="breadcrumbSec mt-3" aria-label="breadcrumb">
                   <ol className="breadcrumb justify-content-center">
                     <li className="breadcrumb-item">
                       <Link to="/home" className="text-white">Home</Link>
                     </li>
                     <li className="breadcrumb-item active text-white" aria-current="page">Review</li>
                   </ol>
                 </nav>
               </div>
             </div>
           </div>
           
      {/* Feedback Form & Contact Info */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Feedback Form */}
          <div className="col-md-12">
            <div className="p-4 border rounded shadow">
              <h4 className="mb-4">Send us your Feedback</h4>
              <form onSubmit={insertFeeback}>
                <div className="row mb-3 text-start">
                  <div className="col">
                     <label htmlFor="name">Name</label>
                    <div className="form-floating">
                      <input type="text" readOnly  value={username} className="form-control" id="name" placeholder="Name" onChange={inputhandle} />
                     
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="name">Email</label>
                    <div className="form-floating">
                      <input type="email" readOnly  className="form-control" id="email" placeholder="Email" onChange={inputhandle} value={useremail} />
                    
                    </div>
                  </div>
                </div>

                <div className="mb-3 text-start">
                   <label htmlFor="subject" >Subject</label>
                  <div className="form-floating">

                    <input type="text" name="Subject" onChange={inputhandle} className="form-control  " id="subject" placeholder="Subject" value={feedbacks.Subject} />
                   
                  </div>
                  
                </div>
                {errors.subject && <div className='text-start p-1'>
                  <span className="text-danger ">{errors.subject}</span></div>}
  
                <div className="mb-4 text-start">
                   <label htmlFor="subject " >Feedback</label>
                  <textarea className="form-control" name='feedback' id="message" rows="6" placeholder="Write your feedback here..." onChange={inputhandle} value={feedbacks.feedback}></textarea>
                </div>
    {errors.feedback && <div className='text-start p-1'> <span className="text-danger text-start ">{errors.feedback}</span>
    </div>}
                <button className="btn bg-red  w-100" type="submit">Submit Feedback</button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          {/* <div className="col-md-5 feedbackContact">
            <div className="p-4 border rounded shadow bg-light h-100">
              <h4 className="mb-4 ">Contact Information</h4>
              <div className="mb-3 d-flex align-items-start">
                <i className='bx bx-phone fs-3 me-3 '></i>
                <div>
                  <h6>Call Us</h6>
                  <p className="mb-0">+92 033 50312 356</p>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-start">
                <i className='bx bx-envelope fs-3 me-3 '></i>
                <div>
                  <h6>Email Us</h6>
                  <p className="mb-0">fitnesstracker@gmail.com</p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <i className='bx bx-location-plus fs-3 me-3 '></i>
                <div>
                  <h6>Address</h6>
                  <p className="mb-0">Metro Star Gate, Karachi</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Feedback
