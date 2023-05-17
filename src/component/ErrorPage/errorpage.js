import React from "react";
import './errorpage.css';
import { Link } from "react-router-dom";

function ErrorPage(){
  return(
    <div className="error-page">
     <p>WE ARE SORRY PAGE NOT FOUND</p> 
     <Link to="/">
     <button className="error-button">Visit homepage</button>
     </Link>
    </div>
  )
}

export default ErrorPage;