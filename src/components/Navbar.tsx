import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Heart, Menu, X, ArrowRight, Eye } from 'lucide-react';
import { SavedAtelierRoom, ConsultationBooking } from '../types';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  savedRooms: SavedAtelierRoom[];
  bookings: ConsultationBooking[];
  onLoadRoom: (room: SavedAtelierRoom) => void;
  onDeleteRoom: (id: string) => void;
  onCancelBooking: (id: string) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  savedRooms,
  bookings,
  onLoadRoom,
  onDeleteRoom,
  onCancelBooking,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);

  const menuItems = [
    { id: 'atelier', label: 'The Atelier' },
    { id: 'catalog', label: 'Curated Catalog' },
    { id: 'craftsman', label: 'Dimensional Craft' },
    { id: 'reviews', label: 'Atelier Stories' },
    { id: 'consultation', label: 'Styling Consultation' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    // Smooth scroll
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav id="app-navbar" className="fixed top-0 left-0 right-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE6DC] px-6 py-4 md:px-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="cursor-pointer group flex flex-col items-start"
          >
            <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#2C2A29] group-hover:text-[#C5A880] transition-colors duration-300">
              BOTTEGA<span className="font-sans font-normal text-lg tracking-normal ml-0.5 group-hover:text-[#C5A880] duration-300">9</span>
            </span>
            <span className="font-display text-[8px] uppercase tracking-[0.45em] text-[#A69E90] -mt-0.5">
              custom craftsmanship
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs tracking-[0.16em] uppercase transition-colors duration-300 relative py-1 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-[#C5A880] font-medium' 
                    : 'text-[#4A4740] hover:text-[#C5A880]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="navbar-active-indicator" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Activity Badges & Consultation Button (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => {
                setShowSavedDrawer(true);
              }}
              className="relative p-2 text-[#4A4740] hover:text-[#C5A880] transition-colors cursor-pointer"
              title="Saved Atelier canvasses"
            >
              <Heart className="w-5 h-5 stroke-[1.25]" />
              {savedRooms.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-white text-[9px] font-display font-medium rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#FDFBF7]">
                  {savedRooms.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setShowSavedDrawer(true);
              }}
              className="relative p-2 text-[#4A4740] hover:text-[#C5A880] transition-colors cursor-pointer mr-2"
              title="My Sessions"
            >
              <Calendar className="w-5 h-5 stroke-[1.25]" />
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2C2A29] text-white text-[9px] font-display font-medium rounded-full w-4.5 h-4.5 flex items-center justify-center border border-[#FDFBF7]">
                  {bookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('consultation')}
              className="font-display text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 border border-[#4A4740] bg-transparent hover:bg-[#2C2A29] hover:text-white hover:border-[#2C2A29] rounded-none transition-all duration-300 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setShowSavedDrawer(true)}
              className="relative p-2 text-[#4A4740] hover:text-[#C5A880]"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {savedRooms.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C5A880] text-white text-[8px] font-display font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {savedRooms.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#4A4740] hover:text-[#2C2A29]"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 bg-[#FDFBF7] px-6 flex flex-col justify-between pb-8 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left font-serif text-2xl font-light text-[#2C2A29] hover:text-[#C5A880] py-2 border-b border-[#EBE6DC]"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowSavedDrawer(true);
                }}
                className="w-full py-3 bg-[#EBE6DC] text-[#4A4740] font-display text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2"
              >
                <span>My Dashboard ({savedRooms.length + bookings.length})</span>
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </button>
              <button
                onClick={() => handleNavClick('consultation')}
                className="w-full py-4.5 bg-[#2C2A29] text-white font-display text-xs uppercase tracking-[0.2em] font-medium"
              >
                Private Consultation
              </button>
            </div>
          </motion.div>
        )}

        {/* Dashboard Slide-out Drawer */}
        {showSavedDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSavedDrawer(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] shadow-xl border-l border-[#EBE6DC] flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-[#EBE6DC] flex items-center justify-between bg-[#F5F2EB]">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#C5A880] fill-[#C5A880]/10" />
                  <span className="font-serif text-lg tracking-wide text-[#2C2A29]">My Atelier Dashboard</span>
                </div>
                <button
                  onClick={() => setShowSavedDrawer(false)}
                  className="p-1 text-[#4A4740] hover:text-[#2C2A29] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scroll */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Saved Atelier Rooms Section */}
                <div>
                  <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-[#A69E90] mb-4 flex items-center justify-between border-b border-[#EBE6DC]/60 pb-2">
                    <span>SAVED CANVAS CONTEXTS</span>
                    <span className="text-[#a69e90] font-mono text-[10px]">{savedRooms.length} Spaces</span>
                  </h3>
                  
                  {savedRooms.length === 0 ? (
                    <div className="py-6 px-4 border border-dashed border-[#EBE6DC] text-center text-[#A69E90]">
                      <p className="font-sans text-xs italic">No virtual rooms saved yet.</p>
                      <button
                        onClick={() => {
                          setShowSavedDrawer(false);
                          handleNavClick('atelier');
                        }}
                        className="mt-3 font-display text-[9px] uppercase tracking-wider text-[#C5A880] inline-flex items-center hover:underline"
                      >
                        Launch Atelier Designer <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedRooms.map((room) => (
                        <div 
                          key={room.id}
                          className="p-4 border border-[#EBE6DC] bg-[#FDFBF7] flex flex-col justify-between hover:border-[#C5A880] transition-colors group relative"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-sans text-sm font-semibold text-[#2C2A29]">{room.name}</h4>
                              <p className="font-mono text-[10px] text-[#A69E90] capitalize">Theme: {room.background}</p>
                            </div>
                            <span className="font-mono text-[9px] text-[#A69E90] bg-[#F5F2EB] px-2 py-0.5">
                              {room.items.length} items
                            </span>
                          </div>
                          
                          <p className="font-mono text-[9px] text-[#8C8476] mb-3">
                            Created: {new Date(room.createdAt).toLocaleDateString()}
                          </p>

                          <div className="flex items-center space-x-3 mt-1">
                            <button
                              onClick={() => {
                                onLoadRoom(room);
                                setShowSavedDrawer(false);
                                handleNavClick('atelier');
                              }}
                              className="font-display text-[9px] uppercase tracking-wider inline-flex items-center text-[#2C2A29] hover:text-[#C5A880] transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" /> Restore Canvas
                            </button>
                            <button
                              onClick={() => onDeleteRoom(room.id)}
                              className="font-display text-[9px] uppercase tracking-wider text-red-700 hover:text-red-900 ml-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Booked Consultations Section */}
                <div>
                  <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-[#A69E90] mb-4 flex items-center justify-between border-b border-[#EBE6DC]/60 pb-2">
                    <span>STYLING CONCURRENCES</span>
                    <span className="text-[#a69e90] font-mono text-[10px]">{bookings.length} Booked</span>
                  </h3>

                  {bookings.length === 0 ? (
                    <div className="py-6 px-4 border border-dashed border-[#EBE6DC] text-center text-[#A69E90]">
                      <p className="font-sans text-xs italic">No design consultations booked yet.</p>
                      <button
                        onClick={() => {
                          setShowSavedDrawer(false);
                          handleNavClick('consultation');
                        }}
                        className="mt-3 font-display text-[9px] uppercase tracking-wider text-[#C5A880] inline-flex items-center hover:underline"
                      >
                        Reserve Private Slot <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border border-[#EBE6DC] bg-[#FDFBF7] border-l-2 border-l-[#C5A880] flex flex-col hover:border-[#C5A880] transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="inline-block text-[8px] uppercase tracking-wider font-mono text-white bg-[#2C2A29] px-2 py-0.5 rounded-none mb-1">
                                {booking.type} Review
                              </span>
                              <h4 className="font-serif text-sm font-medium text-[#2C2A29] mt-0.5">
                                Boutique Session for {booking.fullName}
                              </h4>
                            </div>
                            <button
                              onClick={() => onCancelBooking(booking.id)}
                              className="text-red-700 hover:text-red-900 font-mono text-[10px]"
                            >
                              Cancel
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 my-2 bg-[#F5F2EB] p-2 text-[10px] font-mono text-[#4A4740]">
                            <div>Date: <span className="font-medium">{booking.date}</span></div>
                            <div>Time: <span className="font-medium">{booking.time}</span></div>
                          </div>

                          <p className="font-sans text-xs text-[#8C8476] mt-1 line-clamp-2 italic">
                            &ldquo;{booking.projectDetails || 'No additional details specified'}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              {/* Drawer Footer info */}
              <div className="p-6 bg-[#F5F2EB]/60 border-t border-[#EBE6DC]">
                <p className="font-display text-[9px] uppercase text-[#A69E90] tracking-widest text-center">
                  Bottega 9 Studio - Sector 7, Chandigarh
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
