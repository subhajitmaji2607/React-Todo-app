const jwt = require('jsonwebtoken');

exports.verifyjwtToken = (req, res, next)=>{

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        // console.log('verify')
        const token =  req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, payload)=>{
            if(err){
                throw err
            }
            req.user = payload;
            console.log(req.user)
            next();
        
        })
    }else{

        return res.status(401).send('Unauthorize')
    }
}