import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Maximize2, X, Compass, Sliders, Check, 
  HelpCircle, ArrowDown, Shield, Trees 
} from 'lucide-react';
import { CategoryType, FurnitureItem } from '../types';
import { HIGH_END_FURNITURE } from '../data';

interface CatalogProps {
  onPlaceInAtelier: (item: FurnitureItem) => void;
  onCustomiseItem: (item: FurnitureItem) => void;
}

export default function Catalog({ onPlaceInAtelier, onCustomiseItem }: CatalogProps) {
  const [activeTab, setActiveTab] = useState<CategoryType | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Categories list
  const tabOptions: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'lounging', label: 'Lounging' },
    { id: 'gathering', label: 'Gathering' },
    { id: 'studying', label: 'Studying' },
  ];

  // Filtering products
  const filteredProducts = HIGH_END_FURNITURE.filter((product) => {
    const matchesFilter = activeTab === 'all' || product.category === activeTab;
    const matchesKeyword = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.woods.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesKeyword;
  });

  return (
    <section id="catalog" className="py-24 px-6 md:px-12 bg-[#FDFBF7] border-b border-[#EBE6DC] scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Subheader */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2.5 mb-2">
              <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
              <span className="font-display text-[10px] uppercase tracking-[0.3em] font-medium text-[#A69E90]">
                Curated Collections
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight mb-2">
              Bespoke Furniture Collections
            </h2>
            <p className="font-sans text-[#6B655B] max-w-xl text-sm leading-relaxed mt-2">
              Sculptural structures assembled in limited numbers. Filter by layout categories, 
              or inspect the inner core craftsmanship specs directly.
            </p>
          </div>

          {/* Search bar & filter toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center">
            
            {/* Soft search query */}
            <input
              type="text"
              placeholder="Search material wood or grain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2.5 bg-[#F5F2EB]/50 border border-[#EBE6DC] text-xs font-sans text-[#2C2A29] focus:border-[#C5A880] focus:outline-hidden min-w-[200px]"
            />

            {/* Quick tabs selector */}
            <div className="flex space-x-1 bg-[#F5F2EB]/40 p-1 border border-[#EBE6DC]">
              {tabOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveTab(opt.id)}
                  className={`px-3.5 py-2 text-[10px] uppercase tracking-wider font-display font-medium transition-all cursor-pointer ${
                    activeTab === opt.id
                      ? 'bg-[#2C2A29] text-white shadow-xs'
                      : 'bg-transparent text-[#6B655B] hover:text-[#2C2A29]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Magazine Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between border border-[#EBE6DC] bg-[#FDFBF7] p-5 hover:border-[#C5A880] transition-colors duration-300 relative"
              >
                {/* Category spec tag */}
                <div className="flex justify-between items-baseline mb-4 font-mono text-[9px] text-[#A69E90] uppercase tracking-widest">
                  <span>CATEGORY: {product.category}</span>
                  <span>B9-{product.id.slice(-2)}</span>
                </div>

                {/* Main Product Image Container with frame restrictions */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden mb-6 bg-transparent relative cursor-zoom-in"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-[90%] object-contain group-hover:scale-104 transition-transform duration-500"
                  />
                  
                  {/* Subtle hover detail indicator */}
                  <div className="absolute inset-x-0 bottom-0 py-3 bg-[#2C2A29]/90 text-[#FDFBF7] text-[10px] font-display uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-1.5 select-none">
                    <Maximize2 className="w-3 h-3 stroke-[1.5]" />
                    <span>Inquire Details &amp; Materials</span>
                  </div>
                </div>

                {/* Footer specs metadata */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 
                      onClick={() => setSelectedProduct(product)} 
                      className="font-serif text-xl text-[#2C2A29] font-medium tracking-wide group-hover:text-[#C5A880] transition-colors duration-300 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="font-mono text-xs font-bold text-[#8C8476] shrink-0 bg-[#F5F2EB] py-1 px-2">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#6B655B] leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-4 border-t border-[#EBE6DC] flex gap-2">
                    <button
                      onClick={() => onPlaceInAtelier(product)}
                      className="flex-1 font-display text-[9px] uppercase tracking-wider py-2.5 px-3 bg-[#F5F2EB] hover:bg-[#2C2A29] text-[#4A4740] hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer rounded-none"
                    >
                      <Compass className="w-3.5 h-3.5 mr-1" /> Place in Atelier
                    </button>
                    <button
                      onClick={() => onCustomiseItem(product)}
                      className="flex-1 font-display text-[9px] uppercase tracking-wider py-2.5 px-3 border border-[#4A4740] hover:border-[#C5A880] hover:text-[#C5A880] text-[#2C2A29] transition-colors duration-300 flex items-center justify-center cursor-pointer rounded-none"
                    >
                      <Sliders className="w-3.5 h-3.5 mr-1" /> Custom Tailor
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* SPEC SHEET DETAILED MODAL: Slides open on selected item */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              {/* Backing dark overlay with blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              />

              {/* Sidebar sheet details */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="absolute top-0 right-0 h-full w-full max-w-lg bg-[#FDFBF7] shadow-2xl border-l border-[#EBE6DC] flex flex-col justify-between overflow-hidden"
              >
                {/* Header detail */}
                <div className="p-6 border-b border-[#EBE6DC] flex items-center justify-between bg-[#F5F2EB]/55">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span className="font-display text-[10px] uppercase tracking-[0.2em] font-medium text-[#A69E90]">Atelier Detail Sheet</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-1 text-[#4A4740] hover:text-[#C5A880] cursor-pointer"
                  >
                    <X className="w-5.5 h-5.5" />
                  </button>
                </div>

                {/* Scrollable content body */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
                  {/* Image render center */}
                  <div className="h-64 bg-[#F5F2EB]/30 w-full flex items-center justify-center relative p-6 border border-[#EBE6DC]/40">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title & price outline */}
                  <div className="flex justify-between items-baseline border-b border-[#EBE6DC]/80 pb-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#A69E90] uppercase tracking-widest block mb-1">
                        B9-{selectedProduct.id.slice(-2)} — COLLECTION SPEC
                      </span>
                      <h3 className="font-serif text-2xl lg:text-3xl text-[#2C2A29] font-light">
                        {selectedProduct.name}
                      </h3>
                    </div>
                    <span className="font-mono text-lg font-bold text-[#8C8476] bg-[#F5F2EB] px-3 py-1">
                      ${selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Narrative description */}
                  <div className="space-y-2">
                    <h4 className="font-display text-[10px] uppercase tracking-widest text-[#8C8476] font-semibold">
                      ARCHITECTURAL VISION
                    </h4>
                    <p className="font-sans text-sm text-[#4A4740] leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Core details bullet listing */}
                  <div className="space-y-3 p-5 bg-[#F5F2EB]/40 border border-[#EBE6DC]">
                    <h4 className="font-display text-[10px] uppercase tracking-widest text-[#8C8476] font-semibold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#C5A880]" /> CRAFTSMANSHIP NOTES & BOUNDS
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.details.map((dt, idx) => (
                        <li key={idx} className="flex items-start text-xs text-[#6B655B] font-sans">
                          <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mr-2 mt-0.5" />
                          <span>{dt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vector specs summary list */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#EBE6DC]/85">
                    
                    {/* Dimension details */}
                    <div>
                      <h4 className="font-display text-[10px] uppercase tracking-widest text-[#8C8476] mb-2 font-semibold">
                        BASELINE LIMITS
                      </h4>
                      <dl className="space-y-1.5 text-xs font-mono text-[#6B655B]">
                        <div className="flex justify-between border-b border-[#EBE6DC]/40 pb-1">
                          <dt>Length:</dt>
                          <dd className="text-[#2C2A29] font-semibold">{selectedProduct.dimensions.length} {selectedProduct.dimensions.unit}</dd>
                        </div>
                        <div className="flex justify-between border-b border-[#EBE6DC]/40 pb-1">
                          <dt>Depth Width:</dt>
                          <dd className="text-[#2C2A29] font-semibold">{selectedProduct.dimensions.width} {selectedProduct.dimensions.unit}</dd>
                        </div>
                        <div className="flex justify-between border-b border-[#EBE6DC]/40 pb-1">
                          <dt>Seat Height:</dt>
                          <dd className="text-[#2C2A29] font-semibold">{selectedProduct.dimensions.height} {selectedProduct.dimensions.unit}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Material options checklist details */}
                    <div>
                      <h4 className="font-display text-[10px] uppercase tracking-widest text-[#8C8476] mb-2 font-semibold flex items-center gap-1">
                        <Trees className="w-3.5 h-3.5 text-[#C5A880]" /> TIMBER VENEERS AVAILABLE
                      </h4>
                      <div className="flex flex-wrap gap-1 leading-normal">
                        {selectedProduct.woods.map(wd => (
                          <span key={wd} className="text-[10px] font-mono text-[#4A4740] bg-[#F5F2EB] px-2 py-0.5">
                            {wd}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Footer action buttons */}
                <div className="p-6 bg-[#F5F2EB] border-t border-[#EBE6DC] flex gap-3">
                  <button
                    onClick={() => {
                      onPlaceInAtelier(selectedProduct);
                      setSelectedProduct(null);
                      const canvasElem = document.getElementById('atelier');
                      if (canvasElem) canvasElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 bg-[#2C2A29] hover:bg-neutral-800 text-white font-display text-[10px] uppercase tracking-[0.2em] py-4 font-semibold text-center rounded-none cursor-pointer duration-300"
                  >
                    Load into Room Canvas
                  </button>
                  <button
                    onClick={() => {
                      onCustomiseItem(selectedProduct);
                      setSelectedProduct(null);
                      const craftElem = document.getElementById('craftsman');
                      if (craftElem) craftElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 border border-[#2C2A29] hover:border-[#C5A880] text-[#2C2A29] hover:text-[#C5A880] font-display text-[10px] uppercase tracking-[0.2em] py-4 font-semibold text-center rounded-none cursor-pointer duration-300"
                  >
                    Millimeter Customize
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
