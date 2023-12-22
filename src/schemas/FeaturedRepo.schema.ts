const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuredReposSchema = new Schema({
  creatorName: String,
  repositoryDescription: String,
  repositoryStars: String,
  repositoryTitle: String,
  repositoryUrl: String,
});

const FeaturedRepositories = mongoose.model('featured_repositories', featuredReposSchema);

export default FeaturedRepositories