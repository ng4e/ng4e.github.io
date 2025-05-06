// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Gambetech";
export const SITE_DESCRIPTION = "Transforme les idées en solutions innovantes";

export interface CompanyData {
  id: string;
  logo: string;
  name: string;
  caseStudy: string;
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

export const companies: CompanyData[] = [
  {
    id: "slashup",
    logo: "/logo-slashup.png",
    name: "Slashup Studio",
    caseStudy: "https://www.slashup.studio/use-cases/maif-international",
  },
  {
    id: "slashup",
    logo: "/logo-mi.png",
    name: "MAIF International",
    caseStudy: "https://www.slashup.studio/use-cases/maif-international",
  },
  {
    id: "sii-mediterranee",
    logo: "/logo-sii-aix.png",
    name: "SII Méditerannée",
    caseStudy: "#sii-mediterranee",
  },
  {
    id: "sii-mediterranee",
    logo: "/logo-monext.png",
    name: "Monext",
    caseStudy: "#monext",
  },
  {
    id: "devoteam",
    logo: "/logo-devoteam.png",
    name: "Devoteam",
    caseStudy: "#devoteam",
  },
  {
    id: "devoteam",
    logo: "/logo-ditto.png",
    name: "Ditto Bank",
    caseStudy: "#ditto-bank",
  },
  {
    id: "accenture",
    logo: "/logo-accenture.png",
    name: "Accenture",
    caseStudy: "#accenture",
  },
  {
    id: "accenture-lbp",
    logo: "/logo-lbp.png",
    name: "La Banque Postale",
    caseStudy: "#banque-postale",
  },
  {
    id: "accenture-sg",
    logo: "/logo-sg.png",
    name: "Société Générale",
    caseStudy: "#societe-generale",
  },
  {
    id: "sopra-group",
    logo: "/logo-sopra.png",
    name: "Sopra Group",
    caseStudy: "#sopra-group",
  },
  // Add more companies as needed
];
