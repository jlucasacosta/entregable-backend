import { Request, Response } from "express";
import { IRepos } from "../models/finder.models";

export const getAllRepositories = async (req: Request, res: Response) => {
  const search = req.params.name;

  try {
    const api_res = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );

    if (!api_res.ok) {
      throw new Error(
        `Error al obtener los repositorios. Código de estado: ${api_res.status}`
      );
    }

    const data = await api_res.json();

    const repositories: IRepos[] = data.items.map((repo: IRepos) => ({
      id: repo.id,
      avatar_url: repo.owner?.avatar_url,
      login: repo.owner?.login,
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      url: repo.url,
      html_url: repo.html_url,
    }));

    res.json({
      message: `Se encontraron repositorios`,
      repositorios: repositories,
    });
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
    res.status(500).json({ error: "Error al obtener los repositorios" });
  }
};

let starredRepos: string[] = [];

export const getStarredRepos = (req: Request, res: Response) => {
  if (starredRepos.length === 0) {
    return res.json({ message: "No hay repositorios con estrellita" });
  } else {
    return res.json({ message: "Hay repositorios con estrellita", repositorios: starredRepos });
  }
};

export const makeStarredRepo = (req: Request, res: Response) => {
  const repo = req.params.repo;
  starredRepos.push(repo);
  res.json({ message: "Repositorio con estrellita añadido correctamente" });
};

export const deleteStarredRepo = (req: Request, res:Response) => {
  const repoUnstarred = req.params.repo
  starredRepos = starredRepos.filter((repo) => repo !== repoUnstarred);

  res.json({ message: "Repositorio con estrellita eliminado correctamente" });
}

let name:string

export const getProfile = (req: Request, res: Response) => {
  if (name === undefined) { 
    res.json({message: `Este es tu perfil`})
  } else {
    res.json({message: `Este es tu perfil ${name}`})
  }
}

export const updateProfile = (req: Request, res: Response) => {
  name = req.params.name;

  res.json({message: "Nombre actualizado correctamente"})
}