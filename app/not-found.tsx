import Link from "next/link";
import { Home, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-20">
            <div className="text-center max-w-md">
                {/* 404 display */}
                <div className="text-9xl font-black text-navy-900/10 leading-none mb-4 select-none">404</div>
                <div className="w-20 h-20 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-6 -mt-8 shadow-xl">
                    <Search size={32} className="text-gold" />
                </div>
                <h1 className="text-2xl font-bold text-navy-900 mb-3">Page Not Found</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/" className="btn-primary">
                        <Home size={18} />
                        Go Home
                    </Link>
                    <Link href="/packages" className="btn-navy">
                        Browse Packages
                    </Link>
                </div>
            </div>
        </div>
    );
}
