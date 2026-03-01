import AdminSidebar from "@/components/AdminSidebar";
import PackageForm from "../PackageForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Package" };

export default function NewPackagePage() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-navy-900">Create New Package</h1>
                    <p className="text-gray-500 text-sm mt-1">Fill in the details below to create a new travel package.</p>
                </div>
                <PackageForm mode="create" />
            </main>
        </div>
    );
}
