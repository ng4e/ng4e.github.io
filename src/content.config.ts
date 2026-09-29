import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().optional(),
    lang: z.enum(["fr", "en"]).default("en").optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Define the schema for the projects collection
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/[^_]*.json" }),
  schema: z.object({
    id: z.string(),
    key: z.number(),
    duration: z.string(),
    company: z.string(),
    client: z.string(),
    mission: z.string(),
    context: z.string(),
    role: z.string(),
    tasks: z.array(z.string()),
    technologies: z.array(z.string()),
    results: z.array(z.string()),
  }),
});

// Case studies: one YAML file per case study, both languages inside it
// (docs/architecture/case-studies.md §1). Every field is required.
const text = z.string().trim().min(1);
const list = z.array(text).min(1);
const caseStudyLang = z
  .object({
    title: text,
    problem: text,
    built: text,
    production: text,
    stack: list,
    role: text,
    ai: text,
  })
  .strict();
const caseStudyBase = {
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  order: z.number().int(),
  draft: z.boolean(),
};

const caseStudies = defineCollection({
  loader: glob({ base: "./src/content/case-studies", pattern: "**/[^_]*.yaml" }),
  schema: z
    .discriminatedUnion("kind", [
      z
        .object({
          ...caseStudyBase,
          kind: z.literal("product"),
          liveUrl: z.string().url().optional(),
          fr: caseStudyLang,
          en: caseStudyLang,
        })
        .strict(),
      z
        .object({
          ...caseStudyBase,
          kind: z.literal("mission"),
          client: text,
          fr: caseStudyLang.extend({ results: list }),
          en: caseStudyLang.extend({ results: list }),
        })
        .strict(),
    ])
    .superRefine((data, ctx) => {
      // NMT has no public web page; every other product must link to its live site.
      if (data.kind === "product" && !data.liveUrl && data.slug !== "nmt") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["liveUrl"],
          message: "liveUrl is required (only nmt may omit it)",
        });
      }
    }),
});

export const collections = { blog, projects, caseStudies };
