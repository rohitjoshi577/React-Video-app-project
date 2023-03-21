import React from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import { setFetchApi } from "../../redux/apiSlice";

function Sidebar(){
  const dispatch = useDispatch();
  function defaultSearch(){
    dispatch(setFetchApi("gaming"));
    
  }
  let showSidebar = useSelector((store)=>store.toggle.value);
  return(
    <>
    <div className={showSidebar ? "sidebar-flex" : "sidebar-flex-toggle"}>

    <div className="sidebar-item" onClick={defaultSearch}>
     <NavLink to="/" >
      <span className="material-icons home" >home</span>
      <p className="sidebar-menu">Home</p>
     </NavLink>
    </div>

    <div className="sidebar-item" >
      <NavLink to="/history" >
       <span className="material-icons history" >history</span>
       <p className="sidebar-menu">History</p>
      </NavLink>
    </div>

    <div className="sidebar-item">
      <NavLink to="/user/saved" >
       <span className="material-icons subscriptions" >subscriptions</span>
       <p className="sidebar-menu">Saved</p>
      </NavLink>
    </div>
      
    <div className="sidebar-item">
      <NavLink to="/user/liked"  >
       <span className="material-icons thumb_up" >thumb_up</span>
       <p className="sidebar-menu">Liked</p>
      </NavLink>
    </div>
    
    </div>
    </>
  )
}



export default Sidebar;