import { Alert, AlertTitle } from "@mui/material"

export function ErrorDisplay({ error, onClose }) {
  if (!error) return null

  const getSeverity = (code) => {
    switch (code) {
      case 'VALIDATION_ERROR':
        return 'warning'
      case 'NOT_FOUND':
        return 'info'
      case 'NETWORK_ERROR':
        return 'error'
      case 'UNAUTHORIZED':
      case 'FORBIDDEN':
        return 'warning'
      default:
        return 'error'
    }
  }

  const getTitle = (code) => {
    switch (code) {
      case 'VALIDATION_ERROR':
        return 'Validation Error'
      case 'NOT_FOUND':
        return 'Not Found'
      case 'NETWORK_ERROR':
        return 'Network Error'
      case 'UNAUTHORIZED':
        return 'Unauthorized'
      case 'FORBIDDEN':
        return 'Access Denied'
      default:
        return 'Error'
    }
  }

  return (
    <Alert 
      severity={getSeverity(error.code)}
      onClose={onClose}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{getTitle(error.code)}</AlertTitle>
      {error.message}
      {error.errors && error.errors.length > 0 && (
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
          {error.errors.map((err, index) => (
            <li key={index}>
              {err.field}: {err.message}
            </li>
          ))}
        </ul>
      )}
    </Alert>
  )
}