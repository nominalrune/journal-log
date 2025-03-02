import useForm from '../../common/hooks/useForm';
import { EditProjectSchema, EditProjectType } from '../schema/EditProjectSchema';
import Project from '../models/Project';
import toast from 'react-hot-toast';
import Input from '@/features/common/components/ui/forms/Input';
import Button from '@/features/common/components/ui/buttons/Button';
import { EditTaskType } from '@/features/tasks/schema/EditTaskSchema';
import IconButton from '@/features/common/components/ui/buttons/IconButton';
import { useFieldArray } from 'react-hook-form';
const EditProjectForm = ({ project, onUpdate }: { project: Project, onUpdate?: (project: Project) => any; }) => {
	const onSubmit = (data: EditProjectType) => {
		const res = project.update(data);
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
		const { fields: createFields, append, prepend, remove: createRemove, swap, move, insert } = useFieldArray({
			control: methods.control, // control props comes from useForm (optional: if you are using FormProvider)
			name: "tasks.create", // unique name for your Field Array
		});
		const { fields: updateFields, remove: updateRemove } = useFieldArray({
			control: methods.control,
			name: "tasks.update",
		});
		return <>
			<input {...methods.register('id')} type='hidden' value={project.id} />
			<input {...methods.register('status')} type='hidden' value={project.status} />
			<Input {...methods.register('title')} label='Title' error={methods.formState.errors.title?.message?.toString()} />
			<Input {...methods.register('description')} label='Description' type='textarea' error={methods.formState.errors.description?.message?.toString()} />
			<input {...methods.register('ownerId')} type='hidden' value='1' />
			{
				updateFields.map(({ id }, index) => {
					return <div key={id} className='flex gap-1'>
						<input {...methods.register(`tasks.update.${index}.data.id`)} type='hidden' />
						<Input {...methods.register(`tasks.update.${index}.data.title`)} label='Title'
							error={methods.formState.errors?.tasks?.update?.[index]?.data?.title?.message?.toString()}
						/>
						<Input {...methods.register(`tasks.update.${index}.data.description`)} label='Description' type='textarea'
							error={methods.formState.errors?.tasks?.update?.[index]?.data?.description?.message?.toString()}
						/>
						<IconButton type='button' onClick={() => updateRemove(index)}>X</IconButton>
					</div>;
				})
			}
			{
				createFields.map(({ id }, index) => {
					return <div key={id} className='flex gap-1'>
						{/* <input {...methods.register(`tasks.create.${index}.projectId`)} type='hidden' value={project.id} /> */}
						<input {...methods.register(`tasks.create.${index}.status`)} type='hidden' value='TODO' />
						<Input {...methods.register(`tasks.create.${index}.title`)} label='Title'
							error={methods.formState.errors?.tasks?.create?.[index]?.title?.message?.toString()}
						/>
						<Input {...methods.register(`tasks.create.${index}.description`)} label='Description' type='textarea'
							error={methods.formState.errors?.tasks?.create?.[index]?.description?.message?.toString()}
						/>
						<IconButton type='button' onClick={() => createRemove(index)}>X</IconButton>
					</div>;
				})
			}
			<IconButton type='button' className="self-end bg-sky-700 text-white rounded-full" onClick={() => append({ title: '', description: '', status: "TODO", projectId: 0 })}>+</IconButton>
			<Button onClick={e => console.log(methods.getValues(), methods.formState)} className="self-end" type='submit'>Submit</Button>
		</>;
	}} />;
};

export default EditProjectForm;
