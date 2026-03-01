import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PackageCardProps {
    _id: string;
    title: string;
    slug: string;
    destination: string;
    category: string;
    durationDays: number;
    priceFrom: number;
    currency: string;
    highlights: string[];
    images: string[];
}

export default function PackageCard({
    title,
    slug,
    destination,
    category,
    durationDays,
    priceFrom,
    currency,
    highlights,
    images,
}: PackageCardProps) {
    const imageUrl = images?.[0] || `https://picsum.photos/seed/${slug}/800/600`;

    const categoryColors: Record<string, string> = {
        "Sri Lanka": "bg-emerald-100 text-emerald-800",
        International: "bg-blue-100 text-blue-800",
        Honeymoon: "bg-pink-100 text-pink-800",
        Adventure: "bg-orange-100 text-orange-800",
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] || "bg-gray-100 text-gray-800"}`}>
                        {category}
                    </span>
                </div>
                {/* Price overlay */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                    <div className="text-xs text-gray-500 leading-none">From</div>
                    <div className="text-navy-900 font-bold text-lg leading-tight">{formatPrice(priceFrom, currency)}</div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                    <MapPin size={13} />
                    <span>{destination}</span>
                    <span className="mx-1">·</span>
                    <Clock size={13} />
                    <span>{durationDays} Days</span>
                </div>

                <h3 className="font-bold text-navy-900 text-lg mb-3 line-clamp-1 group-hover:text-gold transition-colors">
                    {title}
                </h3>

                {/* Highlights */}
                <ul className="space-y-1 mb-5">
                    {highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 text-xs">
                            <Star size={10} className="text-gold fill-gold shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/packages/${slug}`}
                    className="flex items-center justify-between w-full px-4 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-gold hover:text-navy-900 transition-all duration-300 group/btn"
                >
                    View Package
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
