// src/hooks/useErrorHandler.js
import { useState } from "react"

export function useErrorHandler() {
  const [error, setError] = useState(null)

  const handleError = (error) => {
    setError(error)
    if (error.code === "VALIDATION_ERROR") {
      setTimeout(() => setError(null), 5000)
    }
  }

  const clearError = () => setError(null)

  return { error, handleError, clearError }
}