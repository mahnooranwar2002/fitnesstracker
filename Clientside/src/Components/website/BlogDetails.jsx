import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetails() {
  var {id}=useParams();
var [blogData,SetBlogFetch]=useState({})

function fetchData(){
axios.get(`http://localhost:4000/blogFind/${id}`).then((resp)=>{
    SetBlogFetch(resp.data);
console.log(blogData.FeaturedImage);
})
}
useEffect(()=>{
  fetchData();
})


  return (
    <>
      <Navbar />

      {/* Banner */}
     <div className="container-fluid bannarSec text-white py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <h2>Blogs <span className="text-light">Details</span></h2>
                <nav className="breadcrumbSec mt-3" aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/home" className="text-white">Home</Link>
                    </li>
                    <li className="breadcrumb-item active text-white" aria-current="page">Blogs Details</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

      {/* Main Blog Section */}
      <div className="container my-5">
        <div className="row align-items-start g-5">
          
          {/* Left Image */}
          <div className="col-md-6">
            <img
              src={`/Images/profileImage/${blogData.FeaturedImage}`}
              className="img-fluid rounded-4 shadow"
             width={2000}
            />
          </div>
          {/* Right Content */}
          <div className="col-md-6 ">
            <h2 className="text-start fw-bold text-danger">{blogData.Tittle}</h2>
                 <h5 className="text-end text-white">
             {blogData.AuthorName}
            </h5>
            <p className="text-start text-white">
               {blogData.summary}
            </p>
            <p className="text-start text-white">
                  {blogData.Discription}
           </p>

            
 <p className="text-end text-white">
                  {blogData.date}
           </p>
            
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BlogDetails;
