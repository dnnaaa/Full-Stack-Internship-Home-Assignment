import { TextField } from "@mui/material"

export function Input(props) {
  return <TextField {...props} variant="outlined" className={`rounded-xl ${props.className || ""}`} />
}

