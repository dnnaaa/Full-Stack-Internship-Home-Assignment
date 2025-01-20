import "./App.css";


import { Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <div className="   h-full">
        <div className=" bg-sky-100 min-h-lvh">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
