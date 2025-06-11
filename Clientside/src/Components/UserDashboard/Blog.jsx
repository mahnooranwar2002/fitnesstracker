import React, { useEffect,useState,useRef } from 'react'

import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDashboardLayout from './UserDashboardLayout';

const Blog = () => {
      const modalRef = useRef(null);
        const fileInputRef = useRef(null);
         var editmodelOpen=useRef(null);
        const userId = JSON.parse(localStorage.getItem("userData"))?._id;
     var openModal = () => {
        if (modalRef.current) {
          modalRef.current.classList.add('show');
          modalRef.current.style.display = 'block';
          document.body.classList.add('modal-open');
          document.body.style.overflow = 'hidden';
       
        }
      };
      
      var closeModal = () => {
          if (modalRef.current) {
              modalRef.current.classList.remove('show');
              modalRef.current.style.display = 'none';
              document.body.classList.remove('modal-open');
              document.body.style.overflow = '';
              SetBlogvalue({
   user_id:"",
    Tittle: "",
    summary:"",
    Discription:"",
    date:"",
    status:0,
    AuthorName:"",
    FeaturedImage:"",})
          }
        }; 
var [blogVlues,SetBlogvalue]=useState({
    user_id:"",
    Tittle: "",
    summary:"",
    Discription:"",
    date:"",
    status:0,
    AuthorName:"",
    FeaturedImage:"",
})
 const [imgError, setImgError] = useState("");
var InputHandle=(e)=>{
       const file = e.target.files[0];
       console.log(file);
    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      setImgError("Invalid image! Please upload a JPG, JPEG, or PNG file.");
      return;
    }
    setImgError("");
   SetBlogvalue((prev) => ({ ...prev, FeaturedImage: file }));
  };



 var [errors, setErrors] = useState({
 Tittle: "",
    summary:"",
    Discription:"",
    FeaturedImage:""
          });
var insertBlog=(e)=>{
    
e.preventDefault();
 const newErrors = {
    Tittle: "",
    summary:"",
    Discription:"",
    FeaturedImage:""
    };
       if (!blogVlues.summary.trim()) {
      newErrors.summary = "The Summary is required";
    } 
     if (!blogVlues.Tittle.trim()) {
      newErrors.Tittle = "The Tittle is required";
    } 
        if (!blogVlues.Discription.trim()) {
      newErrors.Discription = "The Description is required";
    } 
     
    if (  newErrors.summary||newErrors.Tittle||newErrors.Discription ) {
      setErrors(newErrors);
        
      return;
  
    }
    else{
   setErrors({  
     Tittle: null,
    summary:null,
    Discription:null,
    FeaturedImage:null
   });
   
const username = JSON.parse(localStorage.getItem("userData"))?.name;

   var myDate = new Date();
  var year = myDate.getFullYear();
  var month = String(myDate.getMonth() + 1).padStart(2, '0');
   var dayOfMonth = String(myDate.getDate()).padStart(2, '0');
  var weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(myDate);
   var formattedDateWithWeekday = `${weekday}, ${year}-${month}-${dayOfMonth}`;
   blogVlues.date=formattedDateWithWeekday;
   blogVlues.AuthorName=username;
   blogVlues.user_id=userId;

axios.post("http://localhost:4000/addblog",blogVlues,{
    headers:{"Content-Type":"multipart/form-data"}
  }).then(()=>{
    closeModal();
    fetchBlog();
   toast.success("blog has been submitted successfully! Thank you !", { position: "top-right", theme: "dark" });
SetBlogvalue({
   user_id:"",
    Tittle: "",
    summary:"",
    Discription:"",
    date:"",
    status:0,
    AuthorName:"",
    FeaturedImage:"",})

  SetBlogvalue({ ...blogVlues, FeaturedImage: "" }); 
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }

    }
  )}
}

var [blogs,Setblog]=useState([])
var fetchBlog=()=>{
    axios.get(`http://localhost:4000/fetchblogByuser/${userId}`).then((resp)=>{
Setblog(resp.data)
    })
}


var blogDelate=(id)=>{
axios.get(`http://localhost:4000/blogdel/${id}`).then(()=>{
   toast.error("blog has been Deleted successfully! ", { position: "top-right", theme: "dark" });
    fetchBlog()
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

  var editModalOpen = (id) => {
    if (editmodelOpen.current) {
      editmodelOpen.current.classList.add('show');
      editmodelOpen.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    
       axios.get(`http://localhost:4000/blogFind/${id}`).then((resp)=>{
        SeteditBlog(resp.data)
       
       })
    }
  };
    var closeEditModal = () => {
      if (editmodelOpen.current) {
        editmodelOpen.current.classList.remove('show');
        editmodelOpen.current.style.display = 'none';
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        
         
      }
      
    }; 
   var updateBlogs=(e)=>{
e.preventDefault();
  axios.put(`http://localhost:4000/updateblog/${editblog._id}`, editblog, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then(() => {
    fetchBlog();

       toast.success("blog has been updated successfully! Thank you !", { position: "top-right", theme: "dark" });
 closeEditModal()
      })
  
};

  var  [query,Setquery]=useState("")
  var searchByblogName = async()=>{
    await axios.get(`http://localhost:4000/searchByBlogname/${userId}/search?q=${query}`).then((resp)=>{
      Setblog(resp.data);
      
    })
  }
 useEffect(()=>{
           if(query.length === 0){
          fetchBlog() 
          
            return;
           }
       searchByblogName();},
          [query]);

const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(blogs.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

  return (
    <div>
        <UserDashboardLayout>
        <div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-11">
      <div className='card shadow-sm mt-4 mb-4 '>
        <div className={`card-header text-white  ${style.cardheader}`}>
          <h4 className="mb-0">Blog Information</h4>
        </div>
        
        <div className={`card-body ${style.mycontainer}`}>
     
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for Blog by Tittle..."
            value={query} onChange={(e)=>{
					Setquery(e.target.value)}} 
            />
            <div className="input-group-append">
              <button onClick={openModal} className={`${style.btn2} btn btn-danger`}>
                New
              </button>
            </div>
          </div>

          <div className="table-responsive ">
            <table className="table table-striped table-dark table-hover" >
              <thead className="thead-dark">
                <tr>
                  <th>Tittle</th>
                
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="4">No data available</td>
                  </tr>
                ) : (
                  currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.Tittle}</td>
                      <td>{con.status===0?(<span>Pending</span>):(<span>Approve</span>)}</td>
                        <td>{con.status===0?(
                            <td className="d-flex justify-content-center align-items-center">
                       <button className="btn btn-danger btn-sm  mr-1 mx-1" title='delete' onClick={() => blogDelate(con._id)}>
                             <i className="bx bx-trash m-0 px-2 py-2"></i>
                                 </button>
            <button className='btn btn-secondary btn-sm mr-1 mx-1' onClick={()=>{
                                         viewModalOpen(con._id)
                                     }}>
                                    <i class='bx bx-info-circle  m-0 px-2 py-2'></i>
                                     </button>
                                       <button className='btn btn-primary btn-sm mr-1 mx-1' onClick={()=>{
                                         editModalOpen(con._id)
                                     }}>
                                     <i class='bx bx-edit-alt  m-0 px-2 py-2'></i>
                                     </button>
                                  
                              </td>):
                            (<span>Approve</span>)}
                            
                            </td>
                            
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {blogs.length > 0 && (
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

  {/* Add  Modal */}
<div className="modal fade mt-5" id="addPassengerModal mt-3" ref={modalRef}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">

      {/* Modal Header */}
      <div className="modal-header  text-white">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">Blog</h5>
        <button type="button" className="btn-close btn-close-white" onClick={() => closeModal()}></button>
      </div>
   
      {/* Modal Body */}
      <div className="modal-body ">
         <form onSubmit={insertBlog}>
  <div className="row text-start d-flex">
  <div className="col-md-6">
    <label>Tittle</label>
      <input type="text" className="form-control text-white"  onChange={(e) => SetBlogvalue({ ...blogVlues, Tittle:e.target.value })}    name="Subject"  placeholder="Tittle"  value={blogVlues.Tittle}/>
        {errors.Tittle && <span className="text-danger ">{errors.Tittle}</span>}
            </div>
            <div className="col-md-6">
              <label>Summary</label>
      <input type="text" className="form-control text-white"  name="summary"  value={blogVlues.summary} onChange={(e) => SetBlogvalue({ ...blogVlues, summary:e.target.value })} placeholder="summary" />
         {errors.summary && <span className="text-danger ">{errors.summary}</span>}
            </div>
            </div>
 
              
                    <div className="row text-start">
                  <div className="col-md-12">
                    <label>Pic</label>

      <input type="file" className="form-control" ref={fileInputRef}   name="FeaturedImage"  placeholder="summary" onChange={InputHandle} />
        <div className="d-flex">
            </div>
            {imgError&& <span className="text-danger ">{imgError}</span>}
            </div>
            </div>
 <div className="row text-start">

            <div className="col-md-12">
<label>Description</label>

              <div class="form-floating">
             <textarea class="form-control "   value={blogVlues.Discription} onChange={(e) => SetBlogvalue({ ...blogVlues, Discription:e.target.value })}  placeholder="blog"   id="floatingTextarea2" name='question' style={{"height": "200px"}}> </textarea>
       
           </div>
         {errors.Discription && <span className="text-danger ">{errors.Discription}</span>}
            </div>
             
            </div>
              <div className="modal-footer">
            <button type="submit" className="btn btn-danger">Save changes</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { closeModal() }}>Close</button>
          </div>
            </form>
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
         <div className="row text-start">
  <div className="col-md-12 text-center">
  <img src={`Images/profileImage/${editblog.FeaturedImage}`} width={500} height={200} alt="" />
    
            </div>
           </div> 
  <div className="row text-start">
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
  <div className="modal fade mt-5" id="addPassengerModal mt-3" ref={editmodelOpen}>
 <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">
       <div className='modal-header bg-danger'>
          <h5 className='modal-title text-white' id="addPassengerModalLabel">
               Edit Blog </h5>
<button type="button" class="btn-close btn-close-white" onClick={()=>{closeEditModal()}}></button> </div>
    <div className="modal-body">
                     <img src={`Images/profileImage/${editblog.FeaturedImage}`} width={500} height={200} alt="" />
    
     <form onSubmit={updateBlogs}>
  <div className="row text-start">
  <div className="col-md-12">
    <label className="form-label">Tittle</label>
      <input type="text" className="form-control"  onChange={(e) => SeteditBlog({ ...editblog, Tittle:e.target.value })} name="Subject"  placeholder="Tittle"  value={editblog.Tittle} readOnly />
        <div className="d-flex">
            </div>
            </div>
          {errors.Tittle && <span className="text-danger ">{errors.Tittle}</span>}
            </div>
 
              <div className="row text-start">
                  <div className="col-md-12">
    <label className="form-label">summary</label>
      <input type="text" className="form-control"  name="summary"  value={editblog.summary} onChange={(e) => SeteditBlog({ ...editblog, summary:e.target.value })} placeholder="summary" />
        <div className="d-flex">

            </div>
               {errors.summary && <span className="text-danger ">{errors.summary}</span>}
            </div>
            </div>
                    <div className="row text-start">
                  <div className="col-md-12">
    <label className="form-label">Image</label>
      <input type="file" className="form-control" ref={fileInputRef}   name="FeaturedImage"  placeholder="summary" onChange={InputHandle} />
        <div className="d-flex">
            </div>
            {imgError&& <span className="text-danger ">{imgError}</span>}
            </div>
            </div>
 <div className="row text-start">

            <div className="col-md-12">
              <label className="form-label">Blog</label>
                  <div class="form-floating">
             <textarea class="form-control"   value={editblog.Discription} onChange={(e) => SeteditBlog({ ...editblog, Discription:e.target.value })}  placeholder="blog"   id="floatingTextarea2" name='question' style={{"height": "200px"}}> </textarea>
       
           </div>
         {errors.Discription && <span className="text-danger ">{errors.Discription}</span>}
            </div>
             
            </div>
              <div className="modal-footer">
            <button type="submit" className="btn btn-danger">Save changes</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { closeEditModal() }}>Close</button>
          </div>
            </form>
                                                                  
                                                                </div>
                                                              </div>
                                                            </div>
                                          
                                                          </div>

</UserDashboardLayout>
    </div>
  )
}

export default Blog
