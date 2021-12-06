import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      marginTop : '4ch'
    },
    btn : {
        marginRight : '50ch',
        marginLeft : '63ch'
    }
  }));

///////////////////////////
const ToDoItem = ({item})=>{
    const classes = useStyles();

    const [text,setText] = useState('')

    //callbacks
    const onInputChange = (e)=>{
        // setText(e.target.value)
        console.log(e.target.value)
    }
    const onClickEdit = async(id)=>{
        // console.log(`edit ${id}`)
        await todoAPI.put('/update-todo',{
            params : {
                id : id
            },
            todoitem : text,
        })
    }

    const onClickDelete = async(id)=>{
        // console.log(`delete${id}`)
        await todoAPI.delete('/delete-todo',{
            params : {
                id : id
            }
        })
    }

    // const fetchToDoItems = async()=>{
    //     const response = await todoAPI.get('/view')
    //     console.log(response.data.todolist)
    //     // setToDoItems(response.data.todolist)
    //     // setLoading(false)
    // }
    // // console.log(toDoItems)

    // useEffect(()=>{
    //     fetchToDoItems()
    // },[])


    return(
        <div>
            {/* {item.title} */}
            <TextField 
                id="outlined-basic"
                className = {classes.textField}
                onChange = {onInputChange}
                value = {item.to_do_item}
                variant="outlined" 
            />
            <Button 
                onClick={()=>onClickEdit(item.id)}
                style = {{marginTop : '5ch'}} 
                color="primary"
            >
                Edit
            </Button>
            <Button
                onClick={()=>onClickDelete(item.id)}
                style = {{marginTop : '5ch'}} 
                color="secondary"
            >
                Delete
            </Button>
        </div>
    )
}

export default ToDoItem;