

import mongoose from 'mongoose';

const uploadedPostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  linkInput: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  difference: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Upload = mongoose.model('Upload', uploadedPostsSchema);

export default Upload;
