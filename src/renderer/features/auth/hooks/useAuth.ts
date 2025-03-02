import User from '@/features/users/models/User';
import { createContext, useContext, useState } from 'react';

export default function useAuth() {
	const user = useContext(UserContext);
	function login(email:string, password:string){
		const user = await User.(email, password);
		UserContext(user);
	}
}


export const UserContext = createContext<User | null>(null);
export function useUserContext() {
	return useContext(UserContext)
}