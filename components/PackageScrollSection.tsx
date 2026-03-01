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
        image: "https://images.unsplash.com/photo-1595584779391-f64e4c2a9b0d?w=1000&q=85",
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
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&q=85",
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
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=85",
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
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1000&q=85",
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
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                } else {
                    // Optional: setVisible(false) if you want it to re-animate when scrolling back up
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`grid grid-cols-1 lg:grid-cols-2 min-h-[550px] overflow-hidden bg-white border-b border-gray-100 transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* IMAGE SIDE (Fixed Left) */}
            <div
                className={`relative overflow-hidden h-80 lg:h-auto transition-all duration-1000 ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                    }`}
            >
                <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className={`object-cover transition-transform duration-[2000ms] ease-out ${visible ? "scale-100" : "scale-125"}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${pkg.color} to-transparent opacity-60`} />

                {/* Overlaid content on image */}
                <div className={`absolute inset-0 flex flex-col justify-end p-8 lg:p-12 transition-all duration-1000 delay-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${pkg.accentColor} drop-shadow-md`}>
                        {pkg.tag}
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                        {pkg.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                        <MapPin size={14} className="text-gold" />
                        <span>🇱🇰 {pkg.region}</span>
                    </div>
                </div>

                {/* Price floating badge */}
                <div className={`absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl text-center transition-all duration-1000 delay-700 ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Starting From</div>
                    <div className="text-2xl font-black text-navy-900 leading-tight">{pkg.price}</div>
                </div>
            </div>

            {/* DETAILS SIDE (Fixed Right) */}
            <div
                className={`flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-20 transition-all duration-1000 delay-300 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    }`}
            >
                {/* Duration badge */}
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-5">
                    <Clock size={12} />
                    {pkg.duration}
                </div>

                <p className="text-gray-500 text-base mb-7 leading-relaxed italic">
                    "{pkg.subtitle}"
                </p>

                {/* Highlights */}
                <div className="mb-7">
                    <div className="text-xs font-bold uppercase tracking-widest text-navy-900 mb-3">Highlights</div>
                    <ul className="space-y-2.5">
                        {pkg.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Inclusions */}
                <div className="mb-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-navy-900 mb-3">What's Included</div>
                    <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.map((inc) => (
                            <span
                                key={inc}
                                className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full border border-emerald-100"
                            >
                                ✓ {inc}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTAs */}
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
    return (
        <section className="bg-gray-50" id="packages">
            {/* Section header */}
            <div className="max-w-3xl mx-auto px-4 text-center pt-20 pb-12">
                <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Our Best Packages</div>
                <h2 className="section-heading mb-3">Explore Sri Lanka, Your Way</h2>
                <p className="section-subheading">
                    Scroll to discover our most loved Sri Lanka journeys — each crafted with care, every detail handled for you.
                </p>
            </div>

            {/* Scroll-driven package blocks */}
            <div className="divide-y divide-gray-100 shadow-inner">
                {packages.map((pkg, i) => (
                    <PackageBlock key={pkg.slug} pkg={pkg} index={i} />
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center py-14 bg-white">
                <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
                <Link href="/packages" className="btn-navy">
                    Browse All Sri Lanka Packages <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
}
