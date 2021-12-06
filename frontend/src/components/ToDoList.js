import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import todoAPI from '../api/todoAPI';
import ToDoItem from './ToDoItem';

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



const ToDoList = ()=>{
    const classes = useStyles();

    const [toDoItems,setToDoItems] = useState([])
    const [update,setUpdate] = useState(false)
    // const [loading,setLoading] = useState({})
    const [pageNumber,setPageNumber] = useState(1)
    var [text,setText] = useState('')


    //callbacks
    const onClickInputFild = async(id)=>{
        // console.log(id)
        const response = await todoAPI('/item',{
            params:{
                id : id
            },
            headers : {
                authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
            }
        })
        setText(response.data.item.to_do_item)
        setUpdate(true)
    }

    const onInputChange = (e) =>{
        setText(text = e.target.value)
    }
    // console.log(text)

    const onClickEdit = async(id)=>{
        // console.log(`edit ${id}`)
        const response = await todoAPI.put(`/update-todo/${id}`,{
            todoitem : text,
        },{
            headers : {
                authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
            }
        })
        if(response)
        fetchToDoItems()
    }

    const onClickDelete = async(id)=>{
        // console.log(`delete${id}`)
        const response = await todoAPI.delete('/delete-todo',{
            params : {
                id : id
            }
        })
        if(response)
        fetchToDoItems()
    }

    const onClickNext = ()=>{
        // console.log(pageNumber)
        // console.log('Next page')
        setPageNumber(pageNumber+1)
    }
    // console.log(pageNumber)
    const onClickPrevious = ()=>{
        // console.log('Previous page')
        setPageNumber(pageNumber-1)
    }

    const fetchToDoItems = async()=>{
        const id =localStorage.getItem('user_id')
        const response = await todoAPI.get(`/view/${id}`,{
            params : {
                limit : 4,
                page : pageNumber
            },
            headers : {
                authorization : 'Bearer' + ' ' + localStorage.getItem('token'),
            }
        })
        // console.log(response.data.todolist)
        setToDoItems(response.data.todolist)
        // setLoading(false)
    }

    useEffect(()=>{
        fetchToDoItems()
    },[pageNumber])
    
    //If List is Empty
    // if(Object.keys(toDoItems).length === 0){
    //     return(
    //         <h2>ADD YOUR FIRST TO-DO</h2>
    //     )
    // }
    
    
    const List = toDoItems.map((item,index)=>{
        // console.log(index)
        // return <ToDoItem  key = {item.id} item ={item}/>
        return(
            <div key = {item.id}>
            {/* {item.title} */}
            <TextField 
                id="outlined-basic"
                name= 'to_do_item'
                className = {classes.textField}
                onClick={()=>onClickInputFild(item.id)}
                onChange = {onInputChange}
                value = {update ? text.to_do_item : item.to_do_item}
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
    })

    // if(loading){
    //     return(
    //         <div>
    //             <h1 style={{marginLeft:'30ch',marginTop:'10ch'}}>Loading....</h1>
    //         </div>
    //     )
    // }

    return(
        <>
            <div>{List}</div>
            <Button 
                onClick={onClickPrevious}
                style = {{marginTop : '5ch',marginLeft:'33ch'}} 
                color="primary"
            >
                Previous
            </Button>
            <Button 
                onClick={onClickNext}
                style = {{marginTop : '5ch',marginLeft : '76ch'}} 
                color="primary"
            >
                NEXT
            </Button>
        </>
    )
}

export default ToDoList;

