import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '',status:1});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  var [errors, setErrors] = useState({
    name: null,
    email:null,
    password: null
  });
  const logined = (e) => {
  e.preventDefault();
     const newErrors = {
    
      password: null,
      email:null
    };
       if (!loginData.email.trim()) {
      newErrors.email = "The email is required";
    } 
        if (!loginData.password.trim()) {
      newErrors.password = "The password is required";
    } 
        if (  newErrors.email||newErrors.password) {
      setErrors(newErrors);
        
      return;
  
    }
  else{
    axios.post("http://localhost:4000/loginedUser", loginData).then((resp) => {
      if (resp.data.status === 0) {
        toast.error("Your account is deactivated by admin", { position: "top-right", theme: "dark" });
      } else {
        if (resp.data.is_admin === 0) {
          navigate("/home");
          localStorage.setItem("loginedIn", true);
          localStorage.setItem("userData", JSON.stringify(resp.data));
        } else if (resp.data.is_admin === 1) {
          navigate("/admindashboard");
          localStorage.setItem("loginedIn", true);
          localStorage.setItem("AdminData", JSON.stringify(resp.data));
        }
      };
    setLoginData({
      email: '', password: ''
    })
    }).catch(()=>{
       toast.error("The email is or password is wrong!", { position: "top-right", theme: "dark" });
        
    })
  }
  };

var register = (e) => {
  e.preventDefault();
  const newErrors = {
    name: null,
    password: null,
    email: null
  };

  if (!registerData.name.trim()) {
    newErrors.name = "The name is required";
  } else if (!/^[A-Za-z\s]+$/.test(registerData.name)) {
    newErrors.name = "Only letters and spaces allowed";
  }

  if (!registerData.password.trim()) {
    newErrors.password = "The password is required";
  }

  if (!registerData.email.trim()) {
    newErrors.email = "The email is required";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (newErrors.name || newErrors.password || newErrors.email) {
    setErrors(newErrors);

    
    return;
  }

  setErrors({ name: null, password: null, email: null });

  axios.post("http://localhost:4000/userReg", registerData)
    .then((response) => {
      if(response){
  toast.success("Registered Successfully!", { position: "top-right", theme: "dark" });
  return;
      }
    setRegisterData({
       name: '', email: '', password: ''
    })
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("The email is already registered!", { position: "top-right", theme: "dark" });
        } else {
          toast.error("An error occurred: " + error.response.data, { position: "top-right", theme: "dark" });
        }
      } else {
        toast.error("An unknown error occurred", { position: "top-right", theme: "dark" });
      }
    });
};


  return (
 <section className="login-registersec">
     <div className={`container1 ${isRegistering ? "active" : ""}`}>
      <div className="form-box login">
        <form onSubmit={logined}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" name="email" value={loginData.email} onChange={handleLoginChange}  />
            <i className='bx bxs-user-pin'></i>
          </div>

            {errors.email && <span className="text-danger ">{errors.email}</span>}
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleLoginChange}  />
            <i className='bx bxs-lock-alt'></i>

          </div>
            {errors.password && <span className="text-danger">{errors.password}</span>}
         
          <button className="btnlog" type="submit">Login</button>
           {/* <div className="forget-link">
            <a href="#">Forget your password?</a>
          </div> */}
        </form>
        
      </div>

      <div className="form-box register">
        <form onSubmit={register}>
          <h1>Register</h1>
          <div className="input-box">
        
            <input type="text" placeholder="Username" name="name" value={registerData.name} onChange={handleRegisterChange}  />
            <i className='bx bxs-user-pin'></i>
            
          </div>
           {errors.name && <span className="text-danger">{errors.name}</span>}
          <div className="input-box">
            <input type="text" placeholder="Email" name="email" value={registerData.email} onChange={handleRegisterChange}  />
            <i className='bx bx-envelope'></i>
          </div>
        {errors.email && <span className="text-danger ">{errors.email}</span>}
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" value={registerData.password} onChange={handleRegisterChange}  />
            <i className='bx bxs-lock-alt'></i>
          </div>
     {errors.password && <span className="text-danger ">{errors.password}</span>}
          <button className="btnlog" type="submit">Register</button>
        </form>
      </div>

      <div className="toggle-box">
        <div className="toggle-penel toggle-left">
          <h1>Hello,</h1>
          <p>Welcome to  our GYM</p>
          <button className="btn register-btn" onClick={() => setIsRegistering(true)}>Register</button>
        </div>
        <div className="toggle-penel toggle-right">
          <h1>Welcome back</h1>
          <p>Glad to see you again</p>
          <button className="btn loginbtn" onClick={() => setIsRegistering(false)}>Login</button>
        </div>
      </div>

      <ToastContainer />
    </div>
 </section>
  );
};

export default LoginRegister;
