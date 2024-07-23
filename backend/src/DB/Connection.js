import mongoose from "mongoose";
import { MongoDb_Name } from "../Constants.js";

const connectDB = async()=>{

      try {
        
     const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URI}/${MongoDb_Name}`)
         
          console.log("Mongodb Connected Successfuly! : ",connectionInstance.connection.host);
      } catch (error) {
        

             console.error("Error at mongodb Connection : ",error);

             process.exit(1);

      }     

}

export default connectDB  