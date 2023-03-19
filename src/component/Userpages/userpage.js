import React, { useEffect, useState } from "react";
import "../video section/videos.css";
import { useSelector, useStore } from "react-redux";
// import { useParams } from "react-router-dom";


function UserPage(){
  const VideoIds =useSelector(store=>store.like.value);
  // let page =useParams().page;
  const [videosData , setVideosData]= useState([]);
  useEffect(()=>{
    getVideoData();
  } ,[VideoIds])

  async function getVideoData(){
    const youtubeApiKey = 'AIzaSyBfB1P9ePJPU_V35m5JZkvMMIB7MvtsZl0';
    const StringVideoIds = String(VideoIds);
    const Api = `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&part=snippet&id=${StringVideoIds}`;
    const data = await fetch(Api);
    const JsonDataOfVideos = await data.json();
    console.log(JsonDataOfVideos.items);
    setVideosData(JsonDataOfVideos.items);
  }

  return(
    <>
     {videosData.map((object)=>{
      return(
        <>        
        </>

        
      )
     }
     )
    }
    </>
  )
}

export default UserPage;