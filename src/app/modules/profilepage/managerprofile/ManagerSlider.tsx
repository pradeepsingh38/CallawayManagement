import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
const ManagerSlider = () => {
  return (
    

       <div className="cway-banner cwy-banner">
        
            <Carousel autoplay autoplaySpeed={5000}>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
              <img style={{height:"427px"}} src="https://admin.callawayindiaoms.com/uploads/banner4_6618c13b4e.png"></img>
           
              </div>
              </div>
              <div className='prodect-image'>
        
              
                <img style={{height:"427px"}} src="https://admin.callawayindiaoms.com/uploads/banner4_6618c13b4e.png"></img>
              </div>
              <div className='prodect-image'>
              
                <img style={{height:"427px"}} src="https://admin.callawayindiaoms.com/uploads/banner4_6618c13b4e.png"></img>
              </div>
            </Carousel>
          </div>
     

    
  )
}

export default ManagerSlider
