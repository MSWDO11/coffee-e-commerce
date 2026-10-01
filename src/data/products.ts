export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 18.50,
    weight: "250g",
    roast: "Light",
    description: "A vibrant and complex coffee from the birthplace of arabica. Grown at elevations above 1,900 meters in the Yirgacheffe region, this lot delivers an extraordinary cup with floral aromatics and a silky body.",
    notes: ["Blueberry", "Jasmine", "Bergamot", "Honey"],
    image: "https://image.qwenlm.ai/generated-images/cc961272-30a8-4154-a985-cd4225321a1b/_result.png"
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 16.00,
    weight: "250g",
    roast: "Medium",
    description: "Sourced from small farms in the Huila region, this Supremo grade coffee offers a perfectly balanced cup. The volcanic soil and ideal climate create beans with remarkable sweetness and clarity.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    image: "https://image.qwenlm.ai/generated-images/3d6d0fe3-d2cb-408b-95c7-76e33e2d6c27/_result.png"
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Guatemala",
    category: "Blend",
    price: 15.00,
    weight: "250g",
    roast: "Dark",
    description: "Our signature dark roast blend combines the chocolate richness of Brazilian beans with the smoky depth of Guatemalan highlands. Perfect for espresso or those who love a bold, full-bodied cup.",
    notes: ["Dark Chocolate", "Smoky Oak", "Brown Sugar", "Spice"],
    image: "https://image.qwenlm.ai/generated-images/7143896d-55a3-4b3f-9c40-eb96b55fb3cf/_result.png"
  },
  {
    id: 4,
    name: "Kenyan AA Peaberry",
    origin: "Kenya",
    category: "Single Origin",
    price: 22.00,
    weight: "200g",
    roast: "Medium-Light",
    description: "A rare peaberry selection from Kenya's central highlands. Each cherry produces a single round bean instead of two flat halves, concentrating flavor into an intensely bright and juicy cup.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Honey"],
    image: "https://image.qwenlm.ai/generated-images/c18333fa-b447-4cf5-85ef-3a45ee77a307/_result.png"
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Ethiopia & Costa Rica",
    category: "Blend",
    price: 14.50,
    weight: "250g",
    roast: "Medium",
    description: "Crafted for your daily ritual, this blend harmonizes the fruity brightness of natural-process Ethiopian with the clean sweetness of Costa Rican honey-processed beans. Smooth, approachable, and endlessly drinkable.",
    notes: ["Peach", "Vanilla", "Almond", "Citrus Zest"],
    image: "https://image.qwenlm.ai/generated-images/bc721b15-3bfa-478b-b4ae-5c84c4de4c30/_result.png"
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    price: 17.50,
    weight: "250g",
    roast: "Dark",
    description: "Wet-hulled in the traditional Giling Basah method, this Sumatran coffee develops its characteristic earthy complexity and low acidity. A meditative cup that rewards slow sipping.",
    notes: ["Cedar", "Dark Cocoa", "Tobacco", "Dried Fig"],
    image: "https://image.qwenlm.ai/generated-images/3c400707-6c32-4b0e-8144-1f6f3b29cb9d/_result.png"
  }
];

export const categories = ["All", "Single Origin", "Blend"];
