import Employees from "@/components/Employees";


const Process =()=>{

  const currentPage = 1;
  const pageSize = 10;



    return (

    <div>
      <Employees currentPage={currentPage} pageSize={pageSize} />
    </div>

    );
};

export default Process

