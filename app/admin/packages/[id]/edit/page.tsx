import AdminSidebar from "@/components/AdminSidebar";
import PackageForm from "../../PackageForm";
import { getPackageById } from "@/lib/actions/packages";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Package" };

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: Props) {
    const { id } = await params;
    const pkg = await getPackageById(id);

    if (!pkg) notFound();

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-navy-900">Edit Package</h1>
                    <p className="text-gray-500 text-sm mt-1">Editing: <span className="font-medium text-navy-700">{pkg.title}</span></p>
                </div>
                <PackageForm mode="edit" packageId={id} defaultValues={pkg} />
            </main>
        </div>
    );
}
