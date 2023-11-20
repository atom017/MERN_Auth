import jwt from 'jsonwebtoken';

const generateToken = (res,user_id) =>{
    const token = jwt.sign({user_id},process.env.JWT_SECRET,{
        expiresIn:'3d'
    });

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge: 3 *24 * 60 *60,//expires in 3 days

    })
}



export default generateToken;