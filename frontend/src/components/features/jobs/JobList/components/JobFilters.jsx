import { Box, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { Button } from "@/components/common/Button/Button"

export default function JobFilters() {
  return (
    <Box className="mb-6 flex gap-4 flex-wrap">
      <TextField label="Search" variant="outlined" size="small" />
      <FormControl variant="outlined" size="small">
        <InputLabel>Location</InputLabel>
        <Select label="Location">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="onsite">On-site</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small">
        <InputLabel>Salary Range</InputLabel>
        <Select label="Salary Range">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="0-50000">$0 - $50,000</MenuItem>
          <MenuItem value="50000-100000">$50,000 - $100,000</MenuItem>
          <MenuItem value="100000+">$100,000+</MenuItem>
        </Select>
      </FormControl>
      <Button>Apply Filters</Button>
    </Box>
  )
}

