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

export interface IStarredRepo {
  name: string;
  description: string;
}

export interface IHistorial {
  repo: string,
  timeData: Date;
}
