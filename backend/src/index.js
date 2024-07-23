import dotenv from 'dotenv';
import express from 'express';
import connectDB from './DB/Connection.js';
import router from './Routes/UploadPost.Routes.js';
import signUpRoute from './Routes/SignUp.Routes.js';
import signInRoute from './Routes/SignIn.Routes.js';
import finddataRoute from './Routes/findData.Routes.js';
import imageRoute from './Routes/Images.Routes.js';
import likeRouter from './Routes/likes.js';
import userPosts from './Routes/createdPosts.Routes.js';
import editRouter from './Routes/EditPost.Routes.js';
import savePostRouter from './Routes/savedPost.Routes.js';
import fetchSavedPost from './Routes/fetchSavedPost.Routes.js';
import unsavePostRouter from './Routes/UnsavePost.Routes.js';


dotenv.config({ path: './env' });
connectDB();

const app = express();

app.use(express.json());

app.use('/quicksource/uploadpost', router);
app.use('/quicksource/signup', signUpRoute);
app.use('/quicksource/signin', signInRoute);
app.use('/quicksource/posts', finddataRoute); // Route for handling keyword search
app.use('/quicksource/images',imageRoute);
app.use('/quicksource/like', likeRouter); // Use like routes
app.use('/quicksource/editpost',editRouter);
app.use('/quicksource/getuserposts',userPosts);
app.use('/quicksource/savepost',savePostRouter);
app.use('/quicksource/unsavepost',unsavePostRouter);
app.use('/quicksource/getsavedposts',fetchSavedPost);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port :", process.env.PORT);
});
