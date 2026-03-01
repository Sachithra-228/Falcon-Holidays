import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Falcon Holidays. Send us an inquiry, call us, or chat on WhatsApp — we're here to help plan your dream trip.",
};

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        details: ["+94 11 234 5678", "+94 77 890 1234"],
    },
    {
        icon: Mail,
        title: "Email",
        details: ["info@falconholidays.lk", "bookings@falconholidays.lk"],
    },
    {
        icon: MapPin,
        title: "Office",
        details: ["No. 42, Galle Road", "Colombo 06, Sri Lanka"],
    },
    {
        icon: Clock,
        title: "Working Hours",
        details: ["Mon–Sat: 9:00 AM – 6:00 PM", "Sun: 10:00 AM – 2:00 PM"],
    },
];

export default function ContactPage() {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "947XXXXXXXX";
    const waMessage = encodeURIComponent("Hello Falcon Holidays! I'd like to inquire about a travel package.");

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Header */}
            <div className="bg-navy-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Reach Out</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Have a question? Ready to book? Our team is here to help you plan the perfect getaway.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* WhatsApp CTA */}
                        <div className="bg-green-500 rounded-2xl p-7 text-white">
                            <MessageCircle size={32} className="mb-3" />
                            <h3 className="font-bold text-xl mb-2">Chat on WhatsApp</h3>
                            <p className="text-green-100 text-sm mb-5">Get a fast response — our team is active and ready to answer your questions.</p>
                            <a
                                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
                            >
                                Start Chat
                                <MessageCircle size={16} />
                            </a>
                        </div>

                        {/* Info cards */}
                        {contactInfo.map(({ icon: Icon, title, details }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                                <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-gold" />
                                </div>
                                <div>
                                    <div className="font-semibold text-navy-900 text-sm mb-1">{title}</div>
                                    {details.map((d) => (
                                        <div key={d} className="text-gray-600 text-sm">{d}</div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Map placeholder */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-52 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-gray-100 flex flex-col items-center justify-center gap-2">
                                <MapPin size={32} className="text-navy-900" />
                                <span className="text-navy-700 font-medium text-sm">Colombo 06, Sri Lanka</span>
                                <a
                                    href="https://maps.google.com/?q=Colombo+06+Sri+Lanka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gold hover:underline"
                                >
                                    Open in Google Maps →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
