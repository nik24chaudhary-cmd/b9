import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, Clock, CheckCircle, Video, Compass, 
  MapPin, ShieldCheck, Mail, Phone, User, Sparkles 
} from 'lucide-react';
import { ConsultationBooking } from '../types';

interface ConsultationProps {
  onAddBooking: (booking: ConsultationBooking) => void;
}

export default function Consultation({ onAddBooking }: ConsultationProps) {
  // Booking fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:30 AM');
  const [type, setType] = useState<'in-person' | 'virtual'>('in-person');
  const [projectDetails, setProjectDetails] = useState('');
  const [scope, setScope] = useState('Single Space Refinements');
  
  const [successNotify, setSuccessNotify] = useState(false);

  // Time slots (Bottega9 starts at 10:30 AM - reflecting real営業時間 opens at 10:30AM)
  const timeSlots = [
    '10:45 AM (Opening session)',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM (Atelier check-up)',
    '4:00 PM',
    '5:30 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !date) return;

    const newBooking: ConsultationBooking = {
      id: `booking-${Date.now()}`,
      fullName,
      email,
      phone,
      date,
      time,
      type,
      projectDetails: `${scope}. ${projectDetails}`,
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setSuccessNotify(true);
    
    // Clear
    setFullName('');
    setEmail('');
    setPhone('');
    setDate('');
    setProjectDetails('');
    
    setTimeout(() => {
      setSuccessNotify(false);
    }, 5000);
  };

  return (
    <section id="consultation" className="py-24 px-6 md:px-12 bg-[#F5F2EB]/15 border-b border-[#EBE6DC] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Dual layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: PRIVATE ATELIER PITCH & CONTACT DETAIL METADATA (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:pr-6">
            
            <div className="space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2.5 mb-2">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
                <span className="font-display text-[10px] uppercase tracking-[0.3em] font-medium text-[#A69E90]">
                  Private Styling Sessions
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight mb-2">
                styling &amp; Custom Sizing Consultations
              </h2>
              <p className="font-sans text-[#6B655B] text-sm leading-relaxed">
                Connect with our resident interior design draftspersons and master carpenters. 
                Whether organizing blueprint extensions for an entire Chandigarh residence or tailoring 
                a singular focal sofa frame—reserve a private consultation to shape materials to your lifestyle.
              </p>
            </div>

            {/* Custom Benefits indicators */}
            <div className="space-y-4 py-8 border-y border-[#EBE6DC]/80">
              
              <div className="flex items-start space-x-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#2C2A29]/5 flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
                  <Compass className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#2C2A29]">Material Tactility Board</h4>
                  <p className="font-sans text-xs text-[#6B655B] leading-relaxed">
                    Review physical collections of bouclés, marbles, leathers, and metal alloys in-person at Madhya Marg.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#2C2A29]/5 flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
                  <Video className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#2C2A29]">Millimeter Cad Drafting</h4>
                  <p className="font-sans text-xs text-[#6B655B] leading-relaxed">
                    We render 2D layouts and vector blue-prints of custom furniture configurations relative to your room specifications.
                  </p>
                </div>
              </div>

            </div>

            {/* Timings & Opening hour details card */}
            <div className="p-5 bg-neutral-900 border border-neutral-800 text-neutral-300">
              <span className="font-display text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
                BOUTIQUE RUNNING LOGS
              </span>
              <div className="space-y-1.5 font-mono text-[10.5px]">
                <div className="flex justify-between">
                  <span>Showroom opens:</span>
                  <span className="text-[#FDFBF7] font-bold">10:30 AM — DAILY</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Booking range:</span>
                  <span className="text-[#FDFBF7]">10:45 AM to 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Location context:</span>
                  <span className="text-[#C5A880]">Sector 7-C, Madhya Marg, CHD</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: SCHEDULING FORM INTERACTIVE (7 COLS) */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#EBE6DC] p-6 lg:p-10 shadow-sm flex flex-col justify-between relative">
            
            <form onSubmit={handleBooking} className="space-y-6">
              
              <div className="flex items-center space-x-2 border-b border-[#EBE6DC] pb-3 mb-6">
                <Sparkles className="w-4.5 h-4.5 text-[#C5A880] fill-[#C5A880]/15" />
                <span className="font-serif text-lg text-[#2C2A29]">Reserve Private Styling Appointment</span>
              </div>

              {/* Consultation type picker */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-[#F5F2EB]/50 border border-[#EBE6DC] mb-6">
                <button
                  type="button"
                  onClick={() => setType('in-person')}
                  className={`py-3.5 text-center font-display text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all ${
                    type === 'in-person'
                      ? 'bg-[#2C2A29] text-white'
                      : 'bg-transparent text-[#6B655B] hover:text-[#2C2A29]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> In-Person Showroom visit
                </button>
                <button
                  type="button"
                  onClick={() => setType('virtual')}
                  className={`py-3.5 text-center font-display text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all ${
                    type === 'virtual'
                      ? 'bg-[#2C2A29] text-white'
                      : 'bg-transparent text-[#6B655B] hover:text-[#2C2A29]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> Virtual Styling consult
                </button>
              </div>

              {/* Personal metadata inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kaifki Khurana"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3 text-xs text-[#2C2A29] rounded-none pl-9 font-medium"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69E90]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. kaifki@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3 text-xs text-[#2C2A29] rounded-none pl-9"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69E90]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    PHONE CONTEXT
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 81948 19467"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3 text-xs text-[#2C2A29] rounded-none pl-9"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69E90]" />
                  </div>
                </div>
              </div>

              {/* Date and Time selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    DESIRED DATE
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3 text-xs text-[#2C2A29] rounded-none pl-9 cursor-pointer"
                    />
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69E90]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    PREFERRED SESSION SLOT
                  </label>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3.5 text-xs text-[#2C2A29] rounded-none pl-9 cursor-pointer appearance-none uppercase font-semibold"
                    >
                      {timeSlots.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69E90]" />
                  </div>
                </div>
              </div>

              {/* Design scope selector and description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="md:col-span-1">
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    DESIGN SCOPE
                  </label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden px-3.5 py-3.5 text-xs text-[#2C2A29] rounded-none cursor-pointer"
                  >
                    <option value="Single Spot Piece Selection">Single Focus Piece</option>
                    <option value="Complete Living Layout Config">Living Space layout</option>
                    <option value="Multi-room Chandigarh Penthouse styling">Full Penthouse Styling</option>
                    <option value="Boutique Office blueprint drafting">Commercial Workspace</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[9.5px] font-mono uppercase text-[#8C8476] mb-1.5">
                    Describe your styling and spacing requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., We are finalizing remodeling for our Madhya Marg residence. Looking to customize the Nuvola back-rest angle to fit our window profile."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#EBE6DC] focus:border-[#C5A880] outline-hidden p-3 text-xs text-[#2C2A29] rounded-none"
                  />
                </div>

              </div>

              {/* Action and verification tags */}
              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#EBE6DC]">
                <div className="flex items-center space-x-1.5 text-[#8C8476] font-mono text-[9px] uppercase tracking-widest leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Verified reservation system — No cancellation costs</span>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4.5 bg-[#2C2A29] hover:bg-[#C5A880] text-white hover:text-white rounded-none font-display text-[10.5px] uppercase tracking-[0.25em] font-semibold tracking-wider transition-all duration-300 cursor-pointer text-center"
                >
                  Confirm Styling Booking
                </button>
              </div>

              {successNotify && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-sans flex items-start space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-green-900 mb-0.5">Atelier slot reserved successfully!</h5>
                    <p className="text-[11.5px] leading-relaxed">
                      We added your booking under ID #{Math.floor(Math.random()*100000)} to your Portfolio Dashboard (restore via the Heart/Calendar icons in top bar). 
                      A design draftsman will contact you within 12 standard business hours.
                    </p>
                  </div>
                </motion.div>
              )}

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
