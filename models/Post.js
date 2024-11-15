import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  sesionId: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  imageUrl: { type: String, required: true },
  email: { type: String, required: true },
  paid: { type: Boolean, required: true },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;