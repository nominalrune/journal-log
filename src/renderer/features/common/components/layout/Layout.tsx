import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
	return <>
		<Header />
		<div className="max-w-5xl px-4 scroll-mt-12 overflow-y-scroll">
			<Outlet />
		</div>
	</>;
};

export default Layout;
