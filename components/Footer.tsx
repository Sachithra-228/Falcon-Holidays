import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Falcon Holidays";
    return (
        <footer className="bg-navy-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center">
                                <span className="text-navy-900 font-black text-lg">F</span>
                            </div>
                            <div>
                                <div className="text-white font-bold text-lg leading-tight">Falcon</div>
                                <div className="text-gold text-xs font-medium tracking-widest leading-tight">HOLIDAYS</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your premier travel concierge crafting unforgettable experiences across the world's most stunning destinations.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: Youtube, href: "#" },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="w-9 h-9 bg-white/10 hover:bg-gold hover:text-navy-900 rounded-full flex items-center justify-center transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/packages", label: "Travel Packages" },
                                { href: "/destinations", label: "Destinations" },
                                { href: "/about", label: "About Us" },
                                { href: "/contact", label: "Contact Us" },
                                { href: "/admin", label: "Admin" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-gold text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Popular Destinations</h4>
                        <ul className="space-y-3">
                            {["Sri Lanka", "Maldives", "Dubai", "Bali", "Singapore", "Thailand"].map((dest) => (
                                <li key={dest}>
                                    <Link href={`/packages?destination=${dest}`} className="text-gray-400 hover:text-gold text-sm transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                                        {dest}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm tracking-wider uppercase">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                                <span className="text-gray-400 text-sm leading-relaxed">No. 42, Galle Road, Colombo 06, Sri Lanka</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                                <a href="tel:+94112345678" className="text-gray-400 hover:text-gold text-sm transition-colors">+94 11 234 5678</a>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                                <a href="mailto:info@falconholidays.lk" className="text-gray-400 hover:text-gold text-sm transition-colors">info@falconholidays.lk</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} {brandName}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                            <a key={item} href="#" className="text-gray-500 hover:text-gold text-xs transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
