import express from 'express'
import authenticateToken from '../MiddleWare/auth.js';
import SavedPost from '../Models/savePost.Models.js'

const unsavePostRouter = express.Router();

unsavePostRouter.post('/',authenticateToken,async (req,res)=>{


 try {
  
       const {PostId} =  req.body ; 
      const {username} = req.user ;
      console.log(username);

       if(!PostId) 
        {
            return res.status(400).json({ error: "Post ID is required" });
        }
      

        let  savePost = await SavedPost.findOne({ PostId });
        if (!savePost) {
          savePost = new SavedPost({ PostId, savedBy: [] });
        }
          const alreadyExit = savePost.savedBy.includes(username);

           if(alreadyExit)
            { 
              savePost.savedBy =    savePost.savedBy.filter((name)=> name != username);
              await savePost.save();
              res.status(200).send({message : "Post UnSaved SuccessFully!"});
            
            }
   

            

 } catch (error) {
  
    console.log("Post Save Error : ",error);

    process.exit(1) ;

 }


})

export default unsavePostRouter  
