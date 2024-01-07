import { useRouter } from "next/router";

export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>View Employee: {id}</h1>
      {/* fetch & display employee  */}
    </div>
  );
}
