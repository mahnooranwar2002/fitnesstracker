import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../../assets/css/dashboard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUtensils, FaDumbbell, FaChartLine, FaBlog,FaBell } from 'react-icons/fa';
import axios from 'axios';
const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleScroll = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 const [refresh, setRefresh] = useState(0);
  const [profile, setProfile] = useState({});
  const [imgError, setImgError] = useState("");
    const [sidebarActive, setSidebarActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const userLogin = JSON.parse(localStorage.getItem("userData"))?._id;
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const nav = useNavigate();

  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('show');
      modalRef.current.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    setIsDropdownOpen(!isDropdownOpen);
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
    localStorage.removeItem("userData");
    nav("/home");
  };

const userDetails = () => {
  if (!userLogin) {
    console.error("User  is not logged in.");
    return; // Exit the function if userLogin is not available
  }
  axios.get(`http://localhost:4000/userfind/${userLogin}`)
    .then((resp) => {
      setUser (resp.data);
      setProfile(resp.data);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
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

  const UpdateProfile = (e) => {
    e.preventDefault();
    const newErrors = {
      name: null,
      password: null
    };

    if (!user.name.trim()) {
      newErrors.name = "The name is required";
    } else if (!/^[A-Za-z\s]+$/.test(user.name)) {
      newErrors.name = "Only letters and spaces allowed";
    }

    if (!user.password.trim()) {
      newErrors.password = "The password is required";
    }

    if (newErrors.name || newErrors.password) {
      setErrors(newErrors);
      return;
    }     else{
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
  };
//     var [notification,Setnotify]=useState({})
//   var countNofi=()=>{
//     axios.get(`http://localhost:4000/notifications/${userLogin}`).then((res)=>{
// Setnotify(res.data)
//     })
//   }    
  


  useEffect(() => {
   
    userDetails();
  }, [refresh]);
  return (
    <>
    <nav className="navbar navbar-expand-lg  custom-navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand logo">Royal <span>Fitness</span></Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <i className={`bx ${menuActive ? 'bx-x' : 'bx-menu'}`}></i>
        </button>

        <div className={`collapse navbar-collapse ${menuActive ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 justify-content-center flex-grow-1">
            <li className="nav-item">
              <Link to="/home" className="nav-link" onClick={() => setMenuActive(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setMenuActive(false)}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link" onClick={() => setMenuActive(false)}>Review</Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link" onClick={() => setMenuActive(false)}>FAQ</Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link" onClick={() => setMenuActive(false)}>blogs</Link>
            </li>
         
          </ul>
            
          {
            userLogin?(
 <div className="ms-auto position-relative">
          <button className="btn btn-link text-white text-decoration-none" onClick={toggleDropdown}>
            {/* <FaBell />{notification.filter(n => n.isRead === false).length} */}
             {profile.image ? (
                 <img src={`/Images/profileImage/${profile.image}`}  alt="User"  className="rounded-circle m-2"  width={30} height={30} />

                ) : (
              <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="Default" width={30} height={30} />
                    
                )}
         {profile.name} <i className="fas fa-caret-down"></i>
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu show" style={{ right: 0, position: 'absolute' }}>
              <li><a className="dropdown-item" href="#" onClick={openModal}>Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
               <li> <Link className='dropdown-item' to={'/Notification'}>Notification</Link></li>
                      <li><hr className="dropdown-divider" /></li>         
              <li><Link to={`/userdashboard`} className="dropdown-item ">Control Panel</Link></li> 
              <li><hr className="dropdown-divider" /></li>
              
              <li><a className="dropdown-item text-danger" href="#" onClick={logout}>Logout</a></li>
            </ul>
          )}
        </div>
            ):(
                <div className="d-flex ms-lg-3">
            <Link to="/join" className="btn nav-btn">Join Us</Link>
          </div>
            )
          }
        
        </div>
      </div>
    </nav>
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
                  <img src={`/Images/profileImage/${profile.image}`} alt="User" width={100} height={100} className="rounded-circle m-5"  />
                ) : (
                  <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="Default" width={100} height={100} />
                )}
              </div>

              <form onSubmit={UpdateProfile}>
                <div className="mb-3">
                  <label>Image</label>
                  <input type="file" className="form-control" ref={fileInputRef} onChange={handleFile} />
                  {imgError && <span className="text-danger">{imgError}</span>}
                </div>

                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input type="text" className="form-control" value={user.email} disabled />
                </div>

                <div className="mb-3">
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
 <ToastContainer />
    </>
  );
};

export default Navbar;
