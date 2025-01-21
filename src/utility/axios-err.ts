"use client"
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string; 
}

export const handleAxiosError = (error: unknown): string => {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<ErrorResponse>

    if (axiosError.response) {
      return axiosError.response.data?.message|| "An error occurred. Please try again.";
    } else if (axiosError.request) {
      return "Network error. Please check your connection.";
    }
  }
  
  return "Something went wrong. Please try again.";
};
