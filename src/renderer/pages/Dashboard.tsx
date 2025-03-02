import { Link } from 'react-router-dom';

const Dashboard = () => {
	return <>
		<h1>Dashboard</h1>
		<ul>
			<li><Link to="/projects">Project</Link></li>
			<li><Link to="/logs">Log</Link></li>
		</ul>
	</>;
};

export default Dashboard;
