export interface BusinessSearchRequest {
  businessName: string;
  address?: string;
  phoneNumber?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
}

export type CitationStatus =
  | 'Found'
  | 'NotFound'
  | 'NotConfigured'
  | 'Unavailable'
  | 'ManualReviewRequired';

export interface CitationResultDto {
  provider: string;
  status: CitationStatus;
  matchScore?: number | null;
  nameMatches?: boolean | null;
  addressMatches?: boolean | null;
  phoneMatches?: boolean | null;
  websiteMatches?: boolean | null;
  notes?: string | null;
}

export interface CitationCheckResponse {
  coverageScore: number;
  consistencyScore: number;
  results: CitationResultDto[];
}
