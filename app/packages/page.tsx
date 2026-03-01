import { Suspense } from "react";
import { getPublishedPackages } from "@/lib/actions/packages";
import PackageCard from "@/components/PackageCard";
import FiltersBar from "@/components/FiltersBar";
import { Package, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Travel Packages",
    description: "Explore our curated travel packages to Sri Lanka, Maldives, Dubai, Bali, and beyond. Filter by destination, duration, and budget.",
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

function parseDuration(duration?: string): { minDays?: number; maxDays?: number } {
    if (!duration) return {};
    if (duration === "1-4") return { minDays: 1, maxDays: 4 };
    if (duration === "5-7") return { minDays: 5, maxDays: 7 };
    if (duration === "8-14") return { minDays: 8, maxDays: 14 };
    if (duration === "15+") return { minDays: 15 };
    return {};
}

async function PackagesList({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const { minDays, maxDays } = parseDuration(searchParams.duration);

    let packages: any[] = [];
    try {
        packages = await getPublishedPackages({
            destination: searchParams.destination,
            category: searchParams.category,
            minDays,
            maxDays,
            sort: searchParams.sort,
        });
    } catch {
        // DB not connected
    }

    if (packages.length === 0) {
        return (
            <div className="text-center py-20">
                <Package size={56} className="mx-auto mb-4 text-gray-200" />
                <h3 className="text-xl font-semibold text-navy-900 mb-2">No packages found</h3>
                <p className="text-gray-500">Try adjusting your filters or browse all packages.</p>
            </div>
        );
    }

    return (
        <>
            <p className="text-sm text-gray-600 mb-6">{packages.length} package{packages.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {packages.map((pkg: any) => (
                    <PackageCard key={pkg._id} {...pkg} />
                ))}
            </div>
        </>
    );
}

export default async function PackagesPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            {/* Page Header */}
            <div className="bg-navy-900 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">✦ Explore & Discover</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Travel Packages</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover handcrafted itineraries designed to give you the most memorable travel experience.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filters */}
                <div className="mb-8">
                    <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse" />}>
                        <FiltersBar />
                    </Suspense>
                </div>

                {/* Packages Grid */}
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-80 bg-white rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    }
                >
                    <PackagesList searchParams={resolvedSearchParams} />
                </Suspense>
            </div>
        </div>
    );
}
