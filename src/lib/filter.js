export function readParam(search, name) {
  return new URLSearchParams(search).get(name);
}

export function withParam(href, name, value) {
  const url = new URL(href);
  if (value) url.searchParams.set(name, value);
  else url.searchParams.delete(name);
  return url.toString();
}
