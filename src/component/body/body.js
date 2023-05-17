import React, { useEffect, useState } from "react";
import "./body.css";
import { useSelector} from 'react-redux'
import VideoFlex from "../video section/videos";


function Body(){
  let toggle = useSelector(store=>store.toggle.value);
  
  return(
    <div className={toggle? "body-flex":"body-flex-toggle"}>
      <div  className="body">
      <VideoFlex/>
      </div>
    </div>
    
  )
}

export default Body;
