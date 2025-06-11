import style from '../../assets/css/dashboard.module.css'
import React, { useEffect,useState,useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDashboardLayout from './UserDashboardLayout'
import ExportButtons from './ExportButtons';

const Progress = () => {
      const modalRef = useRef(null);
          var editmodelOpen=useRef(null);
          var userLogin=JSON.parse(window.localStorage.getItem("userData"))?._id;
          
   
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
                    }}
  const [progress, setProgress] = useState({
                        userId: '', 
                        weight: "",
                        chest: "",   
                        waist: "",
                        hips: "",
                        arms: "",
                        legs: "",
                        runTime: "", 
                        squatMax:"", 
                        benchPressMax:"",
                        deadliftMax: "",
                        notes: "", 
                        dateDay:""
                      });       
      const [formError,setError] = useState({
                        userId: '', 
                        weight: '',
                        chest: '',   
                        waist: '',
                        hips: '',
                        arms: '',
                        legs: '',
                        runTime: '', 
                        squatMax: '', 
                        benchPressMax: '',
                        deadliftMax: '',
                        notes: '', 
                        dateDay:''
                      });                 
                      
                          
var addProgress = (e) => {
  e.preventDefault()


  var newErrors = {
    weight: null,
    chest: null,
    waist: null,
    hips: null,
    arms: null,
    legs: null,
    runTime: null,
    squatMax: null,
    benchPressMax: null,
    deadliftMax: null,
    notes: null,
  };
  if (!progress.weight) {
    newErrors.weight = "The weight is required!";
  } else if (!/^\d+$/.test(progress.weight)) {
    newErrors.weight = "The weight must be a positive whole number!";
  }
  
  if (!progress.chest) {
    newErrors.chest = "The chest is required!";
  } else if (!/^\d+$/.test(progress.chest)) {
    newErrors.chest = "The chest must be a positive whole number!";
  }
  
  if (!progress.waist) {
    newErrors.waist = "The waist is required!";
  } else if (!/^\d+$/.test(progress.waist)){
    newErrors.waist = "The Waist must be a positive whole number!";
  }


     
   if (!progress.hips) {
    newErrors.hips = "The hips are required!";
  } else if (!/^\d+$/.test(progress.hips)) {
    newErrors.hips = "The hips must be a positive whole number!";
  }
  
  if (!progress.runTime) {
    newErrors.runTime = "The Run Time is required!";
  } else if (!/^\d+$/.test(progress.runTime)) {
    newErrors.runTime = "The Run Time must be a positive whole number!";
  }
  
  if (!progress.squatMax) {
    newErrors.squatMax = "The Squat Max is required!";
  } else if (!/^\d+$/.test(progress.squatMax)) {
    newErrors.squatMax = "The Squat Max must be a positive whole number!";
  }
  
  if (!progress.benchPressMax) {
    newErrors.benchPressMax = "The Bench Press Max is required!";
  } else if (!/^\d+$/.test(progress.benchPressMax)) {
    newErrors.benchPressMax = "The Bench Press Max must be a positive whole number!";
  }
  
  if (!progress.deadliftMax) {
    newErrors.deadliftMax = "The Deadlift Max is required!";
  } else if (!/^\d+$/.test(progress.deadliftMax)) {
    newErrors.deadliftMax = "The Deadlift Max must be a positive whole number!";
  }
  
  if (!progress.notes) {
    newErrors.notes = "The Note is required!";
  }

if (newErrors.weight || newErrors.chest || newErrors.waist || newErrors.hips 
  ||newErrors.runTime ||newErrors.squatMax || newErrors.benchPressMax || newErrors.notes) {
  setError(newErrors);
  return;
}  
else{ var myDate = new Date();
  var year = myDate.getFullYear();
  var month = String(myDate.getMonth() + 1).padStart(2, '0');
   var dayOfMonth = String(myDate.getDate()).padStart(2, '0');
  var weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(myDate);
   var formattedDateWithWeekday = `${weekday}, ${year}-${month}-${dayOfMonth}`;
    progress.userId=userLogin;
progress.dateDay=formattedDateWithWeekday;
                        axios.post('http://localhost:4000/addprogress', progress)
.then(()=> {
 toast.success("Progress Added successfully!.", { position: "top-right", autoClose: 3000,theme: "dark", });
 closeModal();
setProgress({
    userId: '', 
       weight: '',
     chest: '',   
    waist: '',
    hips: '',
     arms: '',
      legs: '',
      runTime: '', 
    squatMax: '', 
     benchPressMax: '',
      deadliftMax: '',
       notes: '', 
 })
 })
}
 }   
 const handleInput = (e) => {
  setProgress({
 ...progress, [e.target.name]: e.target.value});};
 
 var [fetchProgress,SetfetchProgress]=useState([])
var fetchProgressData=()=>{
axios.get(`http://localhost:4000/fetchprogress/${userLogin}`).then((resp)=>{
  SetfetchProgress(resp.data)
})
}


var delProgress=(id)=>{
  axios.delete(`http://localhost:4000/deleteprogress/${id}`).then(()=>{
      toast.error("The Progress is Deleted successfully .", { position: "top-right", autoClose: 3000,theme: "dark", })
 
  })
}
var [editProgress,Seteditprogress]=useState({})
var viewmodel=useRef(null);
var viewModalOpen=(id)=>{
 if (viewmodel.current) {
   viewmodel.current.classList.add('show');
   viewmodel.current.style.display = 'block';
   document.body.classList.add('modal-open');
   document.body.style.overflow = 'hidden';
   axios.get(`http://localhost:4000/findprogress/${id}`).then((resp)=>{
     Seteditprogress(resp.data)
 
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
  
     axios.get(`http://localhost:4000/findprogress/${id}`).then((resp)=>{
      Seteditprogress(resp.data)
     
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
var EditTinputHandle=(e)=>{
  Seteditprogress({...editProgress,[e.target.name]:e.target.value})
  }
  var Editprogress=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:4000/updateprogress/${editProgress._id}`,editProgress ).then(()=>fetchProgress(),

    closeEditModal(),
       toast.success("The Progress is updated successfully .", { position: "top-right", autoClose: 3000,theme: "dark", })
 

);
  }

  //search 
 
  useEffect(()=>{
    fetchProgressData();
  });
   const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5);
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = fetchProgress.slice(indexOfFirstItem, indexOfLastItem);
    
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(fetchProgress.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }
  return (
    <>
      <UserDashboardLayout>
          <div className={` container-fluid ${style.mainbox} `}>
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-11">
      <div className={`card ${style.mycontainer} shadow-sm mt-4 mb-4`}>
        <div className='card-header text-white'>
          <h3 className="mb-0">Progress Information</h3>
        </div>
        <div className={`container ${style.mycontainer}`}>
          <div className="card-body table-responsive mt-3">
            <div className="mb-4">
              {userLogin && <ExportButtons userId={userLogin} />}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="searchPassenger"
                placeholder="Search for progress..."
              />
              <div className="input-group-append">
                <button className='btn btn-danger' onClick={() => openModal()}>
                  New
                </button>
              </div>
            </div>

            <table className="table table-striped table-dark table-hover ">
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Run Time</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchProgress.length === 0 ? (
                  <tr className='text-center'>
                    <td colSpan="4">No data available</td>
                  </tr>
                ) : (
                  currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.weight}</td>
                      <td>{con.runTime}</td>
                      <td>{con.dateDay}</td>
                      <td className='d-flex justify-content-center align-items-center'>
                        <button
                          className='btn btn-danger btn-sm mr-1 mx-1'
                          onClick={() => {
                            delProgress(con._id);
                          }}
                        >
                          <i className='bx bx-trash m-0 px-2 py-2' ></i>
                        </button>
                        <button
                          className='btn btn-primary btn-sm mr-1 mx-1 '
                          onClick={() => {
                            editModalOpen(con._id);
                          }}
                        >
                          <i className='bx bx-edit-alt m-0 px-2 py-2'></i>
                        </button>
                        <button
                          className='btn btn-secondary btn-sm mr-1 mx-1  '
                          onClick={() => {
                            viewModalOpen(con._id);
                          }}
                        >
                          <i className='bx bx-info-circle m-0 px-2 py-2'></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {fetchProgress.length > 0 && (
            <div className={`container  mt-3 pt-2 ${style.pagination} `}>
              <nav >
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link">
                      Previous
                    </button>
                  </li>
                  {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button onClick={() => paginate(number)} className="page-link bg-danger border-0">
                        {number}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  <div className=' modal fade mt-5' id="addPassengerModal" ref={modalRef}>
  <div className={`modal-dialog modal-lg `}>
 <div className="modal-content">
  <div className=' modal-header '>
 <h5 className=' modal-title text-white' id="addPassengerModalLabel">
 Progress Tracking  </h5>
 <button type="button" class="btn-close" onClick={()=>{closeModal()}}></button>
   </div>
  <div className="modal-body ">
  <form onSubmit={addProgress}>
  <div className="row p-2 text-start">
<div className="col">
<label htmlFor="">Weight</label>
<input
          type="text"
          placeholder="Weight"
          className="form-control"
          onChange={handleInput}
          name="weight"
          value={progress.weight}
        />
{formError.weight && (
          <div className="invalid-feedback d-block text-start">{formError.weight}</div>
        )}
</div>
<div className="col">
  <label htmlFor="">Chest</label>
<input
          type="text"
          placeholder="Chest"
          onChange={handleInput}
             className="form-control"
          name="chest"
          value={progress.chest}
        />
        {formError.chest && (
          <div className="invalid-feedback d-block text-start">{formError.chest}</div>
        )}
</div>
</div>
<div className="row p-2 text-start">
  <div className="col">
    <label htmlFor="">Waist</label>
  <input
          type="text"
          placeholder="Waist"
          value={progress.waist}
          onChange={handleInput}
          name="waist"
             className="form-control"
        />
     
          {formError.waist && (
          <div className="invalid-feedback d-block text-start">{formError.waist}</div>
        )}
 
  </div>
  <div className="col">
    <label htmlFor="">Hips</label>
  <input
          type="text"
          placeholder="Hips"
          value={progress.hips}
             className="form-control"
          onChange={handleInput}
          name="hips"/>
           {formError.hips && (
          <div className="invalid-feedback d-block text-start">{formError.hips}</div>
        )}    
  </div>
</div>
<div className="row p-2  text-start">
    <div className="col">
      <label htmlFor="">Arms</label>
        <input
          type="text"
          value={progress.arms}
          placeholder="Arms"
          onChange={handleInput}
          name="arms"
             className="form-control"
        />
          {formError.arms && (
          <div className="invalid-feedback d-block text-start">{formError.arms}</div>
        )} 
        </div>
        <div className="col">
          <label htmlFor="">Legs</label>
        <input
          type="text"
          value={progress.legs}
          placeholder="Legs"
          onChange={handleInput}
          name="legs"
             className="form-control"
        />

  {formError.legs && (
          <div className="invalid-feedback d-block text-start">{formError.legs}</div>
        )} 
        </div>
      </div>
      <div className="row p-2 text-start">
        <div className="col">
          <label htmlFor="">Run Time</label>
        <input
          type="text"
          value={progress.runTime}
          placeholder="Run Time (in minutes)"
          onChange={handleInput}
          name="runTime"
            className="form-control"
        />
          {formError.runTime && (
          <div className="invalid-feedback d-block text-start">{formError.runTime}</div>
        )} 
      </div>
      <div className="col">
           <label htmlFor="">Squat Max</label>
        <input
           value={progress.squatMax}
          type="text"
          placeholder="Squat Max (kg)"
          onChange={handleInput}
          name="squatMax"
            className="form-control"
        />
            {formError.squatMax && (
          <div className="invalid-feedback d-block text-start">{formError.squatMax}</div>
        )} 
        </div>
        </div>
       <div className="row p-2 text-start">
         <div className="col">
          <label htmlFor="">Bench Press Max</label>
        <input
           value={progress.benchPressMax}
          type="text"
          placeholder="Bench Press Max (kg)"
          onChange={handleInput}
          name="benchPressMax"
            className="form-control"
        />
            {formError.benchPressMax && (
          <div className="invalid-feedback d-block text-start">{formError.benchPressMax}</div>
        )} 
       
        </div>
        <div className="col">
          <label htmlFor="">Deadlift Max</label>
        <input
           value={progress.deadliftMax}
          type="text"
          placeholder="Deadlift Max (kg)"
          onChange={handleInput}
          name="deadliftMax"
            className="form-control"
        />
     {formError.deadliftMax && (
          <div className="invalid-feedback d-block text-start">{formError.deadliftMax}</div>
        )} 
        </div>
        </div>
       <div className="row p-2 text-start">
       <div className="col">
        <label htmlFor="">Notes</label>
       <div class="form-floating">
       <textarea class="form-control" placeholder="Leave a note here" id="floatingTextarea2" name='notes' onChange={handleInput}    value={progress.notes} style={{"height": "100px"}}></textarea>
        {formError.notes && (
          <div className="invalid-feedback d-block text-start">{formError.notes}</div>
        )} 
       </div>
       </div>
       </div>
       

        <div class="modal-footer">

<button type="submit" class="btn btn-danger">Save changes</button>
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
closeModal()
}}>Close</button>
</div>
      </form>
                                                             
                                                              
                                                            </div>
                                                          </div>
                                                        </div>
                                      
                                                      </div>
<div className='modal fade mt-5' id="addPassengerModal" ref={viewmodel}>
    <div className={`modal-dialog  modal-lg`}>
 <div className="modal-content">
  <div className=' modal-header bg-danger'>
<h5 className=' modal-title text-white' id="addPassengerModalLabel">
   view Progress Tracking   Data</h5>
                                                      
        <button type="button" class="btn-close" onClick={()=>{  closeviewModal()()}}></button>
                                                                                                                                                </div>
   <div className="modal-body ">
   <div className="container text-start">
    <div className="row p-2 ">
      <div className="col text-white">
      <h5 className='text-white'>Day and Date : {editProgress.dateDay}</h5>
      </div>
                                                                          
 </div>
<div className="row p-2">
  <div className="col">
    <h5 className='text-white'>weight : {editProgress.weight} kg</h5>
  </div>
  <div className="col">
 <h5 className='text-white'> Chest: {editProgress.chest} cm</h5>
  </div>
</div>
<div className="row p-2">

  <div className="col">
 <h5 className='text-white'> Hips: {editProgress.hips} cm</h5>
  </div>
  <div className="col">
    <h5 className='text-white'>Arms : {editProgress.arms} cm</h5>
  </div>
</div>
<div className="row p-2">
 
  <div className="col">
 <h5 className='text-white'> Legs: {editProgress.legs} cm</h5>
  </div>
  <div className="col">
 <h5 className='text-white'> Run Time: {editProgress.runTime} mints</h5>
  </div>

</div>

<div className="row p-2">
 
  <div className="col">
 <h5 className='text-white'> squat Max: {editProgress.squatMax} kg </h5>
  </div>
  <div className="col">
 <h5 className='text-white'> bench Press Max: {editProgress.benchPressMax} kg</h5>
  </div>
 
</div>
<div className="row p-2">
 
  <div className="col">
 <h5 className='text-white'> Deadlift Max: {editProgress.deadliftMax} kg </h5>
  </div>

 
</div>
<div className="row p-2">
 
  <div className="col">
 <h5 className='text-white'>  Notes </h5>
 <p className='text-white'>{editProgress.notes}</p>
  </div>

 
</div>
 <div class="modal-footer">
                                                          
                                                        
  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{
                                                           closeviewModal()
                                                          }}>Close</button>
                                                        </div>       
                                                                   
    </div>
                                                        </div>
                                                        </div>
                                                                                                                                                
                                                      </div>
                                                                                                                          
                                                      </div>
<div className='modal fade mt-5' id="addPassengerModal" ref={editmodelOpen}>
  <div className={`modal-dialog modal-lg`}>
                                                                                                                            <div className="modal-content">
                                                                                                                              <div className='modal-header bg-danger' >
                                                                                                                                <h5 className=' modal-title text-white' id="addPassengerModalLabel">
                                                                                                                                   Edit progress 
                                                                                                                                </h5>
                                                                                                                                <button type="button" class="btn-close" onClick={()=>{closeEditModal()}}></button>
                                                                                                                              </div>
                                                                                                                              <div className="modal-body ">
                                                                                  
                                                                
                                                                                                                              <form onSubmit={Editprogress}>
  <div className="row p-2 ">
<div className="col">
<label className=' text-start d-block'>Weight</label>

<input
          type="text"
          placeholder="Weight"
          className="form-control"
          onChange={EditTinputHandle}
          value={editProgress.weight}
          name="weight"
         
        />

</div>
<div className="col">
<label className=' text-start d-block'>Chest</label>
<input
          type="text"
          placeholder="Chest"
          onChange={EditTinputHandle}
             className="form-control"
          name="chest"
          value={editProgress.chest}
        />
</div>
</div>
<div className="row p-2">
  <div className="col">
  <label className=' text-start d-block'>Waist</label>
  <input
          type="text"
          placeholder="Waist"
          value={editProgress.waist}
          onChange={EditTinputHandle}
          name="waist"
             className="form-control"
        />
     
       
 
  </div>
  <div className="col">
  <label className=' text-start d-block'>Hips</label>   
  <input
          type="text"
          placeholder="Hips"
          value={editProgress.hips}
             className="form-control"
          onChange={EditTinputHandle}
          name="hips"/>
  </div>
</div>
<div className="row p-2 ">
    <div className="col">
    <label className='text-start d-block'>Arms</label>
        <input
          type="text"
          value={editProgress.arms}
          placeholder="Arms"
          onChange={EditTinputHandle}
          name="arms"
             className="form-control"
        />
        </div>
        <div className="col">
        <label className='text-start d-block'>Legs</label>
        <input
          type="text"
          value={editProgress.legs}
          placeholder="Legs"
          onChange={EditTinputHandle}
          name="legs"
             className="form-control"
        /></div>
      </div>
      <div className="row p-2">
        <div className="col">
        <label className='text-start d-block'>Run Time</label>
        <input
          type="text"
          value={editProgress.runTime}
          placeholder="Run Time (in minutes)"
          onChange={EditTinputHandle}
          name="runTime"
            className="form-control"
        />
      </div>
      <div className="col">
      <label className=' text-start d-block'>Squat Max </label>
        <input
           value={editProgress.squatMax}
          type="text"
          placeholder="Squat Max (kg)"
          onChange={EditTinputHandle}
          name="squatMax"
            className="form-control"
        />
        </div>
        </div>
       <div className="row p-2">
      
        <div className="col">
        <label className='text-start d-block'>Bench Press </label>
        <input
           value={editProgress.benchPressMax}
          type="text"
          placeholder="Bench Press Max (kg)"
          onChange={EditTinputHandle}
          name="benchPressMax"
            className="form-control"
        />
        </div>
        <div className="col">
        <label className='text-start d-block'>Deadlift </label>
        <input
           value={editProgress.deadliftMax}
          type="text"
          placeholder="Deadlift Max (kg)"
          onChange={EditTinputHandle}
          name="deadliftMax"
            className="form-control"
        /></div>
        </div>
       <div className="row p-2 text-start">
       <div className="col">
        <label htmlFor="">Notes</label>
       <div class="form-floating">
       <textarea class="form-control" placeholder="Leave a note here" id="floatingTextarea2" name='notes' onChange={EditTinputHandle}    value={editProgress.notes} style={{"height": "100px"}}></textarea>
      
       </div>
       </div>
       </div>
       

        <div class="modal-footer">

<button type="submit" class="btn btn-danger">Save changes</button>
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
closeModal()
}}>Close</button>
</div>
      </form>                                                                                                      
                                                                                                                                
                                                                                                                              </div>
                                                                                                                            </div>
                                                                                                                          </div>
                                                                                                        
                                                                                                                        </div>
                                                                                                                        </UserDashboardLayout>
    </>
  )
}

export default Progress
