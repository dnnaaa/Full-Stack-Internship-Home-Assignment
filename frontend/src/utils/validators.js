export const validateJobForm = (formData) => {
    const errors = {}
  
    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }
  
    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }
  
    if (!formData.location.trim()) {
      errors.location = "Location is required"
    }
  
    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0) {
      errors.salary = "Salary must be a positive number"
    }
  
    return errors
}
  
  