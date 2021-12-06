

const todo = require('../../models/todos');
const user = require('../../models/user');
const db = require('../../models/index');
const ToDoModel = todo(db.sequelize,db.Sequelize.DataTypes);
const UserModel = user(db.sequelize,db.Sequelize.DataTypes);

exports.createToDoItem = async(req,res)=>{
    const id = req.body.id
    try {
        const item = await ToDoModel.create({
            to_do_item : req.body.todoitem,
            userId : id
        })

        return res.status(200).json({msg : 'to-do created sucessfully',item})
    } catch (err) {
        console.log(err)
    }

}

exports.getAllToDoItems = async(req,res)=>{
    const skip = parseInt(req.query.limit)*(parseInt(req.query.page)-1)
    try {
        ToDoModel.belongsTo(UserModel,{foreignKey : 'userId'})
        const id = req.params.id
        const todolist = await ToDoModel.findAll({
            include : [{
                model : UserModel,
                attributes : {exclude : ['password']},
                where : {
                    id : id
                }
            }],
            attributes : {exclude : ['createdAt','updatedAt']},
            //Pagination
            limit : parseInt(req.query.limit),
            offset : skip
        })
        res.status(200).json({msg : 'sucessfully',todolist})
    } catch (err) {
        console.log(err)
    }
}

exports.getSingleToDoItem = async(req,res)=>{
    const id = req.query.id
    try {
        const item = await ToDoModel.findOne({where : {id : id}})
        return res.status(200).json({item})
    } catch (err) {
        console.log(err)
    }
}

exports.updateToDoItem = async(req,res)=>{
    const id = req.params.id;
    const temptodo = ToDoModel.findOne({where:{id:id}})
    try {
        const updatetodo = await ToDoModel.update({
            to_do_item : req.body.todoitem ? req.body.todoitem : temptodo.todoitem
        },{
            where : {
                id:id
            }
        })
        return res.status(200).json({msg : 'sucessfully',updatetodo})
    } catch (err) {
        console.log(err)
    }
}

exports.deleteToDoItem = async(req,res)=>{
    const id = req.query.id;
    try {
       const deltodo = await ToDoModel.destroy({
           where : {
               id : id
           }
       }) 
       return res.status(200).json({msg : 'sucessfully',deltodo})
    } catch (err) {
        console.log(err);
    }
}