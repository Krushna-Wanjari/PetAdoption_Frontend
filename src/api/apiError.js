/**
 * Your backend's error shape isn't in the OpenAPI spec (exceptions usually
 * aren't), so this checks the common Spring patterns in order:
 * a custom { message } or { error } body from your GlobalExceptionHandler,
 * a plain string body, or Spring's default error object. Falls back to a
 * generic message if none of those match.
 */
export function getApiErrorMessage(
  error,
  fallback = "Something went wrong. Please try again."
) {
  const data = error?.response?.data;

  if (!data) return fallback;
  if (typeof data === "string" && data.trim()) return data;
  if (data.message) return data.message;
  if (data.error) return data.error;

  return fallback;
}
