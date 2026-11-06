import { CatalogueResource } from '../data/catalogue51';
import { Language } from '../types';

export interface HeroSpecimen {
  id: string;
  name: string;
  localName: string;
  categoryLabel: string;
  price: string;
  stewardship: string;
  image: string;
}

export interface HeroCredibilityStat {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export const HERO_CREDIBILITY_STATS: HeroCredibilityStat[] = [
  {
    id: 'community-rights',
    value: '100%',
    label: 'Community Owned',
    subtext: 'FRA 2006 Rights',
  },
  {
    id: 'direct-benefit',
    value: 'Direct',
    label: 'Rural Benefit',
    subtext: 'Fair Gram Sabha Trade',
  },
  {
    id: 'protected-area',
    value: '2,019 Ha',
    label: 'Protected Forests',
    subtext: 'Watershed Stewardship',
  },
];

/**
 * Computes multi-plane parallax coordinate offsets from mouse position.
 * Output is normalized and clamped between -1 and 1 to prevent jarring movement.
 */
export function computeParallaxOffsets(
  clientX: number,
  clientY: number,
  width: number,
  height: number
) {
  if (width <= 0 || height <= 0) {
    return { bgX: 0, bgY: 0, mistX: 0, shelterX: 0, shelterY: 0, floatX: 0, floatY: 0 };
  }

  // Calculate normalized coordinate from center (-0.5 to 0.5)
  const normX = Math.max(-0.5, Math.min(0.5, clientX / width - 0.5));
  const normY = Math.max(-0.5, Math.min(0.5, clientY / height - 0.5));

  return {
    // Distant background mountains shift very gently
    bgX: Number((normX * 12).toFixed(2)),
    bgY: Number((normY * 8).toFixed(2)),
    // Atmospheric mist moves slightly faster across horizontal axis
    mistX: Number((normX * 22).toFixed(2)),
    // Shelter / midground moves with moderate depth
    shelterX: Number((-normX * 10).toFixed(2)),
    shelterY: Number((-normY * 6).toFixed(2)),
    // Floating foreground resource highlights exhibit higher parallax depth
    floatX: Number((-normX * 18).toFixed(2)),
    floatY: Number((-normY * 12).toFixed(2)),
  };
}

/**
 * Extracts and prepares the 3 curated specimen highlights from catalogue data.
 */
export function getHeroSpecimens(resources: CatalogueResource[], lang: Language = 'en'): HeroSpecimen[] {
  const targetIds = ['bamboo', 'fruit_awla', 'herb_hirda'];
  
  return targetIds.map((id, index) => {
    const found = resources.find((r) => r.id === id);
    if (!found) {
      // Fallback safe specimen
      return {
        id: id || `specimen-${index}`,
        name: index === 0 ? 'Bamboo' : index === 1 ? 'Wild Amla' : 'Hirda',
        localName: index === 0 ? 'बांबू' : index === 1 ? 'आवळा' : 'हिरडा',
        categoryLabel: index === 0 ? 'Bamboo Clump' : index === 1 ? 'Wild Fruit' : 'Medicinal Herb',
        price: index === 0 ? '₹180 / pole' : index === 1 ? '₹85 / kg' : '₹55 / kg',
        stewardship: 'Nashik Gram Sabha Harvest',
        image: '/assets/products/forest.png',
      };
    }

    const priceStr = found.priceEstimate && found.unit 
      ? `₹${found.priceEstimate} / ${found.unit.replace('pole (10 ft)', 'pole')}`
      : 'Commons Harvest';

    const catLabel = found.category === 'bamboo' 
      ? (lang === 'mr' ? 'बांबू उत्पादन' : 'Bamboo Clump')
      : found.category === 'fruit'
      ? (lang === 'mr' ? 'रानफळ संकलन' : 'Wild Fruit Harvest')
      : (lang === 'mr' ? 'औषधी वनोपज' : 'Medicinal Produce');

    return {
      id: found.id,
      name: lang === 'mr' ? found.name : found.englishName,
      localName: found.name,
      categoryLabel: catLabel,
      price: priceStr,
      stewardship: 'Nashik Gram Sabha Harvest',
      image: found.image || '/assets/products/forest.png',
    };
  });
}
