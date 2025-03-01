import { toast } from 'react-toastify'; 

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Handles API errors consistently across the application
 * @param error The error object from the API
 * @param fallbackMessage A fallback message if the error doesn't have a message property
 */
export const handleApiError = (error: unknown, fallbackMessage = 'A apărut o eroare. Vă rugăm să încercați din nou.'): ApiError => {
  console.error('API Error:', error);
  
  // If the error is already in our expected format
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const apiError = error as ApiError;
    toast.error(apiError.message);
    return apiError;
  }
  
  // For network errors
  if (error instanceof Error) {
    const message = error.message || fallbackMessage;
    toast.error(message);
    return { message };
  }
  
  // For unknown errors
  toast.error(fallbackMessage);
  return { message: fallbackMessage };
};

/**
 * Handles form validation errors
 * @param fieldErrors Object containing field errors
 */
export const handleFormErrors = (fieldErrors: Record<string, string>) => {
  Object.values(fieldErrors).forEach(error => {
    if (error) {
      toast.error(error);
    }
  });
};

/**
 * Creates a try-catch wrapper for async functions
 * @param fn The async function to wrap
 * @param errorHandler Optional custom error handler
 */
export function withErrorHandling<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  errorHandler?: (error: unknown) => void
) {
  return async (...args: Args): Promise<T | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (errorHandler) {
        errorHandler(error);
      } else {
        handleApiError(error);
      }
      return null;
    }
  };
}
