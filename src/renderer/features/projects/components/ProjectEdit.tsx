import useForm from '../../common/hooks/useForm';
import { EditProjectSchema, EditProjectType, toSubmitData } from '../schema/EditProjectSchema';
import Project from '../models/Project';
import toast from 'react-hot-toast';
import Input from '@/features/common/components/ui/forms/Input';
import Button from '@/features/common/components/ui/buttons/Button';
import { EditTaskType } from '@/features/tasks/schema/EditTaskSchema';
import IconButton from '@/features/common/components/ui/buttons/IconButton';
import { useFieldArray } from 'react-hook-form';
const ProjectEdit = ({ project, onUpdate }: { project: Project, onUpdate?: (project: Project) => any; }) => {
	const onSubmit = (data: EditProjectType) => {
		const res = project.update(toSubmitData(data));
		toast.promise(res, {
			loading: 'Updating project...',
			success: (data) => {
				if (onUpdate) { onUpdate(data); }
				return `Project ${data.title} updated successfully`;
			},
			error: (error) => `Failed to update project: ${error.message}`,
		});
	};
	const { Form } = useForm(EditProjectSchema, onSubmit, project.toEdit());

	return <Form render={(methods) => {
		const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
			control: methods.control,
			name: "tasks",
		});
		// const { fields: updateFields, remove: updateRemove } = useFieldArray({
		// 	control: methods.control,
		// 	name: "tasks.update",
		// });
		return <>
			<h1 className="text-2xl font-bold">Project: {project?.title}</h1>
			status:{project.status}
			<p>{project?.description}</p>
			<textarea className="bg-slate-50 rounded-md " disabled value={project.description ?? ''} />
			<h2 className="text-xl font-bold">Tasks</h2>
			<div className="grid grid-cols-2 gap-2">
				{/* {
					updateFields.map(({ id }, index) => {
						return <div key={id} className='col-span-2 flex gap-1 items-center'>
							<input {...methods.register(`tasks.update.${index}.data.id`)} type='hidden' />
							<Input {...methods.register(`tasks.update.${index}.data.title`)}
								error={methods.formState.errors?.tasks?.update?.[index]?.data?.title?.message?.toString()}
							/>
							<input {...methods.register(`tasks.update.${index}.data.description`)} type='hidden' />
							<IconButton type='button' onClick={() => updateRemove(index)}>X</IconButton>
						</div>;
					})
				} */}
				{
					fields.map(({ id }, index) => {
						return <div key={id} className='col-span-2 flex gap-1 items-center'>
							<input {...methods.register(`tasks.${index}.id`)} type='hidden' />
							<input {...methods.register(`tasks.${index}.projectId`)} type='hidden' value={project.id} />
							<Input {...methods.register(`tasks.${index}.status`)} type='select' label="State" defaultValue='TODO' />
							<Input {...methods.register(`tasks.${index}.title`)}
								error={methods.formState.errors?.tasks?.[index]?.title?.message?.toString()}
							/>
							<Input {...methods.register(`tasks.${index}.description`)} type='hidden'
							/>
							<IconButton type='button' onClick={() => remove(index)}>X</IconButton>
						</div>;
					})
				}
				<button type='button' className="col-span-1 bg-sky-50 text-slate-800" onClick={() => append({ title: '', description: '', status: "TODO", projectId: 0 })}>+</button>
			</div>
		</>;
	}} />;
};

export default ProjectEdit;
