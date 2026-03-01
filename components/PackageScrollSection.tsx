"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, CheckCircle, ArrowRight, Calendar } from "lucide-react";

const packages = [
    {
        slug: "sigiriya-cultural-triangle-5-days",
        title: "Sigiriya & Cultural Triangle",
        subtitle: "Step back 1,500 years into ancient Sri Lanka",
        duration: "5 Days / 4 Nights",
        region: "Cultural Triangle",
        price: "LKR 85,000",
        image: "/images/sigiriya.jpg",
        highlights: [
            "Climb Sigiriya Rock Fortress at sunrise",
            "Explore Dambulla Cave Temple",
            "Ancient city of Polonnaruwa",
            "Village bicycle safari through rice fields",
        ],
        inclusions: ["Hotel accommodation", "Daily breakfast & dinner", "AC transport", "English-speaking guide"],
        color: "from-amber-900/90",
        accentColor: "text-amber-400",
        tag: "🏛️ Heritage",
    },
    {
        slug: "kandy-hill-country-4-days",
        title: "Kandy & Misty Hill Country",
        subtitle: "Tea, temples and cool mountain air",
        duration: "4 Days / 3 Nights",
        region: "Hill Country",
        price: "LKR 68,000",
        image: "/images/kandy.jpg",
        highlights: [
            "Temple of the Tooth Relic ceremony",
            "Royal Botanical Gardens of Peradeniya",
            "Scenic train ride through tea country",
            "Tea factory tour & tasting",
        ],
        inclusions: ["Hotel accommodation", "Daily breakfast", "Train tickets", "Local guide"],
        color: "from-emerald-900/90",
        accentColor: "text-emerald-400",
        tag: "🍃 Nature & Culture",
    },
    {
        slug: "galle-southern-coast-3-days",
        title: "Galle & The Southern Coast",
        subtitle: "Dutch forts, whale watching & golden beaches",
        duration: "3 Days / 2 Nights",
        region: "Southern Province",
        price: "LKR 52,000",
        image: "/images/galle.jpeg",
        highlights: [
            "Walk Galle Fort's UNESCO ramparts",
            "Whale & dolphin watching at Mirissa",
            "Stilt fishermen of Koggala",
            "Sunset at Tangalle beach",
        ],
        inclusions: ["Boutique hotel stay", "Whale watch boat trip", "Transfers", "All meals"],
        color: "from-blue-900/90",
        accentColor: "text-blue-400",
        tag: "🌊 Beach & History",
    },
    {
        slug: "yala-wildlife-safari-2-days",
        title: "Yala Leopard Safari",
        subtitle: "The world's densest wild leopard population",
        duration: "2 Days / 1 Night",
        region: "Southern Wilderness",
        price: "LKR 38,000",
        image: "/images/yala.jpg",
        highlights: [
            "Morning & evening 4x4 jeep safaris",
            "Wild leopard tracking",
            "Asian elephant herds",
            "Over 215 bird species",
        ],
        inclusions: ["Safari lodge / tented camp", "All meals", "4x4 jeep & tracker", "Park entry fees"],
        color: "from-green-900/90",
        accentColor: "text-green-400",
        tag: "🐆 Wildlife Safari",
    },
];

function PackageBlock({ pkg, index }: { pkg: (typeof packages)[0]; index: number }) {
    const isEven = index % 2 === 1;

    return (
        <div className="sticky top-0 h-screen w-full bg-white overflow-hidden border-b border-gray-100 flex flex-col lg:flex-row">
            {/* IMAGE SIDE */}
            <div className={`relative w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden ${isEven ? 'lg:order-last' : ''}`}>
                <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                />
                {/* Subtle bottom shadow to make price badge pop */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-40" />

                {/* Price floating badge */}
                <div className={`absolute top-8 ${isEven ? 'left-8' : 'right-8'} bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl text-center`}>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Starting From</div>
                    <div className="text-2xl font-black text-navy-900 leading-tight">{pkg.price}</div>
                </div>
            </div>

            {/* DETAILS SIDE */}
            <div className={`w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-20 h-1/2 lg:h-full bg-white`}>
                <div className="mb-6">
                    <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${pkg.accentColor}`}>
                        {pkg.tag}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-navy-900 leading-tight mb-3">
                        {pkg.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <MapPin size={14} className="text-blue-400" />
                        <span>🇱🇰 {pkg.region}</span>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-5">
                    <Clock size={12} />
                    {pkg.duration}
                </div>

                <p className="text-gray-500 text-base mb-7 leading-relaxed italic line-clamp-2 md:line-clamp-none">
                    "{pkg.subtitle}"
                </p>

                <div className="mb-7 hidden md:block">
                    <div className="text-xs font-bold uppercase tracking-widest text-navy-900 mb-3">Highlights</div>
                    <ul className="space-y-2">
                        {pkg.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href={`/packages/${pkg.slug}`}
                        className="btn-navy text-sm py-3 px-6"
                    >
                        View Full Itinerary <ArrowRight size={15} />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-300 text-sm"
                    >
                        <Calendar size={15} />
                        Request a Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PackageScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const element = containerRef.current;
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Total height of the transition section is about 150vh
            const totalHeight = viewportHeight * 1.5;
            const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Text Opacity & Scale Calculation
    // Progress 0 -> 0.4: Fade in "Explore Sri Lanka"
    // Progress 0.3 -> 0.7: Fade in "Your Way"
    // Progress 0.7 -> 1.0: Fade out both
    const text1Opacity = scrollProgress < 0.7 ? Math.min(1, scrollProgress * 4) : Math.max(0, 1 - (scrollProgress - 0.7) * 4);
    const text2Opacity = scrollProgress < 0.7 ? Math.max(0, (scrollProgress - 0.2) * 4) : Math.max(0, 1 - (scrollProgress - 0.7) * 4);
    const scrollInstructionOpacity = scrollProgress > 0.4 ? Math.min(1, (scrollProgress - 0.4) * 4) : 0;

    return (
        <section className="bg-white" id="packages">
            {/* BLACK TRANSITION SECTION */}
            <div ref={containerRef} className="relative h-[200vh] bg-black">
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                    <div className="text-center px-4">
                        <h2
                            className="text-5xl md:text-8xl font-black text-white mb-4 transition-all duration-300 ease-out"
                            style={{
                                opacity: text1Opacity,
                                transform: `scale(${0.9 + scrollProgress * 0.2})`
                            }}
                        >
                            Explore Sri Lanka
                        </h2>
                        <h2
                            className="text-6xl md:text-9xl font-black text-blue-500 italic transition-all duration-300 ease-out"
                            style={{
                                opacity: text2Opacity,
                                transform: `scale(${0.8 + scrollProgress * 0.3})`
                            }}
                        >
                            Your Way
                        </h2>
                    </div>

                    {/* Animated Scroll Instruction */}
                    <div
                        className="absolute bottom-12 flex flex-col items-center gap-3 transition-opacity duration-500"
                        style={{ opacity: scrollInstructionOpacity }}
                    >
                        <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
                            Scroll to discover our most loved journeys
                        </p>
                        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
                    </div>
                </div>
            </div>

            {/* STICKY PACKAGE STACK */}
            <div className="relative">
                {packages.map((pkg, i) => (
                    <PackageBlock key={pkg.slug} pkg={pkg} index={i} />
                ))}
            </div>

        </section>
    );
}
