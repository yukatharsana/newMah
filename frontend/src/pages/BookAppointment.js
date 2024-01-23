import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import bh from "../image/bh.png"
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img3.png";
import icon0 from "../image/icon0.png";
import icon1 from "../image/icon1.png";
import icon2 from "../image/icon2.png";
import icon3 from "../image/icon3.png";
import d1 from "../image/d1.png";
import d2 from "../image/d2.png";
import book1 from "../image/1book.png";
import book2 from "../image/2book.png";
import book3 from "../image/3book.png";
import book4 from "../image/4book.png";
import ArtistForm from "../components/ArtistForm";
import moment from "moment";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Artist from "../components/Artist"




function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const { user } = useSelector((state) => state.user);
    const [artist, setArtist] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const [artists, setArtists] = useState([]);
    
  
    const getArtistData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/v2/artist/get-artist-info-by-id",
          {
            asrtistId: params.artistId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch(hideLoading());
        if (response.data.success) {
          setArtist(response.data.data);
        }
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };
    const checkAvailability = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/v2/user/check-booking-avilability",
          {
            artistId: params.artistId,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          setIsAvailable(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    };
    const bookNow = async () => {
      setIsAvailable(false);
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/v2/user/book-appointment",
          {
            artistId: params.artistId,
            userId: user._id,
            artistInfo: artist,
            userInfo: user,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch(hideLoading());
        if (response.data.success) {
          
          toast.success(response.data.message);
          navigate('/appointments')
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    };

    const AllApprovedDoctors = async () =>{

      const getData = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.get("/api/v2/user/get-all-approved-artists", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          dispatch(hideLoading())
          if (response.data.success) {
            setArtists(response.data.data);
          }
        } catch (error) {
          dispatch(hideLoading())
        }
      };
  
  useEffect(() => {
    getData();
  }, []);
    }

  return (
    <>

    <Header activeHeading={5}/>

    <div className='section'>
   
   <img src={bh} alt='' className='d-block w-100'/>
   

    </div> 

    <div className="container text-center">
                    
                    <div className="d-flex align-items-center justify-content-center w-50 mx-auto mt-5">                       
                    <a href='#opening' ><button className='d-block btn bbb border-0 btn mx-4 btn-book-henna transform-on-hoverr text-white '>BOOK SERVICES</button>  </a>
                    </div>
                    <h2 className="display-5 mt-5">♥︎ SRILANKA'S FIRST EVER ONLINE HENNA STORE ♥︎</h2>
                    <h4><b>10 years</b> of experience,  <b>20000+</b> clients hennaed, <b>4.8-star</b> customer Reviews.</h4>
    </div> <br/>

    
   <div id="about" class="bg">
    <div className="container ">
        <div className="row ">
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon0} className="mb-3 bookimg" alt="" />
                    <h3 className="mb-3 auth-card">Organic Henna</h3>
                    <p className="text-muted mb-0">Our templates are updated regularly so they don&#39;t break.</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color text-font-size">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon1} class="mb-3" alt=""/>
                    <h3 className="mb-3">Service at your Location</h3>
                    <p className="text-muted mb-0">You can use this theme as is, or you can make changes!</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon2} class="mb-3" alt=""/>
                    <h3 className="mb-3">Customized Designs </h3>
                    <p className="text-muted mb-0">We update dependencies to keep things fresh.</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 text-center text-color">
                <div className="mx-auto service-box mt-5 text-font-size"><img src={icon3} class="mb-3" alt=""/>
                    <h3 className="mb-3">Henna Workshops </h3>
                    <p className="text-muted mb-0">You have to make your websites with love these days!</p>
                </div>
            </div>
        </div>
    </div>
    <br></br><br></br>
    </div>

    <section id="video" className="">
    <div className="container">
        <div className="row">
            <div className="col-md-12 col-lg-12 text-center text-color">
            <div className="mx-auto service-box mt-5 text-font-size-bg">
                    <h1 className="mb-3">Watch the Experience</h1>                   
                </div>  
                <div className="embed-responsive embed-responsive-16by9">
                <iframe className="ash" width="1270" height="600" src="https://www.youtube.com/embed/V8R6aogIZz8?si=JhKEUbqv2c4l3Ory" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                               
                <div className="d-flex align-items-center justify-content-center w-50 mx-auto mt-5 ">                       
                <a href='#opening' ><button className='d-block btn bbb border-0 btn mx-4 btn-book-henna transform-on-hoverr text-white '>BOOKS SERVICES</button>  </a>
                    </div>
           </div>         
            </div>

        </div>
    </div>    
    <br></br><br></br>
    </section>
   
   




    <div>
    <Row gutter={20}>
        {artists.map((artist) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Artist artist={artist} />
          </Col>
        ))}
      </Row>
    </div>

    <section className="Henna Types">
    <div className="container">
        <div className=''> <h3 className='col-xs-10 col-sm-12 col-md-12 col-lg-12 text-center typescolor'>.....................................................................................</h3></div>
        <h1 className='text-center '> Available Henna Types </h1> <br/>
        <div className="row g-0">
            <div className="col-md-2 col-lg-6 item zoom-on-hover"><a href="#"><img class="img-fluid image" src={book1} /></a></div>
   
            <div className="col-md-2 col-lg-6 item zoom-on-hover"><a href="#"><img class="img-fluid image" src={book2}/></a></div>

        </div>
        <div className="row g-0">
             

          
            <div className="col-md-4 col-lg-6 item zoom-on-hover"><a href="#"><img class="img-fluid image" src={book3} /></a></div>
            
            <div className="col-md-4 col-lg-6 item zoom-on-hover"><a href="#"><img class="img-fluid image" src={book4}/></a></div>
        </div>
    </div>
</section>
 <br/>
   <Footer />
    </>
  )
}

export default BookAppointment;