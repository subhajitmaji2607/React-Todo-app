import React,{useState,useEffect} from 'react'
// import {useHistory} from 'react-router-dom'

//Style Related Import
import { makeStyles } from '@material-ui/core/styles';
import {Tabs,Tab,AppBar} from '@material-ui/core'


//Import Components
import userAPI from '../api/userAPI';
import Navbar from './navbar'
import Userinformation from './UserInformation'
import ChangePassword from './ChangePassword'
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

const useStyles = makeStyles((theme) => ({
  appbar:{
      marginTop:'2ch'
  },
  }));


  
  const Profile = ()=>{
      const classes = useStyles();
      // const history = useHistory();
      // console.log(userInfo);

      //states
      const [selectedTab,setselectedTab]= useState(0)
      const [userFirstName,setUserFirstName] = useState('')

      //callbacks
      const fetchUser = async()=>{
        const response = await userAPI.get('/userinformation',{
          params: {
            id : localStorage.getItem('user_id'),
          },
          headers : {
            authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
          }
        })
        setUserFirstName(response.data.response.first_name)   
      }
    //   console.log(userFirstName)

    const handleChange = (event, newValue) => {
        setselectedTab(newValue);
        // console.log(newValue);
    };

    const logoutUser = ()=>{
        // localStorage.removeItem('token');
        // history.push('/login');
        console.log('User logged out')
    }

    const redirectToTab = (data)=>{
      setselectedTab(data);
    }

    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <div>
            {/* <Navbar goto='login' onClick={logoutUser} title="Logout"/> */}
            <Navbar goto='login' btn="Logout" title={`Hello ${userFirstName} 👋`} onClick={logoutUser}/>
            <AppBar className={classes.appbar} position='static'>
                <Tabs value={selectedTab} onChange={handleChange} style={{marginLeft : '15ch'}}>
                    <Tab label = 'To-Do-List' style={{marginLeft : '10ch'}}/>
                    <Tab label = 'Add To-Do Item' style={{marginLeft : '10ch'}}/>
                    <Tab label ='Profile Info' style={{marginLeft : '10ch'}}/>
                    <Tab label ='Change password' style={{marginLeft : '10ch'}}/>
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <ToDoList/>}
            {selectedTab === 1 && <AddToDo  redirectToTab = {redirectToTab}/>}
            {selectedTab === 2 && <Userinformation />}
            {selectedTab === 3 && <ChangePassword/>}
        </div>
    );
}

export default Profile;