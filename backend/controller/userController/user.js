const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')
// const {success,error}=require('../../middleware/macros')

const user = require('../../models/user');
const db = require('../../models/index');
const User = user(db.sequelize, db.Sequelize.DataTypes);

const validateUser = require('../../controller/userController/validateUser')
// const {validateSchema} = require('../userController/validateUser')
//Image Upload
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        console.log(file);
        cb(null,'./public/profile_image');
    },
    filename : (req,file,cb)=>{    
        fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false)
    }
}

exports.profile = multer({storage : fileStorage,fileFilter:fileFilter})
//Creating new user
exports.userCreation= async(req,res)=>{
    const email = req.body.email
    try {
        const userAlreadyExist = await User.findOne({where : {email : email}})
        if(!userAlreadyExist){
            const password = req.body.password;
            const hashPassword = await bcrypt.hash(password,8)
            await User.create({
                first_name: req.body.first_name,
                last_name : req.body.last_name,
                email:req.body.email,
                password:hashPassword,
                mobile_no:req.body.mobile_no
            })       
        }else{
            throw new Error('user Already exist')
        }
        res.status(200).json({msg: 'User created'})
    }
    catch (err) {
        // console.log(err)
        return res.status(403).json({msg : err.message})
    }
}

//login user
exports.userLogin = async(req,res)=>{
    
    const {email,password} = req.body
        try {
            const user = await User.findOne({where:{email : email}})
            if(!user){
                // throw new Error('User not found')
                throw new Error('Invalid Email');
            }
            const match =  await bcrypt.compare(password, user.password)
            if(!match){
                // throw new Error('Password mismatch')
                throw new Error('Invalid Password');
            }
            //generate jwt token
            const token = jwt.sign({email : user.email , id : user.id},process.env.SECRET_KEY);
            // res.json({
            //     token: token,
            //     user,
            // })
            // return success({token : token,user},msg)(res)
            return res.status(200).json({token:token,user})
        } catch (err) {
            // console.log(error.message)
            // return error(err.message)(res)
            return res.status(403).json({msg : err.message})
        }   
}

//get user Information
exports.userInformation = async(req,res)=>{
    const id = req.query.id;
    console.log(id )
    const response = await User.findOne({
        attributes : {exclude : ['password']},
        where : {id : id}
    });
    res.json({response})
}

//update user
exports.updateUser = async(req, res) => {
   let id = req.body.id;
   const tempuser = await User.findOne({where : {id : id}})
   
   const updateUser = await User.update({
       first_name : req.body.first_name ? req.body.first_name : tempuser.dataValues.first_name,
       last_name : req.body.last_name ? req.body.last_name : tempuser.dataValues.last_name,
       email : req.body.email ? req.body.email : tempuser.dataValues.email,
       mobile_no : req.body.mobile_no ? req.body.mobile_no : tempuser.dataValues.mobile_no,
       profile_image : (req.file === undefined) ? tempuser.profile_image : `${req.protocol}://${req.get('host')}/profile_image/${req.file.filename}`
    //    profile_image : image
   },{
       where : {
           id : id
       }
   })
    //    return success({},msg)(res);
   res.status(200).json({msg : 'user updated successfully',updateUser})
    //    res.json({
    //        msg : 'update successful'
    //    })
}

//Change Password
exports.change_password = async(req,res)=>{
    const id = req.body.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const user = await User.findOne({where : {id : id}})
    const userOldPassword = user.dataValues.password
    // console.log(userOldPassword);
    // res.json({user});
    try{
        const correctOldPassword = await bcrypt.compare(oldPassword,userOldPassword)
        if(!correctOldPassword){
            throw new Error(`Invalid old password`)
        }
        if(newPassword !== confirmPassword){
            throw new Error(`new and confirm password do not match`)   
        }
        const newUserPassword = await bcrypt.hash(newPassword,8)
        await User.update({ 
            password: newUserPassword, 
        },{where : {
            id : id,
            }
        })
        res.status(200).json({msg : 'password reset successfully'})
    }catch(err){
        return res.status(403).json({msg : err.message})
    }
}
//Upload Image Testing Purpose
// exports.uploadImage = (req,res)=>{
//     const imageURL = req.file;
//     console.log(imageURL)
// }