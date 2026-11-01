import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  DollarSign, 
  HelpCircle,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { Scheme, LivelihoodIdea, Language } from '../types';

interface SchemesViewProps {
  schemes: Scheme[];
  ideas: LivelihoodIdea[];
  currentLang: Language;
}

export const SchemesView: React.FC<SchemesViewProps> = ({
  schemes,
  ideas,
  currentLang,
}) => {
  const [tab, setTab] = useState<'schemes' | 'ideas'>('schemes');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Tribal Welfare & CFR Support Framework
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welfare Schemes & Sustainable Livelihood Interventions
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Direct access to official Government of Maharashtra, Ministry of Tribal Affairs, and TRIFED schemes for Community Forest Resource title holders, alongside validated eco-interventions.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-800 p-1 rounded-xl border border-stone-700 self-start md:self-center">
          <button
            onClick={() => setTab('schemes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'schemes' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
          >
            Govt Schemes ({schemes.length})
          </button>
          <button
            onClick={() => setTab('ideas')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              tab === 'ideas' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
          >
            Livelihood Ideas ({ideas.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === 'schemes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {schemes.map((s) => (
            <div
              key={s.code}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    {s.kind} · {s.code}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {s.runs_en}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-stone-900 leading-snug">
                  {currentLang === 'mr' ? s.name_mr : s.name_en}
                </h3>
                {currentLang !== 'mr' && (
                  <p className="text-xs text-stone-500 font-medium mt-0.5">{s.name_mr}</p>
                )}

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {currentLang === 'mr' ? s.what_mr : s.what_en}
                </p>

                {/* Who is eligible */}
                <div className="mt-3 p-3 bg-stone-50 rounded-xl text-xs space-y-1 border border-stone-100">
                  <span className="font-bold text-stone-800 block">Who is Eligible:</span>
                  <p className="text-stone-600">{currentLang === 'mr' && s.who_mr ? s.who_mr : s.who_en}</p>
                </div>

                {/* Required Documents */}
                {s.documents_en && s.documents_en.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Required Documents
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {s.documents_en.map((doc, idx) => (
                        <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External Portal Link */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">Official Govt Verification</span>
                <a
                  href={s.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ideas.map((idea) => (
            <div
              key={idea.code}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    {idea.family}
                  </span>
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Cost: {idea.cost_level}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-stone-900">
                  {currentLang === 'mr' ? idea.name_mr : idea.name_en}
                </h3>
                {currentLang !== 'mr' && (
                  <p className="text-xs text-stone-500 font-medium mt-0.5">{idea.name_mr}</p>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">Eco/Green Index</span>
                    <strong className="text-emerald-800 font-extrabold">{idea.green}/5 Stars</strong>
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                    <span className="text-[10px] text-stone-500 block">Ease of Adoption</span>
                    <strong className="text-stone-800 font-extrabold">{idea.ease}/5</strong>
                  </div>
                </div>

                <div className="mt-3 text-xs space-y-1 text-stone-600">
                  <div><strong>Best Season:</strong> {idea.best_season}</div>
                  <div><strong>Wildlife Safety:</strong> {idea.wildlife_risk}</div>
                  {idea.min_land_ha && <div><strong>Min Land:</strong> {idea.min_land_ha} Ha</div>}
                </div>

                {/* Tags */}
                {idea.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {idea.tags.map((t, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compatible with FRA CFR Forest Commons</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
