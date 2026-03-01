"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "947XXXXXXXX";
    const message = encodeURIComponent("Hello Falcon Holidays! I'd like to inquire about your travel packages.");
    const href = `https://wa.me/${waNumber}?text=${message}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
                {/* Button */}
                <div className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 hover:shadow-green-400/50 transition-all duration-300 hover:scale-110">
                    <MessageCircle size={26} className="text-white fill-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Chat on WhatsApp
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
                </div>
            </div>
        </a>
    );
}
