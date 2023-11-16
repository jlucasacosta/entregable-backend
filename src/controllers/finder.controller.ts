import { Request, Response } from "express";
import { IHistorial, IRepos } from "../models/finder.models";

let historial: IHistorial[] = [];
let starredRepos: string[] = [];
let name: string;

export const getAllRepositories = async (req: Request, res: Response) => {
  const search = req.params.repo;

  try {
    const api_res = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );

    if (!api_res.ok) {
      return res.status(500).json({ error: "Error al obtener los repositorios" });
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

    const newHistorial: IHistorial = {
      repo: search,
      timeData: new Date(),
    };

    historial.push(newHistorial);

    return res.status(200).json({
      message: `Se encontraron repositorios`,
      repositorios: repositories,
      historial,
    });
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
    return res.status(500).json({ error: "Error al obtener los repositorios" });
  }
};

export const getStarredRepos = (req: Request, res: Response) => {
  if (starredRepos.length === 0) {
    return res.status(200).json({ message: "No hay repositorios con estrellita" });
  } else {
    return res.status(200).json({
      message: "Hay repositorios con estrellita",
      repositorios: starredRepos,
    });
  }
};

export const makeStarredRepo = (req: Request, res: Response) => {
  const repo = req.params.repo;
  starredRepos.push(repo);
  return res.json({
    message: "Repositorio con estrellita añadido correctamente",
    name: repo,
  });
};

export const deleteStarredRepo = (req: Request, res: Response) => {
  const repoUnstarred = req.params.repo;
  starredRepos = starredRepos.filter((repo) => repo !== repoUnstarred);

  return res.json({ message: "Repositorio con estrellita eliminado correctamente" });
};

/* lógica del usuario */

export const getProfile = (req: Request, res: Response) => {
  if (name === undefined) {
    return res.json({ message: `Este es tu perfil` });
  } else {
    return res.json({ message: `Este es tu perfil ${name}` });
  }
};

export const updateProfile = (req: Request, res: Response) => {
  name = req.params.name;

  return res.json({ message: "Nombre actualizado correctamente" });
};
