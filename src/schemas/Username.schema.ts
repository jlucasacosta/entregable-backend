import mongoose from "mongoose";

const UsernameSchema = new mongoose.Schema({
    name: String
  });
  

const Username = mongoose.model('username', UsernameSchema);

export default Username