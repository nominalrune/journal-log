import { useEffect, useState } from 'react';
import Project from '../models/Project';
import Button from '@/features/common/components/ui/buttons/Button';
import useModal from '@/features/common/hooks/useModal';
import Card from '@/features/common/components/ui/Card';
import NewForm from '../components/NewForm';

export default function useProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	function AddButton() {
		const { Modal, open, close } = useModal();
		return <>
			<Button onClick={open}>Add Project</Button>
			<Modal><Card>
				<NewForm onCreate={(p) => {
					setProjects(projects => [...projects, p]);
					close();
				}} />
			</Card></Modal>
		</>;
	}

	async function fetchProjects() {
		console.log('fetchProjects')
		try {
			const projects = await Project.list({include:{tasks:true}});
			console.log({projects})
			setProjects(projects);
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError('Unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		fetchProjects();
	}, []);

	return { projects, loading, error, AddButton, refresh:fetchProjects };
}