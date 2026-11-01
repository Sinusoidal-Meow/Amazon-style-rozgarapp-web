import React from 'react';
import { Trees, ShieldCheck, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800 mt-16">
      {/* Top tier */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Trees className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base text-white">
              Van<span className="text-amber-400">Rozgar</span> | वनरोजगार
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed text-[11px]">
            Community Forest Resource (CFR) Marketplace and Livelihood Platform connecting tribal Gram Sabhas in Nashik District, Maharashtra with ethical buyers and direct barter networks.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
            14 Nashik Gram Sabhas
          </h4>
          <ul className="space-y-1.5 text-stone-400 text-[11px]">
            <li>Deola Taluka: Dongargaon, Kanchane, Kumbharde, Varshi</li>
            <li>Dindori Taluka: Bhatode, Kochargaon</li>
            <li>Trimbakeshwar Taluka: Ambai, Chakore, Devgaon, Met Chandrachi, Pahine, Take Harsha, Talwade, Waghera</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
            Ecological Restoration
          </h4>
          <ul className="space-y-1.5 text-stone-400 text-[11px]">
            <li>2,019 Hectares Protected CFR Canopy</li>
            <li>217,708 Native Tree Saplings Planted</li>
            <li>11 Forest Ponds for Wildlife & Groundwater</li>
            <li>794 Loose Boulder Check Structures</li>
            <li>12,710 Tribal Labour Days Created</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
            Statutory Transparency
          </h4>
          <p className="text-stone-400 leading-relaxed text-[11px] mb-2">
            Recognized under the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 (FRA) & PESA Act 1996.
          </p>
          <div className="p-2.5 rounded-lg bg-stone-800 text-stone-300 border border-stone-700 text-[10px]">
            Data Source: Raah Foundation Ecological Baseline & VanMitra CFR Modules.
          </div>
        </div>
      </div>

      {/* Bottom tier */}
      <div className="bg-stone-950 py-4 px-4 border-t border-stone-800/80 text-stone-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 VanRozgar Marketplace · Direct Forest Sourcing & Barter Network.
          </span>
          <span className="flex items-center gap-1">
            Empowering 14 Tribal Gram Sabhas in Nashik District, MH.
          </span>
        </div>
      </div>
    </footer>
  );
};
