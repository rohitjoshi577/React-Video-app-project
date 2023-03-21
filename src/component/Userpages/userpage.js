import React, { useEffect, useState } from "react";
import "../video section/videos.css";
import "./userpage.css";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function UserPage(){
  const VideoIds = useParams().page=="liked"? useSelector(store=>store.like.value):useSelector(store=>store.saved.value);
  const [videosData , setVideosData]= useState([]);
  const toggle = useSelector(store=>store.toggle.value);
  useEffect(()=>{
    getVideoData();
  } ,[VideoIds])

  async function getVideoData(){
    const youtubeApiKey = 'AIzaSyBfB1P9ePJPU_V35m5JZkvMMIB7MvtsZl0';
    const StringVideoIds = String(VideoIds);
    const Api = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${StringVideoIds}&key=${youtubeApiKey}`;
    const data = await fetch(Api);
    const JsonDataOfVideos = await data.json();
    setVideosData(JsonDataOfVideos.items);
    // console.log(JsonDataOfVideos);
  }

      return (
      <div className={toggle?"userpage-body":"userpage-body-toggle"}>
        <div className="total">{videosData?.length} videos {useParams().page} </div>
        <div className="all-video-grid">
        {videosData.map((object)=>{
          return(
          <Link to={`/watch/${object?.id}`} key={object?.id} style={{textDecoration: 'none' , backgroundColor:"inherit" , color:"inherit"}}>
            <VideoCard object={object}  />
          </Link>
          )
        })}
        </div>
      </div>
      )
    }

  function VideoCard(props){
    const object = props.object;
    return(
      <div className="video" >
             <div className="thumbnail-div">
              <img src={object?.snippet?.thumbnails?.medium?.url} className="thumbnail" />
              <span className="material-icons play_circle " id="play_circle_show"> play_circle</span>
             </div>

               <div className="written-section">
             <p className="title">{object?.snippet?.title?.slice(0, 30)}.....</p>
             <p className="channel-name"> {object?.snippet?.channelTitle}</p>
             <div className="button-flex">
                <div>
                  <p className="data">Views {object?.statistics?.viewCount} </p>
                </div>
                <div>
                  <p className="data">
                    {useParams().page}
                  </p>  
                </div>
              </div>  
             </div>
           </div>
    )
  }
    


      
export default UserPage;