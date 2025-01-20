import { JobMutation } from "../types"
import { Button, FormControl, FormLabel, TextareaAutosize, TextField } from "@mui/material";

interface FormInterface {
    formData: JobMutation;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isEdit: boolean;
}

const Form = ({ formData, isEdit, onChange, onSubmit }: FormInterface) => {

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 w-fit py-10">
                <div className="flex gap-4">
                    <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <TextField
                            value={formData.title}
                            onChange={onChange}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Job's title"
                            required
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="location">Location</FormLabel>
                        <TextField
                            value={formData.location}
                            onChange={onChange}
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Job's location"
                            variant="outlined"
                        />
                    </FormControl>
                </div>
                <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <TextareaAutosize
                        className="bg-slate-50/50 border border-neutral-200 rounded-md p-2 placeholder:text-slate-400"
                        value={formData.description}
                        onChange={onChange}
                        id="description"
                        name="description"
                        placeholder="Job's description"
                        minRows={3}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="salary">Salary</FormLabel>
                    <TextField
                        value={formData.salary}
                        onChange={onChange}
                        type="number"
                        id="salary"
                        name="salary"
                        placeholder="Job's salary"
                        variant="outlined"
                        required
                    />
                </FormControl>
                <Button type="submit" variant="contained" className="w-fit px-10">
                    {isEdit ? "Edit" : "Add"}
                </Button>
            </div>
        </form>
    )
}
export default Form