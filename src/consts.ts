// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Gambetech";
export const SITE_DESCRIPTION = "Transforme les idées en solutions innovantes";

// Identity links (docs/architecture/case-studies.md §5): no URL literal elsewhere.
export const LINKEDIN_URL = "https://www.linkedin.com/in/samuelmolu/";
export const GITHUB_URL = "https://github.com/ng4e";

// The four sectors of the home statement (docs/architecture/case-studies.md §4), as keys of
// `sectors.<key>` in src/i18n/translations.ts. Energy was dropped; the founder may restore it.
export const SECTORS = ["retail_banking", "insurance", "payment", "telecom"] as const;

export interface CompanyData {
  logo: string;
  name: string;
}

export interface Project {
  id: string;
  key: number;
  // Basic information
  duration: string;
  company: string;
  client: string;
  mission: string;

  // Detailed information
  context: string;
  role: string;
  tasks: string[];
  technologies: string[];
  results: string[];
}

// The logo wall keeps only the logos legible at 375 px (WEB-FT-13, option b; docs/qa/WEB-IMPL-16).
// Each file is the original cropped to its wordmark on a transparent background.
export const companies: CompanyData[] = [
  {
    logo: "/logo-mi.png",
    name: "MAIF International",
  },
  {
    logo: "/logo-monext.png",
    name: "Monext",
  },
  {
    logo: "/logo-accenture.png",
    name: "Accenture",
  },
  {
    logo: "/logo-sg.png",
    name: "Société Générale",
  },
  {
    logo: "/logo-sopra.png",
    name: "Sopra Steria",
  },
  // Add more companies as needed
];
