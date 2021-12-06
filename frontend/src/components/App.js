// import react,{useState,useEffect} from 'react';
// import {useState} from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Signup from './signup'
import Login from './login'
import Profile from './profile'
import TestForm from './DummyForm';

const App = ()=> {
  //states
  // const [userInfo,setUserInfo] =useState({});

  //callback
  // const getUser = (data)=>{
  //   // console.log(data)
  //   setUserInfo(data)
  // }
  // console.log(userInfo)
  
// console.log('state of App',userInfo)
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/profile" exact component={Profile}/> 
        {/* <Route path="/login" exact component={()=><Login getUser={getUser}/>}/> */}
        {/* <Route path="/profile" exact component={()=><Profile userInfo={userInfo}/>}/> */}
       </Switch>
    </BrowserRouter>  
    {/* <Signup/> */}
    {/* <Login getUser={getUser}/> */}
    {/* <UserInformation/>*/}
    {/* <TestForm/> */}
    </>

  );
}

export default App;
