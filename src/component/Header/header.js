import React, { useState } from "react";
import "./header.css";
import { callToggle } from "../../redux/toggleSlice";
import { useDispatch } from "react-redux";
import VideoTube from "../../images/videotube.png";
import { setFetchApi } from "../../redux/apiSlice";
import { addToHistory, clearHistory } from "../../redux/historyslice";
import { v4 } from "uuid";
import { Link, useNavigate  } from "react-router-dom";
import { setFetchApi } from "../../redux/apiSlice";
import { ClearLike } from "../../redux/likeSlice";
import { clearSaveVideo } from "../../redux/savedslice";
import { deleteData } from "../../redux/SubscribeSlice";
import 'react-toastify/dist/ReactToastify.css';
import {toast } from 'react-toastify';

function Header() {
  const dispatch = useDispatch();
  const [searchquery, setSearchquery] = useState("");
  const navigate = useNavigate();

  function collectSearchInput(event) {
   
   
      setSearchquery(event.target.value);
      
 
  }

  function Search() {
    searchquery.length
      ? dispatch(setFetchApi(searchquery))
      : console.log("search is empty");
    searchquery.length
      ? dispatch(addToHistory({ id: v4(), search: searchquery }))
      : null;
      toast.info('fetching data from API', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }


  function deleteAllData() {
    dispatch(ClearLike());
    dispatch(clearHistory());
    dispatch(clearSaveVideo());
    dispatch(deleteData());
    toast.error('deleting all your data', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  function moveDefault() {
    dispatch(setFetchApi("gaming"));
  }

  return (
    <>
      <div className="header">
        <div>
          <span
            className="material-icons"
            id="menu"
            onClick={() => {
              dispatch(callToggle());
            }}
          >
            menu
          </span>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              backgroundColor: "inherit",
              color: "inherit",
            }}
          >
            <img
              src={VideoTube}
              alt="logo"
              className="logo"
              onClick={moveDefault}
            />
          </Link>
        </div>
        <div className="mid-header">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={collectSearchInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                Search();
                navigate('/');
              }
            }}
          />
          <Link
            to="/"
            style={{
              textDecoration: "none",
              backgroundColor: "inherit",
              color: "inherit",
            }}
          >
            <div className="search-icon-background" onClick={Search}>
              <span className="material-icons" id="search">
                search
              </span>
            </div>
          </Link>
        </div>

        <div>
          <span className="material-icons auto_delete " onClick={deleteAllData}>
          auto_delete
          </span>
        </div>
      </div>
      
    </>
  );
}
export default Header;
