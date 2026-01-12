export type ResearchSource = {
  slug: string;            // e.g. "cryo-inflammation-01"
  title: string;
  summary: string;
  url: string;
  publisher?: string;
  year?: number;
  tags?: string[];
};
