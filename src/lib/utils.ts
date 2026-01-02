import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Maps server-side validation errors to react-hook-form field errors
 * Handles both new format: { status: 400, errors: [{ message, code, param }] }
 * and legacy format: { errors: { field: [...messages] } }
 * 
 * @param errors - The errors from the API response
 * @param setError - react-hook-form's setError function
 * @param setGlobalError - Optional callback for non-field errors
 * @returns true if any errors were handled
 */
export function handleFormErrors(
  errors: any,
  setError: any,
  setGlobalError?: (message: string) => void
): boolean {
  if (!errors) return false

  let hasErrors = false

  // Handle new array format: [{ message, code, param }]
  if (Array.isArray(errors)) {
    let hasFieldError = false
    errors.forEach((error: any) => {
      if (error.param && error.message) {
        // Map param to form field name
        setError(error.param, { message: error.message })
        hasFieldError = true
        hasErrors = true
      } else if (error.message && !error.param) {
        // Non-field error
        if (setGlobalError) {
          setGlobalError(error.message)
        }
        hasErrors = true
      }
    })
    
    // If no field errors were set but we have errors without params, show as global
    if (!hasFieldError && errors.length > 0 && setGlobalError) {
      const messages = errors
        .filter((e: any) => e.message && !e.param)
        .map((e: any) => e.message)
      if (messages.length > 0) {
        setGlobalError(messages.join(" "))
      }
    }
  } 
  // Handle legacy object format: { field: [...messages], non_field_errors: [...] }
  else if (typeof errors === 'object') {
    Object.entries(errors).forEach(([key, value]) => {
      if (key === 'non_field_errors' && setGlobalError) {
        setGlobalError(Array.isArray(value) ? value.join(" ") : String(value))
        hasErrors = true
      } else {
        setError(key, { 
          message: Array.isArray(value) ? value.join(" ") : String(value) 
        })
        hasErrors = true
      }
    })
  }

  return hasErrors
}
