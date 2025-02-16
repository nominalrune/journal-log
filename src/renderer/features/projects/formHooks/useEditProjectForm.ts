import { useForm } from 'react-hook-form';
import { EditProjectSchema, EditProjectType } from '../schema/EditProjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Project from '../models/Project';

const useEditProjectForm = () => {
  const methods = useForm({
    resolver: zodResolver(EditProjectSchema),
  });
  async function onSubmit(data: EditProjectType) {
    const project = await Project.find(data.id);

    project.update(data);
  }
};

export default useEditProjectForm;
