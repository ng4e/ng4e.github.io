export type Locale = "fr" | "en";

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Site
    "site.title": "Gambetech",
    "site.description": "Transforme les idées en solutions innovantes",

    // Nav (4 keys)
    "nav.expertises": "Expertises",
    "nav.products": "Produits",
    "nav.experiences": "Expériences",
    "nav.blog": "Idées & Opinions",

    // Hero (5 keys)
    "hero.title": "GAMBETECH",
    "hero.tagline": "Transforme les idées en solutions innovantes",
    "hero.description":
      "L'harmonie est au cœur de notre démarche. Face aux défis complexes, nous analysons méthodiquement chaque variable pour créer des solutions fluides et optimales, éliminant toute friction inutile.",
    "hero.cta.products": "Découvrir nos produits",
    "hero.cta.expertises": "Voir nos expertises",

    // Philosophy (3 keys)
    "philosophy.paragraph1":
      "L'harmonie est au cœur de notre démarche.",
    "philosophy.paragraph2":
      "Face aux défis complexes, nous analysons méthodiquement chaque variable pour créer des solutions fluides et optimales, éliminant toute friction inutile.",
    "philosophy.paragraph3":
      "GambeTech est un éditeur de solutions, spécialisé dans des produits de niche.",

    // Competencies (9 keys)
    "competencies.title": "Nos compétences clés",
    "competencies.modeling.title": "Modélisation",
    "competencies.modeling.body":
      "Structuration de domaines fonctionnels complexes",
    "competencies.prioritization.title": "Priorisation",
    "competencies.prioritization.body":
      "Identification des éléments à forte valeur ajoutée",
    "competencies.implementation.title": "Implémentation",
    "competencies.implementation.body":
      "Développement technique précis et performant",
    "competencies.integration.title": "Intégration",
    "competencies.integration.body":
      "Solutions harmonieuses et adaptées aux systèmes existants",

    // Sectors (8 keys)
    "sectors.title": "Secteurs d'intervention",
    "sectors.subtitle":
      "Une expertise développée au sein de secteurs exigeants où performance et fiabilité sont essentielles.",
    "sectors.retail_banking": "Banque de détail",
    "sectors.insurance": "Assurance",
    "sectors.payment": "Monétique",
    "sectors.telecom": "Télécom",
    "sectors.energy": "Énergie",
    "sectors.logos.title": "Clients et partenaires",

    // Metrics (5 keys)
    "metrics.title": "Expériences",
    "metrics.years": "Années d'expertise cumulée",
    "metrics.sectors": "Secteurs stratégiques",
    "metrics.founded": "Année de création",
    "metrics.products": "Produits",

    // Products (12 keys)
    "products.title": "Nos Produits",
    "products.subtitle": "Créer de la valeur sur des problèmes de niche",
    "products.nmt.tagline": "Réseau social familial",
    "products.nmt.body":
      "Un réseau social familial avec arbre généalogique et journal de gratitude partagé, à destination des familles éloignées par l'immigration.",
    "products.nmt.cta": "Découvrir le projet",
    "products.sp.tagline": "Gestion de tournois tennis",
    "products.sp.body":
      "Solution de programmation de tournois ITF à partir des performances et du budget. Aide les familles de jeunes joueurs à optimiser leur parcours vers la carrière professionnelle.",
    "products.sp.cta": "Découvrir le projet",
    "products.pirien.tagline": "Héritage culturel Bamoun",
    "products.pirien.body":
      "Plateforme de préservation, valorisation et transmission de l'héritage culturel Bamoun au Cameroun. Inclut une boutique associative en ligne.",
    "products.pirien.cta": "Découvrir le projet",
    "products.discover": "Découvrir le projet",

    // Blog preview (4 keys)
    "blog.title": "Idées et Opinions",
    "blog.subtitle":
      "...et autres questions existentielles sur la technologie, la science et la vie de tous les jours",
    "blog.readMore": "Lire la suite",
    "blog.emptyState": "Aucun article pour le moment. Revenez bientôt !",
    "blog.viewAll": "Voir tous les articles",

    // Footer (10 keys)
    "footer.tagline": "Éditeur de logiciels de niche",
    "footer.col1.title": "Gambetech",
    "footer.col1.expertises": "Expertises",
    "footer.col1.experiences": "Expériences",
    "footer.col2.title": "Initiative",
    "footer.col2.products": "Produits",
    "footer.col3.title": "Ressources",
    "footer.col3.blog": "Idées & Opinions",
    "footer.legal": "Mentions légales",
    "footer.copyright": "Gambetech \u00A9 2026 All rights reserved.",

    // Expertises page (12 keys)
    "expertises.pageTitle": "Expertises",
    "expertises.pageDesc":
      "Architecture et planification - Intégration de systèmes - Conception et développement de logiciels",
    "expertises.header": "15+ années d'expérience",
    "expertises.subtitle":
      "Ouvert au marché. Freelance/CDI. Basé à Aix-en-Provence",
    "expertises.vision.title": "Vision Produit",
    "expertises.vision.level": "Expérimenté",
    "expertises.vision.body":
      "Définition et mise en œuvre de la stratégie produit côté backend avec un fort focus sur le modèle, l'ergonomie et la performance",
    "expertises.project.title": "Gestion de projet technique",
    "expertises.project.level": "Expérimenté",
    "expertises.project.body":
      "Pilotage et implémentation de projets techniques de la conception au déploiement",
    "expertises.fullstack.title": "Développement full-stack",
    "expertises.fullstack.level": "Expérimenté",
    "expertises.fullstack.body":
      "Sensibilité à une approche de développement cloud natif. Langages de programmation : Java 8+, JavaScript (ES6+), TypeScript, Python, SQL.",
    "expertises.agile.title": "Environnement agile et apprenant",
    "expertises.agile.level": "Expérimenté",
    "expertises.agile.body":
      "Capacité à évoluer dans un cadre collaboratif et orienté vers le client, avec une capacité d'apprentissage continue.",
    "expertises.tech.title": "Compétences Techniques Complémentaires",
    "expertises.tech.body":
      "Atlassian (Confluence, Jira, Trello), Spring Boot, Spring framework, Quarkus, Maven, Github, Gitlab, Bitbucket, Vercel, Google Cloud, AWS, Oracle Cloud.",
    "expertises.clients.title": "Clients et partenaires",

    // Products page (10 keys)
    "productsPage.pageTitle": "Nos Produits",
    "productsPage.pageDesc":
      "Créer de la valeur sur des problèmes de niche",
    "productsPage.header": "Nos Produits",
    "productsPage.subtitle":
      "Créer de la valeur sur des problèmes de niche",
    "productsPage.requirements": "Prérequis",
    "productsPage.architecture": "Architecture",
    "productsPage.siteWeb": "Site Web",

    // Experiences page (6 keys)
    "experiencesPage.pageTitle": "Références",
    "experiencesPage.pageDesc": "15+ années d'expériences",
    "experiencesPage.header": "Références professionnelles",
    "experiencesPage.subtitle":
      "15+ années d'expérience dans des secteurs stratégiques",
    "experiencesPage.cv.download": "Télécharger le CV",
    "experiencesPage.headerTitle": "Expériences",

    // Project card (5 keys)
    "projectCard.role": "Rôle :",
    "projectCard.tasks": "Tâches",
    "projectCard.technologies": "Technologies",
    "projectCard.results": "Résultats",
    "projectCard.duration": "Durée",

    // Blog page (3 keys)
    "blogPage.pageTitle": "Idées et Opinions",
    "blogPage.pageDesc":
      "...et autres questions existentielles sur la technologie, la science et la vie de tous les jours",
    "blogPage.readMore": "Lire la suite",

    // Blog post layout (2 keys)
    "blogPost.updatedOn": "Mis à jour le",

    // Legal page (5 keys)
    "legal.title": "Mentions légales",
    "legal.publisher": "Éditeur du site",
    "legal.hosting": "Hébergement",
    "legal.privacy": "Données personnelles",
    "legal.frenchNotice": "",

    // Accessibility (4 keys)
    "a11y.skipToContent": "Aller au contenu principal",
    "a11y.mobileMenu.open": "Ouvrir le menu",
    "a11y.mobileMenu.close": "Fermer le menu",
    "a11y.mobileMenu.nav": "Menu de navigation principal",
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

    // Accessibility (4 keys)
    "a11y.skipToContent": "Skip to main content",
    "a11y.mobileMenu.open": "Open menu",
    "a11y.mobileMenu.close": "Close menu",
    "a11y.mobileMenu.nav": "Main navigation menu",
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
