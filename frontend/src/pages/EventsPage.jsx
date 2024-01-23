import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Loader from "../components/Layout/Loader";
import bh from "../../src/image/bh.png"
import { Link } from "react-router-dom";
import styles from "../../src/styles/styles";
import icon4 from "../../src/image/icon4.png";
import icon5 from "../../src/image/icon5.png";
import icon6 from "../../src/image/icon6.png";
import icon7 from "../../src/image/icon7.png";
import cer from "../../src/image/cert.png"
import { SlCalender } from 'react-icons/sl';

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          
          <div className='section'> 
               <img src={bh} alt='' className='d-block w-100'/>
          </div> 
          
          
  <div className="container text-center">
                   <h2 className="display-5 mt-5">REGISTER NOW</h2>
                    <h5>ONLINE AND IN-PERSON CLASSES AVAILABLE.</h5>  
                                  
                    <div className="justify-content-around  d-flex px">
        <Link to="tel:+94775591150" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover `}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    CALL
                 </span>
            </div>
        </Link>
        <Link to="/events" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    ENROLL NOW
                 </span>
            </div>
        </Link>
        <Link to="https://wa.me/c/94775591150" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    WHATSAPP
                 </span>
            </div>
        </Link> </div>                  
  </div> <br /> <br /> <br />

  <section id="aboutlearn" className="bgaboutlearn">
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon4} class="mb-3" alt=""/>
                    <h3 className="mb-3">1000+ STUDENTS</h3>
                    <p className="text-muted mb-0">More than 1000+ Students Worldwide trained by Shifa</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color text-font-size">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon5} class="mb-3" alt=""/>
                    <h3 className="mb-3">WORK WITH US</h3>
                    <p className="text-muted mb-0">Opportunity to work on our big projects and get paid</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon6} class="mb-3" alt=""/>
                    <h3 className="mb-3">BUILD BUSINESS</h3>
                    <p className="text-muted mb-0">Mentor and guidance to build your own brand</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon7} class="mb-3" alt=""/>
                    <h3 className="mb-3">BECOME AN EXPERT</h3>
                    <p className="text-muted mb-0">Get to know more about Art of Mehendhi</p>
                </div>
            </div>
        </div>
    </div>
    <br/>
    </section>


    <div className="container text-center">
                   <h2 className="display-5 mt-5">FLEXIBLE CLASS SCHEDULE</h2>
                    <h5> <SlCalender className='fs-6 mx-2 cal' />Weekdays - Day time classes</h5>   
                    <h5> <SlCalender className='fs-6 mx-2 cal' />Weekdays – Evening Classes (for working ladies)</h5>   
                    <h5> <SlCalender className='fs-6 mx-2 cal' />Weekend Classes</h5>                
                <div className='row'>
                    <div className="col-sm-6 col-lg-4 d-flex align-items-center justify-content-center w-10 mx-auto mt-5">  
                    </div>            
                </div>                   
  </div>





          <EventCard active={true} data={allEvents && allEvents[0]} id="regforclass" />

          <div className='section parent'> 
   <img src={cer} alt='' className='d-block w-100'/>
   <div className="text center"><h4 className='pic-txt text-center'>1000+</h4>
     <p className='par-txt text-center'>CERTIFIED STUDENTS</p></div>
  </div> 




  <Footer />

        </div>

       
      )}
    </>
  );
};

export default EventsPage;
