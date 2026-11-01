import React from 'react';
import { Trees, Droplet, Scale, Leaf } from 'lucide-react';

export const GreenBasketBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Trees,
      title: 'Community-Sourced',
      subtitle: 'Harvested directly by Gram Sabha title holders',
    },
    {
      icon: Leaf,
      title: 'Zero Deforestation',
      subtitle: 'Regenerative harvest preserving rootstock & seeds',
    },
    {
      icon: Droplet,
      title: 'Watershed Impact',
      subtitle: 'Funds 11 forest ponds & 794 boulder check dams',
    },
    {
      icon: Scale,
      title: 'Transparent Pricing',
      subtitle: 'Fair Price corridor eliminating middleman markups',
    },
  ];

  return (
    <section id="benefits-section" className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-200">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🌿</span>
        <h2 className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
          Why Choose VanRozgar?
        </h2>
      </div>

      {/* 4 Compact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="bg-white hover:bg-[#F2EBDC] dark:bg-[#2E3E2B] dark:hover:bg-[#344831] rounded-2xl p-4 border border-[#E2D6BE] dark:border-[#3C4E38] transition-all duration-200 flex items-center gap-3.5 shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#DDE8C6] dark:bg-[#3A5233] border border-[#E2D6BE] dark:border-[#3C4E38] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6 text-[#4E7A3A] dark:text-[#8DB85A]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#2F4A2A] dark:text-[#F4F7EA] group-hover:text-[#4E7A3A] dark:group-hover:text-[#8DB85A] transition">
                  {b.title}
                </h3>
                <p className="text-xs text-[#7B6A55] dark:text-[#A9B49A] leading-relaxed">
                  {b.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
