/**
 * VanRozgar Marketplace & Ecological Data Contracts
 * Technology-neutral TypeScript interfaces for web application development.
 */

export type Language = 'en' | 'hi' | 'mr';

export type WebCategory = 'medicinal' | 'forest_produce' | 'handicrafts' | 'water_land' | 'others';

export type ListingMode = 'sell' | 'barter' | 'both';

export type ListingStatus = 'active' | 'paused' | 'sold_out' | 'rejected';

export type VerificationStatus = 'pending' | 'verified' | 'verified_seed' | 'rejected';

export interface MultilingualText {
  en: string;
  mr?: string;
  hi?: string;
  combined?: string;
}

export interface GroupContributor {
  id: string;
  name: string;
  village: string;
  quantity: number;
  sharePct: number;
}

export interface ProductSeller {
  type: 'gramsabha' | 'villager' | 'cfrholder' | 'consortium';
  gramSabhaId?: string;
  sellerPhone?: string;
  name: string;
  village: string;
  taluka?: string;
  district: string;
  distanceKm?: number | null;
}

export interface ProductProvenance {
  sourceArea: string;
  collectionMethod: string;
  isSustainable: boolean;
  harvestSeason?: string;
}

export interface ProductAssets {
  illustration: string;
  iconType: 'herbs' | 'honey' | 'bamboo' | 'water' | 'lac' | 'gum' | 'fish' | 'seeds';
  realPhotoAvailable: boolean;
  realPhotoPath?: string | null;
}

export interface ProductListing {
  id: string;
  originalId?: string;
  itemCode: string;
  title: MultilingualText;
  categorySlug: string;
  webCategory: WebCategory;
  productCode: string;
  description: string;
  price: number;
  pricePerUnitPaise: number;
  mrp?: number;
  mrpPerUnitPaise?: number;
  fairPriceRange: [number, number];
  quantityAvailable: number;
  minOrderQuantity: number;
  unit: string;
  mode: ListingMode;
  barterWants?: string | null;
  seller: ProductSeller;
  provenance: ProductProvenance;
  verification: {
    isVerified: boolean;
    status: VerificationStatus;
  };
  isGroupListing: boolean;
  groupContributors?: GroupContributor[] | null;
  metrics: {
    rating: number;
    reviewCount: number;
  };
  assets: ProductAssets;
  status: ListingStatus;
  isSample: boolean;
  source: 'website_showcase' | 'nashik_cfr_seed' | 'live';
}

export interface Category {
  slug: string;
  iconKey?: string;
  order: number;
  active: boolean;
  name: {
    en: string;
    mr: string;
    hi?: string;
  };
  description: {
    en: string;
    mr: string;
    hi?: string;
  };
  webCategory: WebCategory;
  defaultIcon: string;
}

export interface TreeSpeciesCount {
  name: string;
  count: number;
}

export interface EcologicalRestoration {
  cfrAreaHa: number;
  saplingsPlanted: number;
  forestPonds: number;
  waterStorageCapacityLitres: number;
  looseBoulderStructures: number;
  labourDaysGenerated: number;
  cfrmcMeetings: number;
  wildlifeSessions: number;
  speciesList: TreeSpeciesCount[];
}

export interface GramSabha {
  id: string;
  villageId: string;
  name: {
    en: string;
    mr: string;
  };
  village: {
    en: string;
    mr: string;
  };
  taluka: string;
  district: string;
  verificationStatus: VerificationStatus;
  verificationNote?: string;
  cfr: {
    rights: string[];
    approvedAreaHa: number;
    claimCount: number;
  };
  ecologicalRestoration: EcologicalRestoration;
  secretaryPhone?: string;
}

export interface VillageReport {
  id: string;
  taluka: string;
  nameEn: string;
  nameMr: string;
  cfrAreaHa: number;
  saplings: number;
  forestPonds: number;
  waterCapacityLitres: number;
  looseBoulderStructures: number;
  labourDays: number;
  cfrmcMeetings: number;
  wildlifeSessions: number;
  species: TreeSpeciesCount[];
}

export interface LivelihoodIdea {
  code: string;
  name_en: string;
  name_mr: string;
  family: string;
  needs: string[][];
  cost_level: 'low' | 'medium' | 'high';
  best_season: string;
  wildlife_risk: string;
  min_land_ha?: number | null;
  tags: string[];
  ease: number;
  green: number;
  p_hints?: {
    past_work?: string[];
    animals?: string[];
  };
}

export interface Scheme {
  code: string;
  kind: 'government' | 'ngo';
  name_en: string;
  name_mr: string;
  runs_en: string;
  runs_mr: string;
  what_en: string;
  what_mr: string;
  who_en: string;
  who_mr?: string;
  documents_en: string[];
  documents_mr?: string[];
  help_types: string[];
  audiences: string[];
  idea_codes: string[];
  official_url: string;
  note_en?: string;
  status: string;
}

export interface RestrictedItem {
  name: {
    mr: string;
    en: string;
  };
  terms: string[];
  reason: {
    mr: string;
    en: string;
  };
  schedule: string;
  verified: boolean;
}

export interface TradeRequest {
  id: string;
  listingId: string;
  resourceTitle: string;
  buyerId: string;
  buyerName: string;
  buyerPortal: 'buyer' | 'villager' | 'gram_sabha';
  buyerVillage?: string;
  sellerGramSabhaId: string;
  sellerGramSabhaName: string;
  requestedQuantity: number;
  unit: string;
  isBarter: boolean;
  offeredResource?: string;
  offeredQuantity?: number;
  reason?: string;
  isLargeOrder: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'countered';
  counterOffer?: {
    quantity: number;
    pricePerUnit: number;
    note: string;
  };
  createdAt: string;
}

export interface Order {
  id: string;
  requestId: string;
  listingId: string;
  resourceTitle: string;
  buyerName: string;
  sellerName: string;
  sellerGramSabhaId: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  isBarter: boolean;
  barterDetails?: string;
  deliveryType: 'delivery' | 'pickup';
  status: 'approved' | 'delivery_assigned' | 'in_transit' | 'delivered' | 'closed';
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  deliveryFee?: number;
  createdAt: string;
  handoverConfirmed?: boolean;
  receivedConfirmed?: boolean;
  ratingGiven?: number;
  reviewGiven?: string;
  partnerRatingGiven?: number;
}
