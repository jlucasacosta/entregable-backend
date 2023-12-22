import { Request, Response } from "express";
import { IHistorial, IRepos } from "../models/finder.models";
import FeaturedRepositories from "../schemas/FeaturedRepo.schema";
import RepoModel from "../schemas/Repositories";
import Historial from "../schemas/HistorialModel.schema";
import StarredRepo from "../schemas/StarredRepos.schema";
import Username from "../schemas/Username.schema";

let historial: IHistorial[] = [];
let starredRepos: string[] = [];
let name: string;

export const getFeaturedRepositories = async (req: Request, res: Response) => {
  try {
    const featuredRepos = await FeaturedRepositories.find();

    const user = await Username.findOne();
    const username = user ? user.name : "Usuario";

    const data = {
      featuredRepos: featuredRepos,
      userProfile: {
        username: username,
      },
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener la data" });
  }
};

export const saveUsername = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.json({ message: "Usuario" });
      return;
    }

    const newUsername = new Username({ name });
    await newUsername.save();

    res.json({ message: "Nombre de usuario guardado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar el nombre de usuario" });
  }
};

export const getAllRepositories = async (req: Request, res: Response) => {
  const search = req.params.repo;

  try {
    const api_res = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );

    if (!api_res.ok) {
      return res
        .status(500)
        .json({ error: "Error al obtener los repositorios" });
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

    await RepoModel.insertMany(repositories);

    const newHistorial: IHistorial = {
      repo: search,
      timeData: new Date(),
    };

    historial.push(newHistorial);

    await Historial.create(newHistorial);

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

export const getStarredRepos = async (req: Request, res: Response) => {
  try {
    const starredRepos = await StarredRepo.find();

    if (starredRepos.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay repositorios con estrellita" });
    } else {
      return res.status(200).json({
        message: "Hay repositorios con estrellita",
        repositorios: starredRepos,
      });
    }
  } catch (error) {
    console.error("Error al obtener repositorios estrellados:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const makeStarredRepo = async (req: Request, res: Response) => {
  try {
    const repoId = req.params.repo;

    const existingStarredRepo = await StarredRepo.findOne({
      repoId: repoId,
    });

    if (existingStarredRepo) {
      return res.json({
        message: "Repositorio ya está marcado como favorito",
        repoId: repoId,
        html_url: existingStarredRepo.html_url,
      });
    }

    const starredRepo = new StarredRepo({
      repoId: repoId,
      html_url: `https://api.github.com/repositories/${repoId}`,
    });

    await starredRepo.save();

    return res.json({
      message: "Repositorio con estrellita añadido correctamente",
      repoId: repoId,
      html_url: `https://api.github.com/repositories/${repoId}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteStarredRepo = async (req: Request, res: Response) => {
  try {
    const repoId = req.params.repoId;

    const result = await StarredRepo.deleteOne({ repoId: repoId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Repositorio con estrellita no encontrado",
      });
    }

    return res.json({
      message: "Repositorio con estrellita eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el repositorio", error);
    return res.status(500).json({
      message: "Error interno del servidor al eliminar el repositorio",
    });
  }
};

/* lógica del usuario */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await Username.findOne();

    const username = user ? user.name : "Usuario";

    return res.json({ message: `Este es tu perfil ${username}` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el perfil" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const user = await Username.findOne();

    if (user) {
      user.name = name;
      await user.save();
    } else {
      await Username.create({ name });
    }

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor al actualizar el nombre de usuario",
    });
  }
};
