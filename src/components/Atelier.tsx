import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, RotateCw, Maximize2, Trash2, Plus, 
  MapPin, CheckCircle, Info, Heart, Layers, Sliders, ChevronDown 
} from 'lucide-react';
import { FurnitureItem, ActiveAtelierItem, SavedAtelierRoom } from '../types';
import { HIGH_END_FURNITURE, ROOM_BACKGROUNDS } from '../data';

interface AtelierProps {
  savedRooms: SavedAtelierRoom[];
  onSaveRoom: (name: string, background: 'studio' | 'parisian' | 'concrete', items: ActiveAtelierItem[]) => void;
  onRestoreRoom: ActiveAtelierItem[] | null;
  resetRestoreRoom: () => void;
}

export default function Atelier({
  savedRooms,
  onSaveRoom,
  onRestoreRoom,
  resetRestoreRoom
}: AtelierProps) {
  // Configured room items
  const [placedItems, setPlacedItems] = useState<ActiveAtelierItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ActiveAtelierItem | null>(null);
  const [bgStyle, setBgStyle] = useState<'studio' | 'parisian' | 'concrete'>('studio');
  const [newRoomName, setNewRoomName] = useState('');
  const [isSavedNotify, setIsSavedNotify] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // If a room is restored from parent (e.g. navbar clicks)
  if (onRestoreRoom && onRestoreRoom.length > 0) {
    setPlacedItems(onRestoreRoom);
    if (onRestoreRoom.length > 0) {
      setSelectedItem(onRestoreRoom[0]);
    }
    resetRestoreRoom();
  }

  // Handle adding furniture to canvas
  const handleAddFurniture = (item: FurnitureItem) => {
    // Generate a unique ID
    const uniqueId = `${item.id}-${Date.now().toString().slice(-6)}`;
    const newItem: ActiveAtelierItem = {
      id: uniqueId,
      itemId: item.id,
      name: item.name,
      image: item.image,
      x: 35 + Math.random() * 15, // centered random
      y: 35 + Math.random() * 15,
      scale: 1.0,
      rotation: 0,
      material: item.materials.length > 0 ? item.materials[0] : 'None',
      wood: item.woods.length > 0 ? item.woods[0] : 'None'
    };

    setPlacedItems(prev => [...prev, newItem]);
    setSelectedItem(newItem);
  };

  // Modify active item state
  const updatePlacedItem = (id: string, updates: Partial<ActiveAtelierItem>) => {
    setPlacedItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        if (selectedItem?.id === id) {
          setSelectedItem(updated);
        }
        return updated;
      }
      return item;
    }));
  };

  // Delete placed item
  const handleDeleteItem = (id: string) => {
    setPlacedItems(prev => prev.filter(item => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Drag item in container boundary (click fallback / slider coordinates for cross platform accessibility)
  const handleMoveSlider = (axis: 'x' | 'y', val: number) => {
    if (!selectedItem) return;
    updatePlacedItem(selectedItem.id, { [axis]: val });
  };

  // Calculate Cumulative cost of room
  const calculateCumulativeTotal = () => {
    return placedItems.reduce((acc, curr) => {
      const match = HIGH_END_FURNITURE.find(f => f.id === curr.itemId);
      const basePrice = match ? match.price : 0;
      
      // Add price premium based on bespoke choices
      let premium = 0;
      if (curr.material && curr.material !== 'None' && !curr.material.includes('Standard') && !curr.material.includes('Travertine')) {
        premium += 150; // Custom textiles add upholstery craft pricing
      }
      if (curr.wood && curr.wood !== 'None' && curr.wood.toLowerCase().includes('walnut')) {
        premium += 200; // Walnut cabinetry timber premium
      }
      
      return acc + basePrice + premium;
    }, 0);
  };

  // Save current config to localStorage
  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || placedItems.length === 0) return;
    onSaveRoom(newRoomName, bgStyle, placedItems);
    setNewRoomName('');
    setIsSavedNotify(true);
    setTimeout(() => {
      setIsSavedNotify(false);
    }, 3000);
  };

  // Find original item specs for details list
  const selectedOriginalItem = selectedItem 
    ? HIGH_END_FURNITURE.find(f => f.id === selectedItem.itemId) 
    : null;

  return (
    <section id="atelier" className="py-24 px-6 md:px-12 bg-[#F5F2EB]/45 border-b border-[#EBE6DC] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2.5 mb-2">
            <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
            <span className="font-display text-[10px] uppercase tracking-[0.3em] font-medium text-[#A69E90]">
              Virtual Canvas Layout Room
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight mb-4">
            The Design Atelier
          </h2>
          <p className="font-sans text-[#6B655B] max-w-2xl text-sm leading-relaxed">
            Every room tells a story. Select your base architectural background, drop handcrafted elements, 
            and customize premium upholstery textures and wood veneers relative to real scale. 
            Compile an active physical floor layout of custom Chandigarh bespoke art.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ROOM DESIGN CANVAS STAGE (8 COLS) */}
          <div className="xl:col-span-8 flex flex-col space-y-4">
            
            {/* Stage Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FDFBF7] p-3 border border-[#EBE6DC] shadow-xs">
              <div className="flex items-center space-x-1.5">
                <span className="font-display text-[10px] uppercase tracking-wider text-[#8C8476]">
                  Active Environment:
                </span>
                <span className="text-xs font-semibold text-[#2C2A29]">
                  {ROOM_BACKGROUNDS[bgStyle].name}
                </span>
              </div>
              
              {/* Backdrops selector tab */}
              <div className="flex space-x-1 border-l border-[#EBE6DC] pl-3">
                {(Object.keys(ROOM_BACKGROUNDS) as Array<keyof typeof ROOM_BACKGROUNDS>).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBgStyle(bg)}
                    className={`px-3 py-1 text-[10px] font-display uppercase tracking-wider transition-all cursor-pointer ${
                      bgStyle === bg 
                        ? 'bg-[#2C2A29] text-white font-medium' 
                        : 'bg-transparent text-[#6B655B] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Canvas */}
            <div 
              ref={canvasRef}
              id="atelier-room-canvas"
              className={`h-[480px] sm:h-[550px] relative transition-colors duration-500 rounded-none flex items-center justify-center overflow-hidden ${ROOM_BACKGROUNDS[bgStyle].class}`}
            >
              {placedItems.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FDFBF7]/40 backdrop-blur-3xs z-10">
                  <div className="w-12 h-12 rounded-full border border-[#DCD5C9] bg-[#FDFBF7] flex items-center justify-center mb-4 text-[#C5A880] animate-pulse">
                    <Layers className="w-5 h-5 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#2C2A29] mb-1">Your Space Canvas is Empty</h3>
                  <p className="font-sans text-xs text-[#8C8476] max-w-sm">
                    Select any piece from the library sidebar below to drop it into this sandbox floor space.
                  </p>
                </div>
              ) : null}

              {/* Render Placed Items */}
              {placedItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    id={`placed-item-${item.id}`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent canvas click from deselecting
                      setSelectedItem(item);
                    }}
                    animate={{ 
                      scale: item.scale,
                      rotate: item.rotation,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className={`absolute cursor-move select-none p-2 transition-all ${
                      isSelected 
                        ? 'ring-2 ring-[#C5A880]/90 bg-[#FDFBF7]/90 shadow-md backdrop-blur-3xs z-20' 
                        : 'hover:ring-1 hover:ring-[#C5A880]/45 z-10 bg-transparent'
                    }`}
                  >
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center overflow-hidden pointer-events-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    {/* Tiny visual identity tag underneath item */}
                    {isSelected && (
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#2C2A29] text-white text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 whitespace-nowrap shadow-sm z-30">
                        {item.name}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Background architectural details overlay context description */}
              <div className="absolute bottom-3 left-4 max-w-xs text-[10px] font-mono text-[#8C8476] leading-relaxed hidden sm:block">
                <span>ENVIRONMENT SPEC:</span>
                <p className="font-sans italic">{ROOM_BACKGROUNDS[bgStyle].description}</p>
              </div>
            </div>

            {/* Furniture Picker Catalog (Horizontal scroll under canvas for ease of click additions) */}
            <div>
              <h3 className="font-display text-[10px] uppercase tracking-[0.25em] text-[#8C8476] mb-3 flex items-center space-x-1.5">
                <span>FURNITURE ATELIER INVENTORY</span>
                <span className="text-[9px] font-mono lowercase">({HIGH_END_FURNITURE.length} premium models loaded)</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {HIGH_END_FURNITURE.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddFurniture(item)}
                    className="p-3 border border-[#EBE6DC] bg-[#FDFBF7] hover:border-[#C5A880] text-left transition-all duration-300 group flex flex-col justify-between h-[135px] relative hover:shadow-xs cursor-pointer"
                  >
                    <div className="w-full h-11 flex items-center justify-center mb-1 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 duration-300"
                      />
                    </div>
                    
                    <div>
                      <div className="text-[10px] font-mono text-[#A69E90] uppercase tracking-wide capitalize">
                        {item.category}
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-[#2C2A29] line-clamp-1 leading-tight mb-1 group-hover:text-[#C5A880]">
                        {item.name}
                      </h4>
                      <div className="font-mono text-[10px] font-bold text-[#8C8476]">
                        ${item.price.toLocaleString()}
                      </div>
                    </div>
                    
                    <span className="absolute bottom-2.5 right-2.5 w-4 h-4 bg-[#F5F2EB] group-hover:bg-[#C5A880] group-hover:text-white rounded-none flex items-center justify-center text-[#8C8476] text-xs transition-colors">
                      <Plus className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: CONTROLS & SPECIFICATION SIDE PANEL (4 COLS) */}
          <div className="xl:col-span-4 flex flex-col space-y-6">
            
            {/* Selected item configuration panel */}
            <div className="bg-[#FDFBF7] border border-[#EBE6DC] p-6 shadow-sm flex flex-col justify-between">
              
              <div className="pb-4 border-b border-[#EBE6DC] mb-5">
                <h3 className="font-display text-xs uppercase tracking-[0.2em] text-[#A69E90] mb-2">
                  CUSTOMIZATION MODULE
                </h3>
                {selectedItem ? (
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[8px] uppercase font-mono tracking-wider bg-[#C5A880]/15 text-[#9E825A] px-2 py-0.5 rounded-none inline-block mb-1">
                        Placed in {bgStyle}
                      </span>
                      <h4 className="font-serif text-xl font-medium text-[#2C2A29]">
                        {selectedItem.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(selectedItem.id)}
                      className="p-1 px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900 duration-300 flex items-center text-[10px] font-mono tracking-wide rounded-none"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> EXCISE
                    </button>
                  </div>
                ) : (
                  <p className="font-sans text-xs italic text-[#8C8476]">
                    Select any piece on the space stage canvas to configure its physical properties.
                  </p>
                )}
              </div>

              {selectedItem && selectedOriginalItem ? (
                <div className="space-y-6">
                  
                  {/* XY Spatial Micro alignment sliders (cross device backup styling helper) */}
                  <div className="space-y-3 bg-[#F5F2EB]/50 p-4 border border-[#EBE6DC]/60">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8476] border-b border-[#EBE6DC]/40 pb-1.5">
                      <span className="flex items-center">
                        <Sliders className="w-3.5 h-3.5 mr-1 text-[#C5A880]" /> CANVAS POSITIONING
                      </span>
                      <span>Coordinates</span>
                    </div>
                    
                    {/* X Location */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-[#4A4740] mb-1">
                        <span>Horiz (X axis)</span>
                        <span>{Math.round(selectedItem.x)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="90" 
                        value={selectedItem.x}
                        onChange={(e) => handleMoveSlider('x', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-[#EBE6DC] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                      />
                    </div>

                    {/* Y Location */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-[#4A4740] mb-1">
                        <span>Vertic (Y axis)</span>
                        <span>{Math.round(selectedItem.y)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="90" 
                        value={selectedItem.y}
                        onChange={(e) => handleMoveSlider('y', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-[#EBE6DC] rounded-none appearance-none cursor-pointer accent-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Orientation & scale dials */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-[10px] font-mono uppercase text-[#8C8476] tracking-wider mb-1.5">
                        <RotateCw className="w-3 h-3 mr-1 text-[#C5A880]" /> Rotation (deg)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={selectedItem.rotation}
                          onChange={(e) => updatePlacedItem(selectedItem.id, { rotation: parseInt(e.target.value) })}
                          className="w-full h-1 bg-[#EBE6DC] rounded-none appearance-none accent-[#C5A880]"
                        />
                        <span className="font-mono text-[10px] text-[#4A4740] w-8 text-right bg-[#F5F2EB] py-0.5 px-1 font-bold">
                          {selectedItem.rotation}°
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-[10px] font-mono uppercase text-[#8C8476] tracking-wider mb-1.5">
                        <Maximize2 className="w-3 h-3 mr-1 text-[#C5A880]" /> Aspect Scale(x)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0.5"
                          max="1.5"
                          step="0.05"
                          value={selectedItem.scale}
                          onChange={(e) => updatePlacedItem(selectedItem.id, { scale: parseFloat(e.target.value) })}
                          className="w-full h-1 bg-[#EBE6DC] rounded-none appearance-none accent-[#C5A880]"
                        />
                        <span className="font-mono text-[10px] text-[#4A4740] w-12 text-right bg-[#F5F2EB] py-0.5 px-1 font-bold">
                          {selectedItem.scale.toFixed(2)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Material Option Swatches */}
                  {selectedOriginalItem.materials.length > 0 && selectedOriginalItem.materials[0] !== 'None' && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-[#8C8476] tracking-wider">
                          Upholstery textile
                        </span>
                        <span className="font-sans text-[10.5px] text-[#2C2A29] font-medium italic">
                          {selectedItem.material}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {selectedOriginalItem.materials.map((mat) => {
                          const isActive = selectedItem.material === mat;
                          return (
                            <button
                              key={mat}
                              onClick={() => updatePlacedItem(selectedItem.id, { material: mat })}
                              className={`px-3 py-1.5 text-[10.5px] font-sans border transition-all cursor-pointer ${
                                isActive 
                                  ? 'bg-[#2C2A29] text-white border-[#2C2A29]' 
                                  : 'bg-[#FDFBF7] text-[#6B655B] border-[#EBE6DC] hover:border-[#8C8476]'
                              }`}
                            >
                              {mat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Wood Frame Selector Swatches */}
                  {selectedOriginalItem.woods.length > 0 && selectedOriginalItem.woods[0] !== 'None' && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-[#8C8476] tracking-wider">
                          Hand-spliced woodwork wood
                        </span>
                        <span className="font-sans text-[10.5px] text-[#2C2A29] font-medium italic">
                          {selectedItem.wood}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {selectedOriginalItem.woods.map((wd) => {
                          const isActive = selectedItem.wood === wd;
                          return (
                            <button
                              key={wd}
                              onClick={() => updatePlacedItem(selectedItem.id, { wood: wd })}
                              className={`px-3 py-1.5 text-[10.5px] font-sans border transition-all cursor-pointer ${
                                isActive 
                                  ? 'bg-[#C5A880] text-white border-[#C5A880]' 
                                  : 'bg-[#FDFBF7] text-[#6B655B] border-[#EBE6DC] hover:border-[#8C8476]'
                              }`}
                            >
                              {wd}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Engineering specs checklist box */}
                  <div className="p-4 bg-[#F5F2EB]/50 border border-[#EBE6DC] space-y-2">
                    <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block mb-1 font-semibold">
                      ENGINEERING SPECIFICATIONS
                    </span>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[11px] font-mono text-[#6B655B]">
                      <div>Item ID: <span className="text-[#2C2A29] font-semibold">{selectedItem.itemId}</span></div>
                      <div>Base Code: <span className="text-[#2C2A29] font-semibold">B9-M{selectedOriginalItem.id.slice(-2)}</span></div>
                      <div className="col-span-2 border-t border-[#EBE6DC]/40 pt-1.5">
                        Custom Size: <span className="text-[#2C2A29] font-semibold">
                          {Math.round(selectedOriginalItem.dimensions.length * selectedItem.scale)} L x {Math.round(selectedOriginalItem.dimensions.width * selectedItem.scale)} W cm
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ) : null}

            </div>

            {/* Combined cumulative workspace quote box */}
            <div className="bg-[#2C2A29] text-[#FDFBF7] p-6 shadow-sm border border-neutral-800 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                    STUDIO ASSEMBLY LOG
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between py-2 border-b border-neutral-700">
                  <span className="font-sans text-xs text-neutral-400">Total Elements Placed</span>
                  <span className="font-mono text-sm text-white font-bold">{placedItems.length} pieces</span>
                </div>

                {placedItems.length > 0 ? (
                  <div className="max-h-36 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-neutral-700">
                    {placedItems.map((pi, idx) => {
                      const origin = HIGH_END_FURNITURE.find(f => f.id === pi.itemId);
                      const basePrice = origin ? origin.price : 0;
                      let added = 0;
                      if (pi.material !== 'None' && !pi.material.includes('Standard') && !pi.material.includes('Travertine')) added += 150;
                      if (pi.wood !== 'None' && pi.wood.toLowerCase().includes('walnut')) added += 200;
                      return (
                        <div key={pi.id} className="flex justify-between items-center text-[10.5px] font-mono text-neutral-300">
                          <span className="truncate max-w-[200px]">
                            {idx+1}. {pi.name} ({pi.material !== 'None' ? pi.material.split(' ')[0] : 'Stone'})
                          </span>
                          <span>${(basePrice + added).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-sans text-xs italic text-neutral-400 py-3">
                    No customized pieces active in current room.
                  </p>
                )}

                <div className="pt-4 border-t border-neutral-700 select-all">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-serif italic text-sm text-neutral-300">Assemble Quote (Est.)</span>
                    <span className="font-display text-2xl font-light text-[#C5A880]">
                      ${calculateCumulativeTotal().toLocaleString()}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest block text-right">
                    excluding taxes, matching GST & freight logistics
                  </span>
                </div>
              </div>

              {/* SAVE SPACE FORM WITH LOCALSTORAGE SLOTS */}
              {placedItems.length > 0 && (
                <form onSubmit={handleSaveWorkspace} className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    SAVE ASSEMBLY DESIGN SYSTEM
                  </label>
                  
                  <div className="flex">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chandigarh Penthouse"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="flex-1 bg-neutral-800/80 border border-neutral-700 outline-hidden px-3.5 py-2.5 text-xs text-white rounded-none focus:border-[#C5A880] transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#C5A880] hover:bg-[#b0946d] text-[#2C2A29] font-display text-[10px] uppercase tracking-wider font-semibold px-4 cursor-pointer duration-300"
                    >
                      Save Space
                    </button>
                  </div>

                  {isSavedNotify && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center space-x-1.5 text-green-400 font-mono text-[9.5px] pt-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Saved. Accessible in upper Dashboard!</span>
                    </motion.div>
                  )}
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
