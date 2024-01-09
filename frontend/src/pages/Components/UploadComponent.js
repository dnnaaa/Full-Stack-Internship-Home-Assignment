import { useRef, useState } from "react";
import { proccessUpload } from "../api/proccessCSV";
import appendError from "../Functionalitty/appendError";

export default function UploadComponent({ setEmployees, setJobSummary }) {
    const [selectedFile, setSelectedFile] = useState(null); // create a state to store in the uploaded file
    const [loading, setLoading] = useState(false); // create a state for indicating the loading status
    const csv_input_ref = useRef(); // ref for the <input/> element, to remove the uploaded file from the input when the data is recieved from back-end

    return (
        <div>
            <label htmlFor="input_csv" className="csv_label"> Upload </label>
            <input type="file" id="input_csv" ref={csv_input_ref} onChange={handleFileChange} className="input" />
            {
                selectedFile && (
                    <button onClick={proccessFile} className="Btn" disabled={loading}>{loading ? "Loading..." : "Process"}</button>
                )
            }
        </div>
    );

    function proccessFile() {
        setLoading(true);
        proccessUpload(selectedFile, setEmployees, setJobSummary)
            .then(() => {
                setSelectedFile(null);
                csv_input_ref.current.value = ""
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleFileChange(e) {
        if (!e.target.files[0]) return;

        if (e.target.files[0].type != "text/csv") {
            csv_input_ref.current.value = ""
            return appendError("Please Upload a csv file")
        }
        setSelectedFile(e.target.files[0]);
    }
}
