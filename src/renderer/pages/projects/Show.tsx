import LoadingIndicator from '@/features/common/components/ui/LoadingIndocator';
import EditProjectForm from '@/features/projects/components/EditForm';
import ProjectEdit from '@/features/projects/components/ProjectEdit';
import Project from '@/features/projects/models/Project';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Show = () => {
	const projectId = useParams().projectId;
	const [project, setProject] = useState<Project | undefined>(undefined);
	useEffect(() => {
		Project.find(parseInt(projectId ?? '')).then(setProject);
	}, [projectId]);
	if (!project) {
		return <LoadingIndicator />;
	}
	return <ProjectEdit project={project}/>;
};

export default Show;

