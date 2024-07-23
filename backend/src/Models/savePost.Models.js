import mongoose from 'mongoose'


const savepostSchema = new mongoose.Schema({

     PostId : {

        type : String ,
        required : true 

     },
      savedBy : {

       type : [String] ,
       default : [] 

     }


},{timestamps: true}); 

const SavedPost = mongoose.model('SavedPost',savepostSchema);

export default SavedPost 