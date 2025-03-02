import { ipcMain } from 'electron';
import ProjectRepository from '../repository/ProjectRepository';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

ipcMain.handle('add-project', async (event, data) => {
  console.log("ipc",{data})
  const result =  await ProjectRepository.createProject(data);
  console.log("ipc",{result})
  return result;
});

ipcMain.handle('remove-project', async (event, id) => {
  return await ProjectRepository.deleteProject(id);
});

ipcMain.handle('list-projects', async (event, param?:Prisma.ProjectFindManyArgs<DefaultArgs>) => {
  return await ProjectRepository.listProjects(param);
});

ipcMain.handle('view-project', async (event, id) => {
  return await ProjectRepository.getProjectById(id);
});

ipcMain.handle('edit-project', async (event, id, data) => {
  return await ProjectRepository.updateProject(id, data);
});
