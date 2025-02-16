import { ipcMain } from 'electron';
import TaskRepository from '../repository/TaskRepository';

ipcMain.handle('add-task', async (event, data) => {
  return await TaskRepository.createTask(data);
});

ipcMain.handle('remove-task', async (event, id) => {
  return await TaskRepository.deleteTask(id);
});

ipcMain.handle('list-tasks', async () => {
  return await TaskRepository.listTasks();
});

ipcMain.handle('view-task', async (event, id) => {
  return await TaskRepository.getTaskById(id);
});

ipcMain.handle('edit-task', async (event, id, data) => {
  return await TaskRepository.updateTask(id, data);
});
