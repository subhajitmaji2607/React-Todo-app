import React,{useState,useEffect} from 'react';
import userAPI from '../api/userAPI';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      marginTop: '2ch'
    },
  },
  
  width:{
    width: '80ch',
  },
  h2Margin:{
    marginLeft : '9ch'
  },
  containermargin: {
    marginLeft :'40ch'
  },
  btnWidth:{
      width: '82ch'
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginLeft: '20ch'
  },
  
}));


//component
const Userinformation = ()=>{
  const classes = useStyles();
  
  //State
  const [userInfo,setUserInfo] = useState({
    first_name : '',
    last_name : '',
    email : '',
    mobile_no : '',
  })
  const [profileImage,setProfileimage] = useState(null)
  // const [previewImage,setPreviewImage] = useState(null)
  // console.log(userInfo,profileImage)
  //callback
  
  const onInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name] : e.target.value
    })
  }
  const onSelectImage = (e)=>{
  //   console.log(e.target.files[0]);
    // const reader = new FileReader()
    // // console.log(reader)
    // reader.onload = ()=>{
    //   if(reader.readyState === 2){
    //     setProfileimage(reader.result)
    //   }
    //   console.log(profileImage)
    // }
    // reader.readAsDataURL(e.target.files[0])
    setProfileimage(e.target.files[0]);
  }

  //fetch user through api 
  const fetchUser = async()=>{
    const response = await userAPI.get('/userinformation',{
      params: {
        id : localStorage.getItem('user_id'),
      },
      headers : {
        authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
      }
    })
    // console.log(response.data.response)
    setUserInfo(response.data.response)
    // setProfileimage(response.data.response.profile_image)
  }
  
  // console.log(userInfo)
  //Update user
  const onFormUpdate = async(e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('id',userInfo.id)
    formData.append('first_name',userInfo.first_name)
    formData.append('last_name',userInfo.last_name)
    formData.append('email',userInfo.email)
    formData.append('mobile_no',userInfo.mobile_no)
    formData.append('profile_image',profileImage)

    const response = await userAPI.put('/update',formData,{
      headers: { 'Content-Type': 'multipart/from-data',
      Authorization : 'Bearer' + ' ' + localStorage.getItem('token')
    }
    })
    // console.log(response)
    if(response)
    fetchUser();
  }
  
  //API Calls
  useEffect(() => {
      fetchUser();
  },[])
    // if(Object.keys(userInfo).length !== 0)
    // console.log(userInfo.first_name)
    // console.log(userInfo)

  return(
    <div>
      <Container className={classes.containermargin}>
        <form onSubmit={onFormUpdate} className={classes.root} >
            <div>
              <Avatar src={userInfo.profile_image} className={classes.large} />
              {/* <Avatar src={profileImage} className={classes.large} /> */}
            </div>
            <div>
              <input type='file' name='profile_image' onChange={onSelectImage}/>
            </div> 
            <div> 
              <TextField 
                type="text" 
                name="first_name" 
                value = {userInfo.first_name}
                onChange = {onInputChange}
                className={classes.width}
                required
                label="First name" 
                variant="outlined"
              />
            </div>
            <div>
            <TextField 
              type="text" 
              name ="last_name" 
              value = {userInfo.last_name} 
              onChange = {onInputChange}
              className={classes.width}
              required
              label="Last name" 
              variant="outlined"
            />
            </div>                    
              <TextField 
                type="email" 
                name="email" 
                value = {userInfo.email}
                onChange = {onInputChange}
                required 
                className={classes.width} 
                label="Email Address" 
                variant="outlined"
              />
              <TextField 
                type="text" 
                name="mobile_no" 
                value = {userInfo.mobile_no} 
                onChange = {onInputChange}
                required
                className={classes.width} 
                label="Phone Number" 
                variant="outlined"
              />
              <Button 
                type="submit"
                onClick={onFormUpdate}  
                className={classes.btnWidth} 
                variant="contained" 
                color="primary">UPDATE
              </Button>

        </form>
      </Container>
    </div>
  )
}

export default Userinformation;
