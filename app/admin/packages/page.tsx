import AdminSidebar from "@/components/AdminSidebar";
import { getAllPackagesAdmin } from "@/lib/actions/packages";
import PackagesTableClient from "./PackagesTableClient";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Packages" };

export default async function AdminPackagesPage() {
    let packages: any[] = [];
    try {
        packages = await getAllPackagesAdmin();
    } catch { /* DB not connected */ }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-900">Packages</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage all travel packages</p>
                    </div>
                    <Link href="/admin/packages/new" className="btn-navy gap-2">
                        <Plus size={18} />
                        New Package
                    </Link>
                </div>

                <PackagesTableClient packages={packages} />
            </main>
        </div>
    );
}
