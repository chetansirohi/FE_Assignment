import { toast } from 'react-toastify';

export const handleApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                toast.error(data.message || 'Bad Request');
                break;
            case 401:
                toast.error('Unauthorized. Please log in again.');
                break;
            case 403:
                toast.error('You do not have permission to perform this action.');
                break;
            case 404:
                toast.error('Resource not found.');
                break;
            case 500:
                toast.error('Internal server error. Please try again later.');
                break;
            default:
                toast.error('An unexpected error occurred.');
        }
    } else if (error.request) {
        toast.error('No response received from the server. Please check your internet connection.');
    } else {
        toast.error('An unexpected error occurred. Please try again.');
    }
};