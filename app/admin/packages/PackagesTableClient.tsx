"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePackage, togglePublishPackage } from "@/lib/actions/packages";
import { Edit, Trash2, Eye, EyeOff, AlertTriangle, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PackageRow {
    _id: string;
    title: string;
    slug: string;
    destination: string;
    durationDays: number;
    priceFrom: number;
    currency: string;
    isPublished: boolean;
    category: string;
}

export default function PackagesTableClient({ packages }: { packages: PackageRow[] }) {
    const [deleting, setDeleting] = useState<string | null>(null);
    const [toggling, setToggling] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = (id: string) => {
        setToggling(id);
        startTransition(async () => {
            await togglePublishPackage(id);
            setToggling(null);
            router.refresh();
        });
    };

    const handleDelete = (id: string) => {
        if (confirmDelete !== id) { setConfirmDelete(id); return; }
        setDeleting(id);
        setConfirmDelete(null);
        startTransition(async () => {
            await deletePackage(id);
            setDeleting(null);
            router.refresh();
        });
    };

    if (packages.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                <p className="text-gray-400 mb-4">No packages created yet.</p>
                <Link href="/admin/packages/new" className="btn-navy">Create First Package</Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            {["Title", "Destination", "Category", "Duration", "Price", "Status", "Actions"].map((h) => (
                                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {packages.map((pkg) => (
                            <tr key={pkg._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="font-semibold text-navy-900 max-w-[220px] truncate">{pkg.title}</div>
                                    <div className="text-gray-400 text-xs">/packages/{pkg.slug}</div>
                                </td>
                                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{pkg.destination}</td>
                                <td className="px-5 py-4">
                                    <span className="px-2 py-0.5 bg-navy-50 text-navy-700 rounded-full text-xs">{pkg.category}</span>
                                </td>
                                <td className="px-5 py-4 text-gray-600">{pkg.durationDays}d</td>
                                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{formatPrice(pkg.priceFrom, pkg.currency)}</td>
                                <td className="px-5 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${pkg.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                                        {pkg.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        {/* Toggle publish */}
                                        <button
                                            onClick={() => handleToggle(pkg._id)}
                                            disabled={toggling === pkg._id}
                                            title={pkg.isPublished ? "Unpublish" : "Publish"}
                                            className={`p-2 rounded-lg transition-all ${pkg.isPublished ? "text-emerald-600 hover:bg-emerald-50" : "text-gray-400 hover:bg-gray-100"}`}
                                        >
                                            {toggling === pkg._id ? <Loader2 size={15} className="animate-spin" /> : pkg.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>

                                        {/* Edit */}
                                        <Link href={`/admin/packages/${pkg._id}/edit`} className="p-2 rounded-lg text-gold hover:bg-gold/10 transition-all">
                                            <Edit size={15} />
                                        </Link>

                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(pkg._id)}
                                            disabled={deleting === pkg._id}
                                            title={confirmDelete === pkg._id ? "Click again to confirm" : "Delete"}
                                            className={`p-2 rounded-lg transition-all ${confirmDelete === pkg._id ? "text-white bg-red-500" : "text-red-400 hover:bg-red-50"}`}
                                        >
                                            {deleting === pkg._id ? (
                                                <Loader2 size={15} className="animate-spin" />
                                            ) : confirmDelete === pkg._id ? (
                                                <AlertTriangle size={15} />
                                            ) : (
                                                <Trash2 size={15} />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
