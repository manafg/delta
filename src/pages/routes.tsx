import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Home from './Home';
import Triggers from './Triggers';
import Alert from './Alert';
import { ReactElement } from 'react';
import Pipelines from './Pipelines';
import CreatePipeline from './CreatePipeline';

function PrivateRoute({ element, ...rest }: { element: ReactElement }) {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
}

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route path="home" element={<Home />} />
          <Route path="triggers" element={<Triggers />} />
          <Route path="alert" element={<Alert />} />
          <Route path="pipelines" element={<Pipelines />} />
          <Route path="create-pipeline" element={<CreatePipeline />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
