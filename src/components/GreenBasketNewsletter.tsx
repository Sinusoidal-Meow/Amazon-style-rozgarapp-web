import React, { useState } from 'react';
import { Mail, CheckCircle2, Send } from 'lucide-react';

export const GreenBasketNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-200">
      <div className="bg-[#EFE8D8] dark:bg-[#2E3E2B] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E2D6BE] dark:border-[#3C4E38] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#DDE8C6] dark:bg-[#3A5233] border border-[#E2D6BE] dark:border-[#3C4E38] flex items-center justify-center shrink-0 shadow-inner">
            <Mail className="w-7 h-7 text-[#4E7A3A] dark:text-[#8DB85A]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#2F4A2A] dark:text-[#F4F7EA] tracking-tight">
              Stay Connected, Stay Updated!
            </h3>
            <p className="text-xs sm:text-sm text-[#7B6A55] dark:text-[#A9B49A] mt-0.5 max-w-lg">
              Subscribe to receive seasonal harvest announcements, community livelihood reports, and Nashik CFR forest produce updates.
            </p>
          </div>
        </div>

        {/* Input box & Button */}
        <div className="w-full md:w-auto">
          {subscribed ? (
            <div className="bg-[#DDE8C6] dark:bg-[#3A5233] border border-[#4E7A3A] dark:border-[#8DB85A] text-[#2F4A2A] dark:text-[#DDE8C6] px-5 py-3 rounded-full flex items-center gap-2 text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#4E7A3A] dark:text-[#8DB85A]" />
              <span>Subscribed to VanRozgar Forest Community Updates!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-[#1C2619] border border-[#E2D6BE] dark:border-[#3C4E38] text-[#3F4A36] dark:text-[#E9EFDC] placeholder-[#7B6A55] dark:placeholder-[#A9B49A] text-xs sm:text-sm rounded-full px-4 py-3 focus:outline-none focus:border-[#4E7A3A] dark:focus:border-[#8DB85A] focus:ring-1 focus:ring-[#4E7A3A] dark:focus:ring-[#8DB85A] shadow-inner"
                  required
                />
              </div>

              {/* Primary Green button */}
              <button
                type="submit"
                className="bg-[#4E7A3A] hover:bg-[#3E622E] text-white dark:bg-[#8DB85A] dark:hover:bg-[#9EC86B] dark:text-[#1C2619] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
