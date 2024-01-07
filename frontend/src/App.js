import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Fileupload from './components/Fileupload';
import Home from './components/Home';
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Fileupload />} />
    <Route path="/fileupload" element={<Fileupload />} />
    <Route path="/interface3" element={<Home />} />
    </Routes>
    </Router>
  );
}

export default App;
