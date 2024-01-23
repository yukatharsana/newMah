import React from 'react'
import { Link } from 'react-router-dom'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import ko from "../image/ko.png"; 
import ko1 from "../image/ko1.png"
import ko2 from "../image/ko2.png"
import ko3 from "../image/ko3.png"
import '../../src/App.css'
import img1 from "../../src/image/img1.png"
import img2 from "../../src/image/img2.png"
import img3  from "../../src/image/img3.png"


//import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        
<div className="home-wrapper-1 py-5">
<div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="1000">
      <img src={ko} class="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="500">
      <img src={ko3} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={ko1} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className='home-h5'>Shipping  Worldwide</h5>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> </div>
        <Hero />

      

        <Categories />

      {/*  <div className='justify-center'>
     <p class="elementor-heading-title elementor-size-default tex-center">Experience</p>               
                <div class='row'>
                <h2 class="ekit-heading--title elementskit-section-title ">
					The Best <span><span>Henna</span></span> in Town
				   </h2>
                    <div className="col-sm-6 col-lg-4 d-flex align-items-center justify-content-center w-10 mx-auto mt-5">  
                    </div>            
                </div>   
  </div>*/}


        <BestDeals />
        <div className='destination-block cards-destination' >
<div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="card border-3 transform-on-hover hovereffect">
                    <Link to='/BookAppointment'> <img src={img1} className="card-img-top" alt=""/></Link>
                        </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                    <div className="card border-3 transform-on-hover hovereffect">
                    <Link to='/products'><img src={img2} className="card-img-top" alt="" /></Link>
                    </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                    <div className="card border-3 transform-on-hover hovereffect">
                    <Link to='/events'><img src={img3} className="card-img-top"alt=""/></Link>
                    </div>
                </div>
            </div> 

</div>




     {/*}   <Events /> */}
        <FeaturedProduct />

         




        <Footer />
    </div>
  )
}

export default HomePage