import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
    name: string;
    location: string;
    rating: number;
    review: string;
    avatar?: string;
    trip?: string;
}

export default function TestimonialCard({
    name,
    location,
    rating,
    review,
    avatar,
    trip,
}: TestimonialCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group hover:-translate-y-1">
            {/* Decorative quote */}
            <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={72} className="text-navy-900" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < rating ? "text-blue-400 fill-blue-400" : "text-gray-200 fill-gray-200"}
                    />
                ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 leading-relaxed text-sm mb-6 relative z-10">"{review}"</p>

            {/* Trip badge */}
            {trip && (
                <div className="mb-4">
                    <span className="text-xs font-medium bg-navy-50 text-navy-700 px-3 py-1 rounded-full border border-navy-100">
                        ✈ {trip}
                    </span>
                </div>
            )}

            {/* Author */}
            <div className="flex items-center gap-3">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/30"
                    />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-500/30">
                        {initials}
                    </div>
                )}
                <div>
                    <div className="font-semibold text-navy-900 text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{location}</div>
                </div>
            </div>
        </div>
    );
}
