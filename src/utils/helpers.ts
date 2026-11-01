import { MultilingualText, Language } from '../types';

export function resolveAssetUrl(path: string | undefined): string {
  if (!path) return '/assets/products/forest.png';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return path;
  return '/' + path;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getLocalizedText(
  textObj: MultilingualText | { en: string; mr?: string; hi?: string } | string | undefined,
  lang: Language = 'en'
): string {
  if (!textObj) return '';
  if (typeof textObj === 'string') return textObj;
  
  if (lang === 'mr' && textObj.mr) return textObj.mr;
  if (lang === 'hi' && textObj.hi) return textObj.hi;
  if (textObj.en) return textObj.en;
  if (textObj.mr) return textObj.mr;
  return '';
}
