import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  CheckCircle, 
  XOctagon, 
  Scale 
} from 'lucide-react';
import { RestrictedItem, Language } from '../types';

interface RestrictedItemsViewProps {
  items: RestrictedItem[];
  currentLang: Language;
}

export const RestrictedItemsView: React.FC<RestrictedItemsViewProps> = ({
  items,
  currentLang,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Alert Header */}
      <div className="bg-rose-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-rose-800 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-rose-900/80 text-rose-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-400" /> Statutory Compliance & Forest Conservation
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-100">
          Restricted & Prohibited Forest Produce Notice
        </h1>
        <p className="text-rose-200/90 text-xs sm:text-sm leading-relaxed max-w-3xl">
          To protect endangered species and maintain ecological integrity under the Wildlife Protection Act (1972) and Indian Forest Act (1927), the following items are strictly barred from being listed, bought, sold, or bartered on the VanRozgar platform.
        </p>
      </div>

      {/* Prohibited items cards */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border-2 border-rose-200 p-6 shadow-xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2">
                <XOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                <h3 className="font-extrabold text-lg text-stone-900">
                  {currentLang === 'mr' ? item.name.mr : item.name.en}
                </h3>
                {currentLang !== 'mr' && (
                  <span className="text-xs text-stone-500 font-semibold">({item.name.mr})</span>
                )}
              </div>

              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-rose-100 text-rose-900">
                {item.schedule}
              </span>
            </div>

            <div className="text-xs space-y-2 text-stone-700">
              <div>
                <strong className="text-stone-900">Statutory Reason for Prohibition:</strong>{' '}
                <span>{currentLang === 'mr' ? item.reason.mr : item.reason.en}</span>
              </div>

              <div>
                <strong className="text-stone-900">Restricted Keywords / Synonyms:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {item.terms.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 text-[11px] font-medium border border-rose-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5 border-t border-stone-100">
              <Scale className="w-3.5 h-3.5 text-stone-400" />
              <span>Automated filter checks flag any listing attempt violating this schedule.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Guarantee Banner */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex items-start gap-4">
        <CheckCircle className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-extrabold text-emerald-950 text-sm">
            Ethical Sourcing Guarantee for All 34 Listed Catalog Items
          </h4>
          <p className="text-emerald-900 leading-relaxed">
            All 34 active minor forest produce items listed on VanRozgar (raw forest honey, wild amla, bamboo craft, mahua flowers, fallen tamarind, sisal fibre) are categorized under legally sanctioned Non-Timber Minor Forest Produce (MFP) under Section 2(4) of the Indian Forest Act and Section 3(1)(c) of the Forest Rights Act.
          </p>
        </div>
      </div>
    </div>
  );
};
