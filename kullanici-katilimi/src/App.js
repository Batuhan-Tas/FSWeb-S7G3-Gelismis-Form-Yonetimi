import { Route , Routes , Link} from 'react-router-dom';
import CreateUser from './FormPage';
import { Button } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className='App'>

      <Link to='/CreateUser'> Add New User ! </Link>
      
      <Routes>

        <Route path='/CreateUser' element={<CreateUser/>}/>
   
      </Routes>

    </div>
  );
};

export default App;
