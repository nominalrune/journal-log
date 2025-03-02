import { useState, useEffect } from 'react';
import Project from '../models/Project';

export default function useProject(id: number) {
	const [project, setProject] = useState<Project>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		setLoading(true);
		(async () => {
			const result = await Project.find(id);
			if(!result){
				setError('Project not found');
				setLoading(false);
				return;
			}
			setProject(result);
			setLoading(false);
		})();
	});
	return {project, loading, error};
}