import express from "express";
import { ProjectModel } from "../db/projects";

export const getAllProjects = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const projects = await ProjectModel.find();
    return response.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const getProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const searchText = String(text)

    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!project) {
      return response.status(404).json({ message: "Project not found" });
    }

    return response.status(200).json({ data: project });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const createProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { productName, repositoryName, details } = request.body;
    const project = new ProjectModel({
      productName,
      repositoryName,
      details,
    });
    
    await project.save();
    return response.status(201).json({ message: "Project Created", data: project });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const updateProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const { details } = request.body;
    const searchText = String(text)
    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });
    if (!project) {
      return response.status(404).json({ message: "Project not found" });
    }

    project.details = details;
    await project.save();

    return response
      .status(200)
      .json({ message: "Project Updated", data: project });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

export const deleteProject = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { text } = request.params;
    const searchText = String(text)

    const project = await ProjectModel.findOne({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { repositoryName: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!project) {
      return response.status(404).json({ message: "Project not found" });
    }

    return response.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
