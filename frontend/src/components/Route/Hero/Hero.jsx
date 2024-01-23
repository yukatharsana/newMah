import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative w-full bg-no-repeat ${styles.noramlFlex}`}
      
    >
                    
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[40px] text-[#3d3a3a] font-[600] capitalize text-center`}
        >
          ♥︎ SRILANKA'S FIRST EVER ONLINE HENNA STORE ♥︎
        </h1>

        <h4 className="text-center"><b>10 years</b> of experience,  <b>20000+</b> clients hennaed, <b>4.8-star</b> customer Reviews.</h4>
        
        <div className="justify-content-around  d-flex px">
        <Link to="/products" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover `}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    SHOP HENNA
                 </span>
            </div>
        </Link>
        <Link to="/products" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    LEARN HENNA
                 </span>
            </div>
        </Link>
        <Link to="/products" className="inline-block ">
            <div className={`${styles.button} mt-5 btn-ass transform-on-hover`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    BOOK HENNA
                 </span>
            </div>
        </Link> </div>
      </div>
    </div>
    
  );
};

export default Hero;
