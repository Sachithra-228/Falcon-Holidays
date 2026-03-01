"use server";

import connectDB from "@/lib/db";
import Inquiry from "@/lib/models/Inquiry";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const InquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(7, "Phone number is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    packageSlug: z.string().optional(),
});

export async function createInquiry(data: z.infer<typeof InquirySchema>) {
    await connectDB();
    const validated = InquirySchema.parse(data);
    const inquiry = await Inquiry.create(validated);
    revalidatePath("/admin/inquiries");
    return { success: true, id: inquiry._id.toString() };
}

export async function getInquiries() {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(inquiries));
}

export async function getInquiryById(id: string) {
    await connectDB();
    const inquiry = await Inquiry.findById(id).lean();
    return inquiry ? JSON.parse(JSON.stringify(inquiry)) : null;
}

export async function markInquiryRead(id: string) {
    await connectDB();
    await Inquiry.findByIdAndUpdate(id, { status: "read" });
    revalidatePath("/admin/inquiries");
    return { success: true };
}

export async function getInquiryStats() {
    await connectDB();
    const total = await Inquiry.countDocuments();
    const newCount = await Inquiry.countDocuments({ status: "new" });
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const lastWeek = await Inquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
    return { total, newCount, lastWeek };
}
