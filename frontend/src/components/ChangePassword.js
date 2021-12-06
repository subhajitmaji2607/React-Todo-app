import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import userAPI from '../api/userAPI'
//import Style
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  
  width:{
    width: '80ch',
  },
  containermargin: {
    marginLeft :'40ch',
    marginTop : '5ch'
  },
  btnWidth:{
      width: '82ch'
  },
  textField: {
    width: '80ch',
  },
  styleErrorMessage:{
    color: 'red',
    marginLeft : '3ch',
    fontSize:30,
    fontFamily: 'Fredoka One, cursive'
  },
  green :{
    color : 'green'
  },
  red :{
    color : 'red'
  },
}));

//function for checking password
const checkUppercaseIntoPassword = (targetValue) =>{
  var result = targetValue.match(/[A-Z]/)
  return result != null ? true : false
}
const checkLowercaseIntoPassword = (targetValue)=>{
  var result = targetValue.match(/[a-z]/)
  return result != null ? true : false
}
function checkNumberIntoPassword(targetValue) {
  var result = targetValue.match(/\d+/g)
  return result != null ? true : false
}
const checkSpecialCharecterIntoPassword = (targetValue) =>{
  var result = targetValue.match(/[^A-Z a-z 0-9]/)
  return result != null ? true : false
}
const checkMinimumCharecterIntoPassword = (targetValue) =>{
  return targetValue.length > 7 ? true : false
}

//component
const ChangePassword = ()=>{
  const classes = useStyles();
  const history = useHistory();

  //States
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword,setShowPassword] = useState({
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  })

  const [passwordStrength,setPasswordStrength ] = useState({
    oneLowercase : false,
    oneUppercase : false,
    oneSpecialCharecter : false,
    oneNumber : false,
    minCharecterLength:false
  })
  
  const [errorMessage,setErrorMessage] = useState('')

  //Callbacks
  const onChangePassword = async(e) => {
    e.preventDefault();
    try {
      const response = await userAPI.put('/changepassword',{
        headers : {
          Authorization : 'Bearer' + ' ' + localStorage.getItem('token')
        },
        
          id : localStorage.getItem('user_id'),
          oldPassword : values.oldPassword,
          newPassword : values.newPassword,
          confirmPassword : values.confirmPassword,
  
      })
      if(response)
        history.push('/login')
      
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data.msg)
        setErrorMessage(err.response.data.msg);
      }
    }
  }
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if(event.target.name === 'newPassword'){
      setPasswordStrength({
        oneUppercase : checkUppercaseIntoPassword(event.target.value) ? true : false,
        oneLowercase : checkLowercaseIntoPassword(event.target.value) ? true : false,
        oneNumber : checkNumberIntoPassword(event.target.value) ? true : false,
        oneSpecialCharecter : checkSpecialCharecterIntoPassword(event.target.value) ? true : false,
        minCharecterLength: checkMinimumCharecterIntoPassword(event.target.value) ? true : false
      })
    }

  };
  
  const btnStatus = (values.newPassword.length !== 0 && values.confirmPassword.length !== 0 && values.newPassword === values.confirmPassword) ? false : true;
  
  const handleClickShowOldPassword = () => {
  setShowPassword({ ...showPassword, showOldPassword: !showPassword.showOldPassword });
  };
  const handleClickShowNewPassword = () => {
    setShowPassword({ ...showPassword, showNewPassword: !showPassword.showNewPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setShowPassword({ ...showPassword, showConfirmPassword: !showPassword.showConfirmPassword });
  };

  return(
    <div>
      <Container className={classes.containermargin}>
      { errorMessage && <h3 className={classes.styleErrorMessage}> {errorMessage} </h3> }
        <form onSubmit={onChangePassword} className={classes.root} >
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="old_password">Old Password*</InputLabel>
            <OutlinedInput
              id="old_password"
              name = 'oldPassword'
              type={showPassword.showOldPassword ? 'text' : 'password'}
              value={values.oldPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    edge="end"
                  >
                    {showPassword.showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="new_password">New Password*</InputLabel>
            <OutlinedInput
              id="new_password"
              name="newPassword"
              type={showPassword.showNewPassword ? 'text' : 'password'}
              value={values.newPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    edge="end"
                  >
                    {showPassword.showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={110}
            />
          </FormControl>
          <Typography variant ='h6'>Password must have </Typography>
          <p 
            variant="subtitle1"
            className={passwordStrength.oneUppercase ? classes.green : classes.red} 
            style={{fontFamily:'Josefin Sans, sans-serif'}}>
            one uppercase latter
          </p>
          <p
            variant="subtitle1" 
            className={passwordStrength.oneLowercase ? classes.green : classes.red}
            style={{fontFamily:'Josefin Sans, sans-serif',marginLeft:'25ch',position:'relative',bottom:'3ch'}}>
             one Lowercase latter
          </p>
          <p 
            variant="subtitle1"
            className={passwordStrength.oneNumber ? classes.green : classes.red}
            style={{fontFamily:'Josefin Sans, sans-serif',position:'relative',bottom:'2.8ch'}}>
             One Number
          </p>
          <p 
            variant="subtitle1"
            className={passwordStrength.oneSpecialCharecter ? classes.green : classes.red}
            style={{fontFamily:'Josefin Sans, sans-serif',marginLeft:'25ch',position:'relative',bottom:'6ch'}}>
             one Special Charecter
          </p>
          <p 
            variant="subtitle1"
            className={passwordStrength.minCharecterLength ? classes.green : classes.red}
            style={{fontFamily:'Josefin Sans, sans-serif',position:'relative',bottom:'5ch'}}>
             minimum 8 Charecters 
          </p>

          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="confirm_password">Confirm Password*</InputLabel>
            <OutlinedInput
              id="confirm_password"
              name = 'confirmPassword'
              type={showPassword.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showPassword.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={130}
            />
          </FormControl>

          <Button 
            type="submit"
            onClick={onChangePassword}  
            className={classes.btnWidth} 
            variant="contained" 
            color="primary"
            disabled ={btnStatus}
            >Reset Password
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ChangePassword;

