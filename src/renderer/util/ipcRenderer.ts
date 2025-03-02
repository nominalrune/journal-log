function isElectron() {
	return window && window.electron;
}

const ipcRenderer = isElectron()
	? window.electron.ipcRenderer
	: {
		invoke: () => null
	};
export default ipcRenderer;