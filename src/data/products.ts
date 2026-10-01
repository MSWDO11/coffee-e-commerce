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
    notes: ["Blueberry", "Jasmine", "Bergamot", "Honey"]
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
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"]
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
    notes: ["Dark Chocolate", "Smoky Oak", "Brown Sugar", "Spice"]
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
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Honey"]
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
    notes: ["Peach", "Vanilla", "Almond", "Citrus Zest"]
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
    notes: ["Cedar", "Dark Cocoa", "Tobacco", "Dried Fig"]
  }
];

export const categories = ["All", "Single Origin", "Blend"];
