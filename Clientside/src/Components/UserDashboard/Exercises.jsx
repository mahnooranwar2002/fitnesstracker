
import style from '../../assets/css/dashboard.module.css'
import React, { useEffect,useState,useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDashboardLayout from './UserDashboardLayout';
const Exercises = () => {
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
          var[exercise,SetExecise]=useState({
            user_id:"",
            workout_category: "",
            exercise_name:"",
            sets:null,    
            reps:null,  
            Weight:null,
            notes:null, 
            status:null,
            daydate:null
          })
        var inputHandle=(e)=>{
        SetExecise({...exercise,[e.target.name]:e.target.value})
        }

 var [formError,setError]=useState({
  workout_category: "",
            exercise_name:"",
            sets:null,    
            reps:null,  
            Weight:null,
            notes:null, 
            status:null,
   })

       var addExercise = (e) => {
        e.preventDefault()
  var newErrors = {
  workout_category: "",
            exercise_name:"",
            sets:null,    
            reps:null,  
            Weight:null,
            notes:null, 
            status:null,
};
if(!exercise.exercise_name.trim()){
  newErrors.exercise_name="The Exercise Name Type is required !"
}
if(!exercise.status){
  newErrors.status="The status is required !"
}

if (!exercise.reps) {
  newErrors.reps = "The reps is required!";
} else if (!/^\d+$/.test(exercise.reps)) {
  newErrors.reps = "The reps must be a positive whole number!";
}
if (!exercise.sets) {
  newErrors.sets= "The Sets is required!";
} else if (!/^\d+$/.test(exercise.sets)) {
  newErrors.sets = "The Set must be a positive whole number!";
}

if (!exercise.Weight) {
  newErrors.Weight = "The Weight is required!";
} else if (!/^\d+$/.test(exercise.Weight)) {
  newErrors.Weight = "The crab must be a positive whole number!";
}
if (!exercise.notes) {
  newErrors.notes = "The note is required!";
}
if (!exercise.workout_category) {
  newErrors.workout_category = "The Workout Category is required!";
}
if (newErrors.exercise_name || newErrors.Weight|| newErrors.reps|| newErrors.sets|| newErrors.status || newErrors.workout_category
 ) {
 setError (newErrors);
  return;
} 

   var myDate = new Date();
  var year = myDate.getFullYear();
  var month = String(myDate.getMonth() + 1).padStart(2, '0');
   var dayOfMonth = String(myDate.getDate()).padStart(2, '0');
  var weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(myDate);
   var formattedDateWithWeekday = `${weekday}, ${year}-${month}-${dayOfMonth}`;
exercise.daydate=formattedDateWithWeekday;

            e.preventDefault();
            exercise.user_id=userLogin;
            axios.post('http://localhost:4000/addexercise',exercise)
            .then(() => {
              SetExecise({
                workout_category: "",
                exercise_name:"",
                sets:"",    
                reps:"",  
                Weight:"",
                notes:"", 
                status:"",
                daydate:""
              })
              closeModal();
                toast.success("The Exercise is added successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });
                fetchExercise();
          });
        }
          // for fetch the Execrise data
          var [fetchExercises,setExercises]=useState([])
          var fetchExercise=()=>{
            axios.get(`http://localhost:4000/fetchexercise/${userLogin}`).then((resp)=>{
                console.log(resp.data)
                setExercises(resp.data)
                
            })
          }
          // for update the status
          var updateStatus = (id, status) => {
            axios.put(`http://localhost:4000/updateExecriseStatus/${id}`, { status:status})
              .then(() => {
               toast.success(" update status is succesfully.", {
                   position: "top-right", autoClose: 3000 ,theme: "dark",});
               ;})}

         var sortbycategory=(e)=>{
if(e.target.value === ""){
  fetchExercise();
}else{
  var selectedCategory = e.target.value;
  axios.get(`http://localhost:4000/fetchexercisebycategory/${userLogin}/${selectedCategory}`).then((resp)=>{
    setExercises(resp.data)
})
}


}
var fetchBydate=(e)=>{
  if(e.target.value === ""){
    fetchExercise();
  }else{
    var selectedDate = e.target.value;
    axios.get(`http://localhost:4000/fetchexercisebydate/${userLogin}/${selectedDate}`).then((resp)=>{
      setExercises(resp.data)
      
  
      })
} 
}
// for prevent the user to select the previous date !

var[editExercise,SeteditExercise]=useState({})
var editModalOpen = (id) => {
  if (editmodelOpen.current) {
    editmodelOpen.current.classList.add('show');
    editmodelOpen.current.style.display = 'block';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  
     axios.get(`http://localhost:4000/findExercise/${id}`).then((resp)=>{
      SeteditExercise(resp.data)
     
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
    SeteditExercise({...editExercise,[e.target.name]:e.target.value})
    }

   
    var edit_Execrise=(e)=>{
      e.preventDefault()
      axios.put(`http://localhost:4000/updateexercise/${editExercise._id}`,editExercise ).then(()=>fetchExercise(),

         closeEditModal(),
            toast.success("The exercise is updated successfully .", { position: "top-right", autoClose: 3000,theme: "dark", })
      
     
    );
  }
  // for search the meal/nutrition by food item
  var  [query,Setquery]=useState("")
  var searchByexecriseName = async()=>{
    await axios.get(`http://localhost:4000/searchByexercise/${userLogin}/search?q=${query}`).then((resp)=>{
      setExercises(resp.data);
      
    })
  }
  //for delete
  var delexecrise=(id)=>{
   axios.delete(`http://localhost:4000/deleteexercise/${id}`).then(()=>{
      toast.error(" The Execrise data is deleted succesfully.", {
                position: "top-right", autoClose: 3000 ,theme: "dark",});
                fetchExercise();      
   })
  }

          useEffect(()=>{
           if(query.length === 0){
            fetchExercise();
           
            return;
           }
       searchByexecriseName();},
          [query]);
// for pagination
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fetchExercises.slice(indexOfFirstItem, indexOfLastItem);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(fetchExercises.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
       // for view the data 
   var viewmodel=useRef(null);
   var viewModalOpen=(id)=>{
    if (viewmodel.current) {
      viewmodel.current.classList.add('show');
      viewmodel.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      axios.get(`http://localhost:4000/findExercise/${id}`).then((resp)=>{
        SeteditExercise(resp.data)
    
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
<div className='container-fluid'>
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-11">
      <div className={`card shadow-sm mt-4 mb-4 ${style.mycontainer}`}>
        <div className={`card-header text-white ${style.cardheader}`} style={{ width: "100%" }}>
          <h3 className="mb-0">Exercises Information</h3>
        </div>
        <div className={`card-body ${style.mycontainer}`}>
          <div className="row mt-2">
            <div className="col">
              <select
                name="workout_category"
                onChange={sortbycategory}
                className="form-control"
              >
                <option hidden>Select Exercise Category</option>
                <option value="strength_training">Strength Training</option>
                <option value="aerobics">Aerobics</option>
                <option value="balance exercises">Balance Exercises</option>
                <option value="cardio exercise">Cardio Exercise</option>
                <option value="functional training">Functional Training</option>
                <option value="stretching">Stretching</option>
                <option value="flexibility training">Flexibility Training</option>
                <option value="yoga">Yoga</option>
                <option value="anaerobic exercise">Anaerobic Exercise</option>
                <option value="circuit training">Circuit Training</option>
                <option value="gyms">Gyms</option>
                <option value="pilates">Pilates</option>
                <option value="running">Running</option>
                <option value="tai_chi">Tai Chi</option>
                <option value="walking">Walking</option>
              </select>
            </div>

            <div className="col">
              <select className="form-control" onChange={fetchBydate}>
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="searchPassenger"
                placeholder="Search for exercise..."
                value={query}
                onChange={(e) => Setquery(e.target.value)}
              />
              <div className="input-group-append">
                <button onClick={openModal} className={`${style.btn2} btn btn-danger`}>
                  New
                </button>
              </div>
            </div>

            <table className="table table-striped table-dark table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Exercise Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchExercises.length === 0 ? (
                  <tr className='text-center'>
                    <td colSpan="6">No data available</td>
                  </tr>
                ) : (
                  currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.exercise_name}</td>
                      <td>{con.daydate}</td>
                      <td>{con.workout_category}</td>
                      <td>
                        <select
                          name='status'
                          id="mealStatus"
                          className="form-control"
                          value={con.status}
                          onChange={(e) => updateStatus(con._id, e.target.value)}
                        >
                          <option hidden>{con.status}</option>
                          <option value="" hidden>Select your status</option>
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className='d-flex justify-content-center align-items-center'>
                        <button
                          className='btn btn-danger btn-sm mr-1 mx-1'
                          title='delete'
                          onClick={() => {
                            delexecrise(con._id);
                          }}
                        >
                          <i className='bx bx-trash m-0 px-2 py-2'></i>
                        </button>
                        <button
                          className='btn btn-primary btn-sm mr-1 mx-1'
                          onClick={() => {
                            editModalOpen(con._id);
                          }}
                        >
                          <i className='bx bx-edit-alt m-0 px-2 py-2'></i>
                        </button>
                        <button
                          className='btn btn-secondary btn-sm mr-1 mx-1'
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

          {fetchExercises.length > 0 && (
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
                {/* for add the data */}
                  <div className={`${style.model} modal fade mt-5`} id="addPassengerModal" ref={modalRef}>
                                  <div className={`modal-dialog modal-lg`}>
                                    <div className="modal-content">
                                      <div className='modal-header'>
                                        <h5 className= 'modal-title text-white' id="addPassengerModalLabel">
                                          Execises
                                        </h5>
                                        <button type="button" class="btn-close" onClick={()=>{closeModal()}}></button>
                                      </div>
                                      <div className="modal-body ">
                                      <form onSubmit={addExercise}>
      
                                      <div className="row  p-2 text-start">
        <div class="col">
          <label htmlFor="">Exercise name</label>
          <input type="text" className="form-control"  placeholder="Exerise Name" name='exercise_name' aria-label="First name" value={exercise.exercise_name} onChange={inputHandle}/>
          {formError.exercise_name && (
          <div className="invalid-feedback d-block text-start">{formError.exercise_name}</div>
        )}
        
        </div>
         <div className="col">
            <label htmlFor="">Workout Category</label>
        <select name="workout_category"  value={exercise.workout_category} onChange={inputHandle}  className="form-control">
        <option hidden>Select your Exercise Category</option>
        <option value="strength_training">Strength Training</option>
    <option value="aerobics">Aerobics</option>
   
    <option value="balance exercises">Balance Exercises</option>
    <option value="cardio exercise">Cardio Exercise</option>
    <option value="functional training">Functional Training</option>
    <option value="stretching">Stretching</option>
    <option value="flexibility training">Flexibility Training</option>
    <option value="yoga">Yoga</option>
    <option value="anaerobic exercise">Anaerobic Exercise</option>
    <option value="circuit training">Circuit Training</option>
    <option value="gyms">Gyms</option>
    <option value="pilates">Pilates</option>
    <option value="running">Running</option>
    <option value="tai_chi">Tai Chi</option>
    <option value="walking">Walking</option>
      </select>
         {formError.workout_category && (
          <div className="invalid-feedback d-block text-start">{formError.workout_category}</div>
        )}
        </div>
         
        </div>
        <div className="row p-2 text-start ">
            <div className="col">
                <label htmlFor="">Sets</label>
          <input type="text" className="form-control"  placeholder="sets" name='sets' value={exercise.sets} aria-label="First name" onChange={inputHandle}/>
          {formError.sets && (
          <div className="invalid-feedback d-block text-start">{formError.sets}</div>
        )}
            </div>
            <div className="col">
                <label htmlFor="">Resp</label>
          <input type="text" className="form-control"  placeholder="reps" name='reps' value={exercise.reps} aria-label="First name" onChange={inputHandle}/>
            {formError.reps && (
          <div className="invalid-feedback d-block text-start">{formError.reps}</div>
        )}
            </div>
        </div>
        <div className="row p-2 text-start ">
            <div className="col">
  <label htmlFor="">Weight</label>
          <input type="text" className="form-control"   value={exercise.Weight}placeholder="Weight" name='Weight' aria-label="First name" onChange={inputHandle}/>
            {formError.Weight && (
          <div className="invalid-feedback d-block text-start">{formError.Weight}</div>
        )}
            </div>
            <div className="col">
              <label htmlFor="">Status</label>
            <select
  name='status'
  id="exerciseStatus"
  className="form-control"
  onChange={inputHandle}
  value={exercise.status}
>
  <option value="" hidden>Select your status</option> 
  <option value="Not Started">Not Started</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
  <option value="On Hold">On Hold</option>
  <option value="Cancelled">Cancelled</option>
</select>
              {formError.status && (
          <div className="invalid-feedback d-block text-start">{formError.status}</div>
        )}
            </div>
         
        </div>
       
    <div className="row p-2 text-start">
        <div className="col">
          <label htmlFor="">Notes</label>
        <div class="form-floating">
  <textarea class="form-control" onChange={inputHandle}  placeholder="Leave a note here " id="floatingTextarea2" name='notes' style={{"height": "100px"}}> </textarea>
</div>
        </div>
                 {formError.notes && (
          <div className="invalid-feedback d-block text-start">{formError.notes}</div>
        )}
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
 <div className={`${style.model} modal fade mt-5`} id="addPassengerModal" ref={editmodelOpen}>
   <div className={`modal-dialog modal-lg`}>
   <div className="modal-content">
    <div className='modal-header'>
     <h5 className='modal-title text-white' id="addPassengerModalLabel">
                Edit Execrise
   </h5>
        <button type="button" class="btn-close" onClick={()=>{closeEditModal()}}></button>
                                                                </div>
 <div className="modal-body ">
                    
  
                                                                <form onSubmit={edit_Execrise} >
      
      <div className="row  p-2 text-start ">
<div class="col">
   <label htmlFor="">Exercise name</label>
  
<input type="hidden" readOnly name='user_id'  value={editExercise.user_id}/>
<input type="text" className="form-control" value={editExercise.exercise_name}  name='exercise_name' aria-label="First name" onChange={EditTinputHandle}/>


</div>
<div className="col">
  <label className=''>exercise Status</label>
<select
name='status'
id="exerciseStatus"
className="form-control"
onChange={EditTinputHandle}
>
<option value="" hidden>{editExercise.status}</option> 
<option value="Not Started">Not Started</option>
<option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
<option value="On Hold">On Hold</option>
<option value="Cancelled">Cancelled</option>
</select>
</div>
</div>
<div className="row p-2 text-start ">
<div className="col">
  <label className='text-start'>sets</label>
<input type="text" className="form-control"   name='sets'  value={editExercise.sets} aria-label="First name" onChange={EditTinputHandle}/>

</div>
<div className="col">
  <label className=''>reps</label>
<input type="text" className="form-control"   value={editExercise.reps} name='reps' aria-label="First name" onChange={EditTinputHandle}/>

</div>
</div>
<div className="row p-2 text-start">
<div className="col">
  <label>Weight</label>
<input type="text" className="form-control" value={editExercise.Weight} name='Weight' aria-label="First name" onChange={EditTinputHandle}/>

</div>


<div className="col">
    <label>Workout Category</label>

<select name="workout_category" onChange={EditTinputHandle}  className="form-control">
<option hidden>{editExercise.workout_category}</option>
<option value="strength_training">Strength Training</option>
<option value="aerobics">Aerobics</option>

<option value="balance exercises">Balance Exercises</option>
<option value="cardio exercise">Cardio Exercise</option>
<option value="functional training">Functional Training</option>
<option value="stretching">Stretching</option>
<option value="flexibility training">Flexibility Training</option>
<option value="yoga">Yoga</option>
<option value="anaerobic exercise">Anaerobic Exercise</option>
<option value="circuit training">Circuit Training</option>
<option value="gyms">Gyms</option>
<option value="pilates">Pilates</option>
<option value="running">Running</option>
<option value="tai_chi">Tai Chi</option>
<option value="walking">Walking</option>
</select>
</div>

</div>
<div className="row p-2 text-start">
<div className="col">
  <label >Notes</label>
<div class="form-floating">
<textarea class="form-control" onChange={EditTinputHandle} value={editExercise.notes} placeholder="Leave a note here" id="floatingTextarea2" name='notes' style={{"height": "100px"}}></textarea>
</div>
</div>
</div>

<div class="modal-footer">

<button type="submit" class="btn btn-danger">Save changes</button>
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
closeEditModal()
}}>Close</button>
</div>
</form>
                                                                  
                                                                </div>
                                                              </div>
                                                            </div>
                                          
                                                          </div>
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
          View Exercise Data
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
        <div className="container text-start  ">
          <div className="row mb-3">
            <div className="col text-white">
              <strong className='text-white'>Exercise Name:</strong>
              <p className='text-white'>{editExercise.exercise_name}</p>
            </div>
            <div className="col">
              <strong>Workout Category:</strong>
              <p>{editExercise.workout_category}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <strong  className='text-white'>Sets:</strong>
              <p  className='text-white'>{editExercise.sets}</p>
            </div>
            <div className="col">
              <strong  className='text-white'>Reps:</strong>
              <p  className='text-white'>{editExercise.reps}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <strong  className='text-white'>Weight:</strong>
              <p  className='text-white'>{editExercise.Weight}</p>
            </div>
            <div className="col">
              <strong  className='text-white'>Date and Day:</strong>
              <p  className='text-white'>{editExercise.daydate}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <strong  className='text-white'>Status:</strong>
              <p  className='text-white'>{editExercise.status}</p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <strong  className='text-white'>Notes:</strong>
              <p   className='text-white'>{editExercise.notes}</p>
            </div>
          </div>
        </div>
            <div className="modal-footer  ">
        <button
          type="button"
          className="btn btn-secondary"
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
</UserDashboardLayout>
       
                            
    </>
  )
}

export default Exercises
