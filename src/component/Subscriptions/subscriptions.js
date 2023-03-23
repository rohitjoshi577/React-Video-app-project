import React, { useEffect, useState } from "react";
import "./subscriptions.css"
import { useDispatch, useSelector} from 'react-redux';
import { unsubscribeChannel } from "../../redux/SubscribeSlice";

function Channels(){
  let toggle = useSelector(store=>store.toggle.value);
  let subscribedChannelsId= useSelector(store=> store.subscribe.value);
  const [data , setData] = useState([]);
  const dispatch = useDispatch();

  function unsubscribe(id){
    dispatch(unsubscribeChannel(id));
  }


  useEffect(()=>{
    getSubscribeData();
  },[subscribedChannelsId])

  async function getSubscribeData(){
    const google_Api_key = 'AIzaSyBfB1P9ePJPU_V35m5JZkvMMIB7MvtsZl0';
    const StringIds = String(subscribedChannelsId);
    const data = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${StringIds}&key=${google_Api_key}`);
    const Json = await data.json();
    setData(Json.items);
  }
  
  return(
    <div className={toggle ? "subscribe-page-container" : "subscribe-page-container-toggle" }> 
    <p className='total-subscriptions'>Total subscriptions ({subscribedChannelsId.length})</p>
    {data?.map((object)=>{
      return(
      <div key={object.id} className="subscription-container">
        <img src={object?.snippet?.thumbnails?.high?.url} alt="" className="thumbnail-of-channel"/>
        <button className="unsubscribe-button-subscription-page" onClick={()=>{unsubscribe(object?.id)}}>unsubscribe {object?.snippet?.title} </button>
      </div>
      )
    })}
    </div>
  )
}

export default Channels;