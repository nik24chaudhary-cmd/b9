import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, MessageSquare, Plus, Check, CheckCircle, 
  User, Sparkles, Filter, ChevronUp 
} from 'lucide-react';
import { GoogleReview } from '../types';
import { BOTTEGA_REVIEWS } from '../data';

interface ReviewsProps {
  customReviews: GoogleReview[];
  onAddReview: (review: GoogleReview) => void;
}

export default function Reviews({ customReviews, onAddReview }: ReviewsProps) {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Custom review form states
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [successNotify, setSuccessNotify] = useState(false);

  // Combine static maps reviews and user custom reviews
  const allReviews = useMemo(() => {
    return [...customReviews, ...BOTTEGA_REVIEWS];
  }, [customReviews]);

  // Filtered list
  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return allReviews;
    return allReviews.filter(r => r.rating === filterRating);
  }, [allReviews, filterRating]);

  // Calculate stats
  const averageRating = 4.5;
  const totalReviewsCount = 21 + customReviews.length;

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newReview: GoogleReview = {
      id: `custom-rev-${Date.now()}`,
      author,
      rating,
      text,
      timeAgo: 'Just now',
      isLocalGuide: false,
      guideInfo: 'Verified Custom Client'
    };

    onAddReview(newReview);
    setAuthor('');
    setRating(5);
    setText('');
    setSuccessNotify(true);
    setTimeout(() => {
      setSuccessNotify(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 px-6 md:px-12 bg-[#F5F2EB]/35 border-b border-[#EBE6DC] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2.5 mb-2">
            <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
            <span className="font-display text-[10px] uppercase tracking-[0.3em] font-medium text-[#A69E90]">
              Atelier Testimonies
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight mb-4">
            Atelier Stories &amp; Feedback
          </h2>
          <p className="font-sans text-[#6B655B] max-w-2xl text-sm leading-relaxed">
            Real clients, true reports. Taken from Bottega9’s Chandigarh showroom accounts. 
            Review client reviews about custom modifications and structural quality.
          </p>
        </div>

        {/* Statistics and Scoring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-start">
          
          {/* Rating Breakdown Board (5 columns) */}
          <div className="lg:col-span-5 bg-[#FDFBF7] border border-[#EBE6DC] p-6 lg:p-8 shadow-xs space-y-6">
            
            <div className="flex items-center space-x-4">
              <span className="font-serif text-6xl text-[#2C2A29] font-light">
                {averageRating}
              </span>
              <div>
                <div className="flex space-x-0.5 text-[#C5A880] mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase text-[#A69E90] tracking-wider block">
                  CUMULATIVE SCORE based on {totalReviewsCount} reports
                </span>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2 border-t border-[#EBE6DC]/80 pt-6">
              {[
                { label: '5 Stars Signature', count: 18 + (customReviews.filter(r => r.rating === 5).length), pct: 85 },
                { label: '4 Stars Splendid', count: 2 + (customReviews.filter(r => r.rating === 4).length), pct: 10 },
                { label: '3 Stars Functional', count: 0 + (customReviews.filter(r => r.rating === 3).length), pct: 0 },
                { label: '2 Stars Alteration', count: 0 + (customReviews.filter(r => r.rating === 2).length), pct: 0 },
                { label: '1 Star Correction', count: 1 + (customReviews.filter(r => r.rating === 1).length), pct: 5 }
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono text-[#6B655B] gap-4">
                  <span className="w-32 truncate text-left">{row.label}</span>
                  
                  {/* Visual Bar */}
                  <div className="flex-1 h-1.5 bg-[#F5F2EB]/95 relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#C5A880] transition-all duration-1000"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  
                  <span className="w-8 text-right font-bold text-[#2C2A29]">{row.count}</span>
                </div>
              ))}
            </div>

            {/* Button to compose/review custom posts */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full py-3.5 bg-[#2C2A29] text-white hover:bg-[#C5A880] transition-colors duration-300 font-display text-[10px] uppercase tracking-[0.2em] font-semibold text-center rounded-none cursor-pointer flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{showAddForm ? 'Close Drawer Panel' : 'Compose Atelier Review'}</span>
            </button>

          </div>

          {/* RIGHT: REVIEWS LIST AND FILTERING (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Toolbar Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FDFBF7] p-3.5 border border-[#EBE6DC] shadow-xs">
              <div className="flex items-center space-x-1.5">
                <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-display text-[10px] uppercase tracking-wider text-[#8C8476]">
                  Filter Stories:
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {([ 'all', 5, 4, 1 ] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilterRating(r)}
                    className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
                      filterRating === r 
                        ? 'bg-transparent border-b-2 border-b-[#C5A880] text-[#2C2A29] font-bold' 
                        : 'bg-transparent text-[#8C8476] hover:text-[#2C2A29]'
                    }`}
                  >
                    {r === 'all' ? 'Show All' : `${r} Star`}
                  </button>
                ))}
              </div>
            </div>

            {/* Form slide-in container if showing */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[#FDFBF7] border border-[#C5A880]/40 overflow-hidden"
                >
                  <form onSubmit={handlePostReview} className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-[#EBE6DC] pb-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span className="font-serif text-lg text-[#2C2A29]">Write your Bottega9 Review</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9.5px] font-mono uppercase tracking-wider text-[#8C8476] mb-1">
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priyanjali Sen"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-[#EBE6DC] outline-hidden px-3.5 py-2.5 text-xs text-[#2C2A29] rounded-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] font-mono uppercase tracking-wider text-[#8C8476] mb-1">
                          SATISFACTION MULTIPLIER
                        </label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(parseInt(e.target.value))}
                          className="w-full bg-[#FDFBF7] border border-[#EBE6DC] outline-hidden px-3 py-2.5 text-xs text-[#2C2A29] rounded-none focus:border-[#C5A880] cursor-pointer"
                        >
                          <option value="5">5 Stars — Absolute Masterpiece</option>
                          <option value="4">4 Stars — Sublime Finish</option>
                          <option value="3">3 Stars — Moderate Quality</option>
                          <option value="1">1 Star — Delivery Delayed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-wider text-[#8C8476] mb-1">
                        YOUR STORY &amp; REVIEW
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Write dynamic details about custom work, timbers frame quality, or showroom interactions..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#EBE6DC] outline-hidden p-3.5 text-xs text-[#2C2A29] rounded-none focus:border-[#C5A880]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-8 bg-[#2C2A29] text-white hover:bg-[#C5A880] font-display text-[9.5px] uppercase tracking-[0.2em] font-semibold transition-colors rounded-none cursor-pointer"
                    >
                      Post Premium Review
                    </button>

                    {successNotify && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-1.5 text-green-700 font-mono text-[10px] pt-1"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Review posted successfully onto client record.</span>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List box container */}
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="p-12 border border-dashed border-[#EBE6DC] text-center bg-[#FDFBF7] text-[#8C8476]">
                  <p className="font-sans text-xs italic">No reviews match current selected ratings filter.</p>
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 border border-[#EBE6DC] bg-[#FDFBF7] hover:border-[#C5A880]/60 duration-300 relative"
                  >
                    {/* Top User Metadata */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#F5F2EB] border border-[#EBE6DC] flex items-center justify-center text-[#8C8476]">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-serif text-sm font-medium text-[#2C2A29]">
                              {rev.author}
                            </span>
                            {rev.isLocalGuide && (
                              <span className="text-[7.5px] bg-[#C5A880]/15 text-[#9E825A] font-mono tracking-widest uppercase px-1.5 py-0.5">
                                LOCAL GUIDE
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[9px] text-[#A69E90] block">
                            {rev.guideInfo || 'Verified Customer'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex text-[#C5A880] space-x-0.5 mb-0.5 justify-end">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#C5A880] stroke-[#C5A880]" />
                          ))}
                          {Array.from({ length: 5 - rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#EBE6DC]" />
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-[#8C8476]">{rev.timeAgo}</span>
                      </div>
                    </div>

                    {/* Review text content */}
                    <blockquote className="font-sans text-xs md:text-sm text-[#4A4740] leading-relaxed italic mb-4">
                      &ldquo;{rev.text}&rdquo;
                    </blockquote>

                    {/* Genuine Google reply block if active */}
                    {rev.reply && (
                      <div className="mt-4 p-4 bg-[#F5F2EB]/55 border-l-2 border-l-[#C5A880] space-y-1">
                        <span className="font-display text-[9px] uppercase tracking-wider text-[#A69E90] block font-semibold">
                          RESPONSE FROM OWNER (Bottega9)
                        </span>
                        <p className="font-sans text-[11.5px] text-[#6B655B] leading-relaxed">
                          {rev.reply}
                        </p>
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
