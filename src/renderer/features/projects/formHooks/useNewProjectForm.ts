import { useForm } from 'react-hook-form';
import NewProjectSchema from '../schema/NewProjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useNewProjectForm = () => {
  return useForm({
    resolver: zodResolver(NewProjectSchema),
  });
};

export default useNewProjectForm;
