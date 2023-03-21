import React, { useState } from "react";
import "./header.css";
import { callToggle } from "../../redux/toggleSlice";
import { useDispatch } from "react-redux";
import VideoTube from "../../images/videotube.png"
import { setFetchApi } from "../../redux/apiSlice";
import { addToHistory, clearHistory } from "../../redux/historyslice"; 
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { setFetchApi } from "../../redux/apiSlice";
import { ClearLike } from "../../redux/likeSlice";
import { clearSaveVideo } from "../../redux/savedslice";


function Header(){
  const dispatch = useDispatch();
  const [searchquery , setSearchquery]= useState("");
  const [displayDeleteButton , setDisplayDeleteButton] = useState(false);

  function collectSearchInput(event){
    setSearchquery(event.target.value);
  }

  function Search(){
    searchquery.length ? dispatch(setFetchApi(searchquery)) : console.log('search is empty');
    searchquery.length ?dispatch(addToHistory({id: v4() ,search :searchquery,})) : console.log('cant create empty history');
  }

  function displayDelete(){
    setDisplayDeleteButton(!displayDeleteButton)
  }

  function deleteAllData(){
    dispatch(ClearLike());
    dispatch(clearHistory());
    dispatch(clearSaveVideo());
    setDisplayDeleteButton(false);
  }

  function moveDefault(){
    dispatch(setFetchApi("gaming"));
  }

  return(
    <>
    <div className="header">
      <div>
      <span className="material-icons" id="menu"
      onClick={()=>{ dispatch(callToggle())}}
      >menu</span>
      <Link to="/" style={{textDecoration:"none" , backgroundColor:"inherit" , color:"inherit"}}>
      <img src={VideoTube} alt="logo" className="logo" onClick={moveDefault}/>
      </Link>
      </div>
      <div className="mid-header">
        <input type="text" className="search-bar" placeholder="Search" onChange={collectSearchInput}/>
       <Link to="/" style={{textDecoration:"none" , backgroundColor:"inherit" , color:"inherit"}}> 
         <div className="search-icon-background" onClick={Search}>
          <span className="material-icons" id="search">search</span>
         </div>
       </Link> 
      </div>

      <div>
          <span className="material-icons settings" onClick={displayDelete}>settings</span>
      </div>
    </div>

    {displayDeleteButton? <div className="delete-div">
    <button className="delete-button" onClick={deleteAllData}>
      <span className="material-icons delete_sweep">delete_sweep</span>
       <p >Delete data</p>  
    </button>
    </div>:
    null
    }
    </>
  )
}





export default Header;