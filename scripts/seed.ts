import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: String,
  tags: [String],
  stock: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

function local(slug: string) {
  return [`/products/${slug}-1.jpg`, `/products/${slug}-2.jpg`];
}

const products = [
  {
    name: "Echeveria Succulent",
    description: "A stunning rosette-shaped succulent with fleshy, blue-green leaves tipped with pink. Thrives in bright light with minimal watering — the perfect low-maintenance desk plant.",
    price: 14.99,
    images: local("echeveria-succulent"),
    category: "Succulent Plants",
    tags: ["Indoor plant", "Pet safe", "Low maintenance"],
    stock: 20,
  },
  {
    name: "Garden Rose Bush",
    description: "A classic garden rose bush loaded with fragrant blooms. Hardy and vigorous, it thrives outdoors in well-drained soil with full sun. A garden showstopper.",
    price: 34.99,
    images: local("garden-rose-bush"),
    category: "Outdoor Plants",
    tags: ["Outdoor plant", "Fragrant", "Flowering"],
    stock: 12,
  },
  {
    name: "Stargazer Lily",
    description: "Fragrant, dramatic white lilies with a delicate flush of pink. A classic choice for bouquets, gifts, and special occasions.",
    price: 23.99,
    images: local("stargazer-lily"),
    category: "Flowers",
    tags: ["Flowering", "Gift plant", "Fragrant"],
    stock: 17,
  },
  {
    name: "Sunflower",
    description: "Tall, cheerful, and impossible to miss — this sun-loving annual turns its golden face to follow the light throughout the day.",
    price: 12.99,
    images: local("sunflower"),
    category: "Flowers",
    tags: ["Outdoor plant", "Flowering", "Seasonal"],
    stock: 20,
  },
  {
    name: "String of Pearls",
    description: "A cascading succulent with bead-like leaves that trail beautifully from hanging baskets. Loves bright indirect light and infrequent watering.",
    price: 18.99,
    images: local("string-of-pearls"),
    category: "Succulent Plants",
    tags: ["Hanging plant", "Indoor plant", "Rare"],
    stock: 15,
  },
  {
    name: "Peace Lily",
    description: "One of the most elegant indoor plants, the Peace Lily produces striking white blooms and thrives in low light. An excellent air purifier for bedrooms and living rooms.",
    price: 22.99,
    images: local("peace-lily"),
    category: "Indoor Plants",
    tags: ["Air purifier", "Low light", "Flowering"],
    stock: 30,
  },
  {
    name: "Boston Fern",
    description: "Lush, feathery fronds that bring a tropical feel to any space. Loves humidity — perfect for bathrooms or kitchens. A timeless classic in indoor gardening.",
    price: 16.99,
    images: local("boston-fern"),
    category: "Indoor Plants",
    tags: ["Indoor plant", "Humidity lover", "Pet safe"],
    stock: 25,
  },
  {
    name: "Coffee Plant",
    description: "Grow your own coffee at home. This glossy-leaved plant is surprisingly easy to care for and makes a stunning statement piece. Thrives in bright indirect light.",
    price: 29.99,
    images: local("coffee-plant"),
    category: "Indoor Plants",
    tags: ["Indoor plant", "Exotic", "Statement plant"],
    stock: 10,
  },
  {
    name: "Potted Daisy",
    description: "Cheerful and vibrant, this potted daisy brings instant colour to any space. Perfect on windowsills, balconies, or as a gift. Blooms throughout spring and summer.",
    price: 24.99,
    images: local("potted-daisy"),
    category: "Flowers",
    tags: ["Flowering", "Gift plant", "Seasonal"],
    stock: 18,
  },
  {
    name: "Lavender",
    description: "Famous for its calming fragrance and beautiful purple spikes, lavender thrives in sunny outdoor spots. Drought tolerant and a magnet for pollinators.",
    price: 19.99,
    images: local("lavender"),
    category: "Outdoor Plants",
    tags: ["Outdoor plant", "Fragrant", "Drought tolerant"],
    stock: 22,
  },
  {
    name: "Monstera Deliciosa",
    description: "The iconic split-leaf tropical statement plant. Its dramatic fenestrated leaves make it an instant centerpiece for any bright, humid room.",
    price: 32.99,
    images: local("monstera-deliciosa"),
    category: "Indoor Plants",
    tags: ["Indoor plant", "Statement plant", "Pet unsafe"],
    stock: 14,
  },
  {
    name: "Snake Plant",
    description: "Nearly indestructible, with striking upright sword-like leaves. Tolerates low light and irregular watering, making it perfect for beginners.",
    price: 21.99,
    images: local("snake-plant"),
    category: "Indoor Plants",
    tags: ["Indoor plant", "Low maintenance", "Air purifier"],
    stock: 28,
  },
  {
    name: "Fiddle Leaf Fig",
    description: "Large, glossy violin-shaped leaves on a tall, elegant trunk. A favorite statement plant for bright living rooms — needs consistent light and care.",
    price: 39.99,
    images: local("fiddle-leaf-fig"),
    category: "Indoor Plants",
    tags: ["Indoor plant", "Statement plant", "Bright light"],
    stock: 9,
  },
  {
    name: "Jade Plant",
    description: "A classic 'money plant' with thick, glossy round leaves on woody stems. Extremely drought tolerant and said to bring good fortune.",
    price: 17.99,
    images: local("jade-plant"),
    category: "Succulent Plants",
    tags: ["Indoor plant", "Low maintenance", "Lucky plant"],
    stock: 24,
  },
  {
    name: "Aloe Vera",
    description: "A spiky, soothing succulent whose gel-filled leaves have been prized for centuries. Easy to grow and hard to kill on a sunny windowsill.",
    price: 15.99,
    images: local("aloe-vera"),
    category: "Succulent Plants",
    tags: ["Indoor plant", "Medicinal", "Low maintenance"],
    stock: 26,
  },
  {
    name: "Hydrangea Bush",
    description: "Show-stopping mophead blooms that shift color with soil pH, from soft blue to vivid pink. A garden favorite for cottage-style borders.",
    price: 27.99,
    images: local("hydrangea-bush"),
    category: "Outdoor Plants",
    tags: ["Outdoor plant", "Flowering", "Shade tolerant"],
    stock: 16,
  },
  {
    name: "Tulip Bunch",
    description: "Elegant cup-shaped blooms in vivid colors, one of the first signs of spring. A cheerful bunch that brightens any room or garden bed.",
    price: 16.99,
    images: local("tulip-bunch"),
    category: "Flowers",
    tags: ["Flowering", "Gift plant", "Seasonal"],
    stock: 20,
  },
  {
    name: "Orchid",
    description: "Exotic, long-lasting blooms in striking purple hues. A sophisticated statement flower that thrives on gentle indirect light and infrequent watering.",
    price: 28.99,
    images: local("orchid"),
    category: "Flowers",
    tags: ["Indoor plant", "Flowering", "Statement plant"],
    stock: 13,
  },
  {
    name: "Rose & Lily Bouquet",
    description: "A romantic hand-tied bouquet mixing deep red roses with elegant white lilies. Ready to arrange straight into a vase — a timeless gift for any occasion.",
    price: 42.99,
    images: local("rose-lily-bouquet"),
    category: "Flowers",
    tags: ["Bouquet", "Gift plant", "Fragrant"],
    stock: 15,
  },
  {
    name: "Wildflower Bouquet",
    description: "A cheerful, loosely gathered mix of zinnias and tulips in every color. Casual and colorful — brings a garden-picked feel to any table.",
    price: 27.99,
    images: local("wildflower-bouquet"),
    category: "Flowers",
    tags: ["Bouquet", "Gift plant", "Seasonal"],
    stock: 19,
  },
  {
    name: "Sunset Bouquet",
    description: "Warm orange roses and blush gerbera daisies, wrapped together for a bouquet that glows like golden hour. A vibrant statement gift.",
    price: 38.99,
    images: local("sunset-bouquet"),
    category: "Flowers",
    tags: ["Bouquet", "Gift plant", "Statement plant"],
    stock: 11,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: "eden" });
  console.log("Connected to MongoDB");

  await Product.deleteMany({});
  console.log("Cleared existing products");

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
