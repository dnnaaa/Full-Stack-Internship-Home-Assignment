import { redirect } from "next/navigation";

export default function Home() {
  redirect("/jobs"); // Automatically redirect to the Job List Page
}
