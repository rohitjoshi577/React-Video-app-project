import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar(){
  let showSidebar = useSelector((store)=>store.toggle.value);
  return(
    <>
    <div className={showSidebar ? "sidebar-flex" : "sidebar-flex-toggle"}>
    <Link to="/">
      <div className="sidebar-item">
      <span className="material-icons" >home</span>
      <p>Home</p>
      </div>
    </Link>

      <Link to="/history">
      <div className="sidebar-item">
      <span className="material-icons" >history</span>
      <p>History</p>
      </div>
      </Link>
       
      <Link to="/user/saved">
      <div className="sidebar-item">
      <span className="material-icons" >subscriptions</span>
      <p>Saved</p>
      </div>
      </Link>

      <Link to="/user/liked">
      <div className="sidebar-item">
      <span className="material-icons" >thumb_up</span>
      <p>Liked</p>
      </div>
      </Link>
    </div>
    </>
  )
}



export default Sidebar;