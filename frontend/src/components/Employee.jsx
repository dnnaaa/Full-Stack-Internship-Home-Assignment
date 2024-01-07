import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import '../App.css';

function Employee() {
  const [data, setData] = useState([]);
  const [datastatic, setDatastatic] = useState([]);

  const [number, setNumber] = useState(1);

  const EmployeePerPage = 10;

  const lastEmployee = number * EmployeePerPage;
  const firstEmployee = lastEmployee - EmployeePerPage;
  const currentEmployee = data.slice(firstEmployee, lastEmployee);

  const PageCount = Math.ceil(data.length / EmployeePerPage);

  const ChangePage = ({ selected }) => {
    setNumber(selected);
  };

  const [number1, setNumber1] = useState(1);

  const EmployeePerPage1 = 10;

  const lastEmployee1 = number1 * EmployeePerPage1;
  const firstEmployee1 = lastEmployee1 - EmployeePerPage1;
  const currentEmployee1 = datastatic.slice(firstEmployee1, lastEmployee1);

  const PageCount1 = Math.ceil(datastatic.length / EmployeePerPage1);

  const ChangePage1 = ({ selected }) => {
    setNumber1(selected);
  };


  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:8083/employees")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:8083/statics")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatastatic(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div  style={{ width: "1000px" }}>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          style={{ marginTop: "10px", textAlign: "center" }}
          onClick={handleRefresh}
          class="btn btn-outline-success"
        >
          Process
        </button>
      </div>
      <div className="col-md-12">
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>
          Employee Information
        </h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">employee_name</th>
              <th scope="col">job_title</th>
              <th scope="col">salary</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployee.map((item) => {
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.employee_name}</td>
                  <td>{item.job_title}</td>
                  <td>{item.salary}</td>
                </tr>
              );
            })}
          </tbody>
          <ReactPaginate
            className="pagination-bar"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={ChangePage}
            pageRangeDisplayed={2}
            pageCount={PageCount}
            
            previousLabel="< previous"
        
          />
        </table>
      </div>

      <div className="col-md-12">
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Jobs Summary</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">job_title</th>
              <th scope="col">average_salary</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployee1.map((item) => {
              return (
                <tr>
                  <td>{item.job_title}</td>
                  <td>{item.average_salary}</td>
                </tr>
              );
            })}
          </tbody>

          <ReactPaginate
            className="pagination-bar"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={ChangePage1}
            pageRangeDisplayed={2}
            pageCount={PageCount1}
            
            previousLabel="< previous"
        
          />
        </table>
      </div>

      
    </div>
  );
}

export default Employee;
