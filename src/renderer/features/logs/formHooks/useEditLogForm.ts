import { useForm } from 'react-hook-form';
import EditLogSchema from '../schema/EditLogSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useEditLogForm = () => {
  return useForm({
    resolver: zodResolver(EditLogSchema),
  });
};

export default useEditLogForm;
