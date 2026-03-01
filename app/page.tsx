"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Award, Headphones, Globe, Star, MapPin, Quote } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import PackageScrollSection from "@/components/PackageScrollSection";
import { useRef, useEffect, useState } from "react";

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
    {
        name: "The Wijesinghe Family",
        location: "Melbourne, Australia",
        rating: 5,
        review: "Exploring the tea plantations in Nuwara Eliya with Falcon Holidays was a dream. The kids loved the train ride! Excellent organization and friendly guides.",
        trip: "Tea Country Family Retreat",
    },
    {
        name: "David & Elena",
        location: "Berlin, Germany",
        rating: 5,
        review: "A perfectly balanced trip. Sigiriya was breathtaking, and the wildlife safari in Yala was the highlight of our year. Thank you for the seamless experience!",
        trip: "Wild Sri Lanka & Heritage",
    },
    {
        name: "Sophia Chen",
        location: "Singapore",
        rating: 5,
        review: "I traveled solo with Falcon Holidays and felt safe and supported the entire time. The boutique hotels they picked were stunning. A truly premium service!",
        trip: "Solo Boutique Discovery",
    },
];

export default function HomePage() {
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

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
                        Your Dream Trip{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
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
            <section className="py-24 bg-navy-900 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-3 flex items-center justify-center gap-2">
                            <span className="w-8 h-px bg-blue-400/30"></span>
                            Why Choose Us
                            <span className="w-8 h-px bg-blue-400/30"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-5">The Falcon Difference</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            We've been redefining travel since 2016, making every journey as exceptional as the destination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {whyFalcon.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="group relative p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                                {/* Card Hover Shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400 group-hover:scale-110 transition-all duration-500 shadow-xl">
                                    <Icon size={28} className="text-blue-400 group-hover:text-navy-900 transition-colors duration-500" />
                                </div>

                                <h3 className="font-bold text-white text-xl mb-4 leading-tight group-hover:text-blue-400 transition-colors duration-500">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">{description}</p>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION - HAPPY TRAVELERS */}
            <TestimonialsSection testimonials={testimonials} />

            {/* CTA */}
            <CTASection />
        </div>
    );
}

function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="py-24 bg-navy-900 relative overflow-hidden">
            {/* Background Text Animation Area - Wider container, fluid typography */}
            <div className="w-full mb-20 relative h-64 flex items-center justify-center pointer-events-none">
                <div className="flex gap-2 md:gap-6 overflow-visible py-10 opacity-30 select-none">
                    {"FALCON HOLIDAYS".split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                y: Math.random() * 400 - 200,
                                x: Math.random() * 400 - 200,
                                rotate: Math.random() * 180 - 90,
                                opacity: 0
                            }}
                            whileInView={{
                                y: 0,
                                x: 0,
                                rotate: 0,
                                opacity: 1
                            }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{
                                duration: 2,
                                delay: i * 0.03,
                                ease: [0.2, 0.65, 0.3, 0.9]
                            }}
                            className="text-6xl md:text-[8vw] lg:text-[7vw] font-black text-white whitespace-pre inline-block font-sans tracking-tight"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Looping Testimonials Slider */}
            <div className="relative overflow-hidden py-10">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={isPaused ? {} : { x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{ width: "fit-content" }}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="w-[350px] md:w-[450px] flex-shrink-0">
                            <TestimonialCard {...t} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle Gradient Overlays for smooth edges */}
            <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-navy-900 via-navy-900/40 to-transparent z-10 pointer-events-none" />
        </section>
    );
}
