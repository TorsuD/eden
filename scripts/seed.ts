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

const products = [
  {
    name: "Echeveria Succulent",
    description: "A stunning rosette-shaped succulent with fleshy, blue-green leaves tipped with pink. Thrives in bright light with minimal watering — the perfect low-maintenance desk plant.",
    price: 14.99,
    images: ["/cacy.png", "/anna.png", "/love.png"],
    category: "Succulent Plants",
    tags: ["Indoor plant", "Pet safe", "Low maintenance"],
    stock: 20,
  },
  {
    name: "String of Pearls",
    description: "A cascading succulent with bead-like leaves that trail beautifully from hanging baskets. Loves bright indirect light and infrequent watering.",
    price: 18.99,
    images: ["/anna.png", "/cacy.png"],
    category: "Succulent Plants",
    tags: ["Hanging plant", "Indoor plant", "Rare"],
    stock: 15,
  },
  {
    name: "Peace Lily",
    description: "One of the most elegant indoor plants, the Peace Lily produces striking white blooms and thrives in low light. An excellent air purifier for bedrooms and living rooms.",
    price: 22.99,
    images: ["/love.png", "/potted.png"],
    category: "Indoor Plants",
    tags: ["Air purifier", "Low light", "Flowering"],
    stock: 30,
  },
  {
    name: "Boston Fern",
    description: "Lush, feathery fronds that bring a tropical feel to any space. Loves humidity — perfect for bathrooms or kitchens. A timeless classic in indoor gardening.",
    price: 16.99,
    images: ["/potted.png", "/love.png"],
    category: "Indoor Plants",
    tags: ["Indoor plant", "Humidity lover", "Pet safe"],
    stock: 25,
  },
  {
    name: "Coffee Plant",
    description: "Grow your own coffee at home. This glossy-leaved plant is surprisingly easy to care for and makes a stunning statement piece. Thrives in bright indirect light.",
    price: 29.99,
    images: ["/coffee.png", "/potted.png", "/anna.png"],
    category: "Indoor Plants",
    tags: ["Indoor plant", "Exotic", "Statement plant"],
    stock: 10,
  },
  {
    name: "Potted Daisy",
    description: "Cheerful and vibrant, this potted daisy brings instant colour to any space. Perfect on windowsills, balconies, or as a gift. Blooms throughout spring and summer.",
    price: 24.99,
    images: ["/potted-flower.png", "/love.png"],
    category: "Flowers",
    tags: ["Flowering", "Gift plant", "Seasonal"],
    stock: 18,
  },
  {
    name: "Garden Rose Bush",
    description: "A classic garden rose bush loaded with fragrant blooms. Hardy and vigorous, it thrives outdoors in well-drained soil with full sun. A garden showstopper.",
    price: 34.99,
    images: ["/love.png", "/potted-flower.png"],
    category: "Outdoor Plants",
    tags: ["Outdoor plant", "Fragrant", "Flowering"],
    stock: 12,
  },
  {
    name: "Lavender",
    description: "Famous for its calming fragrance and beautiful purple spikes, lavender thrives in sunny outdoor spots. Drought tolerant and a magnet for pollinators.",
    price: 19.99,
    images: ["/potted-flower.png", "/cacy.png"],
    category: "Outdoor Plants",
    tags: ["Outdoor plant", "Fragrant", "Drought tolerant"],
    stock: 22,
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
