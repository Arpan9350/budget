
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShowTab from './components/ShowTab';
import Calc from './components/Calc';
import Login from './components/Login';
import Registration from './components/Registration';




function App() {
  return (
    <div>
      <Router>
        
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/ShowTab" element={<ShowTab/>}></Route>
          <Route path="/Calc" element={<Calc/>}></Route>
          <Route path="/Registration" element={<Registration/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
