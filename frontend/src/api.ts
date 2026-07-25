import type { BusinessSearchRequest, CitationCheckResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5278';

export async function checkCitations(
  request: BusinessSearchRequest,
  signal?: AbortSignal,
): Promise<CitationCheckResponse> {
  const response = await fetch(`${API_BASE_URL}/api/citation-checks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `İstek başarısız oldu (durum kodu ${response.status}).`);
  }

  return response.json();
}
