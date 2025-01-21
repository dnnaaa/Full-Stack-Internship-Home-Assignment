import React from "react";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Function to show toast notifications
  const showToast = () => {
    toast("This is a toast notification!");
  };

  return (
    <div className="App">
      <div className="h-full">
        <div className="bg-sky-100 min-h-lvh">
        
          <Outlet />
        </div>
      </div>

      {/* Toast container for displaying toast messages */}
      <ToastContainer />
    </div>
  );
}

export default App;
