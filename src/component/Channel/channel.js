import React, { useEffect, useState } from 'react'
import './channel.css'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleOff } from '../../redux/toggleSlice';
import Shimmer from '../ShimmerUI/Shimmer';
import { subscribeChannel,unsubscribeChannel } from '../../redux/SubscribeSlice';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';



function Channel() {
  const toggle = useSelector(store => store.toggle.value);
  const dispatch = useDispatch();
  const [movie, setMovie] = useState([]);
  const channelID = useParams().channelID;
  const subscribedBefore = useSelector(store => store.subscribe.value.includes(channelID));
  const [subscribed, setsubscribed] = useState(subscribedBefore);

  function subscribe(id) { 
    setsubscribed(true);
    dispatch(subscribeChannel(id));
  }

  function unsubscribe(id) { 
    setsubscribed(false);
    dispatch(unsubscribeChannel(id));
  }
  




  useEffect(() => {
    dispatch(ToggleOff());
    async function getData() {
      

try {
  const response = await fetch(`https://yt-api.p.rapidapi.com/channel/videos?id=${channelID}`,
  {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a056349e46msh57e9daf327afbc6p1c1e75jsn49c270fdf36f',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
  }
	});
  const result = await response.json();
  setMovie(result);
	console.log(result);
} catch (error) {
	console.error(error);
}
    }

    // https://rapidapi.com/ytjar/api/yt-api

    getData();
  }, [])


  return (
    <div className={toggle ? 'channel-body' : 'channel-noToggle'}>
      {(movie.length == 0) ? <Shimmer /> : 
        <div>
          <img src={movie.meta.banner[3].url } alt="" className='bg-image'/>
          <div className='profile-div' >
          
            <img src={movie.meta.avatar[2].url} alt=""  className='profile'/>
            <p className='channel-name'>#{movie.meta.title}</p>
            <p className='subs-count'>{movie.meta.videosCountText} subscribers</p>

            
           
          </div>   
          {subscribed?
    <button className="videoplay-unsubscribe-button" onClick={()=>{unsubscribe(channelID)} }>Unsubscribe {movie.meta.title} </button>
    :
    <button className="videoplay-subscribe-button" onClick={()=>{subscribe(channelID)}}>Subscribe {movie.meta.title} </button>
    }
        </div>
      }

      <VideoSection videos={movie.data}  />
    
    </div>
  )
}


function VideoSection(props) {
  console.log(props.videos)
  return (
    <div className="all-video-grid">
      {props.videos?.map(video => {
        return (
          <Link to={`/watch/${video?.videoId}`} key={v4()} style={{ textDecoration: 'none', backgroundColor: "inherit", color: "inherit" }}>
            <VideoCard video={video} key={v4()} />
          </Link>
        )
       })}
       

    </div>
  )

}
 
function VideoCard(props) { 
  return (
    <>
      <div className="video">
        <div className="thumbnail-div">
          <img src={props.video?.thumbnail[3]?.url} className="thumbnail" /> 
          <span className="material-icons play_circle " id="play_circle_show"> play_circle</span>
        </div>
        <div className="written-section">
          <p className="title">{props.video?.title?.slice(0, 30)}.....</p>
          <div className="button-flex">
          <div>
              <p className="data">Views  {props.video?.viewCount}</p>
            </div>
            <div>
              <p className="data">Views  {props.video?.lengthText}</p>
          </div>
                  
          </div>
        </div>
      </div>
    </>
  )
}

export default Channel