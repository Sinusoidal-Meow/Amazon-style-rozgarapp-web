export * from '../../types/marketplace';

export interface CartItem {
  product: import('../../types/marketplace').ProductListing;
  quantity: number;
  mode: 'buy' | 'barter';
  customBarterOffer?: string;
}

export interface DemoUser {
  role: 'gramsabha' | 'cfrholder' | 'buyer' | 'team';
  name: string;
  phone: string;
  village?: string;
  taluka?: string;
  district?: string;
  businessName?: string;
  city?: string;
  language: 'en' | 'mr' | 'hi';
}
