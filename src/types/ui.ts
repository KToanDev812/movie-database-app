export interface SortOption {
  id: string;
  name: string;
  value: string;
}

export interface FilterOptions {
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}
