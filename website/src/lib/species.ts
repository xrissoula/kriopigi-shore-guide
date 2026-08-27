/** Shared anchor id for a species entry on the Flora & Fauna page. */
export function speciesSlug(sci: string): string {
  return sci
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
