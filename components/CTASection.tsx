import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

interface CTASectionProps {
    title?: string;
    subtitle?: string;
}

export default function CTASection({
    title = "Ready for Your Dream Vacation?",
    subtitle = "Let our expert travel consultants craft the perfect itinerary just for you. From budget to luxury — we've got every trip covered.",
}: CTASectionProps) {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "947XXXXXXXX";
    const message = encodeURIComponent("Hi Falcon Holidays! I'd like to plan a trip.");
    const waLink = `https://wa.me/${waNumber}?text=${message}`;

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                    {title}
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-400/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <MessageCircle size={20} />
                        Chat on WhatsApp
                    </a>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 px-8 py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 group"
                    >
                        Send an Inquiry
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Trust signals */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
                    {["✓ Free Consultation", "✓ Best Price Guarantee", "✓ 24/7 Support", "✓ Trusted by 5,000+ Travelers"].map((item) => (
                        <span key={item} className="text-gray-300">{item}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
