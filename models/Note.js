import mongoose from 'mongoose';

const Note = new mongoose.Schema({
  title: String,
  content: String
});

export default mongoose.model('Note', Note);