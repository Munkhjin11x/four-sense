export async function getPathname(): Promise<string> {
  // For now, return a default pathname since we removed the custom header
  // This can be improved later with a different approach
  return '/';
}
