
import Card from '../../features/common/components/ui/Card';
import useProjects from '@/features/projects/hooks/useProjects';
import ProjectCard from '@/features/projects/components/Card';
import Project from '@/features/projects/models/Project';
const List = () => {

	const { projects, AddButton } = useProjects();
	return <>
		<div className="flex flex-col gap-2">
			{
				projects.length === 0
					? <>No projects</>
					: projects.map((project: Project) => <ProjectCard key={project.id} project={project}/>)
			}
		</div>
		<AddButton/>
	</>;
};


export default List;
