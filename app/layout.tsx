import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const metadata: Metadata = {
    title: {
        default: "Falcon Holidays – Premium Travel Experiences",
        template: "%s | Falcon Holidays",
    },
    description:
        "Discover the world with Falcon Holidays. Premium travel packages to Sri Lanka, Maldives, Dubai, Bali, and beyond. Crafted for the discerning traveler.",
    keywords: ["travel", "holidays", "packages", "Sri Lanka", "Maldives", "Dubai", "Bali"],
    openGraph: {
        title: "Falcon Holidays – Premium Travel Experiences",
        description:
            "Discover the world with Falcon Holidays. Premium travel packages crafted for the discerning traveler.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <WhatsAppFloatingButton />
            </body>
        </html>
    );
}
