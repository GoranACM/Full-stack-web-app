import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';

import Button from 'react-bootstrap/Button';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
