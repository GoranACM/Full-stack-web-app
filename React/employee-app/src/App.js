import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';

import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className='container'>
      <Employee />
    </div>
  );
}

export default App;
