export const errorResponse = (message: string, details?: string) => ({
    status: "error",
    message,
    details: details ? sanitizeErrorMessage(details) : null,
});

const sanitizeErrorMessage = (rawMessage: string): string => {
    // Remove file paths and technical noise
    return rawMessage
        .replace(/(\\|\/)[\w\-.]+[:][\d]+/g, "") // Remove file paths and line numbers
        .replace(/(?:\s*\n\s*|\s{2,})/g, " ") // Replace newlines and extra spaces with a single space
        .replace(/Argument `[\w]+` is missing/g, (match) => match) // Keep clear error details like 'Argument `user` is missing'
        .trim(); // Remove extra spaces around the message
};
