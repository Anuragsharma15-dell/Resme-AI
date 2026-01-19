import express from 'express';
const router  = express.Router();

function middleware({req,res}){
try {
     const {googleId, githubId} = req.body;
    
     if(!googleId || !githubId){
        res.status.json({message:"you are not auhtenticated"})
     }
} catch (error) {
    res.status.json({message:"something went wrong!"});
    
    console.log(error)
    
}
}
export default middleware;
