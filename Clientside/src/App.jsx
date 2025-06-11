import React from 'react'
import { Route, Routes } from 'react-router-dom'

import UserIndex from './Components/UserDashboard/UserIndex'

import Meals from './Components/UserDashboard/Meals'
import Home from './Components/website/Home'
import About from './Components/website/About'
import Feedback from './Components/website/Feedback'
import Faq from './Components/website/Faq'
import Exercises from './Components/UserDashboard/Exercises'
import Progress from './Components/UserDashboard/Progress'
import AdminPanelLayout from './Components/Admin/AdminPanelLayout'
import User from './Components/Admin/User'
import LoginRegister from './Components/Auth/LoginRegrister'
import FeedbackDetails from './Components/Admin/FeedbackDetails'
import FaqDetail from './Components/Admin/FaqDetail'
import Blog from './Components/UserDashboard/Blog'
import NotificationPanel from './Components/UserDashboard/NotificationPanel'
import Goal from './Components/UserDashboard/Goal'
import Blogs from './Components/website/Blogs'
import BlogData from './Components/Admin/BlogData'
import BlogDetails from './Components/website/BlogDetails'
import AdminIndex from './Components/Admin/AdminIndex'




const App = () => {
  var Islogined=JSON.parse(window.localStorage.getItem("userData"))?._id;
  var IsAdminlogined=JSON.parse(window.localStorage.getItem("AdminData"))?._id;
  return (
    <div>
          <Routes>
{/* website */}
<Route path={""} element={<Home></Home>}></Route>
<Route path={"/home"} element={<Home></Home>}></Route>
<Route path={"/about"} element={<About></About>}></Route>
<Route path={"/feedback"} element={Islogined? <Feedback></Feedback>:<LoginRegister/>}></Route>
<Route path={"/faq"} element={Islogined?<Faq></Faq>:<LoginRegister></LoginRegister>}></Route>

<Route path={"/Blogs"} element={Islogined?<Blogs></Blogs>:<LoginRegister></LoginRegister>}></Route>

<Route path={"/Blog_Details/:id"} element={<BlogDetails></BlogDetails>}></Route>
<Route path={"/join"} element={<LoginRegister/>}></Route>

            {/* userDashboard */}
 <Route path={"/login"} element={ <LoginRegister/>}></Route> 
<Route path={"/userdashboard"} element={ Islogined?<UserIndex></UserIndex>:<LoginRegister/>}></Route> 
<Route path={"/meals"}element={ Islogined?<Meals></Meals>:<LoginRegister/>}></Route> 
 <Route path={"/execises"} element={ Islogined?<Exercises></Exercises>:<LoginRegister/>}></Route> 
 <Route path={"/progress"} element={ Islogined?<Progress></Progress>:<LoginRegister/>}></Route> 
 <Route path={"/blog"}  element={ Islogined?<Blog></Blog>:<LoginRegister/>}></Route> 
 <Route path={"/Notification"}  element={ Islogined?<NotificationPanel></NotificationPanel>:<LoginRegister/>}></Route> 
 <Route path={"/Goals"}  element={ Islogined?<Goal></Goal>:<LoginRegister/>}></Route> 
  {/* for admin panel */}
<Route path={"/admindashboard"} element={IsAdminlogined?<AdminIndex></AdminIndex>:<LoginRegister/>}></Route> 
<Route path={"/adminpanel"} element={IsAdminlogined?<AdminPanelLayout></AdminPanelLayout>:<LoginRegister/>}></Route> 
<Route path={"/userData"}   element={IsAdminlogined?<User></User>:<LoginRegister/>}></Route> 
 <Route path={"/feedbackDetail"} element={IsAdminlogined?<FeedbackDetails></FeedbackDetails>:<LoginRegister/>}></Route> 
  <Route path={"/faqDetail"} element={IsAdminlogined?<FaqDetail></FaqDetail>:<LoginRegister/>}></Route> 
    <Route path={"admin/blogDetail"} element={IsAdminlogined?<BlogData></BlogData>:<LoginRegister/>}></Route> 
          </Routes>
       
          

    </div>
  )
}

export default App
