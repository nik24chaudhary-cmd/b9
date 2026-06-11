import { MapPin, Phone, Clock, ShoppingBag, Truck, Gift, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 font-sans">
      
      {/* Prime brand header & directory links */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
        
        {/* COL 1: GRAND BRAND STATEMENT (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-light tracking-[0.25em] text-white">
              BOTTEGA<span className="font-sans font-normal text-xl tracking-normal ml-0.5 text-[#C5A880]">9</span>
            </span>
            <span className="font-display text-[9px] uppercase tracking-[0.45em] text-[#C5A880] mt-1.5 block">
              CHANDIGARH BESPOKE ATELIER
            </span>
          </div>
          
          <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-sm">
            Bottega9 represents modern Indian interior curation. 
            Blending solid wood forestry, premium continental textiles, and millimeter-exact CAD customizing 
            to develop unique visual landmarks in Mohali &amp; Chandigarh.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <span className="inline-flex items-center text-[10px] font-mono text-neutral-500 hover:text-white transition-colors">
              <ShoppingBag className="w-4 h-4 text-[#C5A880] mr-1.5" /> In-Store Shopping
            </span>
            <span className="inline-flex items-center text-[10px] font-mono text-neutral-500 hover:text-white transition-colors">
              <Truck className="w-4 h-4 text-[#C5A880] mr-1.5" /> Delivery
            </span>
          </div>
        </div>

        {/* COL 2: SPEC DETAILS CONTACT (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <h4 className="font-display text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold border-b border-neutral-800 pb-2">
            LOCATION &amp; CONTACT
          </h4>
          
          <div className="space-y-4">
            
            <div className="flex items-start space-x-3.5 text-xs text-neutral-400">
              <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5 stroke-[1.25]" />
              <div>
                <p className="font-mono text-[10px] uppercase text-neutral-500 font-semibold mb-1">THE STUDIO ADDRESS</p>
                <p className="font-sans leading-relaxed">
                  First Floor, SCO 5, Madhya Marg, Sector 7-C, Sector 7, Chandigarh, 160019
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-xs text-neutral-400">
              <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5 stroke-[1.25]" />
              <div>
                <p className="font-mono text-[10px] uppercase text-neutral-500 font-semibold mb-1">DIRECT TELEPHONY</p>
                <p className="font-mono text-[11.5px] text-white">
                  081948 19467 / +91 81948 19467
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 text-xs text-neutral-400">
              <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5 stroke-[1.25]" />
              <div>
                <p className="font-mono text-[10px] uppercase text-neutral-500 font-semibold mb-1">RUNNING HOURS</p>
                <p className="font-sans">
                  Opens Daily: <span className="text-white font-semibold">10:30 AM</span> to <span className="text-white font-semibold">8:00 PM</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* COL 3: ARCHITECTURAL SCHEMATIC BLOCK MAP MOCK (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-display text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold border-b border-neutral-800 pb-2">
            SHOWROOM LOCATOR SCHEMATIC
          </h4>

          {/* High-end vector blueprint road grid map depicting SCO 5 Madhya Marg Sector 7-C Chandigarh */}
          <div className="h-44 bg-neutral-900 border border-neutral-800 relative flex items-center justify-center overflow-hidden rounded-none p-4">
            
            {/* Grid layout lines */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{
                   backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                   backgroundSize: '15px 15px'
                 }}
            />

            {/* Drawing roads and SCO 5 block */}
            <svg className="w-full h-full text-neutral-700 stroke-neutral-700 stroke-[1.5] fill-none" viewBox="0 0 200 120">
              {/* Roads (Madhya Marg) */}
              <line x1="10" y1="80" x2="190" y2="80" stroke="#404040" strokeWidth="12" />
              <text x="100" y="83" textAnchor="middle" className="font-mono fill-neutral-600 border-none text-[7px]" stroke="none">
                MADHYA MARG HIGHWAY
              </text>

              {/* Intersecting Sector Road */}
              <line x1="40" y1="10" x2="40" y2="110" stroke="#333333" strokeWidth="8" />

              {/* Blocks representation */}
              {/* Sector 7-C Blocks */}
              <rect x="60" y="20" width="35" height="25" className="stroke-neutral-800 fill-neutral-800/40" />
              <text x="77.5" y="34" textAnchor="middle" className="font-display fill-neutral-500 text-[6px]" stroke="none">SCO 1-4</text>

              {/* SCO 5 Block (Bottega9) is highlighted in gold! */}
              <rect x="105" y="20" width="35" height="25" className="stroke-[#C5A880]/60 fill-[#C5A880]/10" />
              <text x="122.5" y="34" textAnchor="middle" className="font-display font-bold fill-[#C5A880] text-[6.5px]" stroke="none">
                SCO 5 (BOTTEGA9)
              </text>
              <circle cx="122.5" cy="22" r="2.5" className="fill-red-500 stroke-none" />

              {/* Sector 7 residential border line */}
              <rect x="150" y="20" width="40" height="25" className="stroke-neutral-800 fill-none" strokeDasharray="3 2" />
              <text x="170" y="34" textAnchor="middle" className="font-display fill-neutral-600 text-[5px]" stroke="none">SEC 7 HOUSES</text>

              {/* Surrounding label */}
              <text x="12" y="112" className="font-mono fill-[#C5A880] text-[5px]" stroke="none">
                PQMW+GW CHANDIGARH
              </text>
            </svg>

            {/* Float badge indicator with click-safe details */}
            <div className="absolute top-3.5 right-3.5 bg-neutral-950/90 border border-[#C5A880]/30 px-2.5 py-1 font-mono text-[7px] text-[#C5A880] tracking-widest uppercase">
              Sector 7-C Chandigarh
            </div>
          </div>

        </div>

      </div>

      {/* Corporate legal copyrights */}
      <div className="bg-neutral-950 border-t border-neutral-900/60 px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#8C8476] text-center sm:text-left select-all">
            &copy; 2026 BOTTEGA9 FURNITURE STUDIO. CHANDIGARH, IN. SOLID TIMBER CERTIFIED.
          </p>

          <button
            onClick={onScrollToTop}
            className="p-3 bg-neutral-900 hover:bg-[#C5A880] hover:text-neutral-950 transition-colors cursor-pointer group"
            title="Scroll to main headers"
          >
            <ArrowUp className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950" />
          </button>
        </div>
      </div>

    </footer>
  );
}
