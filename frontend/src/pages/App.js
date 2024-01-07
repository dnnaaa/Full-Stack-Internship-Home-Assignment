import {useGetStructuredCSV} from "@/hooks/useGetStructuredCSV";
import {ParsedFileResult} from "@/components/ParsedFileResult";
import {JobSummary} from "@/components/JobSummary";
import {Spinner} from "@/components/Spinner";
import {AlertError} from "@/components/AlertError";
import {UploadFile} from "@/components/UploadFile";
import {ProcessButton} from "@/components/ProcessButton";
import {useUploadFile} from "@/hooks/useUploadFile";


export default function App(){
    const {data: fileUpload, loading:loadStoring, error:errorStoring, performUpload} = useUploadFile();
    const {data, error, loading, performService} = useGetStructuredCSV();

    return(
        <div className="w-3/4">
                <div className={"flex p-3 justify-between my-9 items-center"}>
                    <UploadFile performUpload={performUpload}/>
                    {fileUpload && <ProcessButton fileName={fileUpload} performParseFile={performService}/>}
                </div>
            {loading && (
                <div className={"m-auto"}>
                    <Spinner/>
                </div>
            )}
            {error && (
                <AlertError message={"Error While Parsing The File !"}/>
            )}
            {data && (
                <div className="m-auto">
                    <h5 className="p-auto text-lg font-extrabold text-gray-900 dark:text-gray-500 md:text-lg lg:text-xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Parsed file  </span> {fileUpload}</h5>
                    <ParsedFileResult data={data?.employeeDTOS ?? []}/>
                    <JobSummary data={data?.jobSalaryDtos ?? []} />
                </div>
            )}

        </div>

    )
}