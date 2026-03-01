import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Admin – Falcon Holidays",
        template: "%s | Admin – Falcon Holidays",
    },
};

// Admin uses a bare layout (no Navbar/Footer/WhatsApp)
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-50">{children}</body>
        </html>
    );
}
