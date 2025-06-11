import React, { useEffect, useRef, useState } from 'react'
import AdminPanelLayout from './AdminPanelLayout'
import axios from 'axios'
import style from '../../assets/css/dashboard.module.css'
import { FaToggleOff } from "react-icons/fa6";
const BlogData = () => {
    var [blogFetch,setBlogDetail]=useState([])
var fetchData=()=>{
    axios.get("http://localhost:4000/fetchblog").then((blogData)=>{
     setBlogDetail(blogData.data)
    })
}

  var  [query,Setquery]=useState("")
  var searchByblogName = async()=>{
    await axios.get(`http://localhost:4000/searchByBlog/search?q=${query}`).then((resp)=>{
      setBlogDetail(resp.data);
      
    })
  }


 useEffect(()=>{
           if(query.length === 0){
             fetchData()
          
            return;
           }
       searchByblogName();},
          [query]);
    const [currentPage, setCurrentPage] = useState(1);
              const [itemsPerPage, setItemsPerPage] = useState(5);
              const paginate = (pageNumber) => setCurrentPage(pageNumber);
            
              const indexOfLastItem = currentPage * itemsPerPage;
              const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              const currentItems = blogFetch.slice(indexOfFirstItem, indexOfLastItem);
            
              const pageNumbers = [];
              for (let i = 1; i <= Math.ceil(blogFetch.length / itemsPerPage); i++) {
                pageNumbers.push(i);
              }
   var blogDelate=(id)=>{
              axios.get(`http://localhost:4000/blogdel/${id}`).then(()=>{

                  fetchData()
              })
              }
              var [editblog,SeteditBlog]=useState({})
   var viewmodel=useRef(null);
   var viewModalOpen=(id)=>{
    if (viewmodel.current) {
      viewmodel.current.classList.add('show');
      viewmodel.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      axios.get(`http://localhost:4000/blogFind/${id}`).then((resp)=>{
        SeteditBlog(resp.data)
    
       })
    }
   }
   var closeviewModal = () => {
    if (viewmodel.current) {
      viewmodel.current.classList.remove('show');
      viewmodel.current.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      
     
    }
  }; 

   var blogStatusUpdate=(id)=>{
              axios.put(`http://localhost:4000/blogStatus/${id}`).then(()=>{

                  fetchData()
              })
              }
  return (
    <div>
      <AdminPanelLayout>
       <div className="container-fluid">
       <div className="row justify-content-center">
         <div className="col-lg-10 col-md-11">
           <div className='card shadow-sm mt-4 mb-4 '>
             <div className={`card-header text-white bg-danger ${style.cardheader}`}>
               <h4 className="mb-0">Blog  Information</h4>
             </div>
             
             <div className={`card-body ${style.mycontainer}`}>
              
     
               <div className="input-group mb-3">
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Search for Blog..." 
                    value={query} onChange={(e)=>{
					Setquery(e.target.value)}} 
                 />
            
               </div>
     
               <div className="table-responsive">
                 <table className="table table-striped table-dark table-hover">
                   <thead className="thead-dark">
                     <tr>
                       <th>Author Name</th>
                       <th>Tittle</th>
                       <th>Status</th>
                       
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
               
                       {blogFetch.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="5">No data available</td>
                  </tr>
                ) : (
                blogFetch.map((con, index) => (
                    <tr key={index}>
                     
                     
                       <td>{con.AuthorName}</td>
                        <td>{con.Tittle}</td>
                        
                            <td>{con.status===0?(<span>Pending</span>):(<span>Approve</span>)}</td>
                      <td className="d-flex justify-content-center align-items-center">
                   <button className="btn btn-danger btn-sm  mr-1 mx-1" title='delete' onClick={() => blogDelate(con._id)}>
                             <i className="bx bx-trash m-0 px-2 py-2"></i>
                                 </button>
  <button className='btn btn-secondary btn-sm mr-1 mx-1'  title='info' onClick={()=>{
                                         viewModalOpen(con._id)
                                     }}>
                                    <i class='bx bx-info-circle  m-0 px-2 py-2'></i>
                                     </button>
 <button className='btn btn-primary btn-sm mr-1 mx-1 m-0 px-2 py-2'  title='Status' onClick={()=>{
                                         blogStatusUpdate(con._id)
                                     }}>
                             <FaToggleOff />
                                     </button>
                                 
                              </td></tr>
                  ))
                )}
                   </tbody>
                 </table>
               </div>
     
                {blogFetch.length > 0 && (
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

       <div className="modal fade mt-5" id="addPassengerModal mt-3" ref={viewmodel}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">

      {/* Modal Header */}
      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">Blog</h5>
        <button type="button" className="btn-close btn-close-white" onClick={() => closeviewModal()}></button>
      </div>
   
      {/* Modal Body */}
      <div className="modal-body">
         <div className="row text-center">
  <div className="col-md-12">
   <img src={`/Images/profileImage/${editblog.FeaturedImage}`} width={500} height={200} alt="" />
    
            </div>
           </div> 
  <div className="row text-start">
     <div className="col-md-12">
    <h5 className='text-white'>Author Name</h5>
     <p className='text-white'>{editblog.AuthorName}</p>
            </div>
  <div className="col-md-12">
    <h5 className='text-white'>Tittle</h5>
     <p className='text-white'>{editblog.Tittle}</p>
            </div>
           </div>
            <div className="row text-start">
  <div className="col-md-12">
    <h5 className='text-white'>Summary</h5>
     <p className='text-white'>{editblog.summary}</p>
            </div>
           </div>
  <div className="row text-start">
  <div className="col-md-12">
    <h5 className='text-white'>Description</h5>
     <p className='text-white'>{editblog.Discription}</p>
            </div>
           </div>
              <div className="modal-footer">
           
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { closeviewModal() }}>Close</button>
          </div>
         
      </div>
    </div>
  </div>
</div>
      </AdminPanelLayout>
    </div>
  )
}

export default BlogData
