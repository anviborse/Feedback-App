import logo from './logo.svg';
import './App.css';
import Feedback from './Feedback';
 import Admindata from './Admindata';
import Adminlogin from './Adminlogin';
import NavBar from './NavBar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path ="/" element={<Feedback/>}/>
          <Route path ="/admin" element={<Adminlogin/>}/>
          <Route path ="/admindata" element={<Admindata/>}/>
          <Route path ="/feedback"element={<Feedback/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

