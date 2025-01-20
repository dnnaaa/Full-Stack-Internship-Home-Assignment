import { Button } from "@mui/material";
import DenseTable from "./Components/JobTable";
import Link from "next/link";

export default function HomePage() {
  return (
  
    <div className="m-5 p-5 h-screen">
      <div className="flex items-center justify-around">
      <h3>Job List</h3>
      <Link variant="contained" href="/test">Add Job</Link>
      </div>
    
    <div className='flex items-center justify-center m-5 p-5 '>
    <DenseTable></DenseTable>
    </div>
    </div>
    
  );
}
