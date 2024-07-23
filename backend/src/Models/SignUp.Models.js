import mongoose from 'mongoose';

const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  }
}, {
  timestamps: true
});

const SignUp = mongoose.model('SignUp', signUpSchema);

export default SignUp;
