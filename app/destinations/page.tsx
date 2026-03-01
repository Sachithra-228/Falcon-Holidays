import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Destinations",
    description: "Explore Sri Lanka's most beautiful destinations — from the misty hills of Ella to the ancient fortress of Sigiriya, the pristine beaches of Mirissa, and the colonial charm of Galle.",
};

const sriLankaDestinations = [
    {
        name: "Sigiriya",
        region: "Cultural Triangle",
        tagline: "The 8th Wonder of the World",
        description: "Climb the legendary 5th-century rock fortress rising 200m above the jungle plains. Marvel at ancient frescoes, mirror walls, and breathtaking panoramic views.",
        image: "https://images.unsplash.com/photo-1589308454378-9b5c4f1c4aa8?w=800&q=80",
        packages: "8+ Packages",
        highlights: ["Sigiriya Rock Fortress", "Ancient Frescoes", "Water Gardens", "Dambulla Cave Temple"],
        category: "Sri Lanka",
    },
    {
        name: "Kandy",
        region: "Hill Country",
        tagline: "Sacred City of the Hills",
        description: "Sri Lanka's cultural capital nestled among misty mountains. Home to the revered Temple of the Tooth Relic, lush Botanical Gardens, and vibrant Kandyan dance traditions.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
        packages: "10+ Packages",
        highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Kandyan Dance", "Kandy Lake"],
        category: "Sri Lanka",
    },
    {
        name: "Galle",
        region: "Southern Province",
        tagline: "Dutch Colonial Charm",
        description: "Walk the ramparts of the UNESCO-listed Galle Fort, a masterpiece of 17th-century Dutch colonial architecture blending European and South Asian styles on a dramatic headland.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        packages: "7+ Packages",
        highlights: ["Galle Fort (UNESCO)", "Lighthouse", "Dutch Reformed Church", "Boutique Shopping"],
        category: "Sri Lanka",
    },
    {
        name: "Ella",
        region: "Uva Province",
        tagline: "Mountain Village Paradise",
        description: "Perched at 1,041m, this charming hill town offers stunning valley views, misty tea estates, the iconic Nine Arch Bridge, and the exhilarating Little Adam's Peak hike.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        packages: "9+ Packages",
        highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls", "Tea Factory Visits"],
        category: "Sri Lanka",
    },
    {
        name: "Mirissa",
        region: "Southern Coast",
        tagline: "Whale Watching Capital",
        description: "Pristine crescent beach famous for some of the world's best whale and dolphin watching. Stunning sunsets, fresh seafood, and a relaxed beach village vibe.",
        image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&q=80",
        packages: "6+ Packages",
        highlights: ["Blue Whale Watching", "Mirissa Beach", "Secret Beach", "Parrot Rock"],
        category: "Sri Lanka",
    },
    {
        name: "Yala",
        region: "Southern Wilderness",
        tagline: "Sri Lanka's Wildlife Capital",
        description: "The world's highest density of leopards in the wild. This magnificent national park also shelters elephants, sloth bears, crocodiles, and 215 species of birds.",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
        packages: "8+ Packages",
        highlights: ["Leopard Safaris", "Elephant Herds", "Sloth Bears", "Birdwatching"],
        category: "Sri Lanka",
    },
    {
        name: "Nuwara Eliya",
        region: "Central Highlands",
        tagline: "Little England of Sri Lanka",
        description: "At 1,868m, Sri Lanka's highest town is draped in mist and emerald tea estates. Colonial bungalows, rose gardens, and cool climate make it a unique highland retreat.",
        image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800&q=80",
        packages: "7+ Packages",
        highlights: ["Tea Plantations", "Victoria Park", "Gregory Lake", "Tea Factory Tours"],
        category: "Sri Lanka",
    },
    {
        name: "Trincomalee",
        region: "Eastern Province",
        tagline: "East Coast Hidden Gem",
        description: "Home to one of the world's finest natural harbours, stunning coral reefs, and pristine Nilaveli beach. The best whale watching and diving season runs from May to October.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
        packages: "5+ Packages",
        highlights: ["Nilaveli Beach", "Diving & Snorkeling", "Koneswaram Temple", "Hot Springs"],
        category: "Sri Lanka",
    },
    {
        name: "Colombo",
        region: "Western Province",
        tagline: "The Vibrant Capital",
        description: "A dynamic, cosmopolitan city where colonial heritage meets ultra-modern skyline. World-class dining, vibrant nightlife, Pettah street markets, and the iconic Gangaramaya Temple.",
        image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80",
        packages: "6+ Packages",
        highlights: ["Gangaramaya Temple", "Galle Face Green", "Pettah Market", "Colombo Harbour"],
        category: "Sri Lanka",
    },
];

const internationalDestinations = [
    {
        name: "Maldives",
        tagline: "Overwater Paradise",
        image: "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=800&q=80",
        packages: "8+ Packages",
    },
    {
        name: "Dubai",
        tagline: "City of Superlatives",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        packages: "10+ Packages",
    },
    {
        name: "Singapore",
        tagline: "The Lion City",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
        packages: "6+ Packages",
    },
    {
        name: "Bali",
        tagline: "Island of the Gods",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        packages: "9+ Packages",
    },
    {
        name: "Thailand",
        tagline: "Land of Smiles",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        packages: "11+ Packages",
    },
    {
        name: "Malaysia",
        tagline: "Truly Asia",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        packages: "5+ Packages",
    },
];

export default function DestinationsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Header */}
            <div className="relative bg-navy-900 py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1600&q=80"
                        alt="Sri Lanka"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Explore Sri Lanka & Beyond</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Destinations</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover the timeless beauty of Sri Lanka — from misty highlands and ancient kingdoms to golden beaches and wild safari jungles. Plus top international getaways.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <a href="#sri-lanka" className="btn-primary text-sm py-2.5 px-5">
                            <MapPin size={15} /> Sri Lanka Destinations
                        </a>
                        <a href="#international" className="btn-secondary text-sm py-2.5 px-5">
                            International Packages
                        </a>
                    </div>
                </div>
            </div>

            {/* Sri Lanka Destinations */}
            <div id="sri-lanka" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        🇱🇰 Sri Lanka
                    </div>
                    <h2 className="section-heading">Explore the Pearl of the Indian Ocean</h2>
                    <p className="section-subheading">
                        Nine extraordinary destinations across Sri Lanka — every region tells a different story.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sriLankaDestinations.map((dest) => (
                        <div key={dest.name} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100">
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 to-transparent" />
                                {/* Location badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        🇱🇰 {dest.region}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="font-bold text-xl">{dest.name}</div>
                                    <div className="text-gold text-sm">{dest.tagline}</div>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className="bg-gold text-navy-900 text-xs font-bold px-2.5 py-1 rounded-full">{dest.packages}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">{dest.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {dest.highlights.map((h) => (
                                        <span key={h} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/packages?destination=${dest.name}&category=Sri+Lanka`}
                                    className="flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-gold transition-colors group/link"
                                >
                                    View {dest.name} Packages
                                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* International Destinations */}
            <div id="international" className="bg-navy-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Fly from Colombo</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">International Getaways</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Dream beyond Sri Lanka — premium packages to Asia's most iconic destinations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {internationalDestinations.map((dest) => (
                            <Link
                                key={dest.name}
                                href={`/packages?destination=${dest.name}`}
                                className="group relative h-44 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 to-navy-900/20" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                                    <div className="text-white font-bold text-sm">{dest.name}</div>
                                    <div className="text-gold text-xs">{dest.packages}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
