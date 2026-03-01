import Image from "next/image";
import { Users, Globe, Star, Award, Heart, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Falcon Holidays — our story, mission, and the passionate team behind your dream vacations.",
};

const stats = [
    { icon: Users, value: "5,000+", label: "Happy Travelers" },
    { icon: Globe, value: "50+", label: "Destinations" },
    { icon: Award, value: "8+", label: "Years in Business" },
    { icon: Star, value: "4.9", label: "Average Rating" },
];

const values = [
    {
        icon: Heart,
        title: "Passion for Travel",
        description: "Every itinerary is crafted with genuine love for exploration and discovery.",
    },
    {
        icon: Award,
        title: "Excellence in Service",
        description: "From first inquiry to final return — we deliver a premium, white-glove experience.",
    },
    {
        icon: Zap,
        title: "Fast & Reliable",
        description: "Quick response times, efficient planning, and dependable 24/7 on-trip support.",
    },
];

const team = [
    {
        name: "Ravi Perera",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        bio: "With over 15 years in the travel industry, Ravi founded Falcon Holidays with a vision to make world-class travel accessible to everyone.",
    },
    {
        name: "Nisha Fernando",
        role: "Head of Operations",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        bio: "Nisha brings 10 years of hospitality expertise, ensuring every trip runs smoothly from booking to checkout.",
    },
    {
        name: "Ashan Wickramasinghe",
        role: "Lead Travel Designer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        bio: "An avid adventurer who has visited 40+ countries, Ashan crafts bespoke itineraries that blend adventure and luxury perfectly.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <section className="relative bg-navy-900 py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
                        alt="Travel background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Our Story</div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        We Live &amp; Breathe{" "}
                        <span className="text-gold">Travel</span>
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed">
                        Founded in 2016, Falcon Holidays was born from a simple belief: that extraordinary travel experiences should be available to everyone, not just the privileged few.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <Icon size={28} className="text-gold mx-auto mb-3" />
                                <div className="text-3xl font-black text-navy-900">{value}</div>
                                <div className="text-gray-500 text-sm mt-1">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-4">Our Mission</div>
                            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                                Crafting Journeys That Last a Lifetime
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    At Falcon Holidays, we don't just sell travel packages — we create memories. Every itinerary is thoughtfully designed considering your preferences, budget, and dream experiences.
                                </p>
                                <p>
                                    Our team of passionate travel designers has personally explored each destination, ensuring we recommend only the best hotels, experiences, and hidden gems.
                                </p>
                                <p>
                                    From the moment you contact us to the moment you return home, we're with you every step of the way — providing seamless, stress-free travel you'll talk about for years.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
                                alt="Travel experience"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/30 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="section-heading">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:-translate-y-1 duration-300">
                                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-navy-900 flex items-center justify-center shadow-lg">
                                    <Icon size={28} className="text-gold" />
                                </div>
                                <h3 className="font-bold text-navy-900 text-xl mb-3">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ The People Behind the Magic</div>
                        <h2 className="section-heading">Meet Our Team</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map(({ name, role, image, bio }) => (
                            <div key={name} className="text-center group">
                                <div className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-gold/30 group-hover:ring-gold transition-all duration-300">
                                    <Image src={image} alt={name} fill className="object-cover" />
                                </div>
                                <h3 className="font-bold text-navy-900 text-xl">{name}</h3>
                                <div className="text-gold text-sm font-medium mb-3">{role}</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
