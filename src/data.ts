import { FurnitureItem, GoogleReview } from './types';

export const HIGH_END_FURNITURE: FurnitureItem[] = [
  {
    id: 'sofa-01',
    name: 'Nuvola Bouclé Sofa',
    category: 'lounging',
    price: 3400,
    image: '/src/assets/images/boucle_sofa_1781155942643.png',
    description: 'An organic-shaped sculptural sofa upholstered in the finest high-pile ivory bouclé. Soft cloud-like seating layers resting on an inset, recessed natural walnut plinth.',
    details: [
      'Frame crafted in solid kiln-dried Siberian hardwood',
      'High-resilience foam core wrapped in soft down-feather padding',
      'Inset plinth design for a floating architectural aesthetic',
      'Custom width alterations available in 10cm increments'
    ],
    dimensions: { length: 240, width: 105, height: 74, unit: 'cm' },
    materials: ['Ivory Bouclé', 'Sand Chenille', 'Sage Matte Velvet', 'Muted Terracotta Bouclé'],
    woods: ['Natural Walnut', 'Smoked Oak', 'Bleached Ash'],
    metals: ['Unlacquered Brass', 'Blackened Matte Steel']
  },
  {
    id: 'chair-01',
    name: 'Aethel Contour Armchair',
    category: 'lounging',
    price: 1450,
    image: '/src/assets/images/architectural_chair_1781155959073.png',
    description: 'A contemporary architectural masterpiece balancing a hand-carved solid walnut cage with deep, suspensory sand-colored Italian linen cushions.',
    details: [
      'Bespoke mortise-and-tenon joinery with hand-finished curves',
      'Reinforced rear harness with full-grain saddle leather straps',
      'Sack-tufted cushion design featuring highly relaxed, breathable weaves',
      'Interchangeable standard and tall seat back options'
    ],
    dimensions: { length: 85, width: 80, height: 78, unit: 'cm' },
    materials: ['Sand Linen', 'Cognac Saddle Leather', 'Sage Cotton Sateen', 'Oatmeal Wool Bouclé'],
    woods: ['Natural Walnut', 'Charcoal Stained Oak', 'Muted Cherry Wood'],
    metals: ['Polished Antique Brass', 'Brushed Titanium']
  },
  {
    id: 'table-01',
    name: 'Grotto Travertine Table',
    category: 'lounging',
    price: 1850,
    image: '/src/assets/images/travertine_table_1781155975701.png',
    description: 'An organic, sculptural coffee table carved from a single piece of premium Italian Ivory Travertine. Refined dual-block base supports a soft-curve tray top.',
    details: [
      'Quarried in small batches with genuine natural pock-mark textures preserved',
      'Finished with high-resistance matte stone treatment to protect against liquids',
      'Sturdy heavy-duty solid stone columns with integrated metal connectors',
      'Custom sizing of stone slab available under request'
    ],
    dimensions: { length: 130, width: 85, height: 38, unit: 'cm' },
    materials: ['Travertine Stone (No Fabric)'],
    woods: ['Honed Travertine', 'Nero Marquina Marble', 'Emperador Dark Stone'],
    metals: ['Bronze Core Connectors']
  },
  {
    id: 'dining-01',
    name: 'Atelier Dining Ensemble',
    category: 'gathering',
    price: 4200,
    image: '/src/assets/images/dining_set_1781155991493.png',
    description: 'A striking minimalist dining layout. Centered around a solid white-oak tabletop with matching tapered pillars and six custom upholstered organic armchairs.',
    details: [
      'Seamless tabletop made of full-length timber slabs selected for grain matching',
      'Seats up to 8 individuals comfortably (table custom extensions up to 12 seats)',
      'Contoured wrap chairs lined with high-end Belgian linen and elastic webbing',
      'Triple-layered zero-VOC matte sealant protects against thermal stress and moisture'
    ],
    dimensions: { length: 220, width: 100, height: 75, unit: 'cm' },
    materials: ['Sand Italian Linen', 'Warm Graphite Wool', 'Caramel aniline Leather'],
    woods: ['Natural Oak', 'Ebonized Oak', 'Warm Walnut Finish'],
    metals: ['Burnished Brass Collar Anchors']
  },
  {
    id: 'desk-01',
    name: 'Solari Floating Desk',
    category: 'studying',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
    description: 'A sleek workspace center combining airy cantilevered wood curves and structured storage, supported on high-contrast metal columns.',
    details: [
      'Two concealed drawers with soft-close German rails and felt linings',
      'Integrated rear leather-lined workspace wire channel and cable box',
      'Sanded and oiled 7 times to reach a soft satin tactile experience',
      'Available with custom side attachment desks for modular storage'
    ],
    dimensions: { length: 160, width: 70, height: 74, unit: 'cm' },
    materials: ['Saddle Leather Insert'],
    woods: ['Warm Walnut', 'Blackened Ash', 'Smoked Oak'],
    metals: ['Champagne Gold Brass', 'Matte Black Steel']
  },
  {
    id: 'shelf-01',
    name: 'Arbo Modular Bookshelf',
    category: 'studying',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800',
    description: 'An elegant modular grid library combining warm wood frames with brass dividers, creating a light-filled visual storage grid.',
    details: [
      'Modular shelves - heights are adjustable via hidden brass support pins',
      'Reinforced wall anchor plates with premium leather covers',
      'Includes 2 lower lockable pull-out drawers with matching hardware'
    ],
    dimensions: { length: 120, width: 38, height: 210, unit: 'cm' },
    materials: ['None'],
    woods: ['Natural Walnut', 'smoked oak', 'natural ash'],
    metals: ['Brushed Brass Supports', 'Gunmetal Steel']
  }
];

export const BOTTEGA_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-01',
    author: 'Diksha Sharma',
    rating: 5,
    text: 'Hello friends, I want to tell you something, if you are looking for the best furniture shop in Mohali/Chandigarh, then let me tell you that Bottega is the best. Because I have made them work many times and everyone has praised their work.',
    timeAgo: '3 years ago',
    isLocalGuide: true,
    guideInfo: 'Local Guide · 11 reviews',
    reply: 'Thank you very much Diksha Sharma for giving me the status of Best Furniture Shop in Mohali.'
  },
  {
    id: 'rev-02',
    author: 'Kaifki Khurana',
    rating: 5,
    text: 'Best furniture showroom in Mohali & Chandigarh Madhya Marg area. Their customization option is outstanding, they can alter wood finishes, metals, and fabrics to exact millimeter dimensions.',
    timeAgo: '5 years ago',
    isLocalGuide: true,
    guideInfo: 'Local Guide · 40 reviews · 78 photos'
  },
  {
    id: 'rev-03',
    author: 'Madhu Sudan',
    rating: 4,
    text: 'Writing this in hope that this may reach the owner. Had some delays with deliveries, but once the furniture arrived, the craftsmanship is absolutely one of a kind. The wood selection and the bouclé fabric quality are superior to any imported luxury showroom. Highly recommend for custom homes.',
    timeAgo: '3 years ago',
    isLocalGuide: false,
    guideInfo: '5 reviews'
  }
];

export const ROOM_BACKGROUNDS = {
  studio: {
    id: 'studio',
    name: 'Atelier Studio',
    class: 'bg-[#FDFBF7] border border-[#EBE6DC] shadow-inner',
    textColor: 'text-[#4A4740]',
    accentColor: 'border-[#C5A880]',
    description: 'Clean gallery-like blank canvas with micro-textured beige concrete flooring and natural studio lighting.'
  },
  parisian: {
    id: 'parisian',
    name: 'Parisian Salon',
    class: 'bg-stone-100 border border-stone-200 shadow-inner bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),rgba(250,248,245,0.95))] relative overflow-hidden',
    textColor: 'text-stone-700',
    accentColor: 'border-amber-700/30',
    description: 'Elegant architectural setting with wall moldings, chevron oak floors (rendered abstractly), and high-contrast dramatic side shadows.'
  },
  concrete: {
    id: 'concrete',
    name: 'Brutalist Loft',
    class: 'bg-zinc-200 border border-zinc-300 shadow-inner bg-[radial-gradient(ellipse_at_top,rgba(240,240,240,0.85),rgba(224,224,224,0.95))]',
    textColor: 'text-zinc-600',
    accentColor: 'border-zinc-500',
    description: 'Raw, textured modern context featuring industrial gray tones, concrete floor structures, and sharp architectural sunlight.'
  }
};
