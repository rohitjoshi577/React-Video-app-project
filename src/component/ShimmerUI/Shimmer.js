import React from "react";
import "./Shimmer.css"


function Card(){
  return(
  <div className="card">
    <div className="shimmer">
    </div>
    <div className="written"></div>
    <div className="written"></div>
  </div>
  )
}


function Shimmer (){
  return(
    <div className="shimmer-flex">
      

    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>

     
      

    </div>
  )
}

export default Shimmer;