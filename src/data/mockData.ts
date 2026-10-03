import { Product, Carrier, Governorate, ShopifyTheme, ShopifyApp, TrainingLesson, ProjectMilestone } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Le Sac Cabas Artisanal en Cuir Tanné',
    handle: 'sac-cabas-cuir-artisanal',
    category: 'Maroquinerie',
    price: 185.0,
    compareAtPrice: 220.0,
    featuredImage: '/src/assets/images/product_leather_bag_1790977970771.jpg',
    gallery: [
      '/src/assets/images/product_leather_bag_1790977970771.jpg',
      '/src/assets/images/hero_artisan_leather_1790977959949.jpg'
    ],
    shortDescription: 'Cuir véritable de première qualité tanné végétal, conçu et confectionné à la main par nos artisans maîtres maroquiniers.',
    description: 'Une pièce intemporelle conçue pour durer toute une vie. Taillé dans un cuir de vachette pleine fleur à tannage végétal respectueux de l’environnement. Les finitions des tranches sont lissées à la cire d’abeille naturelle et la bouclerie est en laiton brossé inoxydable. Compartiment intérieur doublé en sergé de coton renforcé avec poche zippée pour ordinateur portable 13 pouces ou tablette.',
    features: [
      'Cuir véritable pleine fleur tannage végétal',
      'Coutures renforcées au fil de lin ciré',
      'Poche intérieure zippée en laiton',
      'Fabriqué artisanalement en Tunisie',
      'Garantie fabricant 2 ans'
    ],
    dimensions: '38 cm × 32 cm × 14 cm (Anse : 26 cm)',
    materials: 'Cuir de vachette pleine fleur, bouclerie en laiton massif',
    inStock: true,
    stockCount: 14,
    variants: {
      optionName: 'Teinte du cuir',
      items: [
        { id: 'v1-camel', name: 'Camel Naturel', sku: 'CABAS-CAM-01', priceDelta: 0, stock: 6 },
        { id: 'v1-cognac', name: 'Cognac Ambré', sku: 'CABAS-COG-02', priceDelta: 0, stock: 5 },
        { id: 'v1-noir', name: 'Noir Ébène', sku: 'CABAS-NOIR-03', priceDelta: 10, stock: 3 }
      ]
    },
    seo: {
      title: 'Sac Cabas Cuir Artisanal Tanné Végétal | Atelier Pro',
      description: 'Découvrez notre sac cabas en cuir pleine fleur fabriqué à la main. Élégance intemporelle, livraison express en Tunisie et paiement à la livraison.',
      keywords: ['sac cuir tunisie', 'maroquinerie artisanale', 'sac cabas cuir véritable', 'cadeau artisanal']
    }
  },
  {
    id: 'prod-2',
    title: 'Sérum Précieux Figue de Barbarie & Argan',
    handle: 'serum-figue-de-barbarie-argan',
    category: 'Soins & Cosmétiques',
    price: 89.0,
    compareAtPrice: 105.0,
    featuredImage: '/src/assets/images/product_argan_skincare_1790977980735.jpg',
    gallery: [
      '/src/assets/images/product_argan_skincare_1790977980735.jpg'
    ],
    shortDescription: 'Élixir botanique régénérant ultra-concentré en stérols et vitamine E naturelle. Pressé à froid dans les oasis tunisiennes.',
    description: 'Véritable trésor anti-âge et régénérant cellulaire, ce sérum allie la rareté de l’huile pure de pépins de figue de barbarie tunisienne à la douceur nourrissante de l’huile d’argan biologique. Texture sèche satinée à absorption instantanée, ne laisse aucun film gras. Redonne fermeté, éclat naturel et atténue les ridules d’expression dès la première semaine d’utilisation.',
    features: [
      '100% pur, vierge et certifié d’origine naturelle',
      'Extraction artisanale par première pression à froid',
      'Riche en oméga-6, polyphénols et vitamine E',
      'Sans parfum synthétique ni conservateur pétrochimique',
      'Flacon en verre ambré anti-UV avec pipette compte-gouttes'
    ],
    dimensions: 'Flacon verre 30ml / 50ml',
    materials: 'Opuntia Ficus-Indica Seed Oil, Argania Spinosa Kernel Oil, Tocopherol',
    inStock: true,
    stockCount: 28,
    variants: {
      optionName: 'Format flacon',
      items: [
        { id: 'v2-30ml', name: 'Flacon 30 ml (Cure 2 mois)', sku: 'SER-OPU-30', priceDelta: 0, stock: 18 },
        { id: 'v2-50ml', name: 'Flacon 50 ml Grand Format (Cure 4 mois)', sku: 'SER-OPU-50', priceDelta: 35, stock: 10 }
      ]
    },
    seo: {
      title: 'Sérum Huile Figue de Barbarie Pure | Soins Naturels Tunisie',
      description: 'L’authentique élixir de jeunesse tunisien. Sérum 100% naturel pressé à froid. Anti-âge puissant, livraison partout en Tunisie.',
      keywords: ['huile figue de barbarie tunisie', 'sérum naturel visage', 'soins bio tunisie', 'anti-âge naturel']
    }
  },
  {
    id: 'prod-3',
    title: 'Vase Amphore Contemporain en Grès Émaillé',
    handle: 'vase-amphore-gres-emaille',
    category: 'Maison & Décoration',
    price: 68.0,
    compareAtPrice: 85.0,
    featuredImage: '/src/assets/images/product_ceramic_decor_1790977990449.jpg',
    gallery: [
      '/src/assets/images/product_ceramic_decor_1790977990449.jpg'
    ],
    shortDescription: 'Pièce décorative sculptée au tour à la main dans les ateliers de poterie méditerranéens. Lignes architecturales douces.',
    description: 'Inspiré des formes ancestrales des amphores méditerranéennes réinterprétées dans une esthétique sculpturale contemporaine. Façonné au tour traditionnel puis cuit à haute température (1280°C) pour une résistance exemplaire et une étanchéité parfaite. Idéal pour accueillir des fleurs séchées ou composer un centre de table épuré.',
    features: [
      'Grès chamotté façonné artisanalement',
      'Émail satiné non toxique sans plomb',
      'Étanche pour fleurs fraîches et séchées',
      'Chaque exemplaire présente de subtiles variations uniques'
    ],
    dimensions: 'Hauteur 24 cm × Diamètre 16 cm (Poids : 1.2 kg)',
    materials: 'Grès naturel, émail minéral mat',
    inStock: true,
    stockCount: 9,
    variants: {
      optionName: 'Finition émail',
      items: [
        { id: 'v3-craie', name: 'Craie Minérale (Mat doux)', sku: 'VASE-CRAIE-01', priceDelta: 0, stock: 5 },
        { id: 'v3-terracotta', name: 'Terracotta Brut (Bicolore)', sku: 'VASE-TERRA-02', priceDelta: 8, stock: 4 }
      ]
    },
    seo: {
      title: 'Vase Design en Céramique Artisanale | Déco Intérieur',
      description: 'Vase contemporain en grès fait main. Sublimez votre intérieur avec l’artisanat d’art méditerranéen. Expédition sécurisée garantie.',
      keywords: ['vase céramique artisanal', 'poterie tunisienne moderne', 'décoration d intérieur épurée']
    }
  },
  {
    id: 'prod-4',
    title: 'Portefeuille Compact & Étui Passeport en Cuir',
    handle: 'portefeuille-etui-cuir',
    category: 'Maroquinerie',
    price: 55.0,
    compareAtPrice: 65.0,
    featuredImage: '/src/assets/images/hero_artisan_leather_1790977959949.jpg',
    gallery: [
      '/src/assets/images/hero_artisan_leather_1790977959949.jpg',
      '/src/assets/images/product_leather_bag_1790977970771.jpg'
    ],
    shortDescription: 'Format ergonomique de poche. 6 emplacements cartes, compartiment billets et passeport biométrique.',
    description: 'L’accessoire indispensable du quotidien et des voyages. Pensé pour minimiser l’encombrement tout en offrant une capacité maximale. Assemblé et cousu à la main dans notre atelier.',
    features: [
      '6 fentes pour cartes bancaires et carte d’identité',
      'Compartiment billets et reçu',
      'Cuir souple qui se patine magnifiquement avec le temps'
    ],
    dimensions: '11 cm × 8.5 cm × 1 cm',
    materials: 'Cuir pleine fleur tanné végétal',
    inStock: true,
    stockCount: 22,
    seo: {
      title: 'Portefeuille Cuir Homme & Femme | Fait Main',
      description: 'Portefeuille compact cuir artisanal véritable. Élégant, durable, expédition rapide en Tunisie avec paiement à la livraison.',
      keywords: ['portefeuille cuir tunisie', 'étui passeport cuir', 'petite maroquinerie']
    }
  },
  {
    id: 'prod-5',
    title: 'Brume Botanique Apaisante Fleur d’Oranger & Néroli',
    handle: 'brume-neroli-fleur-oranger',
    category: 'Soins & Cosmétiques',
    price: 38.0,
    compareAtPrice: 45.0,
    featuredImage: '/src/assets/images/product_argan_skincare_1790977980735.jpg',
    gallery: [
      '/src/assets/images/product_argan_skincare_1790977980735.jpg'
    ],
    shortDescription: 'Hydrolat de néroli pur issu de la distillation traditionnelle des fleurs de bigaradier de Nabeul.',
    description: 'Une eau florale vivifiante qui apaise instantanément les peaux sensibles, resserre les pores et illumine le teint. Parfum délicat et relaxant 100% naturel.',
    features: [
      'Distillation artisanale à la vapeur d’eau',
      'Origine garantie Cap Bon (Nabeul)',
      'Rafraîchit et prépare la peau avant le sérum'
    ],
    dimensions: 'Spray verre 100ml',
    materials: 'Citrus Aurantium Amara Flower Water 100%',
    inStock: true,
    stockCount: 35,
    seo: {
      title: 'Hydrolat Pur Fleur d’Oranger Nabeul | Tonique Visage',
      description: 'Eau de fleur d’oranger et néroli authentique de Nabeul. Soin tonifiant naturel pour peau éclatante.',
      keywords: ['eau de fleur oranger tunisie', 'néroli pur nabeul', 'tonique bio visage']
    }
  },
  {
    id: 'prod-6',
    title: 'Duo de Tasses Expresso en Céramique Brut & Lin',
    handle: 'duo-tasses-expresso-ceramique',
    category: 'Maison & Décoration',
    price: 42.0,
    featuredImage: '/src/assets/images/product_ceramic_decor_1790977990449.jpg',
    gallery: [
      '/src/assets/images/product_ceramic_decor_1790977990449.jpg'
    ],
    shortDescription: 'Lot de deux tasses expresso façonnées à la main. Prise en main tactile et veloutée.',
    description: 'Conçues pour transformer votre pause café en un moment de dégustation sensoriel. Compatible lave-vaisselle et micro-ondes.',
    features: [
      'Ensemble de 2 tasses artisanales',
      'Contenance 90ml idéale pour café ristretto ou lungo',
      'Base sablée antidérapante'
    ],
    dimensions: 'Hauteur 6 cm × Diamètre 6.5 cm',
    materials: 'Grès naturel et émail blanc crème',
    inStock: true,
    stockCount: 18,
    seo: {
      title: 'Duo Tasses Café Expresso Céramique Artisanale',
      description: 'Tasses à café en grès émaillé faites à la main. Design minimaliste, livraison soignée en Tunisie.',
      keywords: ['tasses café artisanales', 'art de la table céramique', 'artisanat tunisien design']
    }
  }
];

export const TUNISIAN_CARRIERS: Carrier[] = [
  {
    id: 'aramex',
    name: 'Aramex Tunisie',
    logo: '📦',
    estimatedDelivery: '24h à 48h ouvrables',
    price: 8.0,
    freeThreshold: 150.0,
    coverage: 'Tout le territoire tunisien (24 Gouvernorats)',
    trackingAvailable: true,
    description: 'Leader de la livraison express en Tunisie avec suivi par SMS et notification d’arrivée pour le client.'
  },
  {
    id: 'yalidine',
    name: 'Yalidine Express Tunisie',
    logo: '⚡',
    estimatedDelivery: '24h à 48h ouvrables',
    price: 7.5,
    freeThreshold: 150.0,
    coverage: 'Livraison à domicile ou retrait en agence/hub relais',
    trackingAvailable: true,
    description: 'Réseau très dense d’agences relais et livreurs dédiés au e-commerce avec reversement rapide du COD.'
  },
  {
    id: 'first-delivery',
    name: 'First Delivery Tunisie (Grand Tunis & Villes Côtières)',
    logo: '🚀',
    estimatedDelivery: '24h chrono (Le jour même si commandé avant 11h)',
    price: 6.0,
    freeThreshold: 150.0,
    coverage: 'Grand Tunis (Tunis, Ariana, Ben Arous, Manouba), Sousse, Sfax, Nabeul',
    trackingAvailable: true,
    description: 'Idéal pour le dépannage express et la fidélisation des clients urbains avec confirmation téléphonique préalable.'
  },
  {
    id: 'rapid-poste',
    name: 'Rapid-Poste (La Poste Tunisienne)',
    logo: '📮',
    estimatedDelivery: '48h à 72h ouvrables',
    price: 7.0,
    freeThreshold: 150.0,
    coverage: 'Toutes les localités, villages et zones rurales de Tunisie',
    trackingAvailable: true,
    description: 'Réseau postal universel couvrant chaque commune de Tunisie sans aucune zone blanche.'
  }
];

export const TUNISIAN_GOVERNORATES: Governorate[] = [
  { id: 'tunis', name: 'Tunis', code: 'TN-11', region: 'Grand Tunis' },
  { id: 'ariana', name: 'Ariana', code: 'TN-12', region: 'Grand Tunis' },
  { id: 'ben-arous', name: 'Ben Arous', code: 'TN-13', region: 'Grand Tunis' },
  { id: 'manouba', name: 'Manouba', code: 'TN-14', region: 'Grand Tunis' },
  { id: 'nabeul', name: 'Nabeul (Cap Bon)', code: 'TN-21', region: 'Nord' },
  { id: 'zaghouan', name: 'Zaghouan', code: 'TN-22', region: 'Nord' },
  { id: 'bizerte', name: 'Bizerte', code: 'TN-23', region: 'Nord' },
  { id: 'beja', name: 'Béja', code: 'TN-31', region: 'Nord' },
  { id: 'jendouba', name: 'Jendouba', code: 'TN-32', region: 'Nord' },
  { id: 'le-kef', name: 'Le Kef', code: 'TN-33', region: 'Nord' },
  { id: 'siliana', name: 'Siliana', code: 'TN-34', region: 'Nord' },
  { id: 'sousse', name: 'Sousse', code: 'TN-51', region: 'Sahel' },
  { id: 'monastir', name: 'Monastir', code: 'TN-52', region: 'Sahel' },
  { id: 'mahdia', name: 'Mahdia', code: 'TN-53', region: 'Sahel' },
  { id: 'sfax', name: 'Sfax', code: 'TN-61', region: 'Sahel' },
  { id: 'kairouan', name: 'Kairouan', code: 'TN-41', region: 'Centre' },
  { id: 'kasserine', name: 'Kasserine', code: 'TN-42', region: 'Centre' },
  { id: 'sidi-bouzid', name: 'Sidi Bouzid', code: 'TN-43', region: 'Centre' },
  { id: 'gabes', name: 'Gabès', code: 'TN-81', region: 'Sud' },
  { id: 'medenine', name: 'Médenine (Djerba / Zarzis)', code: 'TN-82', region: 'Sud' },
  { id: 'tataouine', name: 'Tataouine', code: 'TN-83', region: 'Sud' },
  { id: 'gafsa', name: 'Gafsa', code: 'TN-71', region: 'Sud' },
  { id: 'tozeur', name: 'Tozeur', code: 'TN-72', region: 'Sud' },
  { id: 'kebili', name: 'Kébili', code: 'TN-73', region: 'Sud' }
];

export const SHOPIFY_THEMES: ShopifyTheme[] = [
  {
    id: 'dawn',
    name: 'Dawn (Theme Officiel 2.0)',
    badge: 'Recommandé TPE / Gratuit',
    price: 'Gratuit (Open-source Shopify)',
    speedScore: 98,
    bestFor: 'Nouveaux marchands, boutiques rapides et catalogues de 1 à 100 produits',
    keyFeatures: [
      'Architecture Online Store 2.0 avec sections glisser-déposer sur toutes les pages',
      'Temps de chargement inférieur à 1 seconde sur mobile',
      'Optimisé pour le SEO technique et les Core Web Vitals de Google',
      'Support natif multilingue et multi-devises'
    ],
    previewAccent: '#1c1917',
    demoUrl: 'https://themes.shopify.com/themes/dawn',
    description: 'Le thème de référence le plus performant et facile à personnaliser sans connaissances en code.'
  },
  {
    id: 'craft',
    name: 'Craft',
    badge: 'Artisanat & Décoration',
    price: 'Gratuit (Shopify)',
    speedScore: 95,
    bestFor: 'Marques artisanales, céramistes, maroquiniers, produits faits main',
    keyFeatures: [
      'Typographie élégante à fort caractère pour valoriser le savoir-faire',
      'Sections éditoriales pour raconter l’histoire de l’atelier et des matières',
      'Galeries d’images plein écran et détails de texture',
      'Pied de page enrichi pour la réassurance client'
    ],
    previewAccent: '#78350f',
    demoUrl: 'https://themes.shopify.com/themes/craft',
    description: 'Conçu sur mesure pour les créateurs qui souhaitent mettre en valeur la noblesse des matières.'
  },
  {
    id: 'sense',
    name: 'Sense',
    badge: 'Cosmétiques & Bien-être',
    price: 'Gratuit (Shopify)',
    speedScore: 96,
    bestFor: 'Soins du visage, huiles végétales, cosmétiques naturels et parfums',
    keyFeatures: [
      'Composants de réassurance ingrédients et badges certifiés',
      'Mise en avant des bienfaits et résultats clients',
      'Bouton d’ajout au panier rapide dès le catalogue',
      'Menu déroulant moderne avec visuels de catégories'
    ],
    previewAccent: '#065f46',
    demoUrl: 'https://themes.shopify.com/themes/sense',
    description: 'Épuré et frais, idéal pour instaurer une confiance médicale et naturelle immédiate.'
  },
  {
    id: 'custom-lite',
    name: 'Custom Liquid Pro (Sur-mesure léger)',
    badge: 'Haut de gamme TPE',
    price: 'Inclus dans notre prestation',
    speedScore: 99,
    bestFor: 'TPE voulant une identité unique sans abonnement de thème payant à 350$',
    keyFeatures: [
      'Thème Dawn personnalisé avec blocs CSS/Liquid optimisés pour la Tunisie',
      'Formulaire de paiement à la livraison simplifié (sans code postal obligatoire)',
      'Bouton WhatsApp flottant avec message pré-rempli du produit en cours',
      'Bandeau d’information réassurance adapté aux gouvernorats tunisiens'
    ],
    previewAccent: '#0f172a',
    demoUrl: '#',
    description: 'La solution optimale développée par notre agence pour allier budget TPE et personnalisation poussée.'
  }
];

export const SHOPIFY_ESSENTIAL_APPS: ShopifyApp[] = [
  {
    id: 'judgeme',
    name: 'Judge.me Product Reviews',
    category: 'Avis Clients',
    pricing: 'Plan Gratuit disponible à vie',
    rating: 5.0,
    reviewsCount: 22400,
    description: 'Collecte automatique d’avis clients avec photos, étoiles d’évaluation sur les fiches produits et synchronisation Google Rich Snippets.',
    whyEssentialForTPE: 'Essentiel pour rassurer les acheteurs tunisiens qui commandent pour la première fois. Multiplie le taux de conversion par 2.',
    setupMinutes: 15,
    setupGuide: [
      'Installer l’application depuis l’App Store Shopify',
      'Choisir le widget d’étoiles sous le titre produit et le widget d’avis en bas de page',
      'Activer la demande automatique d’avis par e-mail 3 jours après la date de livraison estimée',
      'Importer les premiers avis de clients historiques ou réseaux sociaux'
    ]
  },
  {
    id: 'whatsapp-chat',
    name: 'WhatsApp Chat & Abandoned Cart Recovery',
    category: 'Chat & WhatsApp',
    pricing: 'Gratuit ou Freemium',
    rating: 4.9,
    reviewsCount: 8900,
    description: 'Bouton de chat WhatsApp en bas d’écran permettant aux clients de poser une question en 1 clic avant d’acheter.',
    whyEssentialForTPE: 'En Tunisie, plus de 70% des clients finissent leur décision d’achat après un échange rapide sur WhatsApp.',
    setupMinutes: 10,
    setupGuide: [
      'Connecter votre numéro de téléphone professionnel tunisien (+216 XX XXX XXX)',
      'Définir le message d’accueil pré-rempli : "Bonjour, j’ai une question sur [Nom du Produit]"',
      'Positionner le bouton discret en bas à droite de l’écran sur mobile et desktop'
    ]
  },
  {
    id: 'booster-seo',
    name: 'Booster SEO & Image Optimizer',
    category: 'SEO & Vitesse',
    pricing: 'Plan gratuit disponible',
    rating: 4.8,
    reviewsCount: 14500,
    description: 'Optimisation automatique des balises ALT des images, compression des photos de produits et audit des balises meta.',
    whyEssentialForTPE: 'Permet à la boutique d’apparaître en première page de Google sur les requêtes locales en Tunisie sans payer de pub.',
    setupMinutes: 20,
    setupGuide: [
      'Lancer le scan initial du catalogue',
      'Activer l’automatisation des balises ALT : [Titre du produit] - [Nom de votre boutique]',
      'Activer le sitemap XML automatique pour Google Search Console'
    ]
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo: Email & SMS Marketing',
    category: 'Marketing & Vente',
    pricing: 'Gratuit jusqu’à 250 contacts',
    rating: 4.7,
    reviewsCount: 18200,
    description: 'Scénarios automatisés de bienvenue, relance de paniers abandonnés et newsletter promotionnelle.',
    whyEssentialForTPE: 'Récupère en moyenne 10% à 15% des clients qui ont quitté leur panier sans finaliser la commande.',
    setupMinutes: 30,
    setupGuide: [
      'Activer le scénario "Panier abandonné" avec un premier e-mail envoyé 2h après l’abandon',
      'Créer un pop-up d’inscription discret offrant 10% de réduction (code BIENVENUE10)',
      'Créer le modèle d’e-mail de confirmation d’expédition de commande avec le transporteur'
    ]
  }
];

export const TRAINING_LESSONS: TrainingLesson[] = [
  {
    id: 'lesson-1',
    title: '1. Ajouter et modifier un produit comme un pro',
    duration: '15 min de prise en main',
    summary: 'Apprenez à créer une fiche produit attractive avec de belles photos, un titre percutant, des variantes (taille, couleur) et la gestion des stocks.',
    adminPath: 'Admin Shopify > Produits > Ajouter un produit',
    steps: [
      {
        title: 'Titre et Description',
        instruction: 'Donnez un titre clair (ex: Sac Cabas Cuir Camel) et une description en 3 parties : l’émotion/usage, les caractéristiques techniques (matières, dimensions) et les conseils d’entretien.',
        tip: 'Utilisez des listes à puces pour les dimensions et caractéristiques pour faciliter la lecture sur smartphone.'
      },
      {
        title: 'Photos et Médias',
        instruction: 'Glissez-déposez au minimum 3 à 5 photos : une vue générale sur fond neutre, un gros plan sur les finitions, et une photo en situation portée ou en intérieur.',
        tip: 'Formats recommandés : JPEG ou WebP carré (2048 × 2048 px) pour un zoom fluide sans ralentir le site.'
      },
      {
        title: 'Prix et Variantes',
        instruction: 'Indiquez le Prix de vente en Dinars Tunisiens (DT). Si vous faites une promotion, saisissez le prix d’origine dans "Prix d’origine comparé". Cochez ensuite "Ce produit a des options" pour ajouter les couleurs ou contenances.',
        tip: 'Shopify décompte automatiquement les stocks lorsque les clients passent commande.'
      }
    ]
  },
  {
    id: 'lesson-2',
    title: '2. Traiter et expédier une commande reçue',
    duration: '12 min de prise en main',
    summary: 'Le flux complet depuis la réception d’une commande (Paiement à la livraison ou en ligne) jusqu’à la remise du colis au transporteur.',
    adminPath: 'Admin Shopify > Commandes',
    steps: [
      {
        title: 'Vérification de la commande',
        instruction: 'Cliquez sur la commande dans la liste. Pour les commandes en Paiement à la Livraison (COD), vérifiez le numéro de téléphone et la ville de livraison.',
        tip: 'Appel de confirmation : En Tunisie, un court appel ou message WhatsApp de courtoisie ("Bonjour, nous préparons votre commande pour livraison demain") réduit les retours et colis refusés de plus de 40% !'
      },
      {
        title: 'Création du bordereau transporteur',
        instruction: 'Connectez-vous au portail de votre transporteur (ex: portail Aramex ou Yalidine), générez le bon de livraison avec l’adresse et collez l’étiquette sur le carton d’emballage.',
        tip: 'Pensez à insérer une petite carte de remerciement personnalisée avec votre code promo de fidélité pour le prochain achat.'
      },
      {
        title: 'Marquer comme traitée dans Shopify',
        instruction: 'Dans la commande Shopify, cliquez sur "Traiter les articles", renseignez le nom du transporteur et le numéro de suivi du colis. Le client reçoit instantanément son e-mail de confirmation avec le lien de suivi.',
        tip: 'Une fois le colis livré et les espèces encaissées par le livreur, cliquez sur "Encaisser le paiement" pour solder la commande.'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: '3. Créer un code promo & campagne de réduction',
    duration: '8 min de prise en main',
    summary: 'Boostez vos ventes pour les fêtes (Aïd, Saint-Valentin, Soldes d’été, Black Friday) avec des codes de réduction ciblés.',
    adminPath: 'Admin Shopify > Réductions > Créer une réduction',
    steps: [
      {
        title: 'Choisir le type de réduction',
        instruction: 'Sélectionnez : Montant forfaitaire (ex: -20 DT), Pourcentage (ex: -15%), Livraison gratuite, ou Achetez X obtenez Y.',
        tip: 'Pour le lancement, le code BIENVENUE10 (-10% sur la 1ère commande) incite fortement à l’inscription à la newsletter.'
      },
      {
        title: 'Conditions d’éligibilité',
        instruction: 'Définissez le montant minimum d’achat (ex: à partir de 80 DT d’achats) et la limite d’utilisation (1 seule fois par client).',
        tip: 'Vous pouvez aussi programmer une date de début et de fin automatique pour créer un sentiment d’urgence.'
      }
    ]
  },
  {
    id: 'lesson-4',
    title: '4. Suivre ses ventes & indicateurs clés',
    duration: '10 min de prise en main',
    summary: 'Comprendre son tableau de bord : Chiffre d’affaires, panier moyen, taux de conversion et produits best-sellers.',
    adminPath: 'Admin Shopify > Statistiques',
    steps: [
      {
        title: 'Le Tableau de bord quotidien',
        instruction: 'Consultez le total des ventes, le nombre de sessions visiteurs et le panier moyen en Dinars Tunisiens.',
        tip: 'Un panier moyen élevé permet d’amortir plus facilement les frais fixes de transport.'
      },
      {
        title: 'Taux de conversion de la boutique',
        instruction: 'Observez le pourcentage d’acheteurs par rapport aux visiteurs. La moyenne e-commerce se situe entre 1.5% et 3%.',
        tip: 'Si beaucoup de visiteurs ajoutent au panier mais n’achètent pas, vérifiez si les frais de port sont trop élevés ou si le formulaire de commande est trop complexe.'
      }
    ]
  }
];

export const PROJECT_MILESTONES: ProjectMilestone[] = [
  {
    id: 1,
    phase: 'Phase 1 : Conseil & Cadrage',
    title: 'Analyse des besoins, structure du site & choix du thème',
    description: 'Définition de l’offre, arborescence des collections, parcours client sans friction et sélection du thème Shopify optimal.',
    deliverables: [
      'Document de cadrage stratégique TPE',
      'Arborescence & wireframe de navigation (Header, Catégories, Footer)',
      'Benchmark et choix du thème Shopify (Dawn / Craft / Sense / Custom)'
    ],
    completed: true,
    category: 'cadrage'
  },
  {
    id: 2,
    phase: 'Phase 2 : Création & Design',
    title: 'Installation, configuration & identité visuelle',
    description: 'Mise en place de la boutique Shopify, intégration du logo, typographies, palettes, bannières et rédaction des pages piliers.',
    deliverables: [
      'Configuration complète des paramètres généraux de la boutique',
      'Design sur-mesure responsive (Accueil, Boutique, À propos, Contact, FAQ)',
      'Pages légales conformes (CGV, Mentions Légales, Politique de Remboursement & Données)',
      'Mise en place du catalogue initial (fiches produits, variantes, photos HD)'
    ],
    completed: true,
    category: 'creation'
  },
  {
    id: 3,
    phase: 'Phase 3 : Fonctionnalités E-commerce',
    title: 'Paiements, transporteurs tunisiens & tunnel d’achat',
    description: 'Configuration du paiement à la livraison (COD) et passerelles en ligne (Konnect / Carte), paramétrage des transporteurs locaux et codes promo.',
    deliverables: [
      'Paiement à la livraison configuré avec champs adaptés (Téléphone, Ville)',
      'Passerelle de paiement par carte bancaire opérationnelle',
      'Grilles tarifaires des transporteurs (Aramex, Yalidine, First Delivery, Poste)',
      'Seuil de livraison gratuite automatique dès 150 DT',
      'Moteur de codes promo & réductions testé'
    ],
    completed: true,
    category: 'ecommerce'
  },
  {
    id: 4,
    phase: 'Phase 4 : SEO & Applications',
    title: 'Optimisation pour Google & Apps indispensables',
    description: 'Balisage SEO des titres, meta-descriptions, URLs propres et installation des applications d’avis clients, chat WhatsApp et vitesse.',
    deliverables: [
      'Balises SEO Titles & Meta descriptions personnalisées',
      'Intégration du widget d’avis clients vérifiés Judge.me',
      'Bouton de chat WhatsApp connecté au numéro marchand',
      'Optimisation de la vitesse de chargement et des Core Web Vitals'
    ],
    completed: true,
    category: 'seo'
  },
  {
    id: 5,
    phase: 'Phase 5 : Formation & Livraison',
    title: 'Formation complète à l’admin & remise des accès',
    description: 'Accompagnement du client pas-à-pas pour la gestion quotidienne des commandes, des stocks et transmission du dossier de livraison officiel.',
    deliverables: [
      'Session de formation pas-à-pas à l’administration Shopify',
      'Guides pratiques illustrés (Ajout produit, Traitement commande, Promos)',
      'Fiche récapitulative des accès de propriété et comptes collaborateurs',
      'Checklist de contrôle qualité avant ouverture officielle au public'
    ],
    completed: true,
    category: 'formation'
  }
];

export const EXCHANGE_RATES: Record<string, number> = {
  TND: 1,
  EUR: 0.29, // 1 TND ≈ 0.29 EUR
  USD: 0.32  // 1 TND ≈ 0.32 USD
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  TND: 'DT',
  EUR: '€',
  USD: '$'
};
