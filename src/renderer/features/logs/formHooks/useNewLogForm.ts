import { useForm } from 'react-hook-form';
import NewLogSchema from '../schema/NewLogSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const useNewLogForm = () => {
  return useForm({
    resolver: zodResolver(NewLogSchema),
  });
};

export default useNewLogForm;
