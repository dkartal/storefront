export function extractCookieValue(
  cookies: string[],
  cookieName: string
): string | undefined {
  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!cookie) return undefined;
  return cookie.split(";")[0].split("=")[1]; // Get the value after "cookieName="
}
