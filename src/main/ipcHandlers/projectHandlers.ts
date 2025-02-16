import { ipcMain } from 'electron';
import ProjectRepository from '../repository/ProjectRepository';

ipcMain.handle('add-project', async (event, data) => {
  return await ProjectRepository.createProject(data);
});

ipcMain.handle('remove-project', async (event, id) => {
  return await ProjectRepository.deleteProject(id);
});

ipcMain.handle('list-projects', async () => {
  return await ProjectRepository.listProjects();
});

ipcMain.handle('view-project', async (event, id) => {
  return await ProjectRepository.getProjectById(id);
});

ipcMain.handle('edit-project', async (event, id, data) => {
  return await ProjectRepository.updateProject(id, data);
});
