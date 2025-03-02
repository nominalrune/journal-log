# Google Single Sign-On (SSO)

## Overview

Google Single Sign-On (SSO) allows users to authenticate with their Google account to access your application. This can be achieved using OAuth 2.0, which is a protocol for authorization.

## Steps to Implement Google SSO in Electron

1. **Create a Google API Console Project and Client ID**
   - Go to the [Google API Console](https://console.developers.google.com/).
   - Create a new project.
   - Navigate to the "Credentials" tab.
   - Click "Create Credentials" and select "OAuth 2.0 Client IDs".
   - Configure the consent screen by providing the necessary information.
   - Set the application type to "Desktop app".
   - Save the Client ID and Client Secret.

2. **Install Required Packages**
   - Install the `electron-oauth-helper` package to handle OAuth in Electron.
   - Install the `googleapis` package to interact with Google APIs.

   ```bash
   npm install electron-oauth-helper googleapis
   ```
3. Configure OAuth in Electron

Create a file named google-sso.js and add the following code:

```javascript   
const { app, BrowserWindow } = require('electron');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const path = require('path
 win.loadFile('index.html');<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>');
</vscode_annotation><vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> </vscode_annotation> 
const CLIENT_ID = 'YOUR_CLIENT_ID'; const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';


const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

function createWindow() { const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { preload: path.join(__dirname, 'preload.js'), }, });
 win.loadFile('index.html');
 }
 
 app.whenReady().then(createWindow);

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });

app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow(); } });

async function getAccessToken() { const authUrl = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: ['https://www.googleapis.com/auth/userinfo.profile'], });

 const win = new BrowserWindow({ width: 500, height: 600 });
 win.loadURL(authUrl);

 win.webContents.on('will-navigate', async (event, url) => {
   const code = new URL(url).searchParams.get('code');
   if (code) {
     const { tokens } = await oauth2Client.getToken(code);
     oauth2Client.setCredentials(tokens);
     win.close();
   }
 });