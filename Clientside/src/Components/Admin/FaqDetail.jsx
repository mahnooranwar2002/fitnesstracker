import React, { useEffect,useState,useRef } from 'react'
import AdminPanelLayout from './AdminPanelLayout'
import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const FaqDetail = () => {
   const modalRef = useRef(null);
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
     
        }
      }; 
        var [faqdetail,Setfaq]=useState([]);
var fetchData=()=>{
  axios.get("http://localhost:4000/fetchfaq").then((resp)=>{
  Setfaq(resp.data)
  })
}

var  faqDelate=(id)=>{
 axios.delete(`http://localhost:4000/deletefaq/${id}`).then((resp)=>{
  toast.error("The FAQ is Deleted successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });
     fetchData()
})
}

  var  [query,Setquery]=useState("")
  var searchfeedback = async()=>{
    await axios.get(`http://localhost:4000/searchfaq/search?q=${query}`).then((resp)=>{
     Setfaq(resp.data)
      
    })
  }
  var [faqValues,setFaq]=useState({
       Subject:'',
     question: '',
    answer:'' 
  })
    var InputHandle=(e)=>{
    setFaq({...faqValues,[e.target.name]:e.target.value})
   }
    var [errors, setErrors] = useState({
       subject:null,
        question: null,
    answer:null 
             });
var insertFaq=(e)=>{
e.preventDefault();
 const newErrors = {
     subject:null,
        question:null,
    answer:null
    };
       if (!faqValues.Subject.trim()) {
      newErrors.subject = "The subject is required";
    } 
        if (!faqValues.question.trim()) {
      newErrors.question = "The question is required";
    } 
           if (!faqValues.answer.trim()) {
      newErrors.answer = "The answer is required";
    } 
        if ( newErrors.subject||newErrors.answer|| newErrors.question) {
      setErrors(newErrors);
        
      return;
  
    }
    else{
         setErrors({  subject:null,question: null,answer:null });
axios.post('http://localhost:4000/addfaq',faqValues).then(()=>{
    setFaq({
       Subject:"",
     question: "",
    answer:"" 
  })
  closeModal();
   fetchData();

 toast.success("The FAQ is added successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });

})
    }
  }

       useEffect(()=>{
           if(query.length === 0){
            fetchData()
            return;
           }
       searchfeedback();},
          [query]);
          // for pagination
           const [currentPage, setCurrentPage] = useState(1);
              const [itemsPerPage, setItemsPerPage] = useState(5);
              const paginate = (pageNumber) => setCurrentPage(pageNumber);
            
              const indexOfLastItem = currentPage * itemsPerPage;
              const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              const currentItems = faqdetail.slice(indexOfFirstItem, indexOfLastItem);
            
              const pageNumbers = [];
              for (let i = 1; i <= Math.ceil(faqdetail.length / itemsPerPage); i++) {
                pageNumbers.push(i);
              }
      var [editfaq,Seteditfaq]=useState({})
   var viewmodel=useRef(null);
   var viewModalOpen=(id)=>{
    if (viewmodel.current) {
      viewmodel.current.classList.add('show');
      viewmodel.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      axios.get(`http://localhost:4000/faqFind/${id}`).then((resp)=>{
        Seteditfaq(resp.data)
    
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
     var ediInputHandle=(e)=>{
    Seteditfaq({...editfaq,[e.target.name]:e.target.value})
   }
  var updateFaq=(r)=>{
    r.preventDefault();
axios.put(`http://localhost:4000/faqUpdate/${editfaq._id}`,editfaq).then(()=>{
  fetchData();
  closeviewModal();
   toast.success("The FAQ is Updated successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });

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
               <h4 className="mb-0">Frequently Asked Question Information</h4>
             </div>
             
             <div className={`card-body ${style.mycontainer}`}>
              
     
               <div className="input-group mb-3">
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Search for Feedback..." value={query} onChange={(e)=>{
					Setquery(e.target.value)}} 
                  
                 />
               <button onClick={openModal} className={`${style.btn2} btn btn-danger`}>
                               New
                             </button>
               </div>
     
               <div className="table-responsive">
                 <table className="table table-striped table-dark table-hover">
                   <thead className="thead-dark">
                     <tr>
                       <th>Subject</th>
                       <th>Question</th>
                       <th>Answer</th>
                       
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
               
                       {faqdetail.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="5">No data available</td>
                  </tr>
                ) : (
                currentItems.map((con, index) => (
                    <tr key={index}>
                     
                     
                       <td>{con.Subject}</td>
                        <td>{con.question}</td>
                            <td>{con.answer}</td>
                      <td className="d-flex justify-content-center align-items-center">
                       <button className="btn btn-danger btn-sm mr-1 mx-1" title='delete' onClick={() => faqDelate(con._id)}>
                             <i className="bx bx-trash"></i>
                                 </button>
  <button className="btn btn-primary btn-sm mr-1 mx-1" title='edit' onClick={() => viewModalOpen(con._id)}>
                 <i className="bx bx-edit-alt"></i>
                    </button>
                                
                                 
                              </td>
                              </tr>
                  ))
                )}
                   </tbody>
                 </table>
               </div>
     
                {faqdetail.length > 0 && (
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
  
 <div className="modal fade mt-5" id="addPassengerModal " ref={modalRef}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">

      {/* Modal Header */}
      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">Frequently Asked Question </h5>
        <button type="button" className="btn-close btn-close-white" onClick={() => closeModal()}></button>
      </div>

      {/* Modal Body */}
      <div className="modal-body">
        <form onSubmit={insertFaq}>
      <div className="row text-start">

            <div className="col-md-12">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" value={faqValues.Subject} name="Subject" onChange={InputHandle}  placeholder="Food Item" />
                 <div className="d-flex">
                 {errors.subject && <span className="text-danger text-left ">{errors.subject}</span>}
            </div>
            </div>
           
            </div>
  <div className="row text-start">

            <div className="col-md-12">
              <label className="form-label">Question</label>
                  <div class="form-floating">
             <textarea class="form-control"  value={faqValues.question} placeholder="Leave a note here"  onChange={InputHandle}  id="floatingTextarea2" name='question' style={{"height": "100px"}}> </textarea>
            
           </div>
      
            </div>
             {errors.question && <span className="text-danger ">{errors.question}</span>}
            </div>
 <div className="row g-3">

            <div className="col-md-12 text-start">
              <label className="form-label">Answer </label>
                  <div class="form-floating">
             <textarea class="form-control"  onChange={InputHandle}   value={faqValues.answer} placeholder="Leave a note here" id="floatingTextarea2" name='answer' style={{"height": "100px"}}> </textarea>
            
           </div>
      
            </div>
             {errors.answer && <span className="text-danger ">{errors.answer}</span>}
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

 <div className="modal fade mt-5" id="addPassengerModal " ref={viewmodel}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">

      {/* Modal Header */}
      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">Frequently Asked Question </h5>
        <button type="button" className="btn-close btn-close-white" onClick={() => closeviewModal()}></button>
      </div>

      {/* Modal Body */}
      <div className="modal-body">
        <form onSubmit={updateFaq}>
      <div className="row text-start">

            <div className="col-md-12">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" value={editfaq.Subject} name="Subject" onChange={ediInputHandle}  placeholder="Food Item" />
                 <div className="d-flex">
                 {errors.subject && <span className="text-danger text-left ">{errors.subject}</span>}
            </div>
            </div>
           
            </div>
  <div className="row text-start">

            <div className="col-md-12">
              <label className="form-label">Question</label>
                  <div class="form-floating">
             <textarea class="form-control"  value={editfaq.question} placeholder="Leave a note here"  onChange={ediInputHandle}  id="floatingTextarea2" name='question' style={{"height": "100px"}}> </textarea>
           
           </div>
      
            </div>
             {errors.question && <span className="text-danger ">{errors.question}</span>}
            </div>
 <div className="row g-3">

            <div className="col-md-12 text-start">
              <label className="form-label">Answer </label>
                  <div class="form-floating">
             <textarea class="form-control"  onChange={ediInputHandle}   value={editfaq.answer} placeholder="Leave a note here" id="floatingTextarea2" name='answer' style={{"height": "100px"}}> </textarea>
             
           </div>
      
            </div>
             {errors.answer && <span className="text-danger ">{errors.answer}</span>}
            </div>
              <div className="modal-footer">
            <button type="submit" className="btn btn-danger">Save changes</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { closeviewModal() }}>Close</button>
          </div>
          </form>
      </div>
    </div>
  </div>
</div>

</AdminPanelLayout>

    </div>
  )
}

export default FaqDetail
