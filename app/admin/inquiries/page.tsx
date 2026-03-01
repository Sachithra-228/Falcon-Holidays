import AdminSidebar from "@/components/AdminSidebar";
import { getInquiries } from "@/lib/actions/inquiries";
import InquiriesTableClient from "./InquiriesTableClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiries" };

export default async function AdminInquiriesPage() {
    let inquiries: any[] = [];
    try {
        inquiries = await getInquiries();
    } catch { /* DB not connected */ }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-navy-900">Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {inquiries.length} total — {inquiries.filter((i: any) => i.status === "new").length} unread
                    </p>
                </div>
                <InquiriesTableClient inquiries={inquiries} />
            </main>
        </div>
    );
}
