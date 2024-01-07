import logo from './logo.svg';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Upload from './components/Upload';
import Home from './components/Home';
import Employee from './components/Employee';

function App() {

  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() => {
    const path = window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1, path.length))
  }, []);

 
  return (
    <BrowserRouter>
    <nav className='m-1 p-1  d-flex justify-content-center'>
      <ul className='nav na-pills'>
        <li >
          <Link onClick={() => setCurrentRoute("home")}
            className={currentRoute === "home" || currentRoute === "" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"}
            to={"/home"}>Home</Link>
        </li>
        <li >
          <Link onClick={() => setCurrentRoute("upload")}
            className={currentRoute === "upload" ? "btn btn-info ms-1" : "btn btn-outline-info ms-1"}
            to={"/upload"}>Upload</Link>
        </li>
        
      
      </ul>
      

    </nav>
    
    <Routes>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/upload' element={<Upload />}></Route>
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/' element={<Home />}></Route>
      
      
      
    </Routes>
  </BrowserRouter>




    
  );
  
  
}

export default App;
