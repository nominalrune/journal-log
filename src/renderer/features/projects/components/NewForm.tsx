import useForm from '../../common/hooks/useForm';
import { NewProjectSchema, NewProjectType } from '../schema/NewProjectSchema';
import Project from '../models/Project';
import toast from 'react-hot-toast';
import Input from '@/features/common/components/ui/forms/Input';
import Button from '@/features/common/components/ui/buttons/Button';
import useInputList from '@/features/common/hooks/useInputList';
import { NewTaskType } from '@/features/tasks/schema/NewTaskSchema';
import IconButton from '@/features/common/components/ui/buttons/IconButton';
import { useFieldArray } from 'react-hook-form';
const NewProjectForm = ({ project, onCreate }: { project?: NewProjectType, onCreate?: (project: Project) => any; } = { project: undefined, onCreate: undefined }) => {
	const onSubmit = (data: NewProjectType) => {
		const res = Project.create(data);
		console.log({res})
		toast.promise(res, {
			loading: 'Creating project...',
			success: (data) => {
				console.log({data})
				if (onCreate) { onCreate(data); }
				return `Project ${data.title} created successfully`;
			},
			error: (error) => `Failed to create project: ${error.message}`,
		});
	};
	const { Form } = useForm(NewProjectSchema, onSubmit, project);

	return <Form render={(methods) => {
		const { createFields, append, prepend, createRemove, swap, move, insert } = useFieldArray({
			control: methods.control, // control props comes from useForm (optional: if you are using FormProvider)
			name: "tasks.create", // unique name for your Field Array
		});
		return <>
			<input {...methods.register('status')} type='hidden' value='ACTIVE' />
			<Input {...methods.register('title')} label='Title' error={methods.formState.errors.title?.message?.toString()} />
			<Input {...methods.register('description')} label='Description' type='textarea' error={methods.formState.errors.description?.message?.toString()} />
			<input {...methods.register('ownerId')} type='hidden' value='1' />
			{
				createFields.map(({id}, index) => {
					return <div key={id} className='flex'>
						<input {...methods.register(`tasks.create.${index}.status`)} type='hidden' value='TODO' />
						<Input {...methods.register(`tasks.create.${index}.title`)} label='Title'
							error={methods.formState.errors?.tasks?.create[index]?.title?.message?.toString()}
						/>
						<Input {...methods.register(`tasks.create.${index}.description`)} label='Description' type='textarea'
							error={methods.formState.errors?.tasks?.create[index]?.description?.message?.toString()}
						/>
						<IconButton onClick={() => createRemove(index)}>X</IconButton>
					</div>;
				})
			}
			<IconButton className="self-end bg-sky-700 text-white rounded-full" onClick={() => append({ title: '', description: '', status: "TODO", projectId: 0 })}>+</IconButton>
			<Button onClick={e => console.log(methods.getValues(),methods.formState)} className="self-end" type='submit'>Submit</Button>
		</>;
	}} />;
};

export default NewProjectForm;
