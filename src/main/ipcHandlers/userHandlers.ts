import { ipcMain } from 'electron';
import UserRepository from '../repository/UserRepository';

ipcMain.handle('add-user', async (event, data) => {
  return await UserRepository.createUser(data);
});

ipcMain.handle('remove-user', async (event, id) => {
  return await UserRepository.deleteUser(id);
});

ipcMain.handle('list-users', async () => {
  return await UserRepository.listUsers();
});

ipcMain.handle('view-user', async (event, id) => {
  return await UserRepository.getUserById(id);
});

ipcMain.handle('edit-user', async (event, id, data) => {
  return await UserRepository.updateUser(id, data);
});
