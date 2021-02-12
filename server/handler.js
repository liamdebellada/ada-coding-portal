export default function createErrorObject(message) {
    return {
        success: false,
        error : message,
        reason : "unset"
    }
}