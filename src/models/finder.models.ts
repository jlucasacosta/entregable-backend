export interface IRepos {
  id: Number;
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
  description: string | null;
  stargazers_count: Number;
  url: string;
  html_url: string;
}

export interface IUser {
  id: Number;
  avatar_url: string;
  login: string;
  location: string;
  followers: Number;
  html_url: string;
  repos_url: string;
}

export interface IComment {
    id: Number;
    repoId: string;
    text: string;
  }