import React from 'react';
import Header from './component/Header/header';
import Sidebar from './component/sidebar/sidebar';
import "./app.css"
import Body from './component/body/body';
import { Outlet ,Routes ,Route } from 'react-router-dom';
import VideoPlay from './component/VIDEOPLAY/Videoplay';
import ErrorPage from './component/ErrorPage/errorpage';
import History from './component/history/history';
import UserPage from './component/Userpages/userpage';
import Channels from './component/Subscriptions/subscriptions';


function App(){
  return(
    <>
      <Header/>
      <Sidebar/>
      <Outlet/>
      <Routes>
        <Route path='/' element={<Body/>}/>
        <Route path="watch/:id" element={<VideoPlay />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path ="history" element={<History/>} />
        <Route path ="user/:page" element={<UserPage/>}/>
        <Route path ="/subscriptions" element={<Channels/>}/>

      </Routes>
      </>
    
  )
}

export default App;

