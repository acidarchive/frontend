/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * acid
 * API for acidarchive.com
 * OpenAPI spec version: 0.0.1-alpha.9
 */
import type { PaginatedResponseTB303PatternSummaryRecordsItem } from './paginatedResponseTB303PatternSummaryRecordsItem';
import type { PaginatedResponseTB303PatternSummaryTotal } from './paginatedResponseTB303PatternSummaryTotal';
import type { PaginatedResponseTB303PatternSummaryTotalPages } from './paginatedResponseTB303PatternSummaryTotalPages';

export interface PaginatedResponseTB303PatternSummary {
  page: number;
  page_size: number;
  records: PaginatedResponseTB303PatternSummaryRecordsItem[];
  total?: PaginatedResponseTB303PatternSummaryTotal;
  total_pages?: PaginatedResponseTB303PatternSummaryTotalPages;
}
