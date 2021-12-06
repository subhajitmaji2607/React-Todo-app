import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import todoAPI from '../api/todoAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField : {
    width : '70ch',
    marginLeft : '40ch',
    marginTop : '10ch'
  },
  btn : {
      marginRight : '50ch',
      marginLeft : '63ch'
  }
}));

/////////////////////////////////////////////////
const AddToDo = ({redirectToTab})=>{
    const classes = useStyles();
    const history = useHistory()
    const [text,setText] = useState('');
    
    const onInputChange = (e)=>{
        setText(e.target.value);
        // console.log(e.target.value);
    } 
    const onFormSubmit = async(e)=>{
        e.preventDefault();
        // console.log(text)
        const response = await todoAPI.post('/add-todo',{
            id : localStorage.getItem('user_id'),
            todoitem : text
        },{
            headers : {
                authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
            }
        })
        if(response){
            redirectToTab(0)
        }
        }
    return(
        <div>
            <form onSubmit={onFormSubmit} className={classes.root} noValidate autoComplete="off">
            <TextField 
                id="outlined-basic"
                onChange = {onInputChange} 
                className = {classes.textField}
                label="To-Do-Item" 
                variant="outlined" 
            />
            <Button
                onClick = {onFormSubmit} 
                className = {classes.btn}
                variant="contained" 
                color="primary"
            >
                ADD TO-DO
            </Button>
            </form>
        </div>
    )
}

export default AddToDo;