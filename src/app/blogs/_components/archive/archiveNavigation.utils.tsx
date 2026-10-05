export function withSearchParams(path: string, params: URLSearchParams) {
  if (!params.size) {
    return path;
  }

  return `${path}?${params}`;
}

export function getArchivePage(value: number, pages: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(pages, Math.max(1, Math.floor(value)));
}
