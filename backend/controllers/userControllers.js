import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc   Auth user/set token
//route   POST /api/users/auth
//@access public
const authUser =  asyncHandler( async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Email or Password')
    }
    //res.status(200).json({'message':'Auth User'});
});

//@desc   Register a new user
//route   POST /api/users
//@access public
const registerUser =  asyncHandler( async (req,res) => {
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email:email})
    if (userExists){
        res.status(400);
        throw new Error('User Already Exists!')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid User Data')
    }

    console.log(req.body)
    res.status(200).json({'message':'Register User'});
})

//@desc   Logout user
//route   POST /api/users/logout
//@access public
const logoutUser =  asyncHandler( async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({'message':'User logged Out!'});
})

//@desc   Get User Profile
//route   GET /api/users/profile
//@access private
const getUserProfile =  asyncHandler( async (req,res) => {
    const user = {
        _id:req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
})


//@desc   Update User profile
//route   PUT /api/users/profile
//@access private
const updateUserProfile =  asyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id)
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updated_user = await user.save();

        res.status(200).json({
            _id:updated_user._id,
            name:updated_user.name,
            email:updated_user.email
        })
    }
    else{
        req.status(404);
        throw new Error('User not found')
    }
    res.status(200).json({'message':'Update User profile'});
})

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};