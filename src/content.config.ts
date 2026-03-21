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

export const collections = { blog, projects };
