import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';

const Faq = () => {
      const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


        var [faqdetail,Setfaq]=useState([]);
var fetchData=()=>{
  axios.get("http://localhost:4000/fetchfaq").then((resp)=>{
  Setfaq(resp.data)
  })
}
useEffect(()=>{
  fetchData()
})
  return (
    <>
      <Navbar />

    {/* Banner Section */}
         <div className="container-fluid bannarSec  text-white py-5">
           <div className="row justify-content-center">
             <div className="col-md-8 text-center">
               <h2>Faq <span className="text-light"></span></h2>
               <nav className="breadcrumbSec mt-3" aria-label="breadcrumb">
                 <ol className="breadcrumb justify-content-center">
                   <li className="breadcrumb-item">
                     <Link to="/home" className="text-white">Home</Link>
                   </li>
                   <li className="breadcrumb-item active text-white" aria-current="page">faq</li>
                 </ol>
               </nav>
             </div>
           </div>
         </div>
      {/* FAQ Accordion Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
         
        
  <div className="container">
    {
      faqdetail.length===0?(
          <h5> No Faq have been added by the admin.</h5>
      ):(
        faqdetail.map((faq, index) => (
        <div key={faq.id} style={{marginBottom: '10px'}}>
          <div>
            <button 
              onClick={() => toggleFAQ(index)}
              style={{
                backgroundColor: activeIndex === index ? 'gray' : 'gray',
                border: 'none',
                color:"white",
                padding: '10px',
                textAlign: 'left',
                width: '100%',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{faq.question} ?</span>
              <span style={{transition: 'transform 0.3s', transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'}}>&#x25BC;</span>
            </button>
            <div style={{display: activeIndex === index ? 'block' : 'none', padding: '10px', backgroundColor: '#f9f9f9',color:"white"}} className='text-start'>
              <p style={{margin: 0}}>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))
      )
}
      </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
