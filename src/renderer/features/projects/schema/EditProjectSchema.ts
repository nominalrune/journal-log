import { NewTaskSchema, NewTaskType } from '@/features/tasks/schema/NewTaskSchema';
import { ProjectSchema } from './ProjectSchema';
import { z } from 'zod';
import { EditTaskSchema, EditTaskType } from '@/features/tasks/schema/EditTaskSchema';

export const EditProjectSchema = ProjectSchema.partial().required({ id: true }).extend({
	tasks: z.array(
		NewTaskSchema.omit({ projectId: true })
			.or(EditTaskSchema.omit({ projectId: true }))
	).optional(),
});
export type EditSubmitData = Omit<EditProjectType, "tasks"> & {
	tasks: {
		create: Omit<NewTaskType, "projectId">[],
		update: Omit<EditTaskType, "projectId">[];
	};
};
export function toSubmitData(data: EditProjectType): EditSubmitData {
	return {
		...data,
		tasks: data.tasks?.reduce(({ create, update }, task) => (
			('id' in task)
				? { create, update: [...update, task] }
				: { create: [...create, task], update }),
			{ create: [], update: [] } as EditSubmitData['tasks']
		) ?? { create: [], update: [] },
	};
}

export type EditProjectType = z.infer<typeof EditProjectSchema>;
