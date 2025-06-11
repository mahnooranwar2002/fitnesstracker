import React, { useEffect,useState,useRef } from 'react'

import style from '../../assets/css/dashboard.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDashboardLayout from './UserDashboardLayout';

const Meals = () => {
    const modalRef = useRef(null);
    var editmodelOpen=useRef(null);
    
 var openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('show');
      modalRef.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
   
    }
  };
  var[editMeal,SetEditmeal]=useState({})
  var editModalOpen = (id) => {
    if (editmodelOpen.current) {
      editmodelOpen.current.classList.add('show');
      editmodelOpen.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    
       axios.get(`http://localhost:4000/findNutrition/${id}`).then((resp)=>{
        SetEditmeal(resp.data)
       
       })
    }
  };


  var closeModal = () => {
    if (modalRef.current) {
        modalRef.current.classList.remove('show');
        modalRef.current.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    SetMeals({
          UserID:"",
          log_date:"",
          meal_type:"",
          food_item:"",
          quantity:"",
          calories:"",
          protein:"",
          crab:"",
          fats:"",
          day:"",
          status:""
      });
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
  var userLogin=JSON.parse(window.localStorage.getItem("userData"))?._id;
  // for add the meal/nutrition
   var [meals,SetMeals]=useState({
    UserID:"",
    meal_type:"",
    food_item:"",
    quantity:null,
    calories:null,
    protein:null,
    crab:null,
    fats:null,
   dateday:null,
    status:null
   })


   var inputHandle=(e)=>{
    SetMeals({ ...meals, [e.target.name]:e.target.value});
   }
   
   var [formError,setError]=useState({
      meal_type:"",
    food_item:"",
    quantity:null,
    calories:null,
    protein:null,
    crab:null,
    fats:null,
  
    status:null
   })

   var add_Nutrition=(e)=>{
    e.preventDefault()
   var newErrors = {
     meal_type:"",
    food_item:"",
    quantity:null,
    calories:null,
    protein:null,
    crab:null,
    fats:null,
   status:null
};
if(!meals.meal_type.trim()){
  newErrors.meal_type="The Meal Type is required !"
}
if(!meals.status){
  newErrors.status="The status is required !"
}
if(!meals.food_item.trim()){
  newErrors.food_item="The Food item is required !"
}
 if (/[^a-zA-Z\s]/.test(meals.food_item)) {
  newErrors.food_item = "The Food item should only contain letters and spaces!";
}
if (!meals.quantity) {
  newErrors.quantity = "The quantity is required!";
} else if (!/^\d+$/.test(meals.quantity)) {
  newErrors.quantity = "The quantity must be a positive whole number!";
}
if (!meals.calories) {
  newErrors.calories = "The calories is required!";
} else if (!/^\d+$/.test(meals.calories)) {
  newErrors.calories = "The calories must be a positive whole number!";
}
if (!meals.protein) {
  newErrors.protein = "The protein is required!";
} else if (!/^\d+$/.test(meals.protein)) {
  newErrors.protein = "The protein must be a positive whole number!";
}
if (!meals.crab) {
  newErrors.crab = "The crab is required!";
} else if (!/^\d+$/.test(meals.crab)) {
  newErrors.crab = "The crab must be a positive whole number!";
}
if (!meals.fats) {
  newErrors.fats = "The crab is required!";
} else if (!/^\d+$/.test(meals.fats)) {
  newErrors.fats = "The fats must be a positive whole number!";
}
if (newErrors.meal_type || newErrors.status || newErrors.food_item || newErrors.quantity ||newErrors.calories ||newErrors.protein || newErrors.crab) {
  setError(newErrors);
  return;
}  

   var myDate = new Date();
  var year = myDate.getFullYear();
  var month = String(myDate.getMonth() + 1).padStart(2, '0');
   var dayOfMonth = String(myDate.getDate()).padStart(2, '0');
  var weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(myDate);
   var formattedDateWithWeekday = `${weekday}, ${year}-${month}-${dayOfMonth}`;
meals.dateday=formattedDateWithWeekday;
    meals.UserID=userLogin;
    axios.post('http://localhost:4000/addNutrition',meals).then(()=>{
       
     SetMeals({
      UserID:"",
     log_date:"",
      meal_type:"",
     food_item:"",
       quantity:"",
        calories:"",
       protein:"",
       crab:"",
       fats:"",
        day:"",
        status:""
     });
 
                        closeModal(); 
    toast.success("the meal is added successfully .", { position: "top-right", autoClose: 3000,theme: "dark", });
    fetchmeals()
                      
    })
  
  }
   
   
     // for fetch the meal/nutrition
   var [fetchNurtition,SetNurtition]=useState([])
   var fetchmeals=()=>{
axios.get(`http://localhost:4000/NutritionData/${userLogin}`).then((resp)=>{
console.log(resp.data)
SetNurtition(resp.data);
setCurrentPage(1)
})
   }

  //to delete the meal 
   var mealDelate=(id)=>{
    axios.delete(`http://localhost:4000/NutritionDel/${id}`).then(
      () => {
        toast.error(" The meal data is deleted succesfully.", {
            position: "top-right", autoClose: 3000 ,theme: "dark",});
      
       fetchmeals(); 
    })
   }  // for sort by type and days the meal/nutrition
   var sortBytype=(e)=>{
    if(e.target.value === ""){
        fetchmeals()
    }
   
    else{
      var selectedTyped = e.target.value;
        axios.get(`http://localhost:4000/NutritionData/${userLogin}/${selectedTyped}`).then((resp)=>{
            SetNurtition(resp.data)
          })
    }
   
  }
  var sortByDay=(e)=>{
    if(e.target.value === ""){
        fetchmeals()
    }
    else {
    var selectedDay = e.target.value;
        axios.get(`http://localhost:4000/NutritionDatabyDay/${userLogin}/${selectedDay}`).then((resp)=>{
            SetNurtition(resp.data)
          })
    }
    
   }

  // for update the status of meal/nutrition
var updateStatus = (id, status) => {
    axios.put(`http://localhost:4000/updateNutrition/${id}`, { status:status})
      .then(() => {
       toast.success(" update status is succesfully.", {
           position: "top-right", autoClose: 3000 ,theme: "dark",});
       fetchmeals();
      })
   
  };
    // for search the meal/nutrition by food item
    var  [query,Setquery]=useState("")
    var searchByFoodItem = async()=>{
      await axios.get(`http://localhost:4000/searchByitem/${userLogin}/search?q=${query}`).then((resp)=>{
        SetNurtition(resp.data);
      })
    }
    
 
    useEffect(() => {
      if (query.length === 0) {
        fetchmeals();
        return;
      }
      searchByFoodItem();
    }, [query]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fetchNurtition.slice(indexOfFirstItem, indexOfLastItem);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(fetchNurtition.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
 

   var edit_Nutrition=(e)=>{
    e.preventDefault();

    axios.put(`http://localhost:4000/NutritionUpdated/${editMeal._id}`,editMeal ).then(()=>fetchmeals(),  closeEditModal(),
    toast.success("The meal is updated successfully .", { position: "top-right", autoClose: 3000,theme: "dark", })
   
  );  
}

   
   var editInputHandle=(e)=>{
    SetEditmeal({...editMeal,[e.target.name]:e.target.value})
   }
   // for view the data 
   var viewmodel=useRef(null);
   var viewModalOpen=(id)=>{
    if (viewmodel.current) {
      viewmodel.current.classList.add('show');
      viewmodel.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      axios.get(`http://localhost:4000/findNutrition/${id}`).then((resp)=>{
        SetEditmeal(resp.data)
    
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
        <div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-11">
      <div className='card shadow-sm mt-4 mb-4 '>
        <div className={`card-header text-white ${style.cardheader}`}>
          <h4 className="mb-0">Meal Information</h4>
        </div>
        
        <div className={`card-body  ${style.mycontainer}`}>
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <select className="form-control" onChange={sortBytype}>
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="preWorkout">Pre-Workout</option>
                <option value="postWorkout">Post-Workout</option>
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <select className="form-control" onChange={sortByDay}>
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

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for Food Item..."
              value={query}
              onChange={(e) => Setquery(e.target.value)}
            />
            <div className="input-group-append">
              <button onClick={openModal} className={`${style.btn2} btn btn-danger`}>
                New
              </button>
            </div>
          </div>

          <div className="table-responsive ">
            <table className="table table-striped table-dark table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Food Item</th>
                  <th>Date Day</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchNurtition.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="4">No data available</td>
                  </tr>
                ) : (
                  currentItems.map((con, index) => (
                    <tr key={index}>
                      <td>{con.food_item}</td>
                      <td>{con.dateday}</td>
                      <td>
                        <select
                          className="form-control"
                          value={con.status}
                          onChange={(e) => updateStatus(con._id, e.target.value)}
                        >
                          <option value="">{con.status}</option>
                          <option value="Planned">Planned</option>
                          <option value="Consumed">Consumed</option>
                          <option value="Skipped">Skipped</option>
                          <option value="Healthy">Healthy</option>
                          <option value="Treat">Treat</option>
                        </select>
                      </td>
                      <td className="d-flex justify-content-center align-items-center">
                       <button className="btn btn-danger btn-sm mr-1 mx-1" onClick={() => mealDelate(con._id)}>
                             <i className="bx bx-trash m-0 px-2 py-2"></i>
                                 </button>
                                 <button className="btn btn-primary btn-sm mr-1 mx-1" onClick={() => editModalOpen(con._id)}>
                                   <i className="bx bx-edit-alt m-0 px-2 py-2"></i>
                                   </button>
                                    <button className="btn btn-secondary btn-sm mx-1" onClick={() => viewModalOpen(con._id)}>
                                    <i className="bx bx-info-circle m-0 px-2 py-2"></i>
                                    </button>
                              </td></tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {fetchNurtition.length > 0 && (
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

  {/* Add Meal Modal */}
<div className="modal fade mt-5" id="addPassengerModal mt-3" ref={modalRef}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-white shadow-lg border-0">

      {/* Modal Header */}
      <div className="modal-header  ">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">Meal</h5>
        <button type="button" className="btn-close btn-close-white" onClick={() => closeModal()}></button>
      </div>

      {/* Modal Body */}
     <div className="modal-body ">
  <form onSubmit={add_Nutrition}>
    <div className="row g-3 text-start">

      {/* Food Item */}
   
      <div className="col-md-6">
           <label htmlFor="">Food Item</label>
        <input
          type="text"
          className={`form-control ${formError.food_item ? 'is-invalid' : ''}`}
          name="food_item"
          value={meals.food_item}
          onChange={inputHandle}
          placeholder="Food Item"
        />
        {formError.food_item && (
          <div className="invalid-feedback d-block text-start">{formError.food_item}</div>
        )}
      </div>

      {/* Meal Type */}
      <div className="col-md-6">
         <label htmlFor="">Meal Type</label>
        <select
          className={`form-select ${formError.meal_type ? 'is-invalid' : ''}`}
          name="meal_type"
          value={meals.meal_type}
          onChange={inputHandle}
        >
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
          <option value="preWorkout">Pre-Workout</option>
          <option value="postWorkout">Post-Workout</option>
        </select>
        {formError.meal_type && (
          <div className="invalid-feedback d-block text-start">{formError.meal_type}</div>
        )}
      </div>

      {/* Repeat same pattern for all inputs: */}
      {/* Quantity */}
      <div className="col-md-6">
          <label htmlFor="">Quantity</label>
        <input
          type="text"
          className={`form-control ${formError.quantity ? 'is-invalid' : ''}`}
          name="quantity"
          value={meals.quantity}
          onChange={inputHandle}
          placeholder="Quantity"
        />
        {formError.quantity && (
          <div className="invalid-feedback d-block text-start">{formError.quantity}</div>
        )}
      </div>

      {/* Calories */}
      <div className="col-md-6">
             <label htmlFor="">Calories</label>
        <input
          type="text"
          className={`form-control ${formError.calories ? 'is-invalid' : ''}`}
          name="calories"
          value={meals.calories}
          onChange={inputHandle}
          placeholder="Calories"
        />
        {formError.calories && (
          <div className="invalid-feedback d-block text-start">{formError.calories}</div>
        )}
      </div>

      {/* Protein */}
      <div className="col-md-6">
        <label htmlFor="">Protein</label>
        <input
          type="text"
          className={`form-control ${formError.protein ? 'is-invalid' : ''}`}
          name="protein"
          value={meals.protein}
          onChange={inputHandle}
          placeholder="Protein"
        />
        {formError.protein && (
          <div className="invalid-feedback d-block text-start">{formError.protein}</div>
        )}
      </div>

      {/* Carbs */}
      <div className="col-md-6">
        <label htmlFor="">Crab</label>
        <input
          type="text"
          className={`form-control ${formError.crab ? 'is-invalid' : ''}`}
          name="crab"
          value={meals.crab}
          onChange={inputHandle}
          placeholder="Carbs"
        />
        {formError.crab && (
          <div className="invalid-feedback d-block text-start">{formError.crab}</div>
        )}
      </div>

      {/* Fats */}
      <div className="col-md-6">
        <label htmlFor="">Fats</label>
        <input
          type="text"
          className={`form-control ${formError.fats ? 'is-invalid' : ''}`}
          name="fats"
          value={meals.fats}
          onChange={inputHandle}
          placeholder="Fats"
        />
        {formError.fats && (
          <div className="invalid-feedback d-block text-start">{formError.fats}</div>
        )}
      </div>

      {/* Status */}
      <div className="col-md-6">
        <label htmlFor="">Status</label>
        <select
          className={`form-select ${formError.status ? 'is-invalid' : ''}`}
          name="status"
          value={meals.status}
          onChange={inputHandle}
        >
          <option value="">Select Status</option>
          <option value="Planned">Planned</option>
          <option value="Consumed">Consumed</option>
          <option value="Skipped">Skipped</option>
          <option value="Healthy">Healthy</option>
          <option value="Treat">Treat</option>
        </select>
        {formError.status && (
          <div className="invalid-feedback d-block text-start">{formError.status}</div>
        )}
      </div>

      {/* Day */}
    
    </div>

    {/* Modal Footer */}
    <div className="modal-footer mt-4">
      <button type="submit" className="btn btn-danger px-4">Save Changes</button>
      <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={() => closeModal()}>Close</button>
    </div>
  </form>
</div>

    </div>
  </div>
</div>

{/* Edit Model */}
<div className="modal fade mt-5" id="addPassengerModal" ref={editmodelOpen}>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header ">
        <h5 className="modal-title text-white" id="addPassengerModalLabel">
          Edit Meal
        </h5>
        <button type="button" className="btn-close" onClick={closeEditModal}></button>
      </div>
      <div className="modal-body">
        <form onSubmit={edit_Nutrition}>
          <input type="hidden" readOnly name='UserID' value={editMeal.UserID} />
            <input type="hidden" readOnly name='dateday' value={editMeal.dateday} />

          <div className="row mb-3 text-start">
            <div className="col">
                <label className=' '>Food Item</label>

              <input type="text" name='food_item' value={editMeal.food_item} onChange={editInputHandle} className="form-control" placeholder="Food Item" />
             
            </div>
            <div className="col">
              <label className=''>Meal Type</label>

              <select name="meal_type" value={editMeal.meal_type} onChange={editInputHandle} className="form-select">
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="preWorkout">Pre-Workout</option>
                <option value="postWorkout">Post-Workout</option>
              </select>
            </div>
          </div>

          <div className="row mb-3 text-start">
            <div className="col">
           <label className=''>Quantity</label>

              <input type="text" name='quantity' value={editMeal.quantity} onChange={editInputHandle} className="form-control" placeholder="Quantity" />
            </div>
            <div className="col">
              <label className=''>Calories</label>
              <input type="text" name='calories' value={editMeal.calories} onChange={editInputHandle} className="form-control" placeholder="Calories" />
            </div>
          </div>

          <div className="row mb-3 text-start">
            <div className="col">
              <label className=''>Protein</label>
              <input type="text" name='protein' value={editMeal.protein} onChange={editInputHandle} className="form-control" placeholder="Protein" />
            </div>
            <div className="col">
               <label className=''>Carbs</label>
              <input type="text" name='carbs' value={editMeal.carbs} onChange={editInputHandle} className="form-control" placeholder="Carbs" />
            </div>
          </div>

          <div className="row mb-3 text-start">
            <div className="col">
              <label className=''>fats</label>
              <input type="text" name='fats' value={editMeal.fats} onChange={editInputHandle} className="form-control" placeholder="Fats" />
            </div>
            <div className="col">
              <label className=''>status</label>
              <select name="status" value={editMeal.status} onChange={editInputHandle} className="form-control">
                <option value="Planned">Planned</option>
                <option value="Consumed">Consumed</option>
                <option value="Skipped">Skipped</option>
                <option value="Healthy">Healthy</option>
                <option value="Treat">Treat</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-danger">Save changes</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeEditModal}>Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  {/* View Model */}
  <div className={`${style.model} modal fade`} id="addPassengerModal" ref={viewmodel}>
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content shadow-lg rounded-4">
      
      {/* Modal Header */}
      <div className={`${style.customHeader} modal-header text-white rounded-top-4`}>
        <h5 className={`${style.modaltitle} modal-title fw-bold text-white`} id="addPassengerModalLabel">
         View Meal Data
        </h5>
        <button type="button" className="btn-close btn-close-white" onClick={closeviewModal}></button>
      </div>

      {/* Modal Body */}
      <div className="modal-body ">
        <div className="container text-white text-start">
          
          <div className="row mb-3 ">
            <div className="col-md-6 ">
              <p className='text-white'><strong>Food Item:</strong> {editMeal.food_item}</p>
            </div>
            <div className="col-md-6">
              <p className='text-white'><strong>Food Type:</strong> {editMeal.meal_type}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <p className='text-white'><strong>Quantity:</strong> {editMeal.quantity}</p>
            </div>
            <div className="col-md-6">
              <p className='text-white'><strong>Carbs:</strong> {editMeal.crab} grams (g)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <p className='text-white'><strong>Calories:</strong> {editMeal.calories} kcal</p>
            </div>
            <div className="col-md-6">
              <p className='text-white'><strong>Protein:</strong> {editMeal.protein} grams (g)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <p className='text-white'><strong>Fats:</strong> {editMeal.fats} grams (g)</p>
            </div>
            <div className="col-md-6">
              <p  className='text-white'><strong>Day:</strong> {editMeal.dateday}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <p  className='text-white'><strong>Status:</strong> {editMeal.status}</p>
            </div>
          </div>

        </div>
          <div className="modal-footer  rounded-bottom-4">
        <button type="button" className="btn btn-danger px-4" onClick={closeviewModal}>
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

export default Meals
