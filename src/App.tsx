import './App.css';
import { projects } from './data/projects';
import { XeroxLayout } from './themes/XeroxLayout';

const App = () => {
  return <XeroxLayout projects={projects} />;
};

export default App;
