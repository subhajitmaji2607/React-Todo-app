import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './navbar';
import userAPI from '../api/userAPI';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormHelperText } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
        },
    },  
    width:{
        width: '52ch', 
    },
    h2Margin:{
        marginLeft : '9ch'
    },
    styleErrorMessage:{
        color: 'red',
        marginLeft : '5ch',
        fontSize:30,
        fontFamily: 'Fredoka One, cursive'
    },
    textField: {
        width: '52ch',
      },
}));

/////////////////////////////////////////////////////////
//Component

const Signup = ()=>{
    const classes = useStyles();
    const history=useHistory();

    //states 
    const [userDetails,setuserDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        mobile_no: ''
    });

    const [showPassword,setShowPassword] = useState({
        showUserPassword: false    
    })

    const [errorMessage,setErrorMessage] = useState({
        first_name_err_msg : '',
        last_name_err_msg : '',
        email_err_msg : '',
        password_err_msg : '',
        phone_err_msg : ''
    })

    const [errorStatus,setErrorStatus] = useState({
        first_name_err : false,
        last_name_err : false,
        email_err : false,
        password_err : false,
        phone_err : false
    })
    //callbacks
    const onInputChange = (e)=>{
        const value = e.target.value
        setuserDetails({
            ...userDetails,
            [e.target.name] : value
        });
    };

    const handleClickShowOldPassword = () => {
        setShowPassword({showUserPassword: !showPassword.showUserPassword });
    };

    const onFormSubmit = async(e)=>{
        e.preventDefault();
        // When using catch, or passing a rejection callback as second parameter of then, 
        // the response will be available through the error object

        try {
            const response = await userAPI.post('/createuser',{
            first_name: userDetails.first_name,
            last_name : userDetails.last_name,
            email:userDetails.email,
            password:userDetails.password,
            mobile_no:userDetails.mobile_no
            })
            // console.log(response);
            if(response){
            history.push('/login')
            }
        } catch (err) {
            if (err.response && err.response.data) {
                // console.log(err.response.data)
                console.log(err.response.data[0].message)
                // setErrorMessage(err.response.data.msg);
                // if(err.response.data[0].context.key === 'first_name' 
                //     ? setErrorStatus({...errorStatus,first_name_err:true}) 
                //     : setErrorStatus({...errorStatus,first_name_err:false})
                // );
                // if(err.response.data[0].context.key === 'last_name'  
                //     ? setErrorStatus({...errorStatus,last_name_err:true}) 
                //     : setErrorStatus({...errorStatus,last_name_err:false})
                // );

                if(err.response.data[0].context.key === 'first_name'){
                    //set Error Status
                    setErrorStatus({...errorStatus,
                        first_name_err:true
                    });
                    //set Error Message 
                    setErrorMessage({...errorMessage,
                        first_name_err_msg : err.response.data[0].message
                    });
                } 
                else if(err.response.data[0].context.key === 'last_name'){
                    //set Error Status
                    setErrorStatus({...errorStatus,
                        first_name_err:false,
                        last_name_err:true});
                    //set Error Message
                    setErrorMessage({...errorMessage,
                        first_name_err_msg : '',
                        last_name_err_msg : err.response.data[0].message
                    });
                } 
                else if(err.response.data[0].context.key === 'email'){
                    //set Error Status
                    setErrorStatus({...errorStatus,
                        first_name_err:false,
                        last_name_err:false,
                        email_err:true})
                    //set Error Message
                    setErrorMessage({...errorMessage,
                        first_name_err_msg : '',
                        last_name_err_msg : '',
                        email_err_msg : err.response.data[0].message,
                    });    
                } 
                else if(err.response.data[0].context.key === 'password'){
                    //set Error Status
                    setErrorStatus({...errorStatus,
                        first_name_err:false,
                        last_name_err:false,
                        email_err:false,
                        password_err:true})
                    //set Error Message
                    setErrorMessage({...errorMessage,
                        first_name_err_msg : '',
                        last_name_err_msg : '',
                        email_err_msg : '',
                        password_err_msg : err.response.data[0].message,
                    });
                } 
                else if(err.response.data[0].context.key === 'mobile_no'){
                    //set Error Status
                    setErrorStatus({...errorStatus,
                        first_name_err:false,
                        last_name_err:false,
                        email_err:false,
                        password_err:false,
                        phone_err:true}) 
                    //set Error Message
                    setErrorMessage({...errorMessage,
                        first_name_err_msg : '',
                        last_name_err_msg : '',
                        email_err_msg : '',
                        password_err_msg : '',
                        phone_err_msg : err.response.data[0].message,
                    });
                } 
            }            
        }
    };
    // console.log(errorMessage)

    return (
        <div>
            <Navbar goto='Login' btn ='Login' title='To-Do App'/>
            <Container maxWidth="sm">
                <form onSubmit={onFormSubmit} className={classes.root} >
                    <h2 className={classes.h2Margin}>Sign up To Do App</h2>
                    {/* { errorMessage && <h3 className = {classes.styleErrorMessage}> {errorMessage} </h3> } */}
                    <TextField 
                        type="text" 
                        name="first_name" 
                        value = {userDetails.first_name}
                        onChange={onInputChange}
                        required
                        error = {errorStatus.first_name_err ? true : false}
                        // helperText = {error ? errorMessage.first_name_err_msg : ''}
                        helperText = {errorMessage.first_name_err_msg}
                        label="First name" 
                        variant="outlined"
                    />
                    <TextField 
                        type="text" 
                        name ="last_name" 
                        value = {userDetails.last_name} 
                        onChange={onInputChange}
                        error = {errorStatus.last_name_err ? true : false}
                        helperText = {errorMessage.last_name_err_msg}
                        required
                        label="Last name" 
                        variant="outlined"
                    />
                    <TextField 
                        type="email" 
                        name="email" 
                        value = {userDetails.email}
                        onChange={onInputChange}
                        error = {errorStatus.email_err ? true : false}
                        helperText = {errorMessage.email_err_msg}
                        required 
                        className={classes.width} 
                        label="Email Address" 
                        variant="outlined"
                    />

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="user_password">Password*</InputLabel>
                        <OutlinedInput
                            id="user_password"
                            name = 'password'
                            type={showPassword.showUserPassword ? 'text' : 'password'}
                            value={userDetails.password}
                            onChange={onInputChange}
                            error = {errorStatus.password_err ? true : false}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    edge="end"
                                >
                                {showPassword.showUserPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={100}
                            />
                            <FormHelperText error={errorStatus.password_err ? true : false}>
                                Password must contained 1 UpperCase Latter, 1 LowerCase Latter,1 Special Charecter,1 Symbol,min 8 Charecter
                            </FormHelperText>
                    </FormControl>
                    {/* <div><p>{errorMessage.password_err_msg}</p></div> */}
                    <TextField 
                        type="text" 
                        name="mobile_no" 
                        value = {userDetails.mobile_no} 
                        onChange={onInputChange}
                        error = {errorStatus.phone_err ? true : false}
                        helperText = {errorMessage.phone_err_msg}
                        required
                        className={classes.width} 
                        label="Phone Number" 
                        variant="outlined"
                    />
                    <Button 
                        type="submit"
                        onClick={onFormSubmit}  
                        className={classes.width} 
                        variant="contained" 
                        color="primary">Sign Up
                    </Button>

                </form>
            </Container>
        </div>
    
    )
    
}

export default Signup;