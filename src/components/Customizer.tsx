import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Sliders, ChevronRight, PenTool, 
  CheckCircle, FileText, Download, Eye, Layers 
} from 'lucide-react';
import { FurnitureItem, CustomConfig } from '../types';
import { HIGH_END_FURNITURE } from '../data';

interface CustomizerProps {
  onAddInquiry: (config: CustomConfig) => void;
}

export default function Customizer({ onAddInquiry }: CustomizerProps) {
  const [selectedItemId, setSelectedItemId] = useState<string>(HIGH_END_FURNITURE[0].id);
  
  // Find current active item
  const activeItem = useMemo(() => {
    return HIGH_END_FURNITURE.find(item => item.id === selectedItemId) || HIGH_END_FURNITURE[0];
  }, [selectedItemId]);

  // Dimensions state - initialized to baseline item specs
  const [length, setLength] = useState<number>(activeItem.dimensions.length);
  const [width, setWidth] = useState<number>(activeItem.dimensions.width);
  const [height, setHeight] = useState<number>(activeItem.dimensions.height);
  
  // Custom materials selection
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    activeItem.materials.length > 0 && activeItem.materials[0] !== 'None' ? activeItem.materials[0] : 'Standard'
  );
  const [selectedWood, setSelectedWood] = useState<string>(
    activeItem.woods.length > 0 && activeItem.woods[0] !== 'None' ? activeItem.woods[0] : 'Standard'
  );
  const [selectedMetal, setSelectedMetal] = useState<string>(
    activeItem.metals.length > 0 && activeItem.metals[0] !== 'None' ? activeItem.metals[0] : 'Brushed Brass'
  );
  
  const [note, setNote] = useState('');
  const [successNotify, setSuccessNotify] = useState(false);

  // Sync state whenever model changes
  const handleModelChange = (id: string) => {
    setSelectedItemId(id);
    const item = HIGH_END_FURNITURE.find(f => f.id === id) || HIGH_END_FURNITURE[0];
    setLength(item.dimensions.length);
    setWidth(item.dimensions.width);
    setHeight(item.dimensions.height);
    setSelectedMaterial(item.materials.length > 0 && item.materials[0] !== 'None' ? item.materials[0] : 'Standard');
    setSelectedWood(item.woods.length > 0 && item.woods[0] !== 'None' ? item.woods[0] : 'Standard');
    setSelectedMetal(item.metals.length > 0 && item.metals[0] !== 'None' ? item.metals[0] : 'Standard');
  };

  // Safe limits for dimension modifications per product category
  const limits = useMemo(() => {
    const base = activeItem.dimensions;
    return {
      length: { min: Math.round(base.length * 0.75), max: Math.round(base.length * 1.35) },
      width: { min: Math.round(base.width * 0.8), max: Math.round(base.width * 1.25) },
      height: { min: Math.round(base.height * 0.85), max: Math.round(base.height * 1.15) }
    };
  }, [activeItem]);

  // Live dynamic quote pricing calculation
  const calculatedPrice = useMemo(() => {
    let price = activeItem.price;
    
    // Proportion increase based on dimensional multipliers relative to original baseline
    const lengthRatio = length / activeItem.dimensions.length;
    const widthRatio = width / activeItem.dimensions.width;
    const heightRatio = height / activeItem.dimensions.height;
    
    const cubicMultiplier = (lengthRatio * widthRatio * heightRatio - 1) * 0.6; // weight scale factor
    price = price * (1 + cubicMultiplier);

    // Premium surcharge selections
    if (selectedMaterial && selectedMaterial !== 'Standard' && selectedMaterial.toLowerCase().includes('bouclé')) price += 180;
    if (selectedMaterial && selectedMaterial.toLowerCase().includes('leather')) price += 350;
    if (selectedWood && selectedWood.toLowerCase().includes('walnut')) price += 240;
    
    return Math.round(price);
  }, [activeItem, length, width, height, selectedMaterial, selectedWood]);

  // Submit the custom specs
  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    const config: CustomConfig = {
      itemId: activeItem.id,
      name: activeItem.name,
      length,
      width,
      height,
      material: selectedMaterial,
      wood: selectedWood,
      metal: selectedMetal,
      notes: note,
      price: calculatedPrice
    };
    
    onAddInquiry(config);
    setSuccessNotify(true);
    setNote('');
    setTimeout(() => {
      setSuccessNotify(false);
    }, 4000);
  };

  return (
    <section id="craftsman" className="py-24 px-6 md:px-12 bg-[#F5F2EB]/20 border-b border-[#EBE6DC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2.5 mb-2">
            <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
            <span className="font-display text-[10px] uppercase tracking-[0.3em] font-medium text-[#A69E90]">
              Handcrafted Bespoke Blueprint
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight mb-4">
            Dimensional Craftsmanship Workshop
          </h2>
          <p className="font-sans text-[#6B655B] max-w-2xl text-sm leading-relaxed">
            Specify customized millimeter ratios of custom luxury. Draw up exact physical blue-prints, 
            determine solid timber species, select noble hardware, and examine our active digital schematic. 
            All modifications receive immediate price feedback directly from our Chandigarh master carpentry ledger.
          </p>
        </div>

        {/* Workspace Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: BLUEPRINT VISUALIZER GRID (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-[#EBE6DC] bg-[#FDFBF7] p-6 lg:p-8 relative">
            
            {/* Grid Pattern and Design Labels */}
            <div className="flex justify-between items-center mb-6 border-b border-[#EBE6DC]/85 pb-4">
              <div className="flex items-center space-x-2">
                <PenTool className="w-4 h-4 text-[#C5A880]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#8C8476]">
                  ATELIER DRAFTING SCHEMATIC #09-A
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#A69E90]">SCALE: ACCELED VECTORS</span>
            </div>

            {/* BLUEPRINT CORE: Interactive SVG Box which scales elements according to dimensions */}
            <div className="h-[280px] sm:h-[350px] bg-[#1a2e40] border border-[#233d54] relative flex items-center justify-center overflow-hidden">
              
              {/* Drafting grid background */}
              <div className="absolute inset-0 opacity-[0.08]" 
                   style={{
                     backgroundImage: 'radial-gradient(ellipse at center, #ffffff 1px, transparent 1.5px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                     backgroundSize: '100% 100%, 20px 20px, 20px 20px',
                     backgroundPosition: 'center, center, center'
                   }}
              />

              {/* Dynamic Scaling Blueprint Blueprint Box */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* SVG Blueprint Draw */}
                <svg className="w-[85%] h-[85%] text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.3)]" viewBox="0 0 400 300">
                  <g className="stroke-[#93c5fd]/50 fill-none stroke-[1.25]">
                    
                    {/* Bounding box dynamic helper */}
                    <rect 
                      x={100 - (length / limits.length.max - 0.5) * 40} 
                      y={100 - (height / limits.height.max - 0.5) * 30} 
                      width={200 * (length / activeItem.dimensions.length)} 
                      height={120 * (height / activeItem.dimensions.height)} 
                      strokeDasharray="4 3" 
                      className="opacity-40"
                    />

                    {/* Architectural Grid Lines */}
                    <line x1="20" y1="240" x2="380" y2="240" stroke="#93c5fd" className="opacity-30" />
                    <line x1="200" y1="20" x2="200" y2="280" stroke="#93c5fd" className="opacity-15" />

                    {/* Vector drawing representing furniture */}
                    <g className="stroke-[#93c5fd] stroke-[1.75] fill-none">
                      
                      {/* Interactive furniture silhouette scales on width/height ratios */}
                      {activeItem.id.includes('sofa') ? (
                        // Sofa Outline Sketch
                        <path d={`
                          M ${100 - (length - activeItem.dimensions.length) * 0.4} 190
                          L ${300 + (length - activeItem.dimensions.length) * 0.4} 190
                          L ${300 + (length - activeItem.dimensions.length) * 0.4} ${230 + (height - activeItem.dimensions.height) * 0.2}
                          L ${100 - (length - activeItem.dimensions.length) * 0.4} ${230 + (height - activeItem.dimensions.height) * 0.2}
                          Z
                          M ${115 - (length - activeItem.dimensions.length) * 0.4} 190
                          L ${115 - (length - activeItem.dimensions.length) * 0.4} ${130 - (height - activeItem.dimensions.height) * 0.5}
                          Q 200 ${120 - (height - activeItem.dimensions.height) * 0.6} ${285 + (length - activeItem.dimensions.length) * 0.4} ${130 - (height - activeItem.dimensions.height) * 0.5}
                          L ${285 + (length - activeItem.dimensions.length) * 0.4} 190
                        `} />
                      ) : activeItem.id.includes('chair') ? (
                        // Chair Outline Sketch
                        <path d={`
                          M ${140 - (width - activeItem.dimensions.width) * 0.3} 180
                          L ${260 + (width - activeItem.dimensions.width) * 0.3} 180
                          L ${260 + (width - activeItem.dimensions.width) * 0.3} ${235 + (height - activeItem.dimensions.height) * 0.2}
                          L ${140 - (width - activeItem.dimensions.width) * 0.3} ${235 + (height - activeItem.dimensions.height) * 0.2}
                          Z
                          M ${150 - (width - activeItem.dimensions.width) * 0.3} 180
                          L ${150 - (width - activeItem.dimensions.width) * 0.3} ${110 - (height - activeItem.dimensions.height) * 0.6}
                          Q 200 ${95 - (height - activeItem.dimensions.height) * 0.8} ${250 + (width - activeItem.dimensions.width) * 0.3} ${110 - (height - activeItem.dimensions.height) * 0.6}
                          L ${250 + (width - activeItem.dimensions.width) * 0.3} 180
                        `} />
                      ) : activeItem.id.includes('table') ? (
                        // Travertine table sketch
                        <path d={`
                          M ${120 - (length - activeItem.dimensions.length) * 0.4} 170
                          C ${120 - (length - activeItem.dimensions.length) * 0.4} 160, ${280 + (length - activeItem.dimensions.length) * 0.4} 160, ${280 + (length - activeItem.dimensions.length) * 0.4} 170
                          L ${280 + (length - activeItem.dimensions.length) * 0.4} 185
                          C ${280 + (length - activeItem.dimensions.length) * 0.4} 195, ${120 - (length - activeItem.dimensions.length) * 0.4} 195, ${120 - (length - activeItem.dimensions.length) * 0.4} 185
                          Z
                          M 160 ${185 + (height - activeItem.dimensions.height) * 0.2} L 160 ${235 + (height - activeItem.dimensions.height) * 0.4}
                          M 240 ${185 + (height - activeItem.dimensions.height) * 0.2} L 240 ${235 + (height - activeItem.dimensions.height) * 0.4}
                        `} />
                      ) : (
                        // Dining and studying desk sketch outlines
                        <path d={`
                          M ${110 - (length - activeItem.dimensions.length) * 0.3} 160
                          L ${290 + (length - activeItem.dimensions.length) * 0.3} 160
                          L ${290 + (length - activeItem.dimensions.length) * 0.3} 172
                          L ${110 - (length - activeItem.dimensions.length) * 0.3} 172
                          Z
                          M ${130 - (length - activeItem.dimensions.length) * 0.2} 172 L ${130 - (length - activeItem.dimensions.length) * 0.2} ${240 + (height - activeItem.dimensions.height) * 0.3}
                          M ${270 + (length - activeItem.dimensions.length) * 0.2} 172 L ${270 + (length - activeItem.dimensions.length) * 0.2} ${240 + (height - activeItem.dimensions.height) * 0.3}
                        `} />
                      )}

                    </g>

                    {/* Dimension Annotation Lines & Text */}
                    {/* LENGTH INDICATOR */}
                    <g className="stroke-blue-200 fill-blue-200 stroke-[0.75] text-[10px] font-mono">
                      {/* Left arrow terminal */}
                      <line x1="80" y1="260" x2="320" y2="260" />
                      <polygon points="80,260 86,257 86,263" />
                      <polygon points="320,260 314,257 314,263" />
                      <text x="200" y="275" textAnchor="middle" className="fill-blue-300 font-bold border-none">
                        L: {length} cm
                      </text>
                    </g>

                    {/* HEIGHT INDICATOR */}
                    <g className="stroke-blue-200 fill-blue-200 stroke-[0.75] text-[10px] font-mono">
                      <line x1="55" y1="110" x2="55" y2="235" />
                      <polygon points="55,110 52,116 58,116" />
                      <polygon points="55,235 52,229 58,229" />
                      <text x="42" y="175" textAnchor="middle" transform="rotate(-90 42 175)" className="fill-blue-300 font-bold">
                        H: {height} cm
                      </text>
                    </g>

                    {/* WIDTH INDICATOR (isometric represent detail) */}
                    <g className="stroke-blue-200 fill-blue-200 stroke-[0.75] text-[10px] font-mono">
                      <line x1="335" y1="120" x2="365" y2="150" />
                      <polygon points="335,120 342,121 338,125" />
                      <polygon points="365,150 358,149 362,145" />
                      <text x="368" y="132" textAnchor="start" className="fill-blue-400 font-bold">
                        W: {width} cm
                      </text>
                    </g>

                  </g>
                </svg>

                {/* Micro tech logging overlay as architectural honesty */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-blue-300/60 flex flex-col space-y-0.5">
                  <span>MODEL ID_V.009</span>
                  <span>SURFACE_TENSION: SEAMLESS</span>
                  <span>ANGLE_ORTHOGONAL: TRUE</span>
                </div>
              </div>

            </div>

            {/* Spec descriptions checklist below SVG blueprint mapping out structural limits */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#EBE6DC]/80">
              
              <div className="text-left bg-[#F5F2EB]/40 p-3">
                <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block mb-1">
                  ESTIMATED MASS
                </span>
                <span className="font-mono text-sm text-[#2C2A29] font-bold">
                  {Math.round(45 * (length / activeItem.dimensions.length) * (width / activeItem.dimensions.width))} kgs
                </span>
              </div>

              <div className="text-left bg-[#F5F2EB]/40 p-3">
                <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block mb-1">
                  TIMBER DENSITY
                </span>
                <span className="font-mono text-sm text-[#2C2A29] font-bold">
                  720 kgs/m³
                </span>
              </div>

              <div className="text-left bg-[#F5F2EB]/40 p-3">
                <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block mb-1">
                  CARPENTRY HOURS
                </span>
                <span className="font-mono text-sm text-[#2C2A29] font-bold">
                  {Math.round(24 + (length / 8))} hrs
                </span>
              </div>

              <div className="text-left bg-[#F5F2EB]/40 p-3">
                <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block mb-1">
                  FREIGHT VOLUME
                </span>
                <span className="font-mono text-sm text-[#2C2A29] font-bold">
                  {((length * width * height) / 1000000).toFixed(2)} m³
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT: PHYSICAL CONTROLS FORM (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-[#EBE6DC] bg-[#FDFBF7] p-6 lg:p-8">
            
            <form onSubmit={handleInquire} className="space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-5">
                
                {/* 1. SELECT FURNITURE MODEL CONTAINER */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8476] tracking-widest mb-1.5 font-bold">
                    1. SELECT ACTIVE FRAME PIECE
                  </label>
                  <div className="relative">
                    <select
                      value={selectedItemId}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] hover:border-[#8C8476] px-3.5 py-3 text-xs tracking-wider text-[#2C2A29] rounded-none outline-hidden cursor-pointer appearance-none uppercase font-semibold"
                    >
                      {HIGH_END_FURNITURE.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name} — (Base: ${f.price.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B655B]">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* 2. ADJUST DIMENSIONS CONTROLS CONTAINER */}
                <div className="bg-[#F5F2EB]/45 p-4 border border-[#EBE6DC]/85 space-y-4">
                  <span className="block text-[10.5px] font-mono uppercase text-[#2C2A29] tracking-wider border-b border-[#EBE6DC]/40 pb-1.5 font-bold">
                    2. CALIBRATE STRUCTURAL RATIOS
                  </span>
                  
                  {/* Length Slider bar */}
                  <div>
                    <div className="flex justify-between items-baseline text-[11px] font-sans text-[#4A4740] mb-1">
                      <span className="font-mono uppercase tracking-wider text-[#8C8476]">Total Length</span>
                      <span className="font-semibold text-[#2C2A29]">{length} cm / {(length / 30.48).toFixed(1)} ft</span>
                    </div>
                    <input
                      type="range"
                      min={limits.length.min}
                      max={limits.length.max}
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#EBE6DC] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                    />
                    <div className="flex justify-between text-[8.5px] font-mono text-[#A69E90] mt-1">
                      <span>MIN: {limits.length.min}cm</span>
                      <span>MAX: {limits.length.max}cm</span>
                    </div>
                  </div>

                  {/* Width Slider bar */}
                  <div>
                    <div className="flex justify-between items-baseline text-[11px] font-sans text-[#4A4740] mb-1">
                      <span className="font-mono uppercase tracking-wider text-[#8C8476]">Sectional Width</span>
                      <span className="font-semibold text-[#2C2A29]">{width} cm</span>
                    </div>
                    <input
                      type="range"
                      min={limits.width.min}
                      max={limits.width.max}
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#EBE6DC] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                    />
                    <div className="flex justify-between text-[8.5px] font-mono text-[#A69E90] mt-1">
                      <span>MIN: {limits.width.min}cm</span>
                      <span>MAX: {limits.width.max}cm</span>
                    </div>
                  </div>

                  {/* Height Slider bar */}
                  <div>
                    <div className="flex justify-between items-baseline text-[11px] font-sans text-[#4A4740] mb-1">
                      <span className="font-mono uppercase tracking-wider text-[#8C8476]">Vertical Height</span>
                      <span className="font-semibold text-[#2C2A29]">{height} cm</span>
                    </div>
                    <input
                      type="range"
                      min={limits.height.min}
                      max={limits.height.max}
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="w-full h-1 bg-[#EBE6DC] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                    />
                    <div className="flex justify-between text-[8.5px] font-mono text-[#A69E90] mt-1">
                      <span>MIN: {limits.height.min}cm</span>
                      <span>MAX: {limits.height.max}cm</span>
                    </div>
                  </div>

                </div>

                {/* 3. HARDWARE & SURFACE SWATCH PICKERS FOR SOFAS OR TABLES */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {activeItem.metals.length > 0 && activeItem.metals[0] !== 'None' ? (
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-[#8C8476] mb-1 font-bold">
                        ACCENT METAL
                      </label>
                      <select
                        value={selectedMetal}
                        onChange={(e) => setSelectedMetal(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#EBE6DC] hover:border-[#8C8476] px-2.5 py-2.5 text-xs text-[#2C2A29] rounded-none"
                      >
                        {activeItem.metals.map(mt => (
                          <option key={mt} value={mt}>{mt}</option>
                        ))}
                      </select>
                    </div>
                  ) : <div className="hidden" />}

                  {activeItem.woods.length > 0 && activeItem.woods[0] !== 'None' ? (
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-[#8C8476] mb-1 font-bold">
                        WOOD GRAIN FRAME
                      </label>
                      <select
                        value={selectedWood}
                        onChange={(e) => setSelectedWood(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#EBE6DC] hover:border-[#8C8476] px-2.5 py-2.5 text-xs text-[#2C2A29] rounded-none"
                      >
                        {activeItem.woods.map(wd => (
                          <option key={wd} value={wd}>{wd}</option>
                        ))}
                      </select>
                    </div>
                  ) : <div className="hidden" />}

                </div>

                {/* Special customization instructions */}
                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] tracking-wider mb-1.5 font-semibold">
                    SPECIAL ORDER REQUIREMENT NOTE
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Alter length to exactly 235.5cm, or match thread stitch dye block details to hex #C4B29E..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden p-3 text-xs rounded-none text-[#2C2A29]"
                  />
                </div>

              </div>

              {/* ESTIMATE CUMULATIVE PRICE SUMMARY ACTION CARD */}
              <div className="bg-[#2C2A29] p-5 text-left border border-neutral-800 text-[#FDFBF7]">
                
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-serif italic text-sm text-neutral-300">Custom Order Price</span>
                  <div className="flex flex-col items-end">
                    <span id="customizer-calculated-price" className="font-display text-2xl font-light text-[#C5A880]">
                      ${calculatedPrice.toLocaleString()}
                    </span>
                    <span className="font-mono text-[8px] text-neutral-400">CARPENTRY & TIMBER VALUE</span>
                  </div>
                </div>

                <p className="font-sans text-[10px] text-neutral-400 mb-6 leading-relaxed">
                  Price aligns with current material stock logs and length modifications. 
                  Includes matching certified organic upholstery wraps. No unlisted dynamic premiums apply.
                </p>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#b0946d] text-[#2C2A29] hover:text-[#2C2A29] rounded-none font-display text-[10.5px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer text-center block"
                >
                  Book Inquire Build Specification
                </button>

                {successNotify && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center justify-center space-x-1.5 text-green-400 font-mono text-[10px] bg-neutral-800 p-2 border border-[#C5A880]/30"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Specification dispatch received! Added to portfolio in upper Dashboard drawer.</span>
                  </motion.div>
                )}

              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
