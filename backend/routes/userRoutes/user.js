const express = require('express');
const router = express.Router();

const validateUser = require('../../controller/userController/validateUser')

const auth = require('../../middleware/auth')
const userController = require('../../controller/userController/user');
router.post('/createuser',validateUser.validate,userController.userCreation);
router.post('/login',userController.userLogin);
router.get('/userinformation',auth.verifyjwtToken,userController.userInformation)
router.put('/update',userController.profile.single('profile_image'),auth.verifyjwtToken,userController.updateUser);
router.put('/changepassword',userController.change_password)
//Upload Image Testing Purpose
// router.post('/upload-image',userController.uploadImage)
module.exports = router;