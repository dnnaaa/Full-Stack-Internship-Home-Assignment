export async function handleApiError(error) {
    if (error.response) {
      const { data, status } = error.response
      
      if (data.code && data.message) {
        return data
      }
  
      const errorCodes = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        422: 'VALIDATION_ERROR',
        500: 'SERVER_ERROR'
      }
  
      return {
        code: errorCodes[status] || 'API_ERROR',
        message: data.message || 'An error occurred while processing your request',
        timestamp: new Date().toISOString(),
        errors: data.errors || []
      }
    } else if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the server. Please check your internet connection.',
        timestamp: new Date().toISOString()
      }
    } else {
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }
    }
  }