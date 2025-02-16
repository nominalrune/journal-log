import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserShow from './pages/users/Show';
import UserList from './pages/users/List';
import LogShow from './pages/logs/Show';
import LogList from './pages/logs/List';
import ProjectShow from './pages/projects/Show';
import ProjectList from './pages/projects/List';
import Layout from './features/common/components/layout/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/users">
            <Route index element={<UserList/>} />
            <Route path="/:userId" element={<UserShow/>} />
          </Route>
          <Route path="/logs">
            <Route index element={<LogList/>} />
            <Route path="/:logId" element={<LogShow/>} />
          </Route>
          <Route path="/projects">
            <Route index element={<ProjectList/>} />
            <Route path="/:projectId" element={<ProjectShow/>} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
