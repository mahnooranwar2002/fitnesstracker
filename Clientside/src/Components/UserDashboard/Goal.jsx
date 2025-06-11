import React, { useEffect,useState,useRef } from 'react'
import UserDashboardLayout from './UserDashboardLayout'
import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiBold } from 'react-icons/bi';
const Goal = () => {
      const modalRef = useRef(null);
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
       const [goal, setGoal] = useState({
    userId: '',
    type: '',
    targetValue: '',
    unit: '',
    currentValue: '',
    description: '',
    startdate: '',
    endDate: ''
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setGoal({
      ...goal,[name]: value
    });
  };
var [formError,setError]=useState({
   type: '',
    targetValue: '',
    unit: '',
    currentValue: '',
    description: '',
 
   })
const submitGoal = (e) => {
  e.preventDefault();

  var newErrors = {
    type: '',
    targetValue: '',
    unit: '',
    startdate: '',
    endDate: '',
    description: '',
  };

  if (!goal.type.trim()) {
    newErrors.type = "The Type is required!";
  }
  if (!goal.targetValue) {
    newErrors.targetValue = "The target Value is required!";
  } else if (!/^\d+$/.test(goal.targetValue)) {
    newErrors.targetValue = "The target Value must be a positive whole number!";
  }
  if (!goal.unit) {
    newErrors.unit = "The unit is required!";
  }
  if (!goal.startdate) {
    newErrors.startdate = "The start date is required!";
  }
  if (!goal.endDate) {
    newErrors.endDate = "The end date is required!";
  }
  if (!goal.description) {
    newErrors.description = "The description is required!";
  }

  // Check if there are any errors
  if (newErrors.type || newErrors.targetValue || newErrors.unit || newErrors.startdate || newErrors.endDate || newErrors.description) {
    setError(newErrors);
    return;
  } else {
    goal.userId = userLogin;
    axios.post('http://localhost:4000/addgoal', goal)
      .then(() => {
        console.log(goal);
        closeModal();
        toast.success("The Goal is created successfully.", { position: "top-right", autoClose: 3000, theme: "dark" });
        fetchdata();
      })
      .catch((error) => {
        console.error("There was an error creating the goal!", error);
        toast.error("There was an error creating the goal.", { position: "top-right", autoClose: 3000, theme: "dark" });
      });
  }
};

  const today = new Date().toISOString().split("T")[0]; // today's date in YYYY-MM-DD

  var [goals,Setgoals]=useState([])
function fetchdata(){
    axios.get(`http://localhost:4000/fetchgoal/${userLogin}`).then((resp)=>{
Setgoals(resp.data)
    })
}

useEffect(()=>{
    fetchdata()
},[])

var delGoal=(id)=>{
axios.delete(`http://localhost:4000/delgoal/${id}`).then(()=>{
    fetchdata();
    toast.error(" The Goal data is deleted succesfully.", {
     position: "top-right", autoClose: 3000 ,theme: "dark",});
    })
}

var [viewGoal,Setviewgoals]=useState({})
   var viewmodel=useRef(null);
   var viewModalOpen=(id)=>{
    if (viewmodel.current) {
      viewmodel.current.classList.add('show');
      viewmodel.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      axios.get(`http://localhost:4000/findgoal/${id}`).then((resp)=>{
        Setviewgoals(resp.data)
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

  return (
    <>
      <UserDashboardLayout>

<div className=' container-fluid'>
  <div>
 <div className="card">
 <div className='card-header  text-white'><h3>Goal Information</h3></div>

   <div className={`card-body  ${style.mycontainer}`}>
 <div className=" text-end mb-3">
 <button className='btn btn-danger' onClick={openModal} >new</button>
  </div>
                                 
                                   
               <div className="table-responsive ">                   
   <table className="table table-striped table-striped table-dark table-hover"    >
   <thead>
 <tr>
 <th>Type</th>
 <th>Target Value</th>
   <th>unit</th>
<th>Current Value</th>

  <th>Action</th>
</tr>
</thead>
<tbody>

    {goals.length=== 0?(
                          
          <tr className='text-center'>
                <td colSpan="6">No data available</td> 
                  </tr>
                        
                         ):
                             (
                    goals.map((con,index)=>(
                   <tr key={index}>
                     <td>{con.type}</td>
                     <td>{con.targetValue}</td>
                      <td>{con.unit}</td>
                       <td>{con.currentValue}</td>
                        <td>
                        <button className='btn btn-danger btn-sm mr-1 mx-1' onClick={()=>{
                                         delGoal(con._id)
                                     }}>
                                     <i class='bx bx-trash m-0 px-2 py-2' ></i>
                                     </button>
                                 <button className='btn btn-secondary btn-sm mr-1 mx-1' onClick={()=>{
                                         viewModalOpen(con._id)
                                     }}>
                                    <i class='bx bx-info-circle m-0 px-2 py-2'></i>
                                     </button>
                                </td>
                                 </tr>
                                ))
                             )
                         }
 </tbody>
 </table>
 </div>
           </div>     
 </div>
 </div>
  </div>

      </UserDashboardLayout>
          <div className={`${style.model} modal fade mt-5`} id="addPassengerModal" ref={modalRef}>
  <div className={`modal-dialog modal-lg`}>
        <div className="modal-content">
          <div className='modal-header '>
          <h5 className= 'modal-title text-white' id="addPassengerModalLabel">
              Goals
             </h5>
               <button type="button" class="btn-close" onClick={()=>{closeModal()}}></button>
                 </div>
               <div className="modal-body ">
                
                       <form onSubmit={submitGoal}>
        <div className="row g-3 m-2">
  <div className="col-md-6 text-start">
    <label htmlFor="">Goal Type</label>
        <input
          type="text"
          className={`form-control `}
          name="type"
          value={goal.type}
            onChange={handleInput}
          placeholder="Goal Type (e.g., Weight Loss)"
        />
        {formError.type && (
          <div className="invalid-feedback d-block text-start">{formError.type}</div>
        )}
      </div>
       
          <div className="col-md-6 text-start">
             <label htmlFor="">Target Value</label>
        <input
          type="text"
          className={`form-control `}
          name="targetValue"
          value={goal.targetValue}
            onChange={handleInput}
          placeholder="Target Value"
        />
        {formError.targetValue && (
          <div className="invalid-feedback d-block text-start">{formError.targetValue}</div>
        )}
      </div>
</div>
<div className="row g-3 m-2 text-start">
     <div className="col-md-6">
            <label htmlFor="">Unit</label>
        <input
          type="text"
          name="unit"
          className={`form-control `}
          placeholder="Unit (e.g., kg, miles)"
          onChange={handleInput}
value={goal.unit}
/>
   {formError.unit && (
          <div className="invalid-feedback d-block text-start">{formError.unit}</div>
        )}
</div>
<div className="col-md-6">
        <label htmlFor="">Current Value</label>
        <input
          type="number"
          name="currentValue"
          className={`form-control `}
          placeholder="Current Value"
          onChange={handleInput}
          value={goal.currentValue}
        />
 {formError.currentValue && (
          <div className="invalid-feedback d-block text-start">{formError.currentValue}</div>
        )}
</div>
</div>
      <div className="row g-3 m-2 text-start">
        <div className="col-md-6"> 
        <label>Start Date:</label>
        <input
     className={`form-control `}
          type="date"
          name="startdate"
          min={today}
          value={goal.startdate}
          onChange={handleInput}
        />
      {formError.startdate && (
          <div className="invalid-feedback d-block text-start">{formError.startdate}</div>
        )}   
</div>
  <div className=" col-md-6"> 
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          className={`form-control `}
          min={goal.startdate || today}
          onChange={handleInput}
        />
          {formError.endDate && (
          <div className="invalid-feedback d-block text-start">{formError.endDate}</div>
        )}  
        </div>
</div>
<div className="row g-3 m-2">
  <div className="col  text-start">
    
            <label htmlFor="">Description</label>
        <div class="form-floating">
  <textarea class="form-control" onChange={handleInput}  placeholder="Leave a Description" id="floatingTextarea2" name='description' style={{"height": "100px"}} value={goal.description}> </textarea>
     {formError.description && (
          <div className="invalid-feedback d-block text-start">{formError.description}</div>
        )} 
</div>
        </div>
        </div>
          
      <div class="modal-footer">
          
          <button type="submit" class="btn btn-danger" 
          >Save changes</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
            closeModal()
          }}>Close</button>
        </div>

      </form>                        
              </div>
               </div>
            </div>
           </div>
           {/*view model  */}
           <div
  className= 'mt-5 modal fade'
  id="addPassengerModal"
  ref={viewmodel}
  tabIndex="-1"
  aria-labelledby="addPassengerModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content shadow rounded-4 border-0">
      <div className={`modal-header  text-white rounded-top-4`}>
        <h5 className="modal-title fw-bold text-white" id="addPassengerModalLabel">
          View Goal Data
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => {
            closeviewModal();
          }}
        ></button>
      </div>

      <div className="modal-body">
<div className="container text-start">
    <div className="row">
        <div className="col">
            <h6>Type: <b>{viewGoal.type}</b></h6>
        </div>
         <div className="col">
            <h6>target Value: <b>{viewGoal.targetValue}</b></h6>
        </div>
    </div>
        <div className="row">
        <div className="col">
            <h6>Unit: <b>{viewGoal.unit}</b></h6>
        </div>
         <div className="col">
            <h6>Current Value: <b>{viewGoal.currentValue}</b></h6>
        </div>
    </div>
     <div className="row">
        <div className="col">
            <h6>Start Date: <b>{viewGoal.startdate}</b></h6>
        </div>
         <div className="col">
            <h6>End Date: <b>{viewGoal.endDate}</b></h6>
        </div>
    </div>
        <div className="row">
        <div className="col">
            <h6>Description : </h6>
            <p className='text-white'>
                {viewGoal.description}
            </p>
        </div>
       
    </div>
</div>
  <div className="modal-footer  rounded-bottom-4">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
          onClick={() => {
            closeviewModal();
          }}
        >
          Close
        </button>
      </div>
  </div>
    
      </div>
    </div>
    
  </div>
  

    </>
  )
}

export default Goal
