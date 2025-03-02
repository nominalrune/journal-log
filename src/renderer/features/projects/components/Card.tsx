import _Card from '@/features/common/components/ui/Card';
import Project from '../models/Project';
import Button from '@/features/common/components/ui/buttons/Button';
import { Link } from 'react-router-dom';

export default function Card({ project }: { project: Project; }) {
	return <_Card key={project.id}>
		<div className='grid grid-cols-3 gap-2'>
			<div className='col-span-2 flex flex-col gap-2'>
				<h2>{project.title}</h2>
				<p>{project.description}</p>
			</div>
			<div className='flex flex-col gap-2'>
				<div className="self-end">
					<Link to={`/projects/${project.id}`}>
						<Button>Detail</Button>
					</Link>
				</div>
				<p>Owner:{project.owner?.name}</p>
				<p>created at: {project.createdAt.toISOString()}</p>
				<p>updated at: {project.updatedAt?.toISOString()}</p>
			</div>
		</div>
	</_Card>;
}
