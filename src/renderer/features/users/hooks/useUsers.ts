import ipcRenderer from '@/util/ipcRenderer';
import { useEffect, useState } from 'react';

export default function useUsers() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		(async () => {
			const _users = await ipcRenderer.invoke('list-users');
			setUsers(_users);
		})();
	}, []);
	return users;
}