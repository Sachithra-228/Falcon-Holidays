"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/FormFields";
import { createPackage, updatePackage } from "@/lib/actions/packages";
import { Plus, Minus, Loader2, Save } from "lucide-react";

const CATEGORIES = [
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Cultural", label: "Cultural" },
    { value: "Adventure", label: "Adventure" },
    { value: "Beach", label: "Beach" },
    { value: "Wildlife", label: "Wildlife" },
    { value: "Honeymoon", label: "Honeymoon" },
    { value: "Family", label: "Family" },
];

const CURRENCIES = [
    { value: "LKR", label: "LKR (Rs.)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
];

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
}

interface PackageFormProps {
    mode: "create" | "edit";
    packageId?: string;
    defaultValues?: any;
}

export default function PackageForm({ mode, packageId, defaultValues }: PackageFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState("");

    const [form, setForm] = useState({
        title: defaultValues?.title || "",
        destination: defaultValues?.destination || "",
        category: defaultValues?.category || "Sri Lanka",
        durationDays: defaultValues?.durationDays || 5,
        priceFrom: defaultValues?.priceFrom || 50000,
        currency: defaultValues?.currency || "LKR",
        isPublished: defaultValues?.isPublished || false,
    });

    const [highlights, setHighlights] = useState<string[]>(defaultValues?.highlights || [""]);
    const [inclusions, setInclusions] = useState<string[]>(defaultValues?.inclusions || [""]);
    const [exclusions, setExclusions] = useState<string[]>(defaultValues?.exclusions || [""]);
    const [images, setImages] = useState<string[]>(defaultValues?.images || [""]);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>(
        defaultValues?.itinerary || [{ day: 1, title: "", description: "" }]
    );

    const updateArr = (arr: string[], idx: number, val: string) => arr.map((a, i) => (i === idx ? val : a));
    const addToArr = (arr: string[], setArr: (a: string[]) => void) => setArr([...arr, ""]);
    const removeFromArr = (arr: string[], setArr: (a: string[]) => void, idx: number) =>
        setArr(arr.filter((_, i) => i !== idx));

    const addDay = () =>
        setItinerary([...itinerary, { day: itinerary.length + 1, title: "", description: "" }]);
    const removeDay = (idx: number) =>
        setItinerary(itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 })));
    const updateDay = (idx: number, field: keyof ItineraryDay, val: string | number) =>
        setItinerary(itinerary.map((d, i) => (i === idx ? { ...d, [field]: val } : d)));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");
        const payload = {
            ...form,
            durationDays: Number(form.durationDays),
            priceFrom: Number(form.priceFrom),
            highlights: highlights.filter(Boolean),
            inclusions: inclusions.filter(Boolean),
            exclusions: exclusions.filter(Boolean),
            images: images.filter(Boolean),
            itinerary: itinerary.filter((d) => d.title),
        };

        startTransition(async () => {
            try {
                if (mode === "create") {
                    await createPackage(payload);
                } else {
                    await updatePackage(packageId!, payload);
                }
                router.push("/admin/packages");
                router.refresh();
            } catch (err: any) {
                setServerError(err.message || "Something went wrong. Please try again.");
            }
        });
    };

    const arrayField = (
        label: string,
        arr: string[],
        setArr: (a: string[]) => void,
        placeholder: string
    ) => (
        <div>
            <label className="label-field">{label}</label>
            <div className="space-y-2">
                {arr.map((val, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => setArr(updateArr(arr, i, e.target.value))}
                            placeholder={placeholder}
                            className="input-field text-sm py-2.5 flex-1"
                        />
                        {arr.length > 1 && (
                            <button type="button" onClick={() => removeFromArr(arr, setArr, i)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                <Minus size={15} />
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={() => addToArr(arr, setArr)} className="flex items-center gap-1.5 text-gold hover:text-gold-600 text-sm font-medium transition-colors">
                    <Plus size={14} /> Add {label.slice(0, -1)}
                </button>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {serverError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{serverError}</div>
            )}

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy-900 mb-5 pb-3 border-b border-gray-100">Package Details</h3>
                <div className="space-y-5">
                    <Input id="title" label="Package Title *" placeholder="e.g. Magical Sri Lanka – 7 Days" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input id="destination" label="Destination *" placeholder="e.g. Sri Lanka" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
                        <Select id="category" label="Category *" options={CATEGORIES} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Input id="duration" type="number" label="Duration (Days) *" min={1} value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })} required />
                        <Input id="price" type="number" label="Price From *" min={0} value={form.priceFrom} onChange={(e) => setForm({ ...form, priceFrom: Number(e.target.value) })} required />
                        <Select id="currency" label="Currency" options={CURRENCIES} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            id="published"
                            type="checkbox"
                            checked={form.isPublished}
                            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                            className="w-4 h-4 text-gold rounded border-gray-300 focus:ring-gold"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish this package immediately</label>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy-900 mb-5 pb-3 border-b border-gray-100">Images</h3>
                {arrayField("Image URLs", images, setImages, "https://images.unsplash.com/photo-...")}
            </div>

            {/* Highlights, Inclusions, Exclusions */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy-900 mb-5 pb-3 border-b border-gray-100">Package Content</h3>
                <div className="space-y-7">
                    {arrayField("Highlights", highlights, setHighlights, "e.g. 2 nights in Sigiriya")}
                    {arrayField("Inclusions", inclusions, setInclusions, "e.g. Airport transfers included")}
                    {arrayField("Exclusions", exclusions, setExclusions, "e.g. International flights not included")}
                </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                    <h3 className="font-semibold text-navy-900">Day-by-Day Itinerary</h3>
                    <button type="button" onClick={addDay} className="flex items-center gap-1.5 text-sm text-gold font-medium hover:underline">
                        <Plus size={14} /> Add Day
                    </button>
                </div>
                <div className="space-y-5">
                    {itinerary.map((day, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-navy-900 text-sm">Day {day.day}</span>
                                {itinerary.length > 1 && (
                                    <button type="button" onClick={() => removeDay(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                                )}
                            </div>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Day title (e.g. Arrival & Colombo City Tour)"
                                    value={day.title}
                                    onChange={(e) => updateDay(i, "title", e.target.value)}
                                    className="input-field text-sm py-2.5"
                                />
                                <textarea
                                    placeholder="Description of this day's activities..."
                                    value={day.description}
                                    onChange={(e) => updateDay(i, "description", e.target.value)}
                                    rows={3}
                                    className="input-field text-sm resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
                <button type="submit" disabled={isPending} className="btn-navy gap-2 disabled:opacity-70">
                    {isPending ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Save size={18} /> {mode === "create" ? "Create Package" : "Save Changes"}</>}
                </button>
                <button type="button" onClick={() => router.back()} className="px-5 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
}
