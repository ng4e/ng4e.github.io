---
title: "My Go-To Stack and Free Tools That Power It"
description: "How I go from zero to production-ready apps using a lean tech stack, generous free tiers, and AI-powered IDEs—while staying focused on building actual solutions."
pubDate: 2025-05-06
updatedDate: 2025-05-06
heroImage: "/images/stack-blog-hero.jpg"
tags: ["tooling", "stack", "freelance", "devops", "shipping", "ai assistant"]
author: "Your Name"
---

As someone who balances freelance work, community projects, and niche product building with very tight budgets, I’ve found a setup that helps me go from code to production quickly—with stability, structure, and just the right level of complexity.

This post walks through my go-to tools and workflow for getting things done, from landing pages to production-ready MVPs—all while keeping costs low thanks to generous free tiers.

I am not affiliated with any of the tools mentioned in this post.

---

### The Tools

#### **For Domain Management**

[porkbun](https://porkbun.com/) is my go-to for domain registration and management. They offer a wide range of domain extensions and simple yet complete user interface.

#### **For Landing Pages**

For a clean, fast, mobile-responsive landing page with memberships, ecommerce, few sections, [Strikingly](https://www.strikingly.com) gets the job done. I’ve used it for quick project launches and validation experiments.

- **Paid tiers**: The offer i use provide 3 website Custom domains, advanced analytics, ecommerce integration, and more.
- **Why I use it**: It’s less time fiddling with design and more time focusing on what matters—testing interest or collecting sign-ups.

#### **For Backend Prototypes**

- **Node.js, Express, EJS, TypeScript**: When I'm testing an idea or shaping a product structure, I reach for a classic server-side stack: Express with EJS and TypeScript. No frontend frameworks yet—just clean old MVC and fast iteration.

- **Why this stack**: As a backend specialist, I prefer to think in pages and flows first, not components and states. This stack lets me sketch the skeleton of the app before investing time in full-blown frontend architecture, most of the time i hire someone for the frontend if there's one.

- **Java, Spring Boot, Quarkus**: Most of the time, I use Java, Spring Boot, for experimentation purpose and testing new framework features.

#### For Version Control & CI/CD

**Bitbucket (Private Repos + Pipelines)** All my code lives in private Bitbucket repositories. I used their free tier for years, but recently moved to the Standard plan because i work with a young graduate developer on some projects—we collaborate entirely within Bitbucket, using issues features, pull requests and code reviews to level up both our skills.
- **Current plan**: Standard (includes 2 users and more build minutes).

**SonarQube (Free Tier)** Clean code matters—even when moving fast. I use the [SonarQube Cloud](https://www.sonarsource.com/products/sonarqube/) mostly to enforce code quality and spot security issues rigth upfront. *I don't let sonarCloud stop the build in case of quality gate failure, the free tiers Sonar Way rules impose 80% test code coverage by default, who have time for that :-)*

- **Free tier**: locked you with built in Sonar Way rules.
- **Why I use it**: *Old corporate habits! :-)* It reminds me that even "temporary" code lives forever and helps me learn securities issues and clean code practice.

#### For Infrastructure

- **Oracle Cloud Free Tier = MVP Heaven** The underrated Oracle Cloud Infrastructure (OCI) has a generous free tiers out there. I run my staging environments on `VM.Standard.E2.1.Micro` Ubuntu VMs.

- **Free tier** good for playground  (1 core OCPU, 1 GB memory, 0.48 Gbps network bandwidth)
- **My setup**: Dockerized apps, Shared staging server, Caddy as a reverse proxy (with built-in HTTPS and auto TLS renewal)

It’s an underrated platform for solo developers.

- ** Authentication and Authorization**:  I use Appwrite (Open Source Firebase Like) or Auth0

#### For Databases & Messaging
Depending on what i'am prototyping or the tech i'am learning i started everything on **SQLite** when fast prototyping. In my toolbelt, I kept Docker compose for:
- PostgreSQL + pgvector extension + CDC enabled configuration file
- Neo4j Community Edition
- RabbitMQ

Each service runs in a container, isolated but networked—sharing compute on OCI, with Docker Compose.

#### For Code Editing(a.k.a. Where I Actually Live)

Yes, I use multiple IDEs:

- **Zed + Gemini Flash**: Fast, minimal, great display for deep focus.
- **Cursor + built-in model**: My go-to for structured builds and test writing.
- **VS Code**: Swiss-army knife, especially for frontend tweaks and quick scripting.
- **IntelliJ Ultimate + Gemini Flash**: The only IDE I’ve paid for.

---
[see my other post on what i'am building](/blog/001-building-for-passion-projects/) Free tiers and picking the right tools, moving with clarity. I get my stuff to work, get it used, and make keep it clean and "fancy" after it's done.
