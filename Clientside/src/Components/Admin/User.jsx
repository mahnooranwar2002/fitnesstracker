import React, { useEffect, useState } from 'react'
import AdminPanelLayout from './AdminPanelLayout'
import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const User = () => {
  
var [userData,setUser]=useState([]);
var fetchData=()=>{
  axios.get("http://localhost:4000/userDetails").then((resp)=>{
    setUser(resp.data);
  })
}

var  userDelate=(id)=>{
 axios.delete(`http://localhost:4000/userDel/${id}`).then(()=>{
     fetchData()
      toast.error("The User is has been deleted.", { position: "top-right", autoClose: 3000 ,theme: "dark",});
})
}
var updateStatus=(id,)=>{
    axios.put(`http://localhost:4000/userStatus/${id}`).then((ews)=>{
           fetchData();
 toast.success("Your profile has been updated.", { position: "top-right", autoClose: 3000 ,theme: "dark",});
  })
}
  var  [query,Setquery]=useState("")
  var searchuser = async()=>{
    await axios.get(`http://localhost:4000/searchByuserName/search?q=${query}`).then((resp)=>{
     setUser(resp.data);
      
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
              const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
            
              const pageNumbers = [];
              for (let i = 1; i <= Math.ceil(userData.length / itemsPerPage); i++) {
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
               <h4 className="mb-0">User Information</h4>
             </div>
             
             <div className={`card-body ${style.mycontainer}`}>
              
     
               <div className="input-group mb-3">
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Search for user..." value={query} onChange={(e)=>{
					Setquery(e.target.value)}} 
                  
                 />
                 <div className="input-group-append">
                
                 </div>
               </div>
     
               <div className="table-responsive">
                 <table className="table table-striped  table-dark table-hover">
                   <thead className="thead-dark">
                     <tr>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Status</th>
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
               
                       {userData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="4">No data available</td>
                  </tr>
                ) : (
                currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.name}</td>
                      <td>{con.email}</td>
                      <td>{con.status===1?(
                        <span>Active</span>
                      ):(     <span>Deactive</span>)}</td>
                      
                      <td className="d-flex justify-content-center align-items-center">
                       <button className="btn btn-danger btn-sm mr-1 mx-1" title='delete' onClick={() => userDelate(con._id)}>
                             <i className="bx bx-trash"></i>
                                 </button>

             <button className="btn btn-primary btn-sm mr-1 mx-1" title='Status' onClick={() => updateStatus(con._id)}>
                 <i className="bx bx-edit-alt"></i>
                    </button>
                                 
                              </td></tr>
                  ))
                )}
                   </tbody>
                 </table>
               </div>
     
                {userData.length > 0 && (
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

export default User
