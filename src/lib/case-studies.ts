import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/translations";

// The only reader of the caseStudies collection (docs/architecture/case-studies.md §1).
// Drafts are visible under `npm run dev` and never built.

export type CaseStudy = CollectionEntry<"caseStudies">;

const KIND_RANK = { product: 0, mission: 1 } as const;

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const entries = await getCollection("caseStudies", ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort(
    (a, b) => KIND_RANK[a.data.kind] - KIND_RANK[b.data.kind] || a.data.order - b.data.order,
  );
}

// Plain-text fields separate paragraphs with a blank line (§1).
export function firstParagraph(text: string): string {
  return text.split(/\n\s*\n/)[0]?.trim() ?? "";
}

export function caseStudyUrl(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/work/${slug}/` : `/realisations/${slug}/`;
}

export async function countPublishedProducts(): Promise<number> {
  const entries = await getPublishedCaseStudies();
  return entries.filter((entry) => entry.data.kind === "product").length;
}
