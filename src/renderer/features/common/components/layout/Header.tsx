import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/buttons/Button';

const Header = () => {
	const navigate = useNavigate();
	let location = useLocation();
	return <div className='w-dvw h-12 p-2 bg-sky-100 text-lg'>
		{location.pathname.split('/').length>2 && <Button onClick={() => navigate(-1)}>&lt;</Button>}
		<Link to='/'>Journal</Link>
	</div>;
}

export default Header;
