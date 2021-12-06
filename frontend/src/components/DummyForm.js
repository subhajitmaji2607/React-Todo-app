import React,{useState} from 'react';

//import Style
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    marginLeft :'28ch'
  },
  btnWidth:{
      width: '82ch'
  },
  textField: {
    width: '80ch',
  },
  green :{
    color : 'green'
  },
  red :{
    color : 'red'
  },
  
}));


//component
const ChangePassword = ()=>{
  const classes = useStyles();
  
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

  //States
  const [values, setValues] = useState({
    oldPassword: '',
  });
  
  const [showPassword,setShowPassword] = useState({
    showOldPassword: false,
  })
  
  const [passwordStrength,setPasswordStrength ] = useState({
      oneLowercase : false,
      oneUppercase : false,
      oneSpecialCharecter : false,
      oneNumber : false,
      minCharecterLength:false
  })
  
  const handleClickShowOldPassword = () => {
  setShowPassword({ ...showPassword, showOldPassword: !showPassword.showOldPassword });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // checkMinimumCharecterIntoPassword(event.target.value) ? setPasswordStrength({...passwordStrength, minCharecterLength : true}) : setPasswordStrength({...passwordStrength, minCharecterLength : false})
    // checkNumberIntoPassword(event.target.value) ? setPasswordStrength({...passwordStrength, oneNumber : true}) : setPasswordStrength({...passwordStrength, oneNumber : false})
    
    setPasswordStrength({
      // ...passwordStrength,
      oneUppercase : checkUppercaseIntoPassword(event.target.value) ? true : false,
      oneLowercase : checkLowercaseIntoPassword(event.target.value) ? true : false,
      oneNumber : checkNumberIntoPassword(event.target.value) ? true : false,
      oneSpecialCharecter : checkSpecialCharecterIntoPassword(event.target.value) ? true : false,
      minCharecterLength: checkMinimumCharecterIntoPassword(event.target.value) ? true : false
    })
  };
  // console.log(values);
  const btnStatus = passwordStrength.oneLowercase && passwordStrength.oneUppercase && passwordStrength.oneSpecialCharecter && passwordStrength.oneNumber && passwordStrength.minCharecterLength ? false : true;


  return(
    <div>
      <Container>
      {/* { errorMessage && <h3 className={classes.styleErrorMessage}> {errorMessage} </h3> } */}
        <form className={classes.root} >
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
              <p className={passwordStrength.oneUppercase ? classes.green : classes.red}>One Uppercase</p>
              <p className={passwordStrength.oneLowercase ? classes.green : classes.red}>one Lowercase</p>
              <p className={passwordStrength.oneNumber ? classes.green : classes.red}>One Number</p>
              <p className={passwordStrength.oneSpecialCharecter ? classes.green : classes.red}>One Special Charecter</p>
              <p className={passwordStrength.minCharecterLength ? classes.green : classes.red}>8 Charecter Minimum</p>
          <Button 
            type="submit"
            className={classes.btnWidth} 
            variant="contained" 
            color="primary"
            disabled ={btnStatus}
          >
              Save
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ChangePassword;

