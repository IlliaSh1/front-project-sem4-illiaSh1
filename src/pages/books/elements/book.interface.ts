export interface IBook {
  id: number;
  link: string;
  authors: string[];
  name: string;
  cover: string;
  annotation: string;
  bibl_record: string;
  year_published: number;
  pages_count: number;
  isbn: string;
  disciplines: string[];
  is_favorite?: boolean;
}
