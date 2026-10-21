/** Brecksville has online booking and Cherry financing disabled. */
export function isBrecksvilleLocation(state: string, city: string): boolean {
  return state === "ohio" && city === "brecksville";
}

export function isBrecksvilleLocationPath(pathname: string): boolean {
  return /^(?:\/(?:en|es))?\/locations\/ohio\/brecksville(?:\/|$)/.test(pathname);
}
