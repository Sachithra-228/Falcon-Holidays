/**
 * Seed script - run with:
 * npx ts-node --skip-project scripts/seed.ts
 *
 * Make sure MONGODB_URI is set in .env.local
 */

import * as dotenv from "dotenv";
import * as path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env.local");
    process.exit(1);
}

const PackageSchema = new mongoose.Schema(
    {
        title: String,
        slug: String,
        destination: String,
        category: String,
        durationDays: Number,
        priceFrom: Number,
        currency: { type: String, default: "USD" },
        highlights: [String],
        inclusions: [String],
        exclusions: [String],
        itinerary: [{ day: Number, title: String, description: String }],
        images: [String],
        isPublished: Boolean,
    },
    { timestamps: true }
);

const Package = mongoose.models.Package || mongoose.model("Package", PackageSchema);

const samplePackages = [
    {
        title: "Magical Sri Lanka – 7 Days Explorer",
        slug: "magical-sri-lanka-7-days",
        destination: "Sri Lanka",
        category: "Sri Lanka",
        durationDays: 7,
        priceFrom: 899,
        currency: "USD",
        highlights: [
            "Climb the iconic Sigiriya Rock Fortress",
            "Safari at Yala National Park",
            "Colonial charm of Galle Fort",
            "Whale watching in Mirissa",
            "Cultural triangle temples",
        ],
        inclusions: [
            "6 nights accommodation (3★/4★)",
            "All breakfasts and 4 dinners",
            "Airport transfers",
            "Air-conditioned vehicle with driver-guide",
            "National park safari",
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Personal expenses",
            "Travel insurance",
        ],
        itinerary: [
            { day: 1, title: "Arrival & Colombo City Tour", description: "Welcome to Sri Lanka! After arrival at Bandaranaike International Airport, you'll be transferred to your city hotel. Enjoy a Colombo city tour including Gangaramaya Temple, Galle Face Green, and the vibrant Pettah markets." },
            { day: 2, title: "Colombo to Sigiriya via Dambulla", description: "Drive to the Cultural Triangle. Visit the Dambulla Cave Temple — a UNESCO World Heritage site with stunning murals and statues. Arrive at your jungle lodge near Sigiriya." },
            { day: 3, title: "Sigiriya & Polonnaruwa", description: "Early morning climb of the legendary Sigiriya Rock Fortress. Admire panoramic views and the famous frescoes. Afternoon visit to ancient Polonnaruwa ruins." },
            { day: 4, title: "Kandy – Hill Country Capital", description: "Travel through lush green hills to Kandy. Visit the Royal Botanical Gardens at Peradeniya and the revered Temple of the Sacred Tooth Relic. Enjoy a traditional Kandyan cultural show." },
            { day: 5, title: "Ella & Tea Country", description: "Scenic train journey through misty mountains and emerald tea estates to Ella. Hike to Little Adam's Peak for breathtaking valley views and visit a local tea factory." },
            { day: 6, title: "Yala Safari & South Coast", description: "Early morning jeep safari at Yala National Park — home to leopards, elephants, and exotic birds. Drive to the golden beaches of the south coast." },
            { day: 7, title: "Galle Fort & Departure", description: "Morning walk through the UNESCO-listed Dutch Galle Fort with its colonial architecture. Transfer to Colombo airport for your departure flight." },
        ],
        images: [
            "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1200&q=80",
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
        ],
        isPublished: true,
    },
    {
        title: "Maldives Honeymoon Retreat – 5 Nights",
        slug: "maldives-honeymoon-retreat-5-nights",
        destination: "Maldives",
        category: "Honeymoon",
        durationDays: 6,
        priceFrom: 2499,
        currency: "USD",
        highlights: [
            "Overwater bungalow with private deck",
            "Sunset dhoni cruise",
            "Couples spa treatment",
            "World-class snorkeling & diving",
            "Romantic private beach dinner",
        ],
        inclusions: [
            "5 nights in an overwater villa",
            "Full board meal plan",
            "Seaplane transfers",
            "1 couples spa session",
            "Sunset dhoni cruise",
            "Snorkeling equipment",
        ],
        exclusions: [
            "International flights",
            "Diving courses (extra charge)",
            "Personal expenses & bar bills",
        ],
        itinerary: [
            { day: 1, title: "Arrival & Seaplane Transfer", description: "Arrive at Velana International Airport, Malé. Board your scenic seaplane transfer to your private island resort. Check into your stunning overwater bungalow and enjoy a welcome cocktail." },
            { day: 2, title: "Coral Reef Exploration", description: "Spend the morning snorkeling directly from your villa deck. In the afternoon, join a guided lagoon tour to discover the vibrant marine life of the Maldivian reefs." },
            { day: 3, title: "Diving & Spa Day", description: "Morning intro dive for beginners or guided dive for certified divers in crystal-clear waters. Afternoon at leisure followed by a luxurious couples spa treatment." },
            { day: 4, title: "Island Hopping & Sunset Cruise", description: "Explore the natural beauty of nearby uninhabited islands — perfect for castaway photos. In the evening, board a traditional dhoni for a romantic sunset cruise." },
            { day: 5, title: "Private Beach Dinner", description: "A free day to relax by your pool or villa deck. In the evening, enjoy a specially arranged private beach dinner under the stars — an unforgettable Maldivian experience." },
            { day: 6, title: "Departure", description: "Early morning seaplane or speedboat transfer back to Malé for your international flight. Take with you memories that will last a lifetime." },
        ],
        images: [
            "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=1200&q=80",
            "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=1200&q=80",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
        ],
        isPublished: true,
    },
    {
        title: "Dubai Family Adventure – 6 Days",
        slug: "dubai-family-adventure-6-days",
        destination: "Dubai",
        category: "International",
        durationDays: 6,
        priceFrom: 1299,
        currency: "USD",
        highlights: [
            "Burj Khalifa observation deck",
            "Desert safari with dune bashing",
            "Dubai Marina yacht cruise",
            "Wild Wadi Waterpark",
            "Dubai Mall & Fountain Show",
        ],
        inclusions: [
            "5 nights 4★ hotel accommodation",
            "Daily breakfast",
            "Airport transfers",
            "Desert safari with BBQ dinner",
            "Burj Khalifa entry (124th floor)",
            "Dubai Creek abra ride",
        ],
        exclusions: [
            "International flights",
            "Visa on arrival fee",
            "Lunch & dinner (except safari BBQ)",
            "Personal shopping",
        ],
        itinerary: [
            { day: 1, title: "Arrival in Dubai", description: "Land at Dubai International Airport and transfer to your hotel. Rest and freshen up, then take an evening stroll to the nearby Dubai Marina." },
            { day: 2, title: "Old Dubai & Burj Khalifa", description: "Morning explore Old Dubai — visit the Gold Souk, Spice Souk, and cross Dubai Creek by abra. Afternoon head to Downtown Dubai for the iconic Burj Khalifa and Dubai Mall. Don't miss the fountain show!" },
            { day: 3, title: "Desert Safari", description: "Morning at leisure. Afternoon, embark on a thrilling desert safari — dune bashing, camel riding, sandboarding, and a traditional Bedouin camp BBQ dinner under the stars." },
            { day: 4, title: "Wild Wadi & JBR Beach", description: "Full day at the famous Wild Wadi Waterpark adjacent to Burj Al Arab. Evening relaxation at the stylish JBR Beach Walk." },
            { day: 5, title: "Palm Jumeirah & Yacht Cruise", description: "Visit the magnificent Palm Jumeirah — explore Atlantis and take the Palm Monorail. Afternoon luxury yacht cruise through Dubai Marina with stunning skyline views." },
            { day: 6, title: "Shopping & Departure", description: "Last-minute shopping at Mall of Emirates or Ibn Battuta Mall. Transfer to airport for your flight home filled with memories." },
        ],
        images: [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80",
        ],
        isPublished: true,
    },
    {
        title: "Bali Island Escape – 8 Days",
        slug: "bali-island-escape-8-days",
        destination: "Bali",
        category: "Adventure",
        durationDays: 8,
        priceFrom: 1099,
        currency: "USD",
        highlights: [
            "Rice terrace trekking in Ubud",
            "White water rafting on Ayung River",
            "Tanah Lot sunset temple visit",
            "Traditional Balinese cooking class",
            "Mount Batur volcano sunrise hike",
        ],
        inclusions: [
            "7 nights villa accommodation",
            "Breakfast daily",
            "Airport transfers",
            "Mount Batur sunrise trek with guide",
            "Cooking class in Ubud",
            "Rafting on Ayung River",
        ],
        exclusions: [
            "International flights",
            "Visa on arrival",
            "Personal expenses",
            "Travel insurance",
        ],
        itinerary: [
            { day: 1, title: "Arrival in Bali", description: "Arrive at Ngurah Rai International Airport, Denpasar. Transfer to your villa in Seminyak. Enjoy a welcome drink and sunset at Seminyak Beach." },
            { day: 2, title: "Ubud – Art & Culture", description: "Drive to cultural Ubud. Visit the Sacred Monkey Forest, Ubud Palace, and local art galleries. Afternoon traditional Balinese cooking class." },
            { day: 3, title: "Rice Terraces & Rafting", description: "Morning walk through the stunning Tegalalang Rice Terraces. Afternoon white water rafting adventure on the Ayung River." },
            { day: 4, title: "Mount Batur Sunrise Hike", description: "3AM early rise for the iconic Mount Batur volcano trek. Watch the sunrise from the summit (1,717m) and enjoy eggs cooked by volcanic steam!" },
            { day: 5, title: "Lembongan Island", description: "Day trip to Nusa Lembongan — snorkel or dive in crystal waters, visit the seaweed farms, and enjoy a beachside lunch." },
            { day: 6, title: "Tanah Lot & Canggu", description: "Visit the iconic sea temple of Tanah Lot at sunset — one of Bali's must-see sights. Explore the hip Canggu surf beach village." },
            { day: 7, title: "Free Day & Spa", description: "Relax by your villa pool or indulge in a traditional Balinese massage and spa treatment. Evening optional Kecak fire dance performance at Uluwatu Temple." },
            { day: 8, title: "Departure", description: "Morning at leisure before transfer to Ngurah Rai Airport for your departure. Carry Bali's magic back home with you!" },
        ],
        images: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
            "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80",
        ],
        isPublished: true,
    },
    {
        title: "Singapore City & Sentosa – 4 Days",
        slug: "singapore-city-sentosa-4-days",
        destination: "Singapore",
        category: "International",
        durationDays: 4,
        priceFrom: 849,
        currency: "USD",
        highlights: [
            "Gardens by the Bay & Supertree Grove",
            "Universal Studios Singapore",
            "Marina Bay Sands SkyPark",
            "Singapore Botanic Gardens",
            "Legendary hawker centre food tour",
        ],
        inclusions: [
            "3 nights 4★ hotel in Marina Bay area",
            "Daily breakfast",
            "Airport transfers by MRT card",
            "Gardens by the Bay (dome entry)",
            "Night Safari entry",
        ],
        exclusions: [
            "International flights",
            "Universal Studios entry ticket",
            "Meals (except breakfast)",
            "Personal shopping",
        ],
        itinerary: [
            { day: 1, title: "Arrival in Singapore", description: "Arrive at Changi Airport — the world's best airport! Transfer to hotel via MRT. Evening explore the Merlion Park and Marina Bay waterfront." },
            { day: 2, title: "Gardens by the Bay & Marina Bay Sands", description: "Morning at the futuristic Gardens by the Bay with the Supertree Grove and Cloud Forest dome. Afternoon visit Marina Bay Sands SkyPark Observation Deck for panoramic views." },
            { day: 3, title: "Sentosa Island – Universal Studios", description: "Full day at Sentosa Island. Experience the thrilling rides at Universal Studios Singapore. Evening at the S.E.A. Aquarium or Siloso Beach." },
            { day: 4, title: "Hawker Food Tour & Departure", description: "Morning guided Hawker Centre food tour — char kway teow, laksa, chicken rice, and more! Shop at Orchard Road before transfer to Changi Airport." },
        ],
        images: [
            "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
            "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200&q=80",
            "https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d4?w=1200&q=80",
        ],
        isPublished: true,
    },
    {
        title: "Thailand Highlights – 10 Days",
        slug: "thailand-highlights-10-days",
        destination: "Thailand",
        category: "International",
        durationDays: 10,
        priceFrom: 1199,
        currency: "USD",
        highlights: [
            "Bangkok's glittering temples",
            "Chiang Mai elephant sanctuary",
            "Phi Phi Islands snorkeling & kayaking",
            "Thai cooking class",
            "Krabi beach hopping",
        ],
        inclusions: [
            "9 nights accommodation (mix of city & beach)",
            "Breakfast daily",
            "Domestic flight Bangkok–Chiang Mai",
            "Ferry/speedboat to islands",
            "Airport transfers",
            "Elephant sanctuary visit",
        ],
        exclusions: [
            "International flights",
            "Thailand visa (may be required)",
            "Travel insurance",
            "Personal expenses",
        ],
        itinerary: [
            { day: 1, title: "Arrival in Bangkok", description: "Arrive at Suvarnabhumi Airport. Transfer to your hotel in Bangkok. Evening cruise on the Chao Phraya River." },
            { day: 2, title: "Bangkok Temples & Grand Palace", description: "Full day Bangkok tour — Grand Palace, Wat Phra Kaew (Emerald Buddha), Wat Pho (Reclining Buddha), and Wat Arun. Evening street food tour at Yaowarat (Chinatown)." },
            { day: 3, title: "Bangkok Markets & To Chiang Mai", description: "Morning visit to Chatuchak Weekend Market. Afternoon domestic flight to Chiang Mai." },
            { day: 4, title: "Chiang Mai – Elephant Sanctuary", description: "Ethical elephant sanctuary visit — feed, bathe, and walk with elephants in their natural habitat. Afternoon Chiang Mai old city temples." },
            { day: 5, title: "Chiang Mai – Doi Inthanon & Cooking Class", description: "Morning trek to Doi Inthanon, Thailand's highest peak. Afternoon traditional Thai cooking class." },
            { day: 6, title: "Flight to Phuket/Krabi", description: "Fly from Chiang Mai to Phuket or Krabi. Transfer to your beach resort. Evening welcome cocktails by the sea." },
            { day: 7, title: "Phi Phi Islands Snorkeling", description: "Full day speedboat tour to the spectacular Phi Phi Islands — snorkeling at Maya Bay and Phi Phi Leh, kayaking through sea caves." },
            { day: 8, title: "Krabi 4-Island Tour", description: "Longtail boat tour around Krabi's famous 4 islands — Poda Island, Chicken Island, Tup Island, and Mor Island. Swim and snorkel in turquoise waters." },
            { day: 9, title: "Railay Beach & Tiger Cave Temple", description: "Morning longtail to the stunning Railay Beach, accessible only by sea. Afternoon climb 1,237 steps to Tiger Cave Temple for panoramic views over Krabi." },
            { day: 10, title: "Departure", description: "Morning at leisure by the beach. Transfer to Krabi Airport for your departure flight. Sawadee ka — until next time!" },
        ],
        images: [
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
            "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1200&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        ],
        isPublished: true,
    },
];

async function seed() {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected");

    // Clear existing seed packages
    const existing = await Package.countDocuments();
    if (existing > 0) {
        console.log(`⚠️  Found ${existing} existing packages. Clearing...`);
        await Package.deleteMany({});
    }

    console.log("📦 Inserting 6 sample packages...");
    await Package.insertMany(samplePackages);
    console.log("✅ Seed complete — 6 packages inserted!");

    await mongoose.disconnect();
    console.log("🔌 Disconnected. You're all set!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
