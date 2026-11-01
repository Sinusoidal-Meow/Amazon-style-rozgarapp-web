import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trees, 
  Droplet, 
  Hammer, 
  Users, 
  Phone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { GramSabha, Language } from '../types';
import { getLocalizedText } from '../utils/helpers';

interface GramSabhasViewProps {
  gramSabhas: GramSabha[];
  currentLang: Language;
  onFilterByVillage: (villageName: string) => void;
}

export const GramSabhasView: React.FC<GramSabhasViewProps> = ({
  gramSabhas,
  currentLang,
  onFilterByVillage,
}) => {
  const [selectedTaluka, setSelectedTaluka] = useState<string>('all');

  const talukas = ['all', 'Deola', 'Dindori', 'Trimbakeshwar'];

  const filtered = selectedTaluka === 'all'
    ? gramSabhas
    : gramSabhas.filter((g) => g.taluka.toLowerCase() === selectedTaluka.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 transition-colors duration-200">
      {/* Hero Header */}
      <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] text-[#3F4A36] dark:text-[#E9EFDC] rounded-3xl p-6 sm:p-8 border border-[#E2D6BE] dark:border-[#3C4E38] shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-3 py-1 rounded-full text-xs font-bold border border-[#E2D6BE] dark:border-[#3C4E38]">
            <Sparkles className="w-3.5 h-3.5 text-[#A4551A] dark:text-[#F0A15A]" /> Raah Foundation Ecological Baseline · Nashik
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
            14 Nashik Gram Sabhas & CFR Rights
          </h1>
          <p className="text-[#3F4A36] dark:text-[#E9EFDC] text-sm sm:text-base leading-relaxed font-normal">
            Community Forest Resource (CFR) title holders across Deola, Dindori, and Trimbakeshwar talukas exercising democratic forest rights under FRA 2006 to produce minor forest commodities while restoring native watersheds.
          </p>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-[#E2D6BE] dark:border-[#3C4E38] relative z-10 text-xs">
          <div className="bg-white dark:bg-[#1C2619] p-3.5 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
            <div className="flex items-center gap-1.5 text-[#4E7A3A] dark:text-[#8DB85A] mb-1">
              <Trees className="w-4 h-4" />
              <span className="font-semibold">CFR Area</span>
            </div>
            <div className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">2,019 Ha</div>
            <div className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">Protected Forest</div>
          </div>

          <div className="bg-white dark:bg-[#1C2619] p-3.5 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
            <div className="flex items-center gap-1.5 text-[#4E7A3A] dark:text-[#8DB85A] mb-1">
              <Sparkles className="w-4 h-4 text-[#A4551A] dark:text-[#F0A15A]" />
              <span className="font-semibold">Saplings</span>
            </div>
            <div className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">217,708</div>
            <div className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">Native Trees Planted</div>
          </div>

          <div className="bg-white dark:bg-[#1C2619] p-3.5 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
            <div className="flex items-center gap-1.5 text-[#4E7A3A] dark:text-[#8DB85A] mb-1">
              <Droplet className="w-4 h-4 text-[#4E7A3A] dark:text-[#8DB85A]" />
              <span className="font-semibold">Forest Ponds</span>
            </div>
            <div className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">11 Ponds</div>
            <div className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">Water Harvesting</div>
          </div>

          <div className="bg-white dark:bg-[#1C2619] p-3.5 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs">
            <div className="flex items-center gap-1.5 text-[#5A3B22] dark:text-[#D8B48A] mb-1">
              <Hammer className="w-4 h-4 text-[#5A3B22] dark:text-[#D8B48A]" />
              <span className="font-semibold">Check Dams</span>
            </div>
            <div className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">794</div>
            <div className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">Boulder Works</div>
          </div>

          <div className="bg-white dark:bg-[#1C2619] p-3.5 rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-[#4E7A3A] dark:text-[#8DB85A] mb-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold">Tribal Livelihood</span>
            </div>
            <div className="text-xl font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA]">12,710</div>
            <div className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A]">Labour Days</div>
          </div>
        </div>
      </div>

      {/* Taluka Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-[#7B6A55] dark:text-[#A9B49A] mr-2">Filter Taluka:</span>
        {talukas.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTaluka(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer capitalize ${
              selectedTaluka === t
                ? 'bg-[#4E7A3A] text-white dark:bg-[#8DB85A] dark:text-[#1C2619] shadow-xs'
                : 'bg-white text-[#3F4A36] hover:bg-[#F2EBDC] dark:bg-[#2E3E2B] dark:text-[#E9EFDC] dark:hover:bg-[#344831] border border-[#E2D6BE] dark:border-[#3C4E38]'
            }`}
          >
            {t === 'all' ? 'All 14 Villages' : `${t} Taluka`}
          </button>
        ))}
      </div>

      {/* Gram Sabha Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((gs) => {
          const rest = gs.ecologicalRestoration;

          return (
            <div
              key={gs.id}
              className="bg-white dark:bg-[#2E3E2B] rounded-2xl border border-[#E2D6BE] dark:border-[#3C4E38] p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] border border-[#E2D6BE] dark:border-[#3C4E38] uppercase tracking-wider">
                      {gs.taluka} Taluka
                    </span>
                    <h3 className="text-base font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] mt-1.5">
                      {getLocalizedText(gs.name, currentLang)}
                    </h3>
                    <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A] font-medium">
                      Village: {getLocalizedText(gs.village, currentLang)} ({gs.district})
                    </p>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-[#DDE8C6] dark:bg-[#3A5233] text-[#4E7A3A] dark:text-[#8DB85A] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                </div>

                {/* CFR Claim & Rights */}
                <div className="bg-[#F7F2E8] dark:bg-[#1C2619] rounded-xl p-3 border border-[#E2D6BE] dark:border-[#3C4E38] text-xs space-y-1 my-3">
                  <div className="flex justify-between text-[#7B6A55] dark:text-[#A9B49A]">
                    <span>Approved CFR Area:</span>
                    <strong className="text-[#2F4A2A] dark:text-[#F4F7EA] font-mono tabular-nums">{gs.cfr.approvedAreaHa} Ha</strong>
                  </div>
                  <div className="flex justify-between text-[#7B6A55] dark:text-[#A9B49A]">
                    <span>CFR Rights Claimed:</span>
                    <strong className="text-[#4E7A3A] dark:text-[#8DB85A]">{gs.cfr.rights.length} Titles</strong>
                  </div>
                </div>

                {/* Ecological Restoration Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F7F2E8] dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <div className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1">
                      <Trees className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" /> Saplings
                    </div>
                    <div className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-sm mt-0.5 font-mono tabular-nums">
                      {rest.saplingsPlanted.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F7F2E8] dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <div className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" /> Ponds
                    </div>
                    <div className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-sm mt-0.5 font-mono tabular-nums">
                      {rest.forestPonds} Built
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F7F2E8] dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <div className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1">
                      <Hammer className="w-3.5 h-3.5 text-[#5A3B22] dark:text-[#D8B48A]" /> Check Dams
                    </div>
                    <div className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-sm mt-0.5 font-mono tabular-nums">
                      {rest.looseBoulderStructures}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F7F2E8] dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38]">
                    <div className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#4E7A3A] dark:text-[#8DB85A]" /> Labour Days
                    </div>
                    <div className="font-extrabold text-[#2F4A2A] dark:text-[#F4F7EA] text-sm mt-0.5 font-mono tabular-nums">
                      {rest.labourDaysGenerated.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Native tree species badges */}
                {rest.speciesList && rest.speciesList.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] font-bold uppercase tracking-wider block mb-1">
                      Restored Species
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {rest.speciesList.slice(0, 4).map((sp, idx) => (
                        <span key={idx} className="text-[10px] bg-[#DDE8C6] dark:bg-[#3A5233] text-[#2F4A2A] dark:text-[#DDE8C6] px-2 py-0.5 rounded font-medium border border-[#E2D6BE] dark:border-[#3C4E38]">
                          {sp.name} ({sp.count})
                        </span>
                      ))}
                      {rest.speciesList.length > 4 && (
                        <span className="text-[10px] text-[#7B6A55] dark:text-[#A9B49A] self-center">
                          +{rest.speciesList.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-[#E2D6BE] dark:border-[#3C4E38] flex items-center justify-between">
                {gs.secretaryPhone && (
                  <span className="text-[11px] text-[#7B6A55] dark:text-[#A9B49A] font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#4E7A3A] dark:text-[#8DB85A]" /> {gs.secretaryPhone}
                  </span>
                )}
                <button
                  onClick={() => onFilterByVillage(gs.village.en || gs.village.mr)}
                  className="ml-auto text-xs font-bold text-[#4E7A3A] hover:text-[#3E622E] dark:text-[#8DB85A] dark:hover:text-[#9EC86B] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Village Produce</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
