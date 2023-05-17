import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToggleOff } from "../../redux/toggleSlice";
import "./videoplay.css";
import { StoreLike ,removeLike} from "../../redux/likeSlice";
import { SaveVideo } from "../../redux/savedslice";
import { subscribeChannel, unsubscribeChannel } from "../../redux/SubscribeSlice";
import { toast } from 'react-toastify';



function VideoPlay(){
  const dispatch = useDispatch();
  let showSidebar = useSelector(store=>store.toggle.value);
  const videoObjectId = useParams().id;

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
      .then(response => {setVideoData(response.items[0])});
    }

  const initialLikevValue = !useSelector(store=>store.like.value.includes(videoObjectId));
  const initialsavevalue =  useSelector(store=>store.saved.value.includes(videoObjectId));


  const[like , setLike] = useState(initialLikevValue);
  const[saved,setsaved] =useState(initialsavevalue);

  function Like(id){
    dispatch(StoreLike(id))
    setLike(false);
    toast.success('video liked', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  function Dislike(id){
    dispatch(removeLike(id))
    setLike(true);
    toast.error('video disliked', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  function saveVideo(id){
    dispatch(SaveVideo(id));
    setsaved(true);
    toast.success('video is saved', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
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
  function download() {
    

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a056349e46msh57e9daf327afbc6p1c1e75jsn49c270fdf36f',
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    };
    
    fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`, options)
      .then(response => response.json())
      .then(response => setLink(response.adaptiveFormats[0].url))
        .catch(err => console.error(err));
        
    }
    return (
    <div>
    <a href={link=""? null : link} target="_blank" style={{textDecoration:"none" , backgroundColor:"inherit" , color:"inherit"}}>
          <span className="material-icons file_download" onClick={()=>{
            download();
            toast.info('download video from next page', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
            }>file_download</span>
    </a>
    </div>
  )
}


function Subscribe (props){
  const subscribedBefore = useSelector(store=> store.subscribe.value.includes(props.channelID));
  const [subscribed, setsubscribed] = useState(true);
  
  

  useEffect(
    ()=>{setsubscribed(subscribedBefore);
    },
    [subscribedBefore]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  function subscribe(id){
    setsubscribed(true);
    dispatch(subscribeChannel(id));
  }

  function unsubscribe(id){
    setsubscribed(false);
    dispatch(unsubscribeChannel(id));
  }

  return(
    <>
    {subscribed?
    <button className="videoplay-unsubscribe-button" onClick={()=>{unsubscribe(props.channelID)} }>Unsubscribe {props.channelName} </button>
    :
    <button className="videoplay-subscribe-button" onClick={()=>{subscribe(props.channelID)}}>Subscribe {props.channelName} </button>
      }


      <button className="go-to-subscribe-button" onClick={() => {
        navigate(`/channel/${props.channelID}`);
        toast.success(`opening ${props.channelName} official page`, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }}>visit {props.channelName} page</button>
      

    </>
  )
}


export default VideoPlay;