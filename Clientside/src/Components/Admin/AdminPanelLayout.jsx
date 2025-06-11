import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../../assets/css/dashboard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTachometerAlt,FaChartLine, FaBlog,FaRegUserCircle, FaQuestionCircle ,FaEdit } from 'react-icons/fa';
import { MdFeedback } from "react-icons/md";
const AdminPanelLayout = ({ children }) => {
   const [sidebarActive, setSidebarActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [profile, setProfile] = useState({});
  const [imgError, setImgError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: ''
  });
  const [errors, setErrors] = useState({
    name: null,
    password: null
  });

  const userLogin = JSON.parse(localStorage.getItem("AdminData"))?._id;
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const nav = useNavigate();

  const toggleSidebar = () => setSidebarActive(!sidebarActive);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('show');
      modalRef.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove('show');
      modalRef.current.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
  };

  const logout = () => {
    localStorage.removeItem("AdminData");
    nav("/home");
  };

  const userDetails = () => {
    axios.get(`http://localhost:4000/userfind/${userLogin}`).then((resp) => {
      setUser(resp.data);
      setProfile(resp.data);
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      setImgError("Invalid image! Please upload a JPG, JPEG, or PNG file.");
      return;
    }
    setImgError("");
    setUser((prev) => ({ ...prev, image: file }));
  };

var UpdateProfile=(e)=>{
e.preventDefault();

var newErrors = {
  name: null,
  password: null,
 
};
if(!user.name.trim()){
  newErrors.name="The name is required";
}
else if (!/^[A-Za-z\s]+$/.test(user.name)) {
  newErrors.name = "The name must contain only alphabetic characters and spaces";
}
if(!user.password.trim()){
  newErrors.password="The password is required";
}


if (newErrors.name || newErrors.password) {
  setErrors(newErrors);
  return;
}
else{
setErrors({  name:null,
  password: null})
setImgError("");
  axios.put(`http://localhost:4000/userUpdate/${userLogin}`,user,{
    headers:{"Content-Type":"multipart/form-data"}
  }).then(()=>{
 
   setProfile(user);
 
     
    setUser({ ...user, image: "" }); 
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
    closeModal()
   setRefresh((prev) => prev + 1);})
   toast.success("Your profile has been updated.", { position: "top-right", autoClose: 3000 ,theme: "dark",});
}
}
  useEffect(() => {
    userDetails();
  }, [refresh]);

  return (
    <>
       
            {/* Sidebar */}
        <div className={`${style.sidebar} ${sidebarActive ? style.showSidebar : style.hideSidebar}`}>
          <a href="#" className="d-md-none" onClick={toggleSidebar}>✖ Close</a>
        <Link to="/admindashboard" className="d-flex align-items-center mb-2">
          <FaTachometerAlt  className="me-2" />
          Dashboard
        </Link>
        
        <Link to="/userData" className="d-flex align-items-center mb-2">
          <FaRegUserCircle className="me-2" />
          Users
        </Link>
        
        <Link to="/feedbackDetail" className="d-flex align-items-center mb-2">
          <MdFeedback className="me-2" />
          Feedback
        </Link>
        
        <Link to="/faqDetail" className="d-flex align-items-center mb-2">
          <FaQuestionCircle className="me-2" />
          Faq
        </Link>
        
        <Link to="/admin/blogDetail" className="d-flex align-items-center mb-2">
          <FaEdit className="me-2" />
          Blog
        </Link>
        
        </div>
        
      
            {/* Header */}
            <div className={style.header}>
            <span className={`${style.toggleBtn} d-md-none`} onClick={toggleSidebar}>☰</span>
            <h5 className="m-0 text-white fw-bold"> Royal <span className='text-danger'>Fitness</span></h5>
              <div className="ms-auto position-relative">
              <button className="btn btn-link text-white text-decoration-none" onClick={toggleDropdown}>
                  
                       {profile.image ? (
                               <img src={`/Images/profileImage/${profile.image}`} alt="User" width={30} height={30} className="rounded-circle m-2" />
                             ) : (
                           <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="Default" width={30} height={30} />
                             )}
                         <span className='fw-bold  '>{profile.name} </span><i className="fas fa-caret-down"></i>
                       </button>
                       {isDropdownOpen && (
                         <ul className="dropdown-menu show" style={{ right: 0, position: 'absolute' }}>
                           
                           <li><a className="dropdown-item" href="#" onClick={openModal}>Profile</a></li>
                           <li><hr className="dropdown-divider" /></li>
                           <li><a className="dropdown-item text-danger fw-blod" href="#" onClick={logout}>Logout</a></li>
                         </ul>
                       )}
              </div>
            </div>
      
            {/* Profile Modal */}
            <div className="modal fade mt-5" id="addPassengerModal " ref={modalRef}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-danger">
                    <h5 className="modal-title text-white">User Profile</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="text-center mb-3">
                      {profile.image ? (
                        <img src={`/Images/profileImage/${profile.image}`} alt="User" width={100} height={100} className="rounded-circle" />
                      ) : (
                        <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="Default" width={100} height={100} />
                      )}
                    </div>
      
                    <form onSubmit={UpdateProfile}>
                      <div className="mb-3 text-start">
                        <label className='text-start'>Image</label>
                        <input type="file" className="form-control"   ref={fileInputRef} 
        onChange={handleFile} />
                        {imgError && <span className="text-danger">{imgError}</span>}
                      </div>
      
                      <div className="mb-3 text-start">
                        <label>Name</label>
                        <input type="text" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                      </div>
      
                      <div className="mb-3 text-start">
                        <label>Email</label>
                        <input type="text" className="form-control" value={user.email} readOnly />
                      </div>
      
                      <div className="mb-3 text-start">
                        <label>Password</label>
                        <input type="text" className="form-control" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                      </div>
      
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-danger">Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Main Content */}
            <div className={`${style.mainContent} ${sidebarActive ? style.shift : ''}`}>
        
        {children} {/* ← This renders the Meals component or any child passed */}
      <ToastContainer />
      </div>
    </>
  )
}

export default AdminPanelLayout
