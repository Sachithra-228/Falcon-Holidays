"use client";

import { useState, useTransition } from "react";
import { markInquiryRead } from "@/lib/actions/inquiries";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, ChevronDown, ChevronUp, Package } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    packageSlug?: string;
    status: "new" | "read";
    createdAt: string;
}

export default function InquiriesTableClient({ inquiries }: { inquiries: Inquiry[] }) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleMarkRead = (id: string) => {
        startTransition(async () => {
            await markInquiryRead(id);
            router.refresh();
        });
    };

    if (inquiries.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center text-gray-400 text-sm">
                No inquiries received yet.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
                {inquiries.map((inq) => (
                    <div key={inq._id} className={`transition-colors ${inq.status === "new" ? "bg-gold/5" : "bg-white"}`}>
                        {/* Row */}
                        <div
                            className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setExpanded(expanded === inq._id ? null : inq._id)}
                        >
                            <div className={`shrink-0 ${inq.status === "new" ? "text-gold" : "text-gray-300"}`}>
                                {inq.status === "new" ? <Mail size={18} /> : <MailOpen size={18} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-navy-900 text-sm truncate">{inq.name}</span>
                                    {inq.status === "new" && (
                                        <span className="px-2 py-0.5 bg-gold text-navy-900 text-xs font-bold rounded-full">NEW</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-500 text-xs mt-0.5">
                                    <span>{inq.email}</span>
                                    <span>·</span>
                                    <span>{inq.phone}</span>
                                    {inq.packageSlug && (
                                        <>
                                            <span>·</span>
                                            <span className="flex items-center gap-1"><Package size={11} />{inq.packageSlug}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="shrink-0 text-xs text-gray-400 hidden md:block">{formatDate(inq.createdAt)}</div>
                            <div className="shrink-0 text-gray-400">
                                {expanded === inq._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </div>

                        {/* Expanded detail */}
                        {expanded === inq._id && (
                            <div className="px-6 pb-6 border-t border-gray-100">
                                <div className="mt-4 bg-gray-50 rounded-xl p-5">
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{inq.message}</p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <a href={`mailto:${inq.email}`} className="btn-navy text-xs py-2 px-4">Reply via Email</a>
                                    {inq.status === "new" && (
                                        <button
                                            onClick={() => handleMarkRead(inq._id)}
                                            disabled={isPending}
                                            className="flex items-center gap-1.5 px-4 py-2 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <MailOpen size={13} /> Mark as Read
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
