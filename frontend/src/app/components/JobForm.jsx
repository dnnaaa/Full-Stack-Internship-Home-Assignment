import { InputAdornment, TextField, Typography } from "@mui/material";

const JobForm = ({ jobData, errors, handleChange, handleSubmit, jobId }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextField
              fullWidth
              label="Title *"
              name="title"
              value={jobData.title}
              placeholder="e.g. Senior Software Engineer"
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Location (optional)"
              name="location"
              value={jobData.location}
              placeholder="e.g., London, UK"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <TextField
            fullWidth
            label="Description *"
            name="description"
            value={jobData.description}
            placeholder="Write a brief description of the job role, including key responsibilities and requirements."
            onChange={handleChange}
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Salary (optional)"
            name="salary"
            value={jobData.salary}
            placeholder="e.g., 950000"
            onChange={handleChange}
            type="number"
            error={!!errors.salary}
            inputProps={{ min: 0, step: 0.01 }}
            helperText={errors.salary}
            InputProps={{
              inputMode: "decimal",
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 font-semibold normal-case bg-green-100 text-green-800 hover:bg-green-200"
        >
          {jobId ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
