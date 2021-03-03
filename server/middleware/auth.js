import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];

            const decodeData = jwt.verify(token, process.env.TOKEN_SECRET);
    
            req.userId = decodeData?.id;
        }else{
            return;
        }

        next();
    }catch(error){
        console.log(error);
    }
}
export default auth;