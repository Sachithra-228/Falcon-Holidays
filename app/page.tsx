import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Award, Headphones, Globe, Star, MapPin } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import PackageScrollSection from "@/components/PackageScrollSection";

const whyFalcon = [
    {
        icon: Shield,
        title: "100% Secure Booking",
        description: "Your payments and personal data are protected with industry-leading security protocols.",
    },
    {
        icon: Award,
        title: "Award-Winning Service",
        description: "Recognized as one of Sri Lanka's top travel agencies for 5 consecutive years.",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Our dedicated team is available around the clock to assist you throughout your journey.",
    },
    {
        icon: Globe,
        title: "Global Destinations",
        description: "Access to 50+ handpicked destinations across Asia, Europe, and beyond.",
    },
];

const testimonials = [
    {
        name: "Priya & Arun Sharma",
        location: "Bangalore, India",
        rating: 5,
        review: "Falcon Holidays crafted our perfect Maldives honeymoon. Every detail was flawless — from the overwater villa to the sunset dinner. Truly magical and worth every penny!",
        trip: "Maldives Honeymoon Package",
    },
    {
        name: "James & Sarah Mitchell",
        location: "London, UK",
        rating: 5,
        review: "Our Sri Lanka tour exceeded all expectations. The mix of culture, wildlife, and beaches was incredible. The team handled everything seamlessly — highly recommended!",
        trip: "Sri Lanka Discovery Tour",
    },
    {
        name: "Chaminda Perera",
        location: "Colombo, Sri Lanka",
        rating: 5,
        review: "The Dubai family package was phenomenal. Desert safari, Burj Khalifa, and everything in between. Great value for money and excellent customer service throughout.",
        trip: "Dubai Family Adventure",
    },
];


export default async function HomePage() {

    return (
        <div className="min-h-screen">
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
                        alt="Beautiful travel destination"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in">
                        <MapPin size={14} />
                        Discover the world, your way
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
                        Your Dream Trip{" "}
                        <span className="bg-gradient-to-r from-gold to-gold-300 bg-clip-text text-transparent">
                            Awaits
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                        Falcon Holidays crafts extraordinary journeys across Sri Lanka — from the ancient rock fortress of Sigiriya to the pristine beaches of the South Coast.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link href="/packages" className="btn-primary text-base px-8 py-4">
                            Explore Packages
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                            Get a Free Quote
                        </Link>
                    </div>

                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
                        <div className="w-1.5 h-3 bg-white/60 rounded-full animate-float" />
                    </div>
                </div>
            </section>

            {/* SCROLL-DRIVEN PACKAGES */}
            <PackageScrollSection />


            {/* WHY FALCON */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Why Choose Us</div>
                        <h2 className="section-heading">The Falcon Difference</h2>
                        <p className="section-subheading">
                            We've been redefining travel since 2016, making every journey as exceptional as the destination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyFalcon.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-navy-900 group-hover:bg-gold transition-colors duration-300 flex items-center justify-center shadow-lg">
                                    <Icon size={28} className="text-gold group-hover:text-navy-900 transition-colors duration-300" />
                                </div>
                                <h3 className="font-bold text-navy-900 text-lg mb-3">{title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Happy Travelers</div>
                        <h2 className="section-heading">What Our Guests Say</h2>
                        <p className="section-subheading">
                            Don't just take our word for it — hear from thousands of satisfied travelers worldwide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t) => (
                            <TestimonialCard key={t.name} {...t} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DESTINATIONS PREVIEW - Sri Lanka Focused */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Explore Sri Lanka</div>
                        <h2 className="section-heading">Iconic Sri Lanka Destinations</h2>
                        <p className="section-subheading">
                            From misty highlands to golden beaches — discover the Pearl of the Indian Ocean.
                        </p>
                    </div>

                    {/* Featured large + small grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        {/* Big feature card - Sigiriya */}
                        <div className="col-span-2 md:col-span-1 row-span-2">
                            <Link
                                href="/packages?destination=Sigiriya&category=Sri+Lanka"
                                className="group relative h-64 md:h-full min-h-[18rem] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all block"
                            >
                                <Image src="https://images.unsplash.com/photo-1595584779391-f64e4c2a9b0d?w=800&q=80" alt="Sigiriya" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-5 text-white">
                                    <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">🇱🇰 Cultural Triangle</div>
                                    <div className="font-bold text-2xl">Sigiriya</div>
                                    <div className="text-gray-300 text-sm">The Lion Rock Fortress</div>
                                </div>
                            </Link>
                        </div>

                        {/* Small cards */}
                        {[
                            { name: "Kandy", region: "Hill Country", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", tagline: "City of the Tooth Relic" },
                            { name: "Galle", region: "Southern Coast", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80", tagline: "Dutch Colonial Fort City" },
                            { name: "Ella", region: "Uva Province", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tagline: "Nine Arches Bridge & Mist" },
                            { name: "Mirissa", region: "Southern Coast", image: "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=600&q=80", tagline: "Whale Watching & Beaches" },
                        ].map(({ name, region, image, tagline }) => (
                            <Link
                                key={name}
                                href={`/packages?destination=${name}&category=Sri+Lanka`}
                                className="group relative h-44 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 block"
                            >
                                <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                    <div className="text-xs text-gold font-semibold mb-0.5">🇱🇰 {region}</div>
                                    <div className="font-bold text-base">{name}</div>
                                    <div className="text-gray-300 text-xs">{tagline}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/destinations" className="btn-navy">
                            Explore All Sri Lanka Destinations <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <CTASection />
        </div>
    );
}
