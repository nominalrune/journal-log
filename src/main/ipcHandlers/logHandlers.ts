import { ipcMain } from 'electron';
import LogRepository from '../repository/LogRepository';

ipcMain.handle('add-log', async (event, data) => {
  return await LogRepository.createLog(data);
});

ipcMain.handle('remove-log', async (event, id) => {
  return await LogRepository.deleteLog(id);
});

ipcMain.handle('list-logs', async () => {
  return await LogRepository.listLogs();
});

ipcMain.handle('view-log', async (event, id) => {
  return await LogRepository.getLogById(id);
});

ipcMain.handle('edit-log', async (event, id, data) => {
  return await LogRepository.updateLog(id, data);
});
