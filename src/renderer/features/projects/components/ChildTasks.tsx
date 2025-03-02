import IconButton from '@/features/common/components/ui/buttons/IconButton';
import { Input } from '@/features/common/components/ui/forms/Input';
import { EditTaskType } from '@/features/tasks/schema/EditTaskSchema';
import { NewTaskType } from '@/features/tasks/schema/NewTaskSchema';
import type { FieldError, FieldValues, UseFormReturn } from 'react-hook-form';

type Props = {
	methods: UseFormReturn<FieldValues, any, undefined>,
	tasks: (NewTaskType | EditTaskType)[];
	prefix: string;
	errors: { [key: string]: FieldError; };
	projectId?: number;
	remove: (index: number) => void;
};
export default function ChildTasks({ methods, tasks, errors, prefix, projectId, remove }: Props) {
	return <>{
		tasks.map((task, index) => <div className="flex gap-2">
			<input {...methods.register(`${prefix}.${index}.id`)} type='hidden' />
			{projectId
				? <input {...methods.register(`${prefix}.${index}.projectId`)} type='hidden' value={projectId} />
				: <Input {...methods.register(`${prefix}.${index}.projectId`)} type='number' label="Project ID" />
			}
			<Input {...methods.register(`${prefix}.${index}.status`)} type='select' label="State" defaultValue='TODO' options={[["TODO","TODO"],["DONE","DONE"]]} />
			<Input {...methods.register(`${prefix}.${index}.title`)}
				error={errors?.title?.message?.toString()}
			/>
			<Input {...methods.register(`${prefix}.${index}.description`)} type='hidden'
			/>
			<IconButton type='button' onClick={() => remove(index)}>X</IconButton>
		</div>)
	}</>;
}