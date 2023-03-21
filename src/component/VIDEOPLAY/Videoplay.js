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

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1000493ad2mshb4ce9754a05dffdp192ce9jsn86b5b0b976e4',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };
    
    fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${videoObjectId}&hl=en&gl=US`, options)
      .then(response => response.json())
      .then(response => setVideoData(response));
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
      <p className="chammel-title-videoplay">{videoData?.title}</p>
      <div className="channel-flex">
        <div className="channel-name-flex">
        <img src={videoData?.author?.avatar[1]?.url} alt="" className="channel-image"/>
        <p className="channel-name-videoplay">{videoData?.author?.title}</p>
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

      {/* <Subscribe channelID = {videoData?.author?.channelId}  channelName ={videoData?.author?.title}/> */}

      <Description videoData={videoData}/>

  
    </div>
    </>
  )
}


function Description(props){

  return(
    <>
    <div className="description-videoplay"  >
    <p className="description-of-video"> description </p>
    <p className="description-of-video" >{props.videoData?.description}</p>
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


// function Subscribe (props){
//   console.log(props);
//   return(
//     <>
//     <button>Subscribe {props.channelName} </button>
    
//     </>
//   )
// }


export default VideoPlay;