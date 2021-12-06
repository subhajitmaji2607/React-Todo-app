import React from 'react';
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
//import Style
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//custom style 
const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    link:{
      textDecoration: 'none',
      color :"inherit",
    }
  }));

//component 
const Navbar =({goto,btn,title})=>{
    const classes = useStyles();

    //Routing using useHistory hooks 
    // const history = useHistory();
    // const handleClick = () =>{
    //   history.push(`/${title}`);
    // }

  return (
    <div>
      <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                  <Link to={`/${goto}`} className={classes.link}>
                  {/* <Link to='/login'> */}
                    <Button color="inherit">{btn}</Button>
                  </Link>
                  {/* <Button onClick={handleClick} color="inherit">{title}</Button> */}
            </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;