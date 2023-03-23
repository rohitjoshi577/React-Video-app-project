import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToggleOff } from "../../redux/toggleSlice";
import "./videoplay.css";
import { StoreLike ,removeLike} from "../../redux/likeSlice";
import { SaveVideo } from "../../redux/savedslice";



function VideoPlay(){
  const dispatch = useDispatch();
  let showSidebar = useSelector(store=>store.toggle.value);
  const videoObjectId= useParams().id;

  useEffect(()=>{
    dispatch(ToggleOff());
  },[]);




  return(
    <>
    <div className={showSidebar?"videoplay-body": "videoplay-body-toggle"}>


    <div className="iframe-container">
      <iframe 
      width="100%" 
      height="100%" 
      src={`https://www.youtube.com/embed/${videoObjectId}`} 
      title="YouTube video player" 
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen></iframe>
    </div>
    <VideoDetail/> 
    </div>
    

    
</>
  )
}


function VideoDetail(){
  let showSidebar = useSelector(store=>store.toggle.value);
  const [videoData,setVideoData]=useState({});
  const videoObjectId= useParams().id;
  let dispatch = useDispatch();
  useEffect(()=>{
    getVideoDetails();
  },[]);

  async function getVideoDetails(){

    const google_api_key = 'AIzaSyBfB1P9ePJPU_V35m5JZkvMMIB7MvtsZl0';
    
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoObjectId}&key=${google_api_key}`)
      .then(response => response.json())
      .then(response => setVideoData(response.items[0])
      );
  }

  const initialLikevValue = !useSelector(store=>store.like.value.includes(videoObjectId));
  const initialsavevalue =  useSelector(store=>store.saved.value.includes(videoObjectId));


  const[like , setLike] = useState(initialLikevValue);
  const[saved,setsaved] =useState(initialsavevalue);

  function Like(id){
    dispatch(StoreLike(id))
    setLike(false);
  }

  function Dislike(id){
    dispatch(removeLike(id))
    setLike(true);
  }

  function saveVideo(id){
    dispatch(SaveVideo(id));
    setsaved(true);
  }

  return(
    <>
    <div className={showSidebar? "video-description-toggle":"video-description"}>
      <p className="channel-title-videoplay">{videoData?.snippet?.title}</p>
      <div className="channel-flex">
        <div className="channel-name-flex">
        <p className="channel-name-videoplay">{videoData?.snippet?.channelTitle}</p>
        </div>


        <div>
          {like? <><span className="material-icons thumb_up" onClick={()=>Like(videoObjectId)}>thumb_up</span></> :
          <><span className="material-icons thumb_down " onClick={()=>Dislike(videoObjectId)}>thumb_down</span></>}
        
        

        </div>

        <div>
          {!saved ?<><span className="material-icons queue" onClick={()=>saveVideo(videoObjectId)}>queue</span></>:
          <><span className="material-icons playlist_add_check_circle">playlist_add_check_circle</span></>}
        </div>

        <div>
          <Download/>
        </div>

      </div>

      <Subscribe channelID = {videoData?.snippet?.channelId}  channelName ={videoData?.snippet?.channelTitle}/> 

      <Description videoData={videoData}/>

  
    </div>
    </>
  )
}


function Description(props){

  return(
    <>
    <div className="description-videoplay"  >
    <p style={{textAlign:"center" , marginBottom:"0px" , paddingTop:"10px"}}> description </p>
    <div style={{padding:"10px"}}>
    <p className="description-of-video" >{props.videoData?.snippet?.description}</p>
    </div>
    </div> 
    </>
  )
}





function Download(){
    const id = useParams().id;

    const [link ,setLink] = useState("");

    useEffect(()=>{
      download();
    },[])
    function download(){
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1000493ad2mshb4ce9754a05dffdp192ce9jsn86b5b0b976e4',
          'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
        }
      }; 
      fetch(`https://youtube-video-download-info.p.rapidapi.com/dl?id=${id}`, options)
        .then(response => response.json())
        .then(response => setLink(response?.link['17'][0]))
        .catch(err => console.error(err));
    }
    return (
    <div>
    <a href={link=""? null : link} target="_blank" style={{textDecoration:"none" , backgroundColor:"inherit" , color:"inherit"}}>
    <span className="material-icons file_download" onClick={download}>file_download</span>
    </a>
    </div>
  )
}


function Subscribe (props){
  const [subscribed , setsubscribed] = useState(false);
  function subscribe(id){
    setsubscribed(true);
    console.log(id +"add");
  }

  function unsubscribe(id){
    setsubscribed(false);
    console.log(id +"removed");
  }
  return(
    <>
    {subscribed?
    <button className="videoplay-unsubscribe-button" onClick={()=>{unsubscribe(props.channelID)} }>Unsubscribe {props.channelName} </button>
    :
    <button className="videoplay-subscribe-button" onClick={()=>{subscribe(props.channelID)}}>Subscribe {props.channelName} </button>
    }

    </>
  )
}


export default VideoPlay;