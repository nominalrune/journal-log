function isElectron() {
	return window && window.electron;
}
const prisma = window.electron.prisma();
export default prisma;