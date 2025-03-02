import Button from '@/features/common/components/ui/buttons/Button';
import Card from '@/features/common/components/ui/Card';
import useModal from '@/features/common/hooks/useModal';
import useNewProjectForm from '@/features/projects/hooks/useNewProjectForm';
import useProjects from '@/features/projects/hooks/useProjects';
import useNewUserForm from '@/features/users/hooks/useNewUserForm';
import useUsers from '@/features/users/hooks/useUsers';

const List = () => {
	const { Modal, open } = useModal();
	const { Form } = useNewUserForm();
	const users = useUsers();
	return <>
		<div className="flex flex-col gap-2">
			{
			users.length===0
			? <Card>No users</Card>
			: users.map((user: any) => <Card key={user.id}>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</Card>)
			}
		</div>
		<Button className='m-2' onClick={open}>Create</Button>
		<Modal><Card><Form /></Card></Modal>
	</>;
};

export default List;
