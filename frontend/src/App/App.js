import Interface1 from '../Compenents/Interface1';
import Interface3 from '../Compenents/Interface3';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Interface1 />} />
    <Route path="/fileupload" element={<Interface1 />} />
    <Route path="/interface3" element={<Interface3 />} />
    </Routes>
    </Router>
  );
}

export default App;
