// import React,{useState,useEffect,useRef} from 'react'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './navbar'
import userAPI from '../api/userAPI'
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

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        marginTop : '10ch',
        width: '55ch',
      },
    },
    h2Margin:{
        marginLeft : '11ch'
    },
    width:{
        width: '57ch',
      },
    styleErrorMessage:{
        color: 'red',
        marginLeft : '3ch',
        fontSize:30,
        fontFamily: 'Fredoka One, cursive'
    },
    textField: {
        width: '55ch',
        marginBottom : '5ch'
    },
}));

//
const Login = ()=>{
    const classes = useStyles();
    const history = useHistory();

    //states
    const [loginDetail,setLogingDetails] = useState({
        email: '',
        password: ''
    }); 

    const [showPassword,setShowPassword] = useState({
        showUserPassword: false    
    })

    const [errorMessage,setErrorMessage] = useState({
        emailErrorMessage : '',
        passwordErrorMessage : ''
    })
    const [isError,setIsError] = useState({
        emailError : false,
        passwordError : false
    })
    // const [data,setData] = useState({});
    // const firstUpdate = useRef(true);
    //Callbacks
    const onInputChange = (e)=>{
        setLogingDetails({
            ...loginDetail,
            [e.target.name]: e.target.value
        })
        // console.log(loginDetail)
    }

    const handleClickShowOldPassword = () => {
        setShowPassword({showUserPassword: !showPassword.showUserPassword });
    };

    const onFormSubmit = async(e)=>{
        e.preventDefault()
        // console.log(loginDetail);
        try {
            const response = await userAPI.post('/login',{
                email:loginDetail.email,
                password:loginDetail.password,
            })
            // console.log(response);
            //set JWT in localStorage
            // localStorage.setItem('token',response.data.token)
            if(response){
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('user_id',response.data.user.id);
                localStorage.setItem('user_first_name',response.data.user.first_name);
                localStorage.setItem('user_email',response.data.user.email);
                // setData(response.data.user);
                history.push('/profile');
            }
            // setLogingDetails({
            //     email: '',
            //     password: ''
            // })    
        } catch (err) {
            if (err.response && err.response.data) {
                // console.log(err.response.data.msg)
                if(err.response.data.msg === 'Invalid Email'){
                    setIsError({
                        ...isError,
                        emailError : true,
                    });
                    setErrorMessage({
                        ...errorMessage,
                        emailErrorMessage : 'Invalid Email'
                    })
                }
                if(err.response.data.msg === 'Invalid Password'){
                    setIsError({
                        ...isError,
                        passwordError : true
                    })
                    setErrorMessage({
                        ...errorMessage,
                        passwordErrorMessage : 'Invalid Password'
                    })
                }
                setErrorMessage(err.response.data.msg);
            }
        }
    }

    //State Lifting(Preventing useEffect from running on first render)
    // useEffect(()=>{
    //         // console.log('Login component render for the first time',data);
    //         // console.log('from use effect');
    //         // getUser(data)
    //         // getUser('form login to app')
    //         if (firstUpdate.current) {
    //             firstUpdate.current = false;
    //             return;
    //           }
    //         //   console.log(data);
    //           getUser(data)
    // },[data])

    // console.log('login')

    return(
        <div>
            <Navbar goto='Signup' btn='Signup' title='To-Do App'/>
            <Container maxWidth="sm">
            <h2 className={classes.h2Margin}>Login To-Do App</h2>
            {/* { errorMessage && <h3 className={classes.styleErrorMessage}> {errorMessage} </h3> } */}
                <div className={classes.root}>
                <form onSubmit={onFormSubmit} >
                    {/* <h2 className={classes.h2Margin}>Login To-Do App</h2> */}
                    <TextField 
                        type="email" 
                        name="email" 
                        onChange={onInputChange}
                        label="Email Address"
                        required
                        variant="outlined"
                        error = {isError.emailError}
                        helperText={errorMessage.emailErrorMessage} 
                        style={{width: '100%', marginBottom: '10px'}}
                    />
                
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="user_password">Password*</InputLabel>
                        <OutlinedInput
                            id="user_password"
                            name = 'password'
                            type={showPassword.showUserPassword ? 'text' : 'password'}
                            onChange={onInputChange}
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
                            error = {isError.passwordError}
                            // helperText={errorMessage}
                            />
                    </FormControl>
                <Button 
                    type="submit"
                    onClick={onFormSubmit}  
                    className={classes.width} 
                    variant="contained" 
                    color="primary">Login
                </Button>
                </form>
                </div>
                
            </Container>
        </div>
        
    )
}

export default Login;