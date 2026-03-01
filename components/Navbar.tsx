"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/destinations", label: "Destinations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-navy-900/98 shadow-xl shadow-navy-900/30 backdrop-blur-md"
                    : "bg-navy-900/80 backdrop-blur-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center shadow-lg">
                            <span className="text-navy-900 font-black text-lg">F</span>
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg leading-tight group-hover:text-gold transition-colors">
                                Falcon
                            </div>
                            <div className="text-gold text-xs font-medium tracking-widest leading-tight">
                                HOLIDAYS
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-200 hover:text-gold font-medium text-sm tracking-wide transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
                            Get a Quote
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-white hover:text-gold transition-colors p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-navy-900 border-t border-white/10 px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-gray-200 hover:text-gold hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-white/10">
                        <Link href="/contact" className="btn-primary w-full justify-center text-sm" onClick={() => setIsOpen(false)}>
                            Get a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
