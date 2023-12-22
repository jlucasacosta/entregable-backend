import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
    id: Number,
    avatar_url: String,
    login: String,
    name: String,
    description: String,
    stargazers_count: Number,
    url: String,
    html_url: String,
  });
  

const RepoModel = mongoose.model('repositories', repoSchema);

export default RepoModel