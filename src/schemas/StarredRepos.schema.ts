import mongoose from "mongoose";

const starredReposSchema = new mongoose.Schema({
    id: Number,
    avatar_url: String,
    login: String,
    name: String,
    description: String,
    stargazers_count: Number,
    url: String,
    html_url: String,
  });
  

const StarredRepo = mongoose.model('starred_repos', starredReposSchema);

export default StarredRepo