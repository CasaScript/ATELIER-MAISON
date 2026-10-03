import { ProductReview } from '../types';

export const DEFAULT_PRODUCT_REVIEWS: Record<string, ProductReview[]> = {
  'prod-1': [
    {
      id: 'rev-101',
      author: 'Syrine Ben Amor',
      rating: 5,
      date: 'Il y a 3 jours',
      location: 'La Marsa, Tunis',
      title: 'Une qualité de cuir exceptionnelle !',
      comment: 'Reçu en 24h par le livreur Aramex à La Marsa. Le cuir camel sent merveilleusement bon le vrai cuir tanné végétal et les finitions intérieures sont dignes des grandes maisons de luxe. Mon ordinateur 13 pouces rentre parfaitement.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-102',
      author: 'Karim Meziou',
      rating: 5,
      date: 'Il y a 1 semaine',
      location: 'Sousse',
      title: 'Très beau cadeau, finitions parfaites',
      comment: 'Acheté pour l’anniversaire de ma femme en teinte Cognac. Elle a adoré ! Emballage soigné avec pochon en coton et paiement en espèces au livreur sans aucun problème. Bravo pour l’artisanat tunisien.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-103',
      author: 'Amel Trabelsi',
      rating: 5,
      date: 'Il y a 2 semaines',
      location: 'Sfax',
      title: 'Robuste, spacieux et élégant',
      comment: 'Je l’utilise tous les jours pour le travail. Les anses sont confortables sur l’épaule même quand le sac est bien rempli. Le cuir prend déjà une très belle patine satinée.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-104',
      author: 'Mohamed Ali Z.',
      rating: 4,
      date: 'Il y a 3 semaines',
      location: 'Bizerte',
      title: 'Conforme à la description',
      comment: 'Très belle pièce. Livraison rapide en 48h. Le cuir est un peu rigide les premiers jours mais s’assouplit rapidement.',
      verifiedPurchase: true,
    }
  ],
  'prod-2': [
    {
      id: 'rev-201',
      author: 'Dr. Yasmine Kallel',
      rating: 5,
      date: 'Il y a 5 jours',
      location: 'Mutuelleville, Tunis',
      title: 'Un sérum miraculeux pour la peau',
      comment: 'L’huile de pépins de figue de barbarie est connue pour ses vertus, mais ce mélange avec l’argan est d’une finesse incroyable. Pénétration immédiate sans film gras, mon teint est beaucoup plus lumineux au réveil.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-202',
      author: 'Salma Ghrab',
      rating: 5,
      date: 'Il y a 10 jours',
      location: 'Nabeul',
      title: 'Produit 100% pur et authentique',
      comment: 'Flacon en verre ambré de très bonne qualité avec pipette précise. Deuxième commande pour moi, je ne peux plus m’en passer.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-203',
      author: 'Ines Bouaziz',
      rating: 5,
      date: 'Il y a 1 mois',
      location: 'Monastir',
      title: 'Adieu ridules d’expression',
      comment: 'Testé depuis un mois, mes ridules autour des yeux sont visiblement atténuées. Parfum naturel discret et rassurant.',
      verifiedPurchase: true,
    }
  ],
  'prod-3': [
    {
      id: 'rev-301',
      author: 'Mehdi Ben Salem',
      rating: 5,
      date: 'Il y a 4 jours',
      location: 'Carthage, Tunis',
      title: 'Une vraie œuvre d’art contemporaine',
      comment: 'Emballage ultra-protecteur avec film bulle renforcé, le vase est arrivé en parfait état. L’émail mat craie s’intègre magnifiquement dans mon salon minimaliste.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-302',
      author: 'Leila Chennoufi',
      rating: 5,
      date: 'Il y a 2 semaines',
      location: 'Ariana',
      title: 'Texture sculpturale magnifique',
      comment: 'On sent tout le travail au tour de l’artisan. Pièce lourde et très stable pour de grands bouquets de branches séchées.',
      verifiedPurchase: true,
    }
  ],
  'prod-4': [
    {
      id: 'rev-401',
      author: 'Walid Mansour',
      rating: 5,
      date: 'Il y a 6 jours',
      location: 'Ennasr, Tunis',
      title: 'Compact et passeport bien protégé',
      comment: 'Tient dans la poche avant d’un jean sans faire de bosse. Les finitions coutures au fil ciré sont impeccables.',
      verifiedPurchase: true,
    },
    {
      id: 'rev-402',
      author: 'Hichem B.',
      rating: 5,
      date: 'Il y a 2 semaines',
      location: 'Djerba',
      title: 'Livraison express jusqu’à Djerba',
      comment: 'Reçu en 48h chrono à Houmt Souk par Yalidine. Très satisfait du service et du produit.',
      verifiedPurchase: true,
    }
  ],
  'prod-5': [
    {
      id: 'rev-501',
      author: 'Nour El Houda',
      rating: 5,
      date: 'Il y a 1 semaine',
      location: 'Nabeul',
      title: 'L’authentique fleur d’oranger de Nabeul !',
      comment: 'Rien à voir avec les eaux parfumées chimiques du supermarché. C’est un vrai pur hydrolat distillé, apaisant et rafraîchissant.',
      verifiedPurchase: true,
    }
  ],
  'prod-6': [
    {
      id: 'rev-601',
      author: 'Sofiene D.',
      rating: 5,
      date: 'Il y a 10 jours',
      location: 'Sousse',
      title: 'Plaisir quotidien pour le café',
      comment: 'Très belle prise en main, la céramique brute garde bien la chaleur de l’expresso.',
      verifiedPurchase: true,
    }
  ]
};
