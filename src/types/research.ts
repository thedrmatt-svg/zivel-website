export type ResearchSource = {
  id?: string;
  slug?: string;
  title: string;
  summary: string;
  url: string;
  source?: string;
  journal?: string;
  authors?: string[];
  year?: number;
  tags?: string[];
  relatedServiceSlugs?: string[];

};
