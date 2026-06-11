import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Sliders, MapPin, Compass, ArrowDown, 
  MessageSquare, CalendarCheck, HelpCircle, ShieldAlert 
} from 'lucide-react';
import { 
  ActiveAtelierItem, SavedAtelierRoom, 
  ConsultationBooking, GoogleReview, FurnitureItem, CustomConfig 
} from './types';

// Importing sub-components
import Navbar from './components/Navbar';
import Atelier from './components/Atelier';
import Catalog from './components/Catalog';
import Customizer from './components/Customizer';
import Reviews from './components/Reviews';
import Consultation from './components/Consultation';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  // State elements syncing with localStorage
  const [savedRooms, setSavedRooms] = useState<SavedAtelierRoom[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [customReviews, setCustomReviews] = useState<GoogleReview[]>([]);
  
  // Ref links / trigger channels
  const [restoreRoomContext, setRestoreRoomContext] = useState<ActiveAtelierItem[] | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedRooms = localStorage.getItem('bottega9_saved_rooms');
      if (storedRooms) setSavedRooms(JSON.parse(storedRooms));

      const storedBookings = localStorage.getItem('bottega9_bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));

      const storedReviews = localStorage.getItem('bottega9_reviews');
      if (storedReviews) setCustomReviews(JSON.parse(storedReviews));
    } catch (e) {
      console.error('Failed to parse storage elements', e);
    }
  }, []);

  // Save room workspace
  const handleSaveRoom = (name: string, background: 'studio' | 'parisian' | 'concrete', items: ActiveAtelierItem[]) => {
    const newRoom: SavedAtelierRoom = {
      id: `room-${Date.now()}`,
      name,
      background,
      items,
      createdAt: new Date().toISOString()
    };
    const updated = [newRoom, ...savedRooms];
    setSavedRooms(updated);
    localStorage.setItem('bottega9_saved_rooms', JSON.stringify(updated));
  };

  // Delete saved room
  const handleDeleteRoom = (id: string) => {
    const updated = savedRooms.filter(r => r.id !== id);
    setSavedRooms(updated);
    localStorage.setItem('bottega9_saved_rooms', JSON.stringify(updated));
  };

  // Add booking
  const handleAddBooking = (newBooking: ConsultationBooking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('bottega9_bookings', JSON.stringify(updated));
  };

  // Cancel booking
  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bottega9_bookings', JSON.stringify(updated));
  };

  // Add user review
  const handleAddReview = (newReview: GoogleReview) => {
    const updated = [newReview, ...customReviews];
    setCustomReviews(updated);
    localStorage.setItem('bottega9_reviews', JSON.stringify(updated));
  };

  // Restore room canvas from dashboard drawer
  const handleLoadSavedRoomIntoCanvas = (roomSpecObj: SavedAtelierRoom) => {
    setRestoreRoomContext([...roomSpecObj.items]);
    
    // Auto scroll down to atelier section
    const el = document.getElementById('atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Teleportation interactions: Placing product from Catalog into the Atelier Sandbox
  const handlePlaceInAtelierSandbox = (item: FurnitureItem) => {
    // We can simulate adding via simulating state injection down to Atelier
    // We compose a temporary item layout and load it as canvas items
    const uid = `${item.id}-${Date.now().toString().slice(-4)}`;
    const freshPlacedItem: ActiveAtelierItem = {
      id: uid,
      itemId: item.id,
      name: item.name,
      image: item.image,
      x: 35 + Math.random() * 20,
      y: 35 + Math.random() * 20,
      scale: 1.0,
      rotation: 0,
      material: item.materials.length > 0 && item.materials[0] !== 'None' ? item.materials[0] : 'None',
      wood: item.woods.length > 0 && item.woods[0] !== 'None' ? item.woods[0] : 'None'
    };

    // Append to existing placed items or replace if empty
    setRestoreRoomContext((prev) => {
      if (prev) return [...prev, freshPlacedItem];
      return [freshPlacedItem];
    });

    // Scroll to Atelier stage
    const el = document.getElementById('atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Teleportation interactions: Customizing a catalog item inside the exact craftsman workspace
  const handleCustomiseProductInWorkshop = (item: FurnitureItem) => {
    // Select this product in the Customizer dropdown and scroll
    const dropdown = document.querySelector('#craftsman select') as HTMLSelectElement;
    if (dropdown) {
      dropdown.value = item.id;
      // Trigger a synthetic change event so React state updates
      const event = new Event('change', { bubbles: true });
      dropdown.dispatchEvent(event);
    }
    
    // Scroll down to Craftsman Customizer
    const el = document.getElementById('craftsman');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle active scroll sections spying
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['atelier', 'catalog', 'craftsman', 'reviews', 'consultation'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] selection:bg-[#C5A880]/30 selection:text-[#2C2A29] antialiased">
      
      {/* 1. TOP STICKY PREMIUM NAVIGATION */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        savedRooms={savedRooms}
        bookings={bookings}
        onLoadRoom={handleLoadSavedRoomIntoCanvas}
        onDeleteRoom={handleDeleteRoom}
        onCancelBooking={handleCancelBooking}
      />

      {/* 2. MAJESTIC JOURNAL HERO BANNERS COVER */}
      <section id="hero" className="min-h-screen pt-28 pb-16 flex flex-col justify-between px-6 md:px-12 relative overflow-hidden bg-[#FDFBF7] border-b border-[#EBE6DC]">
        
        {/* Subtle grid background nodes */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: 'radial-gradient(ellipse at center, #2C2A29 1px, transparent 1.5px)',
               backgroundSize: '24px 24px'
             }}
        />

        {/* Content row */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          
          {/* Hero text frame (5 columns) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 bg-[#F5F2EB] px-3.5 py-1.5 border border-[#EBE6DC]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]/15" />
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-[#8C8476] font-semibold">
                MADHYA MARG CHANDIGARH SHOWROOM
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-[#2C2A29] leading-[1.08]">
              Form.<br />
              Timber.<br />
              <span className="font-light italic text-[#C5A880]">Tactility.</span>
            </h1>

            <p className="font-sans text-[#6B655B] text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Bottega9 is a luxury boutique furniture atelier. 
              We craft exquisite, architectural bespoke home pieces emphasizing minimalist Italian form and solid wood joinery. 
              Customize sizing down to the millimeter and upholstery down to the stitching.
            </p>

            {/* Quick action shortcuts */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => {
                  const el = document.getElementById('atelier');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4.5 bg-[#2C2A29] text-white hover:bg-[#C5A880] duration-300 font-display text-[10.5px] uppercase tracking-[0.2em] font-semibold tracking-wider rounded-none cursor-pointer"
              >
                Launch Room Atelier
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4.5 border border-[#4A4740] hover:border-[#C5A880] hover:text-[#C5A880] text-[#2C2A29] duration-300 font-display text-[10.5px] uppercase tracking-[0.2em] font-semibold tracking-wider rounded-none cursor-pointer"
              >
                View Curated Collections
              </button>
            </div>

          </div>

          {/* Hero showroom photo asset (7 columns) */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] md:h-[500px] border border-[#EBE6DC] overflow-hidden p-3 bg-[#FDFBF7]">
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-stone-50">
              <img
                src="/src/assets/images/hero_showroom_1781155923109.png"
                alt="Bottega9 Premium Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
              
              {/* Overlay styling attributes */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,42,41,0.2),transparent_60%)]" />
              
              {/* Showroom metadata specs card */}
              <div className="absolute bottom-6 left-6 bg-[#FDFBF7]/90 border border-[#EBE6DC] p-4 font-mono text-[9.5px] tracking-wider text-[#2C2A29] max-w-[280px] backdrop-blur-md hidden sm:block">
                <span className="font-bold text-[#C5A880] block mb-0.5 uppercase tracking-[0.15em]">
                  THE ATELIER GRID
                </span>
                <p className="font-sans text-[11px] leading-normal text-[#6B655B] font-medium">
                  Featuring solid Smoked Oak modular pillars, Ivory Bouclé texturing, and interlocking Italian Travertine stones.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Operating attributes shelf */}
        <div className="max-w-7xl mx-auto w-full pt-10 border-t border-[#EBE6DC]/85 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center select-none">
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-display text-[9px] uppercase tracking-[0.2em] font-bold text-[#C5A880] mb-0.5">IN-STORE SHOPPING</span>
            <span className="font-sans text-xs text-[#8C8476]">Browse collections in Chandigarh Sector 7-C</span>
          </div>
          <div className="flex flex-col items-center sm:items-start border-y sm:border-y-0 sm:border-x border-[#EBE6DC]/80 py-4 sm:py-0 sm:px-6">
            <span className="font-display text-[9px] uppercase tracking-[0.2em] font-bold text-[#C5A880] mb-0.5">IN-STORE PICKUP</span>
            <span className="font-sans text-xs text-[#8C8476]">Pickup your custom specifications scoping</span>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:pl-6">
            <span className="font-display text-[9px] uppercase tracking-[0.2em] font-bold text-[#C5A880] mb-0.5">LOCAL &amp; GLOBAL DELIVERY</span>
            <span className="font-sans text-xs text-[#8C8476]">Secure freight transit for heavy architectural items</span>
          </div>
        </div>

      </section>

      {/* 3. ATELIER ROOM PLANNER COMPONENT */}
      <Atelier
        savedRooms={savedRooms}
        onSaveRoom={handleSaveRoom}
        onRestoreRoom={restoreRoomContext}
        resetRestoreRoom={() => setRestoreRoomContext(null)}
      />

      {/* 4. MAGAZINE STYLE PRODUCT CATALOG */}
      <Catalog
        onPlaceInAtelier={handlePlaceInAtelierSandbox}
        onCustomiseItem={handleCustomiseProductInWorkshop}
      />

      {/* 5. PHYSICAL CUSTOMIZER Blueprint WORKSHOP */}
      <Customizer
        onAddInquiry={(config) => {
          // Store inquiries in list so we have records
          try {
            const stored = localStorage.getItem('bottega9_bookings') || '[]';
            const parsed = JSON.parse(stored);
            const virtualBooking: ConsultationBooking = {
              id: `inquiry-sh-${Date.now()}`,
              fullName: `Inquiry: ${config.name}`,
              email: `Dimensions Specs: ${config.length}L x ${config.width}W x ${config.height}H cm`,
              phone: `Est. Price: $${config.price.toLocaleString()}`,
              date: new Date().toLocaleDateString(),
              time: 'Bespoke Order',
              type: 'virtual',
              projectDetails: `Special Requirements Note: ${config.notes || 'None Specified'}. Material Selected: ${config.material}. Wood: ${config.wood}. metal alloy: ${config.metal}.`,
              createdAt: new Date().toISOString()
            };
            const updated = [virtualBooking, ...parsed];
            setBookings(updated);
            localStorage.setItem('bottega9_bookings', JSON.stringify(updated));
          } catch(e) {
            console.error(e);
          }
        }}
      />

      {/* 6. EDITORIAL TESTIMONIES REVIEWS SECTION */}
      <Reviews
        customReviews={customReviews}
        onAddReview={handleAddReview}
      />

      {/* 7. SCHEDULING PRIVATE APPOINTMENT SLOTS */}
      <Consultation
        onAddBooking={handleAddBooking}
      />

      {/* 8. BRAND DIRECTORY FOOTER */}
      <Footer
        onScrollToTop={handleScrollToTop}
      />

    </div>
  );
}
