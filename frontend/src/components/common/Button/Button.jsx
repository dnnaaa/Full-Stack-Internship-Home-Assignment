import { Button as MuiButton } from "@mui/material"

export function Button({ children, ...props }) {
  return (
    <MuiButton
      {...props}
      className={`bg-black hover:bg-gray-800 text-white transition-all rounded-xl ${props.className || ""}`}
    >
      {children}
    </MuiButton>
  )
}

