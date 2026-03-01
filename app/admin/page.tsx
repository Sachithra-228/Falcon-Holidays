import AdminSidebar from "@/components/AdminSidebar";
import { getAllPackagesAdmin } from "@/lib/actions/packages";
import { getInquiryStats } from "@/lib/actions/inquiries";
import { Package, MessageSquare, TrendingUp, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
    let packages: any[] = [];
    let stats = { total: 0, newCount: 0, lastWeek: 0 };
    try {
        [packages, stats] = await Promise.all([
            getAllPackagesAdmin(),
            getInquiryStats(),
        ]);
    } catch {
        // DB not connected
    }

    const publishedCount = packages.filter((p: any) => p.isPublished).length;

    const cards = [
        { icon: Package, label: "Total Packages", value: packages.length, sub: `${publishedCount} published`, color: "bg-blue-50 text-blue-700" },
        { icon: MessageSquare, label: "Total Inquiries", value: stats.total, sub: `${stats.newCount} unread`, color: "bg-emerald-50 text-emerald-700" },
        { icon: AlertCircle, label: "New Inquiries", value: stats.newCount, sub: "Awaiting response", color: "bg-amber-50 text-amber-700" },
        { icon: TrendingUp, label: "Last 7 Days", value: stats.lastWeek, sub: "New inquiries", color: "bg-purple-50 text-purple-700" },
    ];

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back to Falcon Holidays Admin</p>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {cards.map(({ icon: Icon, label, value, sub, color }) => (
                        <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                                <Icon size={22} />
                            </div>
                            <div className="text-3xl font-black text-navy-900">{value}</div>
                            <div className="text-gray-700 font-medium text-sm mt-1">{label}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                        </div>
                    ))}
                </div>

                {/* Recent packages */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-navy-900">Recent Packages</h2>
                        <a href="/admin/packages" className="text-gold text-sm font-medium hover:underline">View all →</a>
                    </div>
                    {packages.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">No packages yet. <a href="/admin/packages/new" className="text-gold hover:underline">Create one →</a></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {["Title", "Destination", "Duration", "Price", "Status"].map((h) => (
                                            <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {packages.slice(0, 5).map((pkg: any) => (
                                        <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-4 font-medium text-navy-900 truncate max-w-[220px]">{pkg.title}</td>
                                            <td className="px-5 py-4 text-gray-600">{pkg.destination}</td>
                                            <td className="px-5 py-4 text-gray-600">{pkg.durationDays}d</td>
                                            <td className="px-5 py-4 text-gray-600">{pkg.currency} {pkg.priceFrom.toLocaleString()}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${pkg.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {pkg.isPublished ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
