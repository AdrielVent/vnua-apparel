export interface ClothingProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  category: 'tee' | 'hoodie' | 'shorts' | 'cap' | 'longsleeve' | 'sweatpants';
  color: string;
  cubeColor: string;
  material: string;
  fit: 'relaxed' | 'oversized' | 'regular' | 'slim';
  sizes: string[];
  specs: Record<string, string>;
  status: 'active' | 'coming-soon' | 'sold-out';
}

export const CLOTHING_PRODUCTS: ClothingProduct[] = [
  {
    id: 'vnua-core-tee-01',
    name: 'VNUA Core Tee',
    slug: 'vnua-core-tee',
    tagline: 'The base cell of the grid.',
    description: 'Modular apparel for creative systems. The Core Tee is the foundational piece of the VNUA collection — clean, precise, and built to layer.',
    price: 74,
    category: 'tee',
    color: 'Crimson / White',
    cubeColor: '#D00000',
    material: '380 g/m² heavyweight cotton',
    fit: 'regular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    specs: { GSM: '380 g/m²', Material: '100% Ring-Spun Cotton', Construction: 'Tubular body, flatlock seams', Finish: 'Pre-washed, garment-dyed' },
    status: 'active',
  },
  {
    id: 'vnua-grid-hoodie-01',
    name: 'VNUA Grid Hoodie',
    slug: 'vnua-grid-hoodie',
    tagline: 'The perimeter of the system.',
    description: 'Built from motion, color, and controlled chaos. The Grid Hoodie wraps the VNUA grid around your shoulders — structured, oversized, unmistakable.',
    price: 148,
    category: 'hoodie',
    color: 'Royal Blue',
    cubeColor: '#0046AD',
    material: '450 g/m² fleece-backed cotton',
    fit: 'oversized',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    specs: { GSM: '450 g/m²', Material: '80% Cotton / 20% Polyester', Construction: 'Double-needle stitching, ribbed cuffs', Finish: 'Enzyme-washed' },
    status: 'active',
  },
  {
    id: 'vnua-studio-ls-01',
    name: 'VNUA Studio Long Sleeve',
    slug: 'vnua-studio-ls',
    tagline: 'Extended reach. Extended session.',
    description: 'Each piece is a product cell in the VNUA grid. The Studio Long Sleeve is engineered for long creative sessions — breathable, structured, and quietly iconic.',
    price: 96,
    category: 'longsleeve',
    color: 'Kelly Green',
    cubeColor: '#009B48',
    material: '320 g/m² jersey-knit cotton',
    fit: 'relaxed',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    specs: { GSM: '320 g/m²', Material: '100% Combed Cotton', Construction: 'Set-in sleeves, ribbed collar', Finish: 'Silicone-washed' },
    status: 'active',
  },
  {
    id: 'vnua-motion-shorts-01',
    name: 'VNUA Motion Shorts',
    slug: 'vnua-motion-shorts',
    tagline: 'Unrestricted movement. Full system.',
    description: 'A clothing drop designed like a moving interface. Motion Shorts move with you — technical twill with an adjustable modular waistband system.',
    price: 89,
    category: 'shorts',
    color: 'Mandarin Orange',
    cubeColor: '#FF5800',
    material: '260 g/m² technical twill',
    fit: 'relaxed',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    specs: { GSM: '260 g/m²', Material: '65% Cotton / 35% Nylon', Construction: 'Cargo pocket, elastic waistband', Finish: 'DWR-treated' },
    status: 'active',
  },
  {
    id: 'vnua-cell-cap-01',
    name: 'VNUA Cell Cap',
    slug: 'vnua-cell-cap',
    tagline: 'The top face of the grid.',
    description: 'The cube system organizes the collection one piece at a time. The Cell Cap is the crown piece — structured 6-panel with tonal VNUA embroidery.',
    price: 48,
    category: 'cap',
    color: 'Canary Yellow',
    cubeColor: '#FFD500',
    material: '200 g/m² ripstop canvas',
    fit: 'regular',
    sizes: ['One Size'],
    specs: { Material: '100% Ripstop Canvas', Construction: '6-panel structured, metal buckle', Embroidery: 'Tonal VNUA logo, rear drop stitch', Fit: 'Adjustable rear strap' },
    status: 'active',
  },
  {
    id: 'vnua-system-sweatpants-01',
    name: 'VNUA System Sweatpants',
    slug: 'vnua-system-sweatpants',
    tagline: 'Bottom cell. Full structure.',
    description: 'Scroll through the drop. Build the grid. System Sweatpants complete the lower half of the VNUA modular wardrobe — heavyweight, tapered, architectural.',
    price: 128,
    category: 'sweatpants',
    color: 'White / Charcoal',
    cubeColor: '#E8E8E8',
    material: '420 g/m² loopback fleece',
    fit: 'slim',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    specs: { GSM: '420 g/m²', Material: '80% Cotton / 20% Polyester', Construction: 'Tapered leg, ribbed ankle cuff', Finish: 'Stone-washed' },
    status: 'coming-soon',
  },
];

// Legacy products — keep for backwards compat
export const PRODUCTS = [
  {
    id: 'vnua-proto-01',
    name: 'VNUA PROTO-SHELL v1.0',
    price: 249.99,
    image: '/exo-placeholder.png',
    desc: 'High-tensile carbon-weave matrix.',
    specs: { GSM: '450g/m2', MAT: '60% ORGANIC COTTON / 40% RECYCLED NYLON' },
    status: 'PROTOTYPE'
  },
];
