import React, { useEffect, useState } from 'react'
import AdminPanelLayout from './AdminPanelLayout'
import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import {  toast } from 'react-toastify';
const FeedbackDetails = () => {
    var [feedbackData,Setfeedback]=useState([]);
var fetchData=()=>{
  axios.get("http://localhost:4000/fetchfeedback").then((resp)=>{
    Setfeedback(resp.data)
  })
}

var  feedbackDelate=(id)=>{
 axios.delete(`http://localhost:4000/deletefeedback/${id}`).then((resp)=>{
  fetchData()
   toast.error("The Feedback is deleted.", { position: "top-right", autoClose: 3000 ,theme: "dark",});
    })
     
}


  var  [query,Setquery]=useState("")
  var searchuser = async()=>{
    await axios.get(`http://localhost:4000/searchfeeeback/search?q=${query}`).then((resp)=>{
     Setfeedback(resp.data);
      
    })
  }

       useEffect(()=>{
           if(query.length === 0){
            fetchData()
            return;
           }
       searchuser();},
          [query]);
          // for pagination
           const [currentPage, setCurrentPage] = useState(1);
              const [itemsPerPage, setItemsPerPage] = useState(5);
              const paginate = (pageNumber) => setCurrentPage(pageNumber);
            
              const indexOfLastItem = currentPage * itemsPerPage;
              const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              const currentItems = feedbackData.slice(indexOfFirstItem, indexOfLastItem);
            
              const pageNumbers = [];
              for (let i = 1; i <= Math.ceil(feedbackData.length / itemsPerPage); i++) {
                pageNumbers.push(i);
              }
  return (
    <>
           <AdminPanelLayout>
             <div className="container-fluid">
       <div className="row justify-content-center">
         <div className="col-lg-10 col-md-11">
           <div className='card shadow-sm mt-4 mb-4 '>
             <div className={`card-header text-white bg-danger ${style.cardheader}`}>
               <h4 className="mb-0">Feedback Information</h4>
             </div>
             
             <div className={`card-body ${style.mycontainer}`}>
              
     
               <div className="input-group mb-3">
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Search for feeback..." value={query} onChange={(e)=>{
					Setquery(e.target.value)}} 
                  
                 />
                 <div className="input-group-append">
                
                 </div>
               </div>
     
               <div className="table-responsive">
                 <table className="table table-striped table-striped table-dark table-hover">
                   <thead className="thead-dark">
                     <tr>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Subject</th>
                        <th>Feedback</th>
                        <th>Date</th>
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
               
                       {feedbackData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="8">No data available</td>
                  </tr>
                ) : (
                currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.name}</td>
                      <td>{con.email}</td>
                     
                       <td>{con.Subject}</td>
                        <td>{con.feedback}</td>
                          <td>{con.date}</td>
                      <td className="d-flex justify-content-center align-items-center">
                       <button className="btn btn-danger btn-sm  " title='delete' onClick={() => feedbackDelate(con._id)}>
                             <i className="bx bx-trash m-0 px-2 py-2"></i>
                      </button>

                                 
                              </td></tr>
                  ))
                )}
                   </tbody>
                 </table>
               </div>
     
                {feedbackData.length > 0 && (
                 <nav className="mt-3">
                   <ul className="pagination justify-content-center">
                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                       <button onClick={() => paginate(currentPage - 1)} className="page-link">
                         Previous
                       </button>
                     </li>
                     {pageNumbers.map((number) => (
                       <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                         <button onClick={() => paginate(number)} className="page-link bg-danger border-0">
                           {number}
                         </button>
                       </li>
                     ))}
                     <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                       <button onClick={() => paginate(currentPage + 1)} className="page-link ">
                         Next
                       </button>
                     </li>
                   </ul>
                 </nav>
               )} 
             </div>
           </div>
         </div>
       </div>
     </div>
     

</AdminPanelLayout>
    </>
  )
}

export default FeedbackDetails
