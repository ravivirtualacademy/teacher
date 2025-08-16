
export interface ResearchPaper {
  title: string;
  abstract: string;
  introduction: string;
  literatureReview: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string[];
}

export type PaperSection = keyof ResearchPaper;

// Declaration for UMD modules loaded from CDN
declare global {
  interface Window {
    jspdf: any;
    docx: any;
    LucideReact: any;
  }
}
