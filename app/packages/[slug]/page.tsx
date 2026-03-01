import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/actions/packages";
import { formatPrice } from "@/lib/utils";
import { Check, X, Clock, MapPin, DollarSign, Share2 } from "lucide-react";
import { Gallery, Accordion } from "./PackageDetailClient";
import InquiryForm from "./InquiryForm";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = await getPackageBySlug(slug);
    if (!pkg) return { title: "Package Not Found" };
    return {
        title: pkg.title,
        description: `${pkg.durationDays}-day trip to ${pkg.destination} from ${formatPrice(pkg.priceFrom, pkg.currency)}. ${pkg.highlights[0] || ""}`,
    };
}

const faqItems = [
    { title: "What is included in the price?", description: "The package price covers accommodation, transport, and all inclusions listed above. International flights are not included unless specified." },
    { title: "Can I customize the itinerary?", description: "Absolutely! We can tailor any package to your preferences. Contact us via WhatsApp or the inquiry form below, and our team will create a bespoke itinerary." },
    { title: "What is the cancellation policy?", description: "Free cancellation up to 30 days before departure. 50% refund between 15–30 days. No refund within 14 days. Travel insurance is strongly recommended." },
    { title: "Do I need a visa?", description: "Visa requirements depend on your nationality. Please consult your nearest embassy or contact us — we'll guide you through the process." },
];

export default async function PackageDetailPage({ params }: Props) {
    const { slug } = await params;
    const pkg = await getPackageBySlug(slug);

    if (!pkg) notFound();

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero bar */}
            <div className="bg-navy-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <span>Packages</span>
                        <span>/</span>
                        <span className="text-gold">{pkg.destination}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{pkg.title}</h1>
                    <div className="flex flex-wrap items-center gap-5 mt-3 text-gray-300 text-sm">
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" />{pkg.destination}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold" />{pkg.durationDays} Days</span>
                        <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-gold" />From {formatPrice(pkg.priceFrom, pkg.currency)}</span>
                        <span className="px-3 py-1 bg-gold/20 border border-gold/30 text-gold rounded-full text-xs font-medium">{pkg.category}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Gallery */}
                        <Gallery images={pkg.images} title={pkg.title} />

                        {/* Highlights */}
                        {pkg.highlights?.length > 0 && (
                            <section className="bg-white rounded-2xl p-7 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-5">Package Highlights</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {pkg.highlights.map((h: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                                            <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-gold" />
                                            </span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Inclusions & Exclusions */}
                        <section className="bg-white rounded-2xl p-7 shadow-sm">
                            <h2 className="text-xl font-bold text-navy-900 mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-emerald-700 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
                                        <Check size={16} /> Inclusions
                                    </h3>
                                    <ul className="space-y-2">
                                        {pkg.inclusions?.map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                                <Check size={14} className="text-emerald-500 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-red-600 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
                                        <X size={16} /> Exclusions
                                    </h3>
                                    <ul className="space-y-2">
                                        {pkg.exclusions?.map((item: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <X size={14} className="text-red-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Itinerary */}
                        {pkg.itinerary?.length > 0 && (
                            <section className="bg-white rounded-2xl p-7 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-6">Day-by-Day Itinerary</h2>
                                <Accordion items={pkg.itinerary} label="Day" />
                            </section>
                        )}

                        {/* FAQ */}
                        <section className="bg-white rounded-2xl p-7 shadow-sm">
                            <h2 className="text-xl font-bold text-navy-900 mb-6">Frequently Asked Questions</h2>
                            <Accordion items={faqItems} />
                        </section>
                    </div>

                    {/* Right: Booking Sidebar */}
                    <div className="space-y-6">
                        {/* Price card */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-gray-500 text-sm">Starting from</div>
                                <div className="text-4xl font-black text-navy-900 mt-1">{formatPrice(pkg.priceFrom, pkg.currency)}</div>
                                <div className="text-gray-500 text-sm">per person</div>
                            </div>

                            <div className="space-y-3 mb-6 py-5 border-y border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-semibold text-navy-900">{pkg.durationDays} Days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Destination</span>
                                    <span className="font-semibold text-navy-900">{pkg.destination}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Category</span>
                                    <span className="font-semibold text-navy-900">{pkg.category}</span>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the "${pkg.title}" package.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-all mb-3"
                            >
                                Book via WhatsApp
                            </a>
                            <a href="#inquiry" className="flex items-center justify-center gap-2 w-full py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-all">
                                Send Inquiry
                            </a>
                        </div>
                    </div>
                </div>

                {/* Inquiry Form */}
                <div id="inquiry" className="mt-12">
                    <InquiryForm packageTitle={pkg.title} packageSlug={pkg.slug} />
                </div>
            </div>
        </div>
    );
}
