
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios'
const Blogs = () => {

var [blogss,Setblog]=useState([])
var fetchBlog=()=>{
    axios.get(`http://localhost:4000/BlogFetch`).then((resp)=>{
Setblog(resp.data)
    })
}

useEffect(()=>{
  fetchBlog()
})
  return (

      
   
    <>
      <Navbar />

      {/* Banner Section */}
      <div className="container-fluid bannarSec text-white py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2>Blogs <span className="text-light">Us</span></h2>
            <nav className="breadcrumbSec mt-3" aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link to="/home" className="text-white">Home</Link>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">Blogs</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>


      {/* Blog Posts */}
      <div className="container py-5">
        <div className="row g-4">
{
  blogss.length===0?(
    <h5> No blog posts have been added by the admin.</h5>
  ):(
blogss.map((con,index)=>(
          <div className="col-md-4">
            <div className="card blog-card h-100">
              <img src={`Images/profileImage/${con.FeaturedImage}`} className="card-img-top" alt="Workout Tips" />
              <div className="card-body  d-flex flex-column">
                <h5 className="card-title">{con.Tittle}</h5>
                <p className="card-text">{con.summary}</p>
                <Link to={`/Blog_Details/${con._id}`} className="btn btn-danger mt-auto">Read More</Link>
              </div>
            </div>
          </div>
))
  )
}      

        </div>
      </div>

      <Footer />
    </>

  )
}

export default Blogs
