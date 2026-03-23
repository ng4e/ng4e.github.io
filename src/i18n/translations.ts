export type Locale = "fr" | "en";

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Site
    "site.title": "Gambetech",
    "site.description": "Transforme les idees en solutions innovantes",

    // Nav (4 keys)
    "nav.expertises": "Expertises",
    "nav.products": "Produits",
    "nav.experiences": "Experiences",
    "nav.blog": "Idees & Opinions",

    // Hero (5 keys)
    "hero.title": "GAMBETECH",
    "hero.tagline": "Transforme les idees en solutions innovantes",
    "hero.description":
      "L'harmonie est au coeur de notre demarche. Face aux defis complexes, nous analysons methodiquement chaque variable pour creer des solutions fluides et optimales, eliminant toute friction inutile.",
    "hero.cta.products": "Decouvrir nos produits",
    "hero.cta.expertises": "Voir nos expertises",

    // Philosophy (3 keys)
    "philosophy.paragraph1":
      "L'harmonie est au coeur de notre demarche.",
    "philosophy.paragraph2":
      "Face aux defis complexes, nous analysons methodiquement chaque variable pour creer des solutions fluides et optimales, eliminant toute friction inutile.",
    "philosophy.paragraph3":
      "GambeTech est un editeur de solutions, specialise dans des produits de niche.",

    // Competencies (9 keys)
    "competencies.title": "Nos competences cles",
    "competencies.modeling.title": "Modelisation",
    "competencies.modeling.body":
      "Structuration de domaines fonctionnels complexes",
    "competencies.prioritization.title": "Priorisation",
    "competencies.prioritization.body":
      "Identification des elements a forte valeur ajoutee",
    "competencies.implementation.title": "Implementation",
    "competencies.implementation.body":
      "Developpement technique precis et performant",
    "competencies.integration.title": "Integration",
    "competencies.integration.body":
      "Solutions harmonieuses et adaptees aux systemes existants",

    // Sectors (8 keys)
    "sectors.title": "Secteurs d'intervention",
    "sectors.subtitle":
      "Une expertise developpee au sein de secteurs exigeants ou performance et fiabilite sont essentielles.",
    "sectors.retail_banking": "Banque de detail",
    "sectors.insurance": "Assurance",
    "sectors.payment": "Monetique",
    "sectors.telecom": "Telecom",
    "sectors.energy": "Energie",
    "sectors.logos.title": "Clients et partenaires",

    // Metrics (5 keys)
    "metrics.title": "Experiences",
    "metrics.years": "Annees d'expertise cumulee",
    "metrics.sectors": "Secteurs strategiques",
    "metrics.founded": "Annee de creation",
    "metrics.products": "Produits",

    // Products (12 keys)
    "products.title": "Nos Produits",
    "products.subtitle": "Creer de la valeur sur des problemes de niche",
    "products.nmt.tagline": "Reseau social familial",
    "products.nmt.body":
      "Un reseau social familial avec arbre genealogique et journal de gratitude partage, a destination des familles eloignees par l'immigration.",
    "products.nmt.cta": "Decouvrir le projet",
    "products.sp.tagline": "Gestion de tournois tennis",
    "products.sp.body":
      "Solution de programmation de tournois ITF a partir des performances et du budget. Aide les familles de jeunes joueurs a optimiser leur parcours vers la carriere professionnelle.",
    "products.sp.cta": "Decouvrir le projet",
    "products.pirien.tagline": "Heritage culturel Bamoun",
    "products.pirien.body":
      "Plateforme de preservation, valorisation et transmission de l'heritage culturel Bamoun au Cameroun. Inclut une boutique associative en ligne.",
    "products.pirien.cta": "Decouvrir le projet",
    "products.discover": "Decouvrir le projet",

    // Blog preview (4 keys)
    "blog.title": "Idees et Opinions",
    "blog.subtitle":
      "...et autres questions existentielles sur la technologie, la science et la vie de tous les jours",
    "blog.readMore": "Lire la suite",
    "blog.emptyState": "Aucun article pour le moment. Revenez bientot !",
    "blog.viewAll": "Voir tous les articles",

    // Footer (10 keys)
    "footer.tagline": "Editeur de logiciels de niche",
    "footer.col1.title": "Gambetech",
    "footer.col1.expertises": "Expertises",
    "footer.col1.experiences": "Experiences",
    "footer.col2.title": "Initiative",
    "footer.col2.products": "Produits",
    "footer.col3.title": "Ressources",
    "footer.col3.blog": "Idees & Opinions",
    "footer.legal": "Mentions legales",
    "footer.copyright": "Gambetech \u00A9 2026 All rights reserved.",

    // Expertises page (12 keys)
    "expertises.pageTitle": "Expertises",
    "expertises.pageDesc":
      "Architecture et planification - Integration de systemes - Conception et developpement de logiciels",
    "expertises.header": "15+ annees d'experience",
    "expertises.subtitle":
      "Ouvert au marche. Freelance/CDI. Base a Aix-en-Provence",
    "expertises.vision.title": "Vision Produit",
    "expertises.vision.level": "Experimente",
    "expertises.vision.body":
      "Definition et mise en oeuvre de la strategie produit cote backend avec un fort focus sur le modele, l'ergonomie et la performance",
    "expertises.project.title": "Gestion de projet technique",
    "expertises.project.level": "Experimente",
    "expertises.project.body":
      "Pilotage et Implementation de projets techniques de la conception au deploiement",
    "expertises.fullstack.title": "Developpement full-stack",
    "expertises.fullstack.level": "Experimente",
    "expertises.fullstack.body":
      "Sensibilite a une approche de developpement cloud natif. Langages de programmation: Java 8+, JavaScript (ES6+), TypeScript, Python SQL.",
    "expertises.agile.title": "Environnement agile et apprenant",
    "expertises.agile.level": "Experimente",
    "expertises.agile.body":
      "Capacite a evoluer dans un cadre collaboratif et oriente vers le client, avec une capacite d'apprentissage continue.",
    "expertises.tech.title": "Competences Techniques Complementaires",
    "expertises.tech.body":
      "Atlassian (Confluence, Jira, Trello), Spring Boot, Spring framework, Quarkus, Maven, Github, Gitlab, Bitbucket, Vercel, Google Cloud, AWS, Oracle Cloud.",
    "expertises.clients.title": "Clients et partenaires",

    // Products page (10 keys)
    "productsPage.pageTitle": "Nos Produits",
    "productsPage.pageDesc":
      "Creer de la valeur sur des problemes de niches",
    "productsPage.header": "Nos Produits",
    "productsPage.subtitle":
      "Creer de la valeur sur des problemes de niches",
    "productsPage.requirements": "Requirements",
    "productsPage.architecture": "Architecture",
    "productsPage.siteWeb": "Site Web",

    // Experiences page (6 keys)
    "experiencesPage.pageTitle": "References",
    "experiencesPage.pageDesc": "15+ Annees d'experiences",
    "experiencesPage.header": "References professionnelles",
    "experiencesPage.subtitle":
      "15+ annees d'experience dans des secteurs strategiques",
    "experiencesPage.cv.download": "Telecharger le CV",
    "experiencesPage.headerTitle": "Experiences",

    // Project card (5 keys)
    "projectCard.role": "Role :",
    "projectCard.tasks": "Taches",
    "projectCard.technologies": "Technologies",
    "projectCard.results": "Resultats",
    "projectCard.duration": "Duree",

    // Blog page (3 keys)
    "blogPage.pageTitle": "Idees et Opinions",
    "blogPage.pageDesc":
      "...et autres questions existentielles sur la technologie, la science et la vie de tous les jours",
    "blogPage.readMore": "Lire la suite",

    // Blog post layout (2 keys)
    "blogPost.updatedOn": "Mis a jour le",

    // Legal page (5 keys)
    "legal.title": "Mentions legales",
    "legal.publisher": "Editeur du site",
    "legal.hosting": "Hebergement",
    "legal.privacy": "Donnees personnelles",
    "legal.frenchNotice": "",

    // Accessibility (1 key)
    "a11y.skipToContent": "Aller au contenu principal",
  },

  en: {
    // Site
    "site.title": "Gambetech",
    "site.description": "Turning ideas into innovative solutions",

    // Nav (4 keys)
    "nav.expertises": "Expertise",
    "nav.products": "Products",
    "nav.experiences": "Experience",
    "nav.blog": "Ideas & Opinions",

    // Hero (5 keys)
    "hero.title": "GAMBETECH",
    "hero.tagline": "Turning ideas into innovative solutions",
    "hero.description":
      "Harmony is at the heart of our approach. Facing complex challenges, we methodically analyze each variable to create fluid and optimal solutions, eliminating all unnecessary friction.",
    "hero.cta.products": "Discover our products",
    "hero.cta.expertises": "See our expertise",

    // Philosophy (3 keys)
    "philosophy.paragraph1":
      "Harmony is at the heart of our approach.",
    "philosophy.paragraph2":
      "Facing complex challenges, we methodically analyze each variable to create fluid and optimal solutions, eliminating all unnecessary friction.",
    "philosophy.paragraph3":
      "GambeTech is a solutions publisher, specialized in niche products.",

    // Competencies (9 keys)
    "competencies.title": "Our core competencies",
    "competencies.modeling.title": "Modeling",
    "competencies.modeling.body":
      "Structuring complex functional domains",
    "competencies.prioritization.title": "Prioritization",
    "competencies.prioritization.body":
      "Identifying high-value elements",
    "competencies.implementation.title": "Implementation",
    "competencies.implementation.body":
      "Precise and performant technical development",
    "competencies.integration.title": "Integration",
    "competencies.integration.body":
      "Harmonious solutions adapted to existing systems",

    // Sectors (8 keys)
    "sectors.title": "Areas of expertise",
    "sectors.subtitle":
      "Expertise developed in demanding sectors where performance and reliability are essential.",
    "sectors.retail_banking": "Retail Banking",
    "sectors.insurance": "Insurance",
    "sectors.payment": "Payment Systems",
    "sectors.telecom": "Telecom",
    "sectors.energy": "Energy",
    "sectors.logos.title": "Clients and partners",

    // Metrics (5 keys)
    "metrics.title": "Experience",
    "metrics.years": "Years of cumulative expertise",
    "metrics.sectors": "Strategic sectors",
    "metrics.founded": "Year founded",
    "metrics.products": "Products",

    // Products (12 keys)
    "products.title": "Our Products",
    "products.subtitle": "Creating value for niche problems",
    "products.nmt.tagline": "Family social network",
    "products.nmt.body":
      "A family social network with family tree and shared gratitude journal, designed for families separated by immigration.",
    "products.nmt.cta": "Discover the project",
    "products.sp.tagline": "Tennis tournament management",
    "products.sp.body":
      "ITF tournament scheduling solution based on performance and budget. Helps families of young players optimize their path to a professional career.",
    "products.sp.cta": "Discover the project",
    "products.pirien.tagline": "Bamoun cultural heritage",
    "products.pirien.body":
      "Platform for the preservation, promotion, and transmission of Bamoun cultural heritage in Cameroon. Includes an online association shop.",
    "products.pirien.cta": "Discover the project",
    "products.discover": "Discover the project",

    // Blog preview (4 keys)
    "blog.title": "Ideas and Opinions",
    "blog.subtitle":
      "...and other existential questions about technology, science, and everyday life",
    "blog.readMore": "Read more",
    "blog.emptyState": "No articles yet. Come back soon!",
    "blog.viewAll": "View all articles",

    // Footer (10 keys)
    "footer.tagline": "Niche software publisher",
    "footer.col1.title": "Gambetech",
    "footer.col1.expertises": "Expertise",
    "footer.col1.experiences": "Experience",
    "footer.col2.title": "Initiative",
    "footer.col2.products": "Products",
    "footer.col3.title": "Resources",
    "footer.col3.blog": "Ideas & Opinions",
    "footer.legal": "Legal notice",
    "footer.copyright": "Gambetech \u00A9 2026 All rights reserved.",

    // Expertises page (12 keys)
    "expertises.pageTitle": "Expertise",
    "expertises.pageDesc":
      "Architecture and planning - Systems integration - Software design and development",
    "expertises.header": "15+ years of experience",
    "expertises.subtitle":
      "Open to the market. Freelance/Permanent. Based in Aix-en-Provence",
    "expertises.vision.title": "Product Vision",
    "expertises.vision.level": "Experienced",
    "expertises.vision.body":
      "Defining and implementing product strategy on the backend side with a strong focus on modeling, usability, and performance",
    "expertises.project.title": "Technical Project Management",
    "expertises.project.level": "Experienced",
    "expertises.project.body":
      "Leading and implementing technical projects from design to deployment",
    "expertises.fullstack.title": "Full-stack Development",
    "expertises.fullstack.level": "Experienced",
    "expertises.fullstack.body":
      "Cloud-native development mindset. Programming languages: Java 8+, JavaScript (ES6+), TypeScript, Python, SQL.",
    "expertises.agile.title": "Agile and Learning Environment",
    "expertises.agile.level": "Experienced",
    "expertises.agile.body":
      "Ability to thrive in a collaborative, client-oriented framework with continuous learning.",
    "expertises.tech.title": "Additional Technical Skills",
    "expertises.tech.body":
      "Atlassian (Confluence, Jira, Trello), Spring Boot, Spring framework, Quarkus, Maven, Github, Gitlab, Bitbucket, Vercel, Google Cloud, AWS, Oracle Cloud.",
    "expertises.clients.title": "Clients and partners",

    // Products page (10 keys)
    "productsPage.pageTitle": "Our Products",
    "productsPage.pageDesc":
      "Creating value for niche problems",
    "productsPage.header": "Our Products",
    "productsPage.subtitle":
      "Creating value for niche problems",
    "productsPage.requirements": "Requirements",
    "productsPage.architecture": "Architecture",
    "productsPage.siteWeb": "Website",

    // Experiences page (6 keys)
    "experiencesPage.pageTitle": "References",
    "experiencesPage.pageDesc": "15+ years of experience",
    "experiencesPage.header": "Professional references",
    "experiencesPage.subtitle":
      "15+ years of experience in strategic sectors",
    "experiencesPage.cv.download": "Download CV",
    "experiencesPage.headerTitle": "Experience",

    // Project card (5 keys)
    "projectCard.role": "Role:",
    "projectCard.tasks": "Tasks",
    "projectCard.technologies": "Technologies",
    "projectCard.results": "Results",
    "projectCard.duration": "Duration",

    // Blog page (3 keys)
    "blogPage.pageTitle": "Ideas and Opinions",
    "blogPage.pageDesc":
      "...and other existential questions about technology, science, and everyday life",
    "blogPage.readMore": "Read more",

    // Blog post layout (2 keys)
    "blogPost.updatedOn": "Updated on",

    // Legal page (5 keys)
    "legal.title": "Legal Notice",
    "legal.publisher": "Site Publisher",
    "legal.hosting": "Hosting",
    "legal.privacy": "Privacy",
    "legal.frenchNotice": "Detailed legal information for this website is available in French.",

    // Accessibility (1 key)
    "a11y.skipToContent": "Skip to main content",
  },
};

/**
 * Translate a key for the given locale.
 * Falls back to French, then returns the key itself.
 */
export function t(key: string, locale: Locale = "fr"): string {
  return translations[locale]?.[key] ?? translations.fr[key] ?? key;
}

/**
 * Strip the /en/ prefix from a pathname for language switcher URL computation.
 */
export function getPagePath(pathname: string): string {
  return pathname.replace(/^\/en(?:\/|$)/, "/").replace(/^\//, "");
}
