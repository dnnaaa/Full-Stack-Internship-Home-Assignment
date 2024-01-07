import {useState} from "react";

export default function EmployeesTable ({employees}){
    const [currentPage,setCurrentPage]=useState(0)
    let pagesSize=8;
    let lastPage=(employees.length%pagesSize===0)?Math.trunc(employees.length/pagesSize)-1:Math.trunc(employees.length/pagesSize)
    return(
        <div  className={"flex justify-center w-full mt-3"} >
            {
                employees.length>0?
                    <div className="w-2/3  rounded p-2 border border-gray-300 ">
                        <table  className="mt-4 w-full" >
                            <thead>
                            <tr className={"border-b border-black"}><th >Id</th><th>Employee Name</th><th>Job Title</th><th>Salary</th></tr>
                            </thead>
                            <tbody>
                            {
                                employees.slice(currentPage*pagesSize,currentPage*pagesSize+pagesSize).map(employee=>{
                                    return(
                                        <tr className={"border-b h-10"} key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.employeeName}</td>
                                            <td>{employee.jobTitle}</td>
                                            <td> {employee.salary} </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <div className="w-full border-t border-black mt-5 pt-1 flex content-center justify-end">
                            <button onClick={()=>{setCurrentPage(currentPage!==0?currentPage-1:currentPage)}} className="pr-2 text-blue-500">Prev</button>
                            {
                                [1,2,3].map(page=>{
                                    let isActive=page===(currentPage+1)
                                    return <button key={page}  onClick={()=>{setCurrentPage(page-1)}} className={isActive?"pr-2 text-blue-500 underline":"pr-2 text-blue-500"}>{page}</button>})
                            }
                            {currentPage!==3&&currentPage!==lastPage?<button className={"pr-2 text-blue-500"}>...</button>:""}
                            {(currentPage>2&&currentPage<lastPage)?
                                <button  className={"pr-2 text-blue-500 underline"}>{currentPage+1}</button>:""
                            }
                            {currentPage!==lastPage-1&&currentPage>2?<button className={"pr-2 text-blue-500"}>...</button>:""}
                            <button onClick={()=>{
                                setCurrentPage(lastPage)}} className={`pr-2 text-blue-500  ${lastPage===currentPage?"underline":""}`}>{lastPage+1}</button>
                            <button onClick={()=>{setCurrentPage(((2+currentPage)*pagesSize<=employees.length)?currentPage+1:currentPage)}} className={`text-blue-500`}>Next</button>
                        </div>
                    </div>:""
            }
        </div>
    )
}