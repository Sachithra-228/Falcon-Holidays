"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const DESTINATIONS = ["all", "Sri Lanka", "Maldives", "Dubai", "Bali", "Singapore", "Thailand"];
const CATEGORIES = ["all", "Sri Lanka", "International", "Honeymoon", "Adventure"];
const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "duration", label: "Duration" },
];
const DURATION_OPTIONS = [
    { value: "", label: "Any Duration" },
    { value: "1-4", label: "1–4 Days" },
    { value: "5-7", label: "5–7 Days" },
    { value: "8-14", label: "8–14 Days" },
    { value: "15+", label: "15+ Days" },
];

export default function FiltersBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, val]) => {
                if (val) params.set(key, val);
                else params.delete(key);
            });
            return params.toString();
        },
        [searchParams]
    );

    const updateFilter = (key: string, value: string) => {
        const qs = createQueryString({ [key]: value === "all" ? "" : value });
        router.push(`${pathname}?${qs}`, { scroll: false });
    };

    const clearFilters = () => router.push(pathname, { scroll: false });

    const hasFilters = searchParams.toString().length > 0;

    return (
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={18} className="text-navy-900" />
                <h3 className="font-semibold text-navy-900">Filter Packages</h3>
                {hasFilters && (
                    <button
                        onClick={clearFilters}
                        className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                        <X size={14} />
                        Clear all
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Destination */}
                <div>
                    <label className="label-field">Destination</label>
                    <select
                        className="input-field text-sm py-2.5"
                        value={searchParams.get("destination") || "all"}
                        onChange={(e) => updateFilter("destination", e.target.value)}
                    >
                        {DESTINATIONS.map((d) => (
                            <option key={d} value={d}>
                                {d === "all" ? "All Destinations" : d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="label-field">Category</label>
                    <select
                        className="input-field text-sm py-2.5"
                        value={searchParams.get("category") || "all"}
                        onChange={(e) => updateFilter("category", e.target.value)}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c === "all" ? "All Categories" : c}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="label-field">Duration</label>
                    <select
                        className="input-field text-sm py-2.5"
                        value={searchParams.get("duration") || ""}
                        onChange={(e) => updateFilter("duration", e.target.value)}
                    >
                        {DURATION_OPTIONS.map((d) => (
                            <option key={d.value} value={d.value}>
                                {d.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div>
                    <label className="label-field">Sort By</label>
                    <select
                        className="input-field text-sm py-2.5"
                        value={searchParams.get("sort") || "newest"}
                        onChange={(e) => updateFilter("sort", e.target.value)}
                    >
                        {SORT_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
