import React, { useEffect, useState } from "react";
import "./videos.css";
import Shimmer from "../ShimmerUI/Shimmer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToggleOn , ToggleOff} from "../../redux/toggleSlice";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

function Video(){
  const dispatch = useDispatch();
  const fetchVideoApi = useSelector(store=>store.fetchApi.api);
  const fetchVideoMethod = useSelector(store=>store.fetchApi.options);
  
  
  const [Videos , setVideos] = useState([]);
  useEffect(()=>{
    if(window.innerWidth>340)
    dispatch(ToggleOn());
    else{
      dispatch(ToggleOff())

    }
  } ,[])

  useEffect(()=>{
    getAPI();
  },[fetchVideoApi , fetchVideoMethod]);


  async function  getAPI(){
    try{
    let api = await fetch(fetchVideoApi,fetchVideoMethod);
    let data= await api.json();
    setVideos(data.videos);
  }
    catch(error){
      console.log(error);
    }
  }
  return(<>
  {(Videos?.length==0)? <Shimmer/> : 
  <>
  <AllVideos Videos={Videos}/>
  </>}
  </>)


}

  function AllVideos(props){
    return(
    <div className="all-video-grid">
      {props.Videos?.map(video=>{
        return(
        <Link to={`/watch/${video?.video_id}`}   key={v4()} style={{textDecoration: 'none' , backgroundColor:"inherit" , color:"inherit"} }> 
          <VideoCard video={video} key={v4()}/>
        </Link>
        )
      })}
    </div>
    )
  }

    function VideoCard(props){
    return(
      <> 
      <div className="video">
      
        <div className="thumbnail-div">
         <img src={props.video?.thumbnails[0]?.url} className="thumbnail"/>
         <span className="material-icons play_circle " id="play_circle_show"> play_circle</span>
        </div>
          <div className="written-section">
              <p className="title">{props.video?.title?.slice(0, 30)}.....</p>
             <p className="channel-name"> {props.video?.author}</p>
                <div className="button-flex">
                <div>
                  <p className="data">Views  {props.video?.number_of_views}</p></div>
                  <div>
                <p className="data">{props.video?.video_length}</p> 
              </div>
                </div>
        </div>
      </div>
      </>
    )
  }


export default Video;